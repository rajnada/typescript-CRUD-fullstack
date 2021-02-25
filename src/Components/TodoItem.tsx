import React from "react";
import moment from "moment";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  return (
    <>
      <div className="Card">
        <div className="Card--text">
          <h1 className={checkTodo}>{todo.name}</h1>
          <span className={checkTodo}>{todo.description}</span>
        </div>
        <div className="Card--button">
          <button
            onClick={() => updateTodo(todo)}
            className={todo.status ? `hide-button` : "Card--button__done"}
          >
            Complete
          </button>
          <button
            onClick={() => deleteTodo(todo._id)}
            className="Card--button__delete"
          >
            Delete
          </button>
        </div>
        <span className="time">
          {todo.completedAt
            ? `Completed ${moment(todo.completedAt).fromNow()}`
            : `Created ${moment(todo.createdAt).fromNow()}`}
        </span>
      </div>
    </>
  );
};

export default Todo;
