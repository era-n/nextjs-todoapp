import { useFormik } from "formik";
import * as Dialog from "@radix-ui/react-dialog";
import { MdClose } from "react-icons/md";
import { deleteTodo, updateTodo } from "@/app/api/todo";
import { Todo } from "@/models/todo.model";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { getTime } from "@/utils/dateUtils";

export default function TodoModal({
  todo,
  children,
}: {
  todo: Todo;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const { id, title, content, category, status, created_at } = todo;

  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      title: title,
      content: content,
      category: category,
      status: status,
    },
    onSubmit: async (values, { setErrors }) => {
      const todo: Todo = {
        id,
        title: values.title.trim().toLowerCase(),
        content: values.content.trim().toLowerCase(),
        category: values.category.trim().toLowerCase(),
        status: values.status.trim(),
        updated_at: Date.now(),
      };
      await updateTodo(user?.uid, todo)
        .then(() => {
          setOpen(false);
          formik.setSubmitting(false);
        })
        .catch((err) => console.log(err));
    },
  });

  const handleDeleteTodo = async () => {
    deleteTodo(user?.uid, id).then(() => setOpen(false));
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#0000005b]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-full flex-col items-center rounded-md bg-white p-4 pb-0 pt-4 shadow">
            <div className="flex h-full w-full justify-between pb-3">
              <p className="text-xl sm:text-2xl">
                Edit a task
                {" / "}
                <span className="text-base">{getTime(created_at)}</span>
              </p>

              <button onClick={() => setOpen(false)} type="button">
                <MdClose size={24} />
              </button>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    className="w-full rounded border p-1 px-2 text-xs focus-visible:border-primary focus-visible:outline-none sm:text-sm"
                  />
                  <select
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    className="w-full rounded border bg-inherit bg-white p-1 px-2 font-sans text-xs focus-visible:border-primary focus-visible:outline-none sm:text-sm"
                  >
                    <option value="In progress">In progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <input
                  name="category"
                  type="text"
                  placeholder="Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  className="rounded border p-1 px-2 text-xs focus-visible:border-primary focus-visible:outline-none sm:text-sm"
                />
                <textarea
                  name="content"
                  placeholder="Add a description"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  className="min-h-[64px] w-full resize-none rounded border p-1 px-2 text-xs focus-visible:border-primary focus-visible:outline-none sm:min-h-[96px] sm:text-sm"
                />
                {formik.errors.content && <div>{formik.errors.content}</div>}

                <div className="my-4 flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleDeleteTodo}
                    className="outline-secondary flex justify-center rounded p-1 px-2 text-center text-sm text-[#d46b6b] outline outline-1 outline-[#d46b6b]"
                  >
                    Delete todo
                  </button>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="outline-secondary flex justify-center rounded p-1 px-3 text-center text-sm outline outline-1"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
