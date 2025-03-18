<script lang="ts">
  import { expenses } from '../stores/expenseStore';
  import { settings, t, formatAmount } from '../stores/settingsStore';
  import type { Expense } from '../stores/expenseStore';

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString($settings.language);
  }
</script>

<div class="card mt-6">
  <h2 class="text-xl font-bold mb-4">{t('recentExpenses', $settings.language)}</h2>
  
  <div class="space-y-4">
    {#each $expenses as expense (expense.id)}
      <div class="flex items-center justify-between p-4 bg-dark-300 rounded-lg">
        <div>
          <p class="font-medium">{expense.description || t(`categories.${expense.category}`, $settings.language)}</p>
          <p class="text-sm text-gray-400">{formatDate(expense.date)}</p>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-bold">{formatAmount(expense.amount)}</span>
          <button
            class="text-red-400 hover:text-red-500"
            on:click={() => expenses.remove(expense.id)}
          >
            ×
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>