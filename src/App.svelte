<script lang="ts">
  import { onMount } from 'svelte';
  import ExpenseForm from './lib/components/ExpenseForm.svelte';
  import ExpenseList from './lib/components/ExpenseList.svelte';
  import ExpenseChart from './lib/components/ExpenseChart.svelte';
  import BudgetTracker from './lib/components/BudgetTracker.svelte';
  import SettingsBar from './lib/components/SettingsBar.svelte';
  import { expenses } from './lib/stores/expenseStore';
  import { settings, translations, t } from './lib/stores/settingsStore';

  onMount(() => {
    expenses.load();
  });
</script>

<main class="container mx-auto px-4 py-8 max-w-4xl">
  <SettingsBar />
  <h1 class="text-3xl font-bold text-center mb-8">{t('expenseTracker', $settings.language)}</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <ExpenseForm />
      <ExpenseChart />
    </div>
    <div>
      <BudgetTracker />
      <ExpenseList />
    </div>
  </div>
</main>