"use client";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { FinanceExpensesRecordFormValues } from "@/types/finance";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// with html label element props
type InputContainerProps = {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
};

const InputContainer: React.FC<InputContainerProps> = ({
  children,
  htmlFor,
  label,
}) => (
  <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
    <label
      htmlFor={htmlFor}
      className="block text-xs font-medium text-gray-900 capitalize"
    >
      {label}
    </label>
    {children}
  </div>
);

export default function Page() {
  const categories: { id: number; name: string }[] = [
    { id: 0, name: "category 0" },
    { id: 1, name: "category 1" },
    { id: 2, name: "category 2" },
  ];

  const currencies: string[] = ["MYR", "SGD"];

  const [formValues, setFormValues] = React.useState<
    FinanceExpensesRecordFormValues[]
  >([
    {
      // date format: yyyy-mm-dd
      date: new Date().toISOString().split("T")[0],
      name: "",
      categoryID: 0,
      currency: "MYR",
      amount: 0,
      isFixedExpenses: true,
      isPaid: false,
      remarks: "",
    },
  ]);

  const { register, handleSubmit, watch, control } = useForm<
    FinanceExpensesRecordFormValues[]
  >({ defaultValues: formValues });

  const onSubmit: SubmitHandler<FinanceExpensesRecordFormValues[]> = (data) =>
    console.log(data);

  return (
    <main>
      <h1>Multiple Form</h1>
      <button
        onClick={() =>
          setFormValues((prev) => [
            ...prev,
            {} as FinanceExpensesRecordFormValues,
          ])
        }
      >
        Add
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion type="single" collapsible>
          {formValues.map((_, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="p-2">
              <div className="grid grid-cols-[3fr_1fr] items-center">
                <AccordionTrigger>
                  <span>{`${index + 1})`}</span>
                  <span>
                    {watch(`${index}.name`) || "New Item" + (index + 1)}
                  </span>
                </AccordionTrigger>
                <button
                  onClick={() => {
                    setFormValues((prev) => {
                      const newValues = [...prev];
                      newValues.splice(index, 1);
                      return newValues;
                    });
                  }}
                >
                  delete
                </button>
              </div>
              <AccordionContent>
                <div className="isolate -space-y-px rounded-md shadow-sm grid grid-cols-1 gap-2">
                  <Controller
                    name={`${index}.date`}
                    control={control}
                    defaultValue={new Date().toISOString().split("T")[0]}
                    render={({ field }) => (
                      <div>
                        <label
                          htmlFor={`${index}.date`}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Date
                        </label>
                        <div className="mt-0">
                          <input
                            type="date"
                            id={`${index}.date`}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...field}
                          />
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    name={`${index}.name`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <label
                          htmlFor={`${index}.name`}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Name
                        </label>
                        <div className="mt-0">
                          <input
                            id={`${index}.name`}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...field}
                          />
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name={`${index}.categoryID`}
                    defaultValue={0}
                    render={({ field }) => (
                      <div>
                        <label
                          htmlFor={`${index}.categoryID`}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Category
                        </label>
                        <select
                          id={`${index}.categoryID`}
                          className="mt-0 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name={`${index}.amount`}
                    defaultValue={0}
                    render={({ field }) => (
                      <div>
                        <label
                          htmlFor={`${index}.amount`}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Amount
                        </label>
                        <div className="relative mt-0 rounded-md shadow-sm">
                          <Controller
                            control={control}
                            name={`${index}.currency`}
                            render={({ field }) => (
                              <div className="absolute inset-y-0 left-0 flex items-center">
                                <label
                                  htmlFor={`${index}.currency`}
                                  className="sr-only"
                                >
                                  Currency
                                </label>
                                <select
                                  id={`${index}.currency`}
                                  autoComplete="currency"
                                  className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                  {...field}
                                >
                                  {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                      {currency}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          />
                          <input
                            type="number"
                            id={`${index}.amount`}
                            className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...field}
                            onChange={(e) => {
                              field.onChange(parseInt(e.target.value));
                            }}
                          />
                        </div>
                      </div>
                    )}
                  />

                  <div className="grid grid-cols-2">
                    <Controller
                      control={control}
                      name={`${index}.isFixedExpenses`}
                      defaultValue={true}
                      render={({ field }) => (
                        <div className="relative flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id={`${index}.isFixedExpenses`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              checked={field.value}
                              // {...field}
                              onChange={(e) => {
                                field.onChange(e.target.checked);
                              }}
                            />
                          </div>
                          <label
                            htmlFor={`${index}.isFixedExpenses`}
                            className="font-medium text-gray-900 ml-3 text-sm leading-6"
                          >
                            isFixedExpenses?
                          </label>
                        </div>
                      )}
                    />

                    <Controller
                      control={control}
                      name={`${index}.isPaid`}
                      defaultValue={false}
                      render={({ field }) => (
                        <div className="relative flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id={`${index}.isPaid`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              checked={field.value}
                              // {...field}
                              onChange={(e) => {
                                field.onChange(e.target.checked);
                              }}
                            />
                          </div>
                          <label
                            htmlFor={`${index}.isPaid`}
                            className="font-medium text-gray-900 ml-3 text-sm leading-6"
                          >
                            isPaid?
                          </label>
                        </div>
                      )}
                    />
                  </div>

                  <Controller
                    name={`${index}.remarks`}
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label
                          htmlFor={`${index}.remarks`}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Remarks
                        </label>
                        <div className="mt-0">
                          <input
                            id={`${index}.remarks`}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...field}
                          />
                        </div>
                      </div>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
