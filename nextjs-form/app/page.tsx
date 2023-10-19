"use client";

import React from "react";
import Link from "next/link";
import DataTable from "@/components/DataTable";
import { getFinanceExpensesRecords } from "@/types/finance";
import { Button } from "@/components/ui/button";
import { FinanceExpensesRecord } from "@/types/finance";
import FinanceExpensesRecordForm from "@/components/FinanceExpensesRecordForm";
import { useFinanceExpensesContext } from "@/context/finance-expenses";

export default function Home() {
  const { setOpenForm, setExpensesRecord } = useFinanceExpensesContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/multiform"}>MutlipleForm</Link>

      <h1>Form</h1>
      <div>
        <Button
          onClick={() => {
            setExpensesRecord({} as FinanceExpensesRecord);
            setOpenForm(true);
          }}
        >
          Create
        </Button>
      </div>
      <div>
        <FinanceExpensesRecordForm />
      </div>

      <div>
        <DataTable />
      </div>
    </main>
  );
}
