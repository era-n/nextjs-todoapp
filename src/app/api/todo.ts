import {
  query,
  orderBy,
  startAt,
  endAt,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import { Todo } from "@/models/todo.model";

export const addTodo = async (uid: string | undefined, todo: Todo) => {
  if (!todo.content || !todo.category || !todo.title)
    throw new Error("invalid_data");
  try {
    return addDoc(collection(db, "users/" + uid + "/todos"), todo);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateTodo = async (uid: string | undefined, todo: Todo) => {
  const { id, title, content, category, status } = todo;

  const docRef = doc(db, "users/" + uid + "/todos", id);

  updateDoc(docRef, {
    title,
    content,
    category,
    status,
  });
};

export const deleteTodo = async (uid: string | undefined, todoID: string) => {
  const docRef = doc(db, "users/" + uid + "/todos", todoID);

  deleteDoc(docRef);
};

export const getTodos = (
  uid: string | undefined,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  searchQuery: string = ""
) => {
  const docsQuery = query(
    collection(db, "users/" + uid + "/todos"),
    orderBy("created_at", "desc")
  );

  const docsWithSearchQuery = query(
    collection(db, "users/" + uid + "/todos"),
    orderBy("title"),
    startAt(searchQuery.toLowerCase()),
    endAt(searchQuery.toLowerCase() + "\uf8ff")
  );

  onSnapshot(searchQuery ? docsWithSearchQuery : docsQuery, (querySnapshot) => {
    const todos: Todo[] = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const newTodo = doc.data() as Todo;
        newTodo.id = doc.id;
        todos.push(newTodo);
      });
      setTodos(todos);
    } else {
      querySnapshot.docChanges().forEach((doc) => {
        if (doc.type === "removed")
          querySnapshot.forEach((doc) => {
            const newTodo = doc.data() as Todo;
            newTodo.id = doc.id;
            todos.push(newTodo);
          });
        setTodos(todos);
      });
    }
  });
};
