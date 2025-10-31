"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRef } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import type { listItemsType } from "../types/user";
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  subTitle: z
    .string()
    .min(2, { message: "Subtitle must be at least 2 characters." }),
});

type FormData = z.infer<typeof formSchema>;

type ItemFormProps = {
  onSubmit?: (data: FormData) => void;
};

export function ItemForm({ onSubmit }: ItemFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subTitle: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    const item: listItemsType = {
      id: Date.now(), 
      dateCreated: new Date().toISOString(),
      ...data,
    };
    console.log("New item created:", item);
    onSubmit?.(data); 
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
        id="item-form" 
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter item title (e.g., Alice Johnson)"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The main title for the list item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter subtitle (e.g., Admin - alice@example.com)"
                  className="min-h-20 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Additional details.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export function DialogForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSave = () => {
    formRef.current?.requestSubmit(); 
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Item</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new user.
          </DialogDescription>
        </DialogHeader>

        <ItemForm
          onSubmit={() => {
            const closeBtn = document.querySelector(
              "[data-dialog-close]"
            ) as HTMLButtonElement;
            closeBtn?.click();
          }}
        />

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
