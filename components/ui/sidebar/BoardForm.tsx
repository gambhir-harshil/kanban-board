import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../textarea";
import boardSchema from "@/schemas/boardSchema";
import useApi from "@/hooks/useApi";
import requests from "@/consts/requests";
import useKanbanStore from "@/store/KanbanStore";

export function BoardForm({ onToggle }) {
  const { postData } = useApi(requests.addBoards);

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof boardSchema>) {
    postData(values);
    onToggle();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 top-[30%] left-[15%] w-[20rem] border-2 border-border py-8 px-6 rounded-lg z-[99] flex flex-col bg-primary/10 fixed"
      >
        <h1 className="uppercase font-bold text-2xl text-center">
          Create Board
        </h1>

        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Board title*</FormLabel>
              <FormControl>
                <Input placeholder="Board" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Awesome Board!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
