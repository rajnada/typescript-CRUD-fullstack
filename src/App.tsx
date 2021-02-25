import React, { useEffect, useState } from "react";
import TodoItem from "./Components/TodoItem";
import AddTodo from "./Components/AddTodo";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./API";
import TodoItemCompeleted from "./Components/TodoItemCompeleted";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <main className="App">
        <h1>My Todo List </h1>
        <AddTodo saveTodo={handleSaveTodo} />
        <h3>In Progress</h3>
        {todos.map(
          (todo: ITodo) =>
            !todo.status && (
              <TodoItem
                key={todo._id}
                updateTodo={handleUpdateTodo}
                deleteTodo={handleDeleteTodo}
                todo={todo}
              />
            )
        )}
      </main>
      <main className="App">
        <h3>Completed Todos</h3>
        {todos.map(
          (todo: ITodo) =>
            todo.status && (
              <TodoItemCompeleted
                key={todo._id}
                updateTodo={handleUpdateTodo}
                deleteTodo={handleDeleteTodo}
                todo={todo}
              />
            )
        )}
      </main>
    </>
  );
};

export default App;
