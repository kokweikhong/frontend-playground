"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { FinanceExpensesRecord } from "@/types/finance"
import Swal from "sweetalert2"
import { useFinanceExpensesContext } from "@/context/finance-expenses"

const categories: { id: number, value: string }[] = [
  { id: 1, value: "Food" },
  { id: 2, value: "Transportation" },
  { id: 3, value: "Entertainment" },
  { id: 4, value: "Health" },
  { id: 5, value: "Education" },
  { id: 6, value: "Miscellaneous" },
  { id: 7, value: "Savings" },
  { id: 8, value: "Investments" },
  { id: 9, value: "Gifts" },
  { id: 10, value: "Donations" },
]

const FormErrorMessage = ({ message }: { message: string }) => (
  <p className="mt-2 text-sm text-red-600">{message}</p>
)


const FinanceExpensesRecordForm: React.FC = () => {
  const { openForm, setOpenForm, formType, expensesRecord } = useFinanceExpensesContext()


  const form = useForm<FinanceExpensesRecord>({
    defaultValues: {} as FinanceExpensesRecord,
  })

  const onSubmit: SubmitHandler<FinanceExpensesRecord> = (data) => {
    console.log(data);
    setOpenForm(false)
    Swal.fire({
      title: "Success",
      text: "Record added",
      icon: "success"
    })

    form.reset()
  }

  React.useEffect(() => {
    form.reset(expensesRecord)
  }, [expensesRecord])

  return (
    <Dialog open={openForm} onOpenChange={setOpenForm} >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`${formType} profile`}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-2">
              <Controller
                control={form.control}
                name="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                rules={{ required: "Please select a valid date" }}
                render={({ field }) => (
                  <div className="relative md:col-span-full">
                    <label
                      htmlFor="date"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >Date</label>
                    <input
                      type="date"
                      id="date"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field}
                    />
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="name"
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                      Name
                    </label>
                    <input
                      {...field}
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {form.formState.errors.name && (<FormErrorMessage message={"Invalid name"} />)}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="category_id"
                rules={{ required: true, minLength: 1 }}
                render={({ field }) => (
                  <div className="relative">
                    <label
                      htmlFor="category"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                      Category
                    </label>
                    <select
                      id="category"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => field.onChange(parseInt(e.target.value))} defaultValue={field.value?.toString()}
                    >
                      <option value="">Select a category...</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id.toString()}>
                          {category.value}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.category_id && (<FormErrorMessage message={"Invalid category"} />)}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="currency"
                rules={{ required: true, minLength: 1 }}
                defaultValue="MYR"
                render={({ field }) => (
                  <div className="relative">
                    <label
                      htmlFor="currency"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                      Currency
                    </label>
                    <select
                      id="currency"
                      defaultValue={"MYR"}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    >
                      <option value="">Select a currency...</option>
                      <option value="MYR">MYR</option>
                      <option value="SGD">SGD</option>
                    </select>
                    {form.formState.errors.currency && (<FormErrorMessage message={"Invalid currency"} />)}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="amount"
                defaultValue={0}
                rules={{ required: true, min: 0.1 }}
                render={({ field }) => (
                  <div className="relative">
                    <label
                      htmlFor="amount"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                      Amount
                    </label>
                    <input
                      id="amount"
                      type="number"
                      step="0.01"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field}
                    />
                    {form.formState.errors.amount && (<FormErrorMessage message={"Invalid amount"} />)}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="remarks"
                defaultValue={""}
                render={({ field }) => (
                  <div className="relative md:col-span-full">
                    <label
                      htmlFor="remarks"
                      className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                      Remarks
                    </label>
                    <input
                      id="remarks"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...field}
                    />
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="is_fixed_expenses"
                defaultValue={true}
                render={({ field }) => (
                  <div className="flex h-6 items-center">
                    <input
                      id="is_fixed_expenses"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <label
                      htmlFor="is_fixed_expenses"
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Is Fixed Expenses?
                    </label>
                  </div>
                )}
              />


              <Controller
                control={form.control}
                name="is_paid"
                defaultValue={false}
                render={({ field }) => (
                  <div className="flex h-6 items-center">
                    <input
                      id="is_paid"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <label
                      htmlFor="is_paid"
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Is Paid?
                    </label>
                  </div>
                )}
              />
            </div>
            <Button type="submit" className="float-right">Submit</Button>

          </form>

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FinanceExpensesRecordForm
