<script lang="ts">
  import { expenses } from '../stores/expenseStore';
  import { settings, t } from '../stores/settingsStore';

  let amount = '';
  let category = 'food';
  let description = '';

  const categories = [
    'food',
    'transport',
    'entertainment',
    'utilities',
    'shopping',
    'other'
  ];

  function handleSubmit() {
    if (!amount || !category) return;

    expenses.add({
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString()
    });

    amount = '';
    description = '';
    category = 'food';
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="card space-y-4">
  <h2 class="text-xl font-bold mb-4">{t('addNewExpense', $settings.language)}</h2>
  
  <div class="space-y-2">
    <label for="amount" class="block">{t('amount', $settings.language)}</label>
    <input
      type="number"
      id="amount"
      bind:value={amount}
      placeholder={t('enterAmount', $settings.language)}
      min="0"
      step="0.01"
      required
      class="input w-full"
    />
  </div>

  <div class="space-y-2">
    <label for="category" class="block">{t('category', $settings.language)}</label>
    <select
      id="category"
      bind:value={category}
      class="select w-full"
    >
      {#each categories as cat}
        <option value={cat}>{t(`categories.${cat}`, $settings.language)}</option>
      {/each}
    </select>
  </div>

  <div class="space-y-2">
    <label for="description" class="block">{t('description', $settings.language)}</label>
    <input
      type="text"
      id="description"
      bind:value={description}
      placeholder={t('enterDescription', $settings.language)}
      class="input w-full"
    />
  </div>

  <button type="submit" class="btn btn-primary w-full">{t('addExpense', $settings.language)}</button>
</form>