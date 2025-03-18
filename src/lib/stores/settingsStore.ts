import { writable, get } from 'svelte/store';

export interface Settings {
  language: string;
  currency: string;
}

const defaultSettings: Settings = {
  language: 'en',
  currency: 'EUR'
};

export const translations = {
  en: {
    expenseTracker: 'Expense Tracker',
    addNewExpense: 'Add New Expense',
    amount: 'Amount',
    category: 'Category',
    description: 'Description',
    enterAmount: 'Enter amount',
    enterDescription: 'Enter description',
    addExpense: 'Add Expense',
    monthlyBudget: 'Monthly Budget',
    setBudget: 'Set Budget',
    enterMonthlyBudget: 'Enter monthly budget',
    budget: 'Budget',
    spent: 'Spent',
    remaining: 'Remaining',
    recentExpenses: 'Recent Expenses',
    spendingByCategory: 'Spending by Category',
    categories: {
      food: 'Food',
      transport: 'Transport',
      entertainment: 'Entertainment',
      utilities: 'Utilities',
      shopping: 'Shopping',
      other: 'Other'
    }
  },
  fr: {
    expenseTracker: 'Suivi des Dépenses',
    addNewExpense: 'Ajouter une Dépense',
    amount: 'Montant',
    category: 'Catégorie',
    description: 'Description',
    enterAmount: 'Entrer le montant',
    enterDescription: 'Entrer la description',
    addExpense: 'Ajouter',
    monthlyBudget: 'Budget Mensuel',
    setBudget: 'Définir le Budget',
    enterMonthlyBudget: 'Entrer le budget mensuel',
    budget: 'Budget',
    spent: 'Dépensé',
    remaining: 'Restant',
    recentExpenses: 'Dépenses Récentes',
    spendingByCategory: 'Dépenses par Catégorie',
    categories: {
      food: 'Alimentation',
      transport: 'Transport',
      entertainment: 'Divertissement',
      utilities: 'Services',
      shopping: 'Shopping',
      other: 'Autre'
    }
  },
  es: {
    expenseTracker: 'Control de Gastos',
    addNewExpense: 'Añadir Gasto',
    amount: 'Cantidad',
    category: 'Categoría',
    description: 'Descripción',
    enterAmount: 'Introducir cantidad',
    enterDescription: 'Introducir descripción',
    addExpense: 'Añadir',
    monthlyBudget: 'Presupuesto Mensual',
    setBudget: 'Establecer Presupuesto',
    enterMonthlyBudget: 'Introducir presupuesto mensual',
    budget: 'Presupuesto',
    spent: 'Gastado',
    remaining: 'Restante',
    recentExpenses: 'Gastos Recientes',
    spendingByCategory: 'Gastos por Categoría',
    categories: {
      food: 'Alimentación',
      transport: 'Transporte',
      entertainment: 'Entretenimiento',
      utilities: 'Servicios',
      shopping: 'Compras',
      other: 'Otros'
    }
  }
};

export const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' }
];

function createSettingsStore() {
  const { subscribe, set, update: storeUpdate } = writable<Settings>(defaultSettings);

  return {
    subscribe,
    setLanguage: (language: string) => storeUpdate(s => ({ ...s, language })),
    setCurrency: (currency: string) => storeUpdate(s => ({ ...s, currency })),
    reset: () => set(defaultSettings),
    // Add update method to force reactivity
    update: () => storeUpdate(s => ({ ...s }))
  };
}

export const settings = createSettingsStore();
export const t = (key: string, lang: string) => {
  const keys = key.split('.');
  let value = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
};

export const formatAmount = (amount: number): string => {
  const currentSettings = get(settings);
  return amount.toLocaleString(undefined, {
    style: 'currency',
    currency: currentSettings.currency,
  });
};