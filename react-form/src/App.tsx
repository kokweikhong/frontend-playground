import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";

import Echart from "./components/echart";
import EchartManual from "./components/echartManual";

type FormValues = {
  id?: number;
  date: string;
  name: string;
  category: string;
  categoryID: number;
  isFixedExpenses: boolean;
  isPaid: boolean;
  remarks?: string;
  updatedAt?: string;
  createdAt?: string;
};

function App() {
  const emptyFormValues: FormValues = {
    // today date to yyyy-mm-dd
    date: new Date().toISOString().slice(0, 10),
    name: "",
    category: "",
    categoryID: 0,
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
    <main className="w-full">
      <EchartManual />
      <Echart />
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
            <div key={index} className="flex space-x-2 mb-2">
              <div>
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
    </main>
  );
}

export default App;
