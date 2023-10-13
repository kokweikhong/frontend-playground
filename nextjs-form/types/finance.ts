import mockData from "@/app/MOCK_DATA.json";

export interface FinanceExpensesRecord {
  id: number;
  date: string;
  name: string;
  category_id: number;
  currency: string;
  amount: number;
  is_fixed_expenses: boolean;
  is_paid: boolean;
  remarks: string;
  created_at: string;
  updated_at: string;
}

export const getFinanceExpensesRecords = (): FinanceExpensesRecord[] =>
  mockData;
