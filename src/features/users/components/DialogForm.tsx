"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog";
import type { listItemsType } from "../types/user";
import { toast } from "sonner";

type FormData = {
  title: string;
  subTitle: string;
};

type DialogFormProps = {
  setItems: Dispatch<SetStateAction<listItemsType[]>>;
  EditItem?: listItemsType | null;
  onClose?: () => void;
};

export function DialogForm({ setItems, EditItem, onClose }: DialogFormProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      subTitle: "",
    },
  });
  const { reset } = form;

  useEffect(() => {
    if (EditItem) {
      reset({ title: EditItem.title, subTitle: EditItem.subTitle });
      setOpen(true);
    }
  }, [EditItem, reset]);

  const onSubmit = (data: FormData) => {
    if (EditItem) {
      setItems((prev) =>
        prev.map((it) => (it.id === EditItem.id ? { ...it, ...data } : it))
      );
      toast.success("item updated successfully");
      setOpen(false);
      onClose?.();
      return;
    }

    const newItem: listItemsType = {
      id: Date.now(),
      dateCreated: new Date().toISOString(),
      ...data,
    };

    setItems((prev) => [...prev, newItem]);
    toast.success("item created successfully");
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) onClose?.();
        if (val && !EditItem) {
          reset({ title: "", subTitle: "" });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Create Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{EditItem ? "Edit Item" : "Create Item"}</DialogTitle>
          <DialogDescription>
            {EditItem
              ? "Update the fields below and save to update the item."
              : "Fill in the details below to create a new item."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            id="item-form"
          >
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters.",
                },
              }}
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
              rules={{
                required: "Subtitle is required",
                minLength: {
                  value: 2,
                  message: "Subtitle must be at least 2 characters.",
                },
              }}
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
                  <FormDescription>
                    Additional details for the list item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="gap-2 sm:gap-0 space-x-1.5">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button form="item-form" type="submit">
            {EditItem ? "Update" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
