import React, { useState } from "react";
import "./App.css";
import InputField from "./Component/InputField";
import { Todo } from "./model";
import TodoList from "./Component/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    let updatedTodos = [...todos];
    let updatedCompletedTodos = [...completedTodos];

    const draggedTodo =
      source.droppableId === "activeTodos"
        ? updatedTodos[source.index]
        : updatedCompletedTodos[source.index];

    if (source.droppableId === "activeTodos") {
      updatedTodos.splice(source.index, 1);
    } else {
      updatedCompletedTodos.splice(source.index, 1);
    }

    if (destination.droppableId === "activeTodos") {
      updatedTodos.splice(destination.index, 0, draggedTodo);
    } else {
      updatedCompletedTodos.splice(destination.index, 0, draggedTodo);
    }

    setTodos(updatedTodos);
    setCompletedTodos(updatedCompletedTodos);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
