"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  WheelPicker,
  WheelPickerOption,
  WheelPickerWrapper,
} from "@/registry/wheel-picker";

const formSchema = z.object({
  framework: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const options: WheelPickerOption[] = [
  {
    label: "Next.js",
    value: "nextjs",
  },
  {
    label: "Vite",
    value: "vite",
  },
  {
    label: "laravel",
    value: "Laravel",
  },
  {
    label: "React Router",
    value: "react-router",
  },
  {
    label: "Astro",
    value: "astro",
  },
  {
    label: "TanStack Start",
    value: "tanstack-start",
  },
  {
    label: "TanStack Router",
    value: "tanstack-router",
  },
  {
    label: "Gatsby",
    value: "gatsby",
  },
];

export default function WheelPickerFormDemo() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      framework: "react-router",
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-80 rounded-lg bg-zinc-900 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-56 max-w-full space-y-4 font-sans"
      >
        <FormField
          control={form.control}
          name="framework"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Framework</FormLabel>
              <FormControl>
                <WheelPickerWrapper className="w-full max-w-none">
                  <WheelPicker
                    options={options}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </WheelPickerWrapper>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
