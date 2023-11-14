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
import { getBoardById, updateBoard } from "@/helpers/board";
import useKanbanStore from "@/store/KanbanStore";

export default function UpdateBoardForm({ onToggle }) {
  const queryClient = useQueryClient();
  const { currentBoard } = useKanbanStore();

  const { mutateAsync: updateBoardMutation } = useMutation({
    mutationFn: updateBoard,
    onSuccess: async () => {
      queryClient.invalidateQueries(["boards"]);

      const updatedBoard = await getBoardById(currentBoard?._id);

      useKanbanStore.setState((state) => ({
        ...state,
        currentBoard: updatedBoard,
      }));
    },
  });

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: currentBoard?.name || "",
      description: currentBoard?.description || "",
    },
  });

  async function onSubmit(values) {
    try {
      await updateBoardMutation({ ...values, id: currentBoard?._id });
      onToggle();
    } catch (err) {
      console.error("Error updating boards: ", err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 top-[90%] right-[5%] w-[20rem] border-2 border-border py-8 px-6 rounded-lg z-[99] flex flex-col bg-primary/10 fixed"
      >
        <h1 className="uppercase font-bold text-2xl text-center">
          Update Board
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

        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
