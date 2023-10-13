"use client";

import React from 'react';
import { FinanceExpensesRecord } from '@/types/finance';

interface FinanceContextProps {
  expensesRecords: FinanceExpensesRecord[];
  setExpensesRecords: (expensesRecords: FinanceExpensesRecord[]) => void;
  expensesRecord: FinanceExpensesRecord;
  setExpensesRecord: (expensesRecord: FinanceExpensesRecord) => void;
  openForm: boolean;
  setOpenForm: (openForm: boolean) => void;
  formType: "create" | "update";
  setFormType: (formType: "create" | "update") => void;
}


const FinanceContext = React.createContext<FinanceContextProps>({
  expensesRecords: [],
  setExpensesRecords: () => { },
  expensesRecord: {} as FinanceExpensesRecord,
  setExpensesRecord: () => { },
  openForm: false,
  setOpenForm: () => { },
  formType: "create",
  setFormType: () => { },
});

export const FinanceProvide: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expensesRecords, setExpensesRecords] = React.useState<FinanceExpensesRecord[]>([]);
  const [expensesRecord, setExpensesRecord] = React.useState<FinanceExpensesRecord>({} as FinanceExpensesRecord);
  const [openForm, setOpenForm] = React.useState<boolean>(false);
  const [formType, setFormType] = React.useState<"create" | "update">("create");

  return (
    <FinanceContext.Provider value={{
      expensesRecords,
      setExpensesRecords,
      expensesRecord,
      setExpensesRecord,
      openForm,
      setOpenForm,
      formType,
      setFormType,
    }}>
      {children}
    </FinanceContext.Provider>
  )
}

export const useFinanceExpensesContext = () => React.useContext(FinanceContext);
