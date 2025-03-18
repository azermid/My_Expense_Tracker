<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, DoughnutController, ArcElement, Legend, Tooltip } from 'chart.js';
  import { Doughnut } from 'svelte-chartjs';
  import { settings, t } from '../stores/settingsStore';

  // Register required Chart.js components
  Chart.register(DoughnutController, ArcElement, Legend, Tooltip);

  import { expenses } from '../stores/expenseStore';
  import type { Expense } from '../stores/expenseStore';

  let chartData = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#6366f1',
        '#8b5cf6',
        '#ec4899',
        '#f43f5e',
        '#f97316',
        '#84cc16'
      ]
    }]
  };

  $: {
    const categories = {};
    $expenses.forEach(expense => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });

    chartData = {
      labels: Object.keys(categories).map(cat => t(`categories.${cat}`, $settings.language)),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: [
          '#6366f1',
          '#8b5cf6',
          '#ec4899',
          '#f43f5e',
          '#f97316',
          '#84cc16'
        ]
      }]
    };
  }
</script>

<div class="card mt-6">
  <h2 class="text-xl font-bold mb-4">{t('spendingByCategory', $settings.language)}</h2>
  <div class="h-64">
    <Doughnut
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#f3f4f6'
            }
          }
        }
      }}
    />
  </div>
</div>