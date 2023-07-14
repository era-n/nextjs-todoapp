"use client";

import { useEffect, useState } from "react";
import { getTodos } from "@/app/api/todo";
import TodoItem from "./todoItem";
import useAuth from "@/hooks/useAuth";
import { Todo } from "@/models/todo.model";
import useDebounce from "@/hooks/useDebounce";
import AddTodoModal from "./addTodoModal";

export default function TodoList() {
  const { user, isLoggedIn } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>();

  useDebounce(
    () => {
      getTodos(user?.uid, setTodos, searchQuery);
    },
    [searchQuery],
    800
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (isLoggedIn) {
      getTodos(user?.uid, setTodos);
    }
  }, [isLoggedIn, user]);

  return (
    <div className="w-full min-w-[196px]">
      <div className="flex w-full items-center justify-between py-4">
        <input
          type="text"
          placeholder="Search tasks"
          className="rounded border p-1 px-2 text-sm focus-visible:border-primary focus-visible:outline-none"
          value={searchQuery ?? ""}
          onChange={handleSearch}
        />
        <AddTodoModal />
      </div>
      <ul className="w-full overflow-auto rounded border border-solid border-primary px-4">
        <div className="flex items-center border-primary py-3 text-sm">
          <div className="min-w-[96px]">
            <span>Category</span>
          </div>
          <div className="min-w-[96px] grow">
            <span>Title</span>
          </div>
          <div>
            <span>Status</span>
          </div>
        </div>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </div>
  );
}
