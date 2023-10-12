import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";

import { cn } from "./lib/utils";

type FormValues = {
  id?: number;
  date: string;
  name: string;
  category: string;
  categoryID: number;
  currency: string;
  amount: number;
  isFixedExpenses: boolean;
  isPaid: boolean;
  remarks?: string;
  updatedAt?: string;
  createdAt?: string;
};

export default function MultiForm() {
  const emptyFormValues: FormValues = {
    // today date to yyyy-mm-dd
    date: new Date().toISOString().slice(0, 10),
    name: "",
    category: "",
    categoryID: 0,
    currency: "MYR",
    amount: 0,
    isFixedExpenses: false,
    isPaid: false,
    remarks: "",
  };
  const [arrFormValues, setArrFormValues] = React.useState<FormValues[]>([]);
  const form = useForm<FormValues[]>({
    defaultValues: arrFormValues,
  });
  const onSubmit: SubmitHandler<FormValues[]> = (data) => console.log(data);
  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          setArrFormValues((prev) => [...prev, emptyFormValues]);
        }}
      >
        Add Row
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {arrFormValues.map((v, index) => (
            <div key={index} className="grid grid-cols-2 gap-1 mb-2">
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name={`${index}.date` as const}
                  defaultValue={v.date}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name={`${index}.name` as const}
                  defaultValue={v.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name={`${index}.category` as const}
                  defaultValue={v.category}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name={`${index}.currency` as const}
                  defaultValue={v.currency}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name={`${index}.amount` as const}
                  defaultValue={v.amount}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseFloat(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name={`${index}.remarks` as const}
                  defaultValue={v.remarks}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is Fixed</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name={`${index}.remarks` as const}
                  defaultValue={v.remarks}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remarks</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
