<script lang="ts">
  import { onMount } from "svelte";
  import { budget, expenses } from "../stores/expenseStore";
  import { settings, t, formatAmount } from "../stores/settingsStore";
  import type { Budget } from "../stores/expenseStore";

  let budgetAmount = "";
  let currentMonth = new Date().toISOString().slice(0, 7);
  let totalSpent = 0;

  // Reactive declarations for formatted amounts
  $: formattedBudgetAmount = $budget ? formatAmount($budget.amount) : "0";
  $: formattedTotalSpent = formatAmount(totalSpent);
  $: formattedRemaining = formatAmount(($budget?.amount || 0) - totalSpent);

  $: {
    totalSpent = $expenses
      .filter((e) => e.date.startsWith(currentMonth))
      .reduce((sum, e) => sum + e.amount, 0);
  }

  onMount(async () => {
    await budget.load(currentMonth);
    if ($budget) {
      budgetAmount = $budget.amount.toString();
    }
  });

  async function handleSubmit() {
    if (!budgetAmount) return;
    await budget.set({
      amount: parseFloat(budgetAmount),
      month: currentMonth,
    });
  }
</script>

<div class="card">
  <h2 class="text-xl font-bold mb-4">
    {t("monthlyBudget", $settings.language)}
  </h2>

  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div class="space-y-2">
      <label for="budget" class="block"
        >{t("setBudget", $settings.language)}</label
      >
      <input
        type="number"
        id="budget"
        bind:value={budgetAmount}
        placeholder={t("enterMonthlyBudget", $settings.language)}
        min="0"
        step="0.01"
        required
        class="input w-full"
      />
    </div>
    <button type="submit" class="btn btn-primary w-full"
      >{t("setBudget", $settings.language)}</button
    >
  </form>

  {#if $budget}
    <div class="mt-6 space-y-2">
      <div class="flex justify-between">
        <span>{t("budget", $settings.language)}:</span>
        <span class="font-bold">{formattedBudgetAmount}</span>
      </div>
      <div class="flex justify-between">
        <span>{t("spent", $settings.language)}:</span>
        <span class="font-bold">{formattedTotalSpent}</span>
      </div>
      <div class="flex justify-between">
        <span>{t("remaining", $settings.language)}:</span>
        <span
          class="font-bold"
          class:text-red-500={totalSpent > $budget.amount}
        >
          {formattedRemaining}
        </span>
      </div>

      <div class="w-full bg-dark-300 rounded-full h-2.5 mt-4">
        <div
          class="h-2.5 rounded-full transition-all duration-300"
          class:bg-primary={totalSpent <= $budget.amount}
          class:bg-red-500={totalSpent > $budget.amount}
          style="width: {Math.min((totalSpent / $budget.amount) * 100, 100)}%"
        ></div>
      </div>
    </div>
  {/if}
</div>
