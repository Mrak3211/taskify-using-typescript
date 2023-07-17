import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./css/styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ index, todo, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = () => {
    setTodos((todos) =>
      todos.map((item) =>
        item.id === todo.id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const handleDelete = () => {
    setTodos((todos) => todos.filter((item) => item.id !== todo.id));
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos((todos) =>
      todos.map((item) =>
        item.id === todo.id ? { ...item, todo: editTodo } : item
      )
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <form onSubmit={handleEdit}>
              <input
                ref={inputRef}
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className="todos__single--text"
              />
            </form>
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(true);
              }
            }}
          >
            <AiFillEdit />
          </div>
          <div className="icon" onClick={handleDelete}>
            <AiFillDelete />
          </div>
          <div className="icon" onClick={handleDone}>
            <MdDone />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
