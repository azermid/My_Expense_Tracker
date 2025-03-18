import { writable } from 'svelte/store';
import { openDB } from 'idb';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Budget {
  amount: number;
  month: string;
}

const DB_NAME = 'expense-tracker';
const DB_VERSION = 1;

const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore('expenses', { keyPath: 'id' });
      db.createObjectStore('budgets', { keyPath: 'month' });
    },
  });
  return db;
};

function createExpenseStore() {
  const { subscribe, set, update } = writable<Expense[]>([]);

  return {
    subscribe,
    add: async (expense: Omit<Expense, 'id'>) => {
      const db = await initDB();
      const id = crypto.randomUUID();
      const newExpense = { ...expense, id };
      await db.add('expenses', newExpense);
      update(expenses => [...expenses, newExpense]);
    },
    remove: async (id: string) => {
      const db = await initDB();
      await db.delete('expenses', id);
      update(expenses => expenses.filter(e => e.id !== id));
    },
    load: async () => {
      const db = await initDB();
      const expenses = await db.getAll('expenses');
      set(expenses);
    }
  };
}

function createBudgetStore() {
  const { subscribe, set, update } = writable<Budget | null>(null);

  return {
    subscribe,
    set: async (budget: Budget) => {
      const db = await initDB();
      await db.put('budgets', budget);
      set(budget);
    },
    load: async (month: string) => {
      const db = await initDB();
      const budget = await db.get('budgets', month);
      set(budget || null);
    }
  };
}

export const expenses = createExpenseStore();
export const budget = createBudgetStore();