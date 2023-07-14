"use client";

import TodoModal from "./todoModal";
import { Todo } from "@/models/todo.model";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { category, title, status } = todo;

  return (
    <>
      <TodoModal todo={todo}>
        <li className="flex min-h-[24px] w-full cursor-pointer items-center border-t border-primary py-2 text-sm">
          <p className="min-w-[96px] pl-2">{category}</p>
          <p className="min-w-[96px] grow">{title}</p>
          <p>{status}</p>
        </li>
      </TodoModal>
    </>
  );
}
