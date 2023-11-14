import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
import { Textarea } from "../ui/textarea";
import boardSchema from "@/schemas/boardSchema";
import { postBoards } from "@/helpers/board";

export default function AddBoardForm({ onToggle }) {
  const queryClient = useQueryClient();

  const { mutateAsync: addBoardMutation } = useMutation({
    mutationFn: postBoards,
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
    },
  });

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof boardSchema>) {
    try {
      await addBoardMutation(values);
      onToggle();
    } catch (err) {
      console.error("Error posting boards: ", err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 top-[30%] left-[11%] w-[20rem] border-2 border-border py-8 px-6 rounded-lg z-[99] flex flex-col bg-primary/10 fixed"
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
