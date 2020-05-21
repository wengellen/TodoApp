import React, { useState, useEffect } from "react";
import "./styles.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faSkull
} from "@fortawesome/free-solid-svg-icons";

const TodoContainer = styled.div`
  padding: 0.5rem;
  background-color: #ddd;
  display: flex;
  justify-content: space-between;
  vertical-align: center;
  margin-bottom: 1rem;

  h1 {
    font-size: 1rem;
  }

  input[type="checkbox"] {
    width: 30px;
    height: 30px;
  }

  input[type="checkbox"]:checked + h1 {
    color: green;
  }
`;

const data = [
  { id: 1, content: "Buy Milk", status: "unfinished" },
  { id: 2, content: "Buy Coffee", status: "unfinished" },
  { id: 3, content: "Buy Milk", status: "unfinished" }
];

const Todo = ({
  content,
  onUpdateContent,
  onFinishTodo,
  onDeleteTodo,
  status
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <TodoContainer>
      {content && !isEditing ? (
        <h1 onClick={() => setIsEditing(true)}>{content}</h1>
      ) : (
        <input
          type="text"
          name="content"
          onBlur={e => {
            onUpdateContent(e);
            setIsEditing(false);
          }}
        />
      )}
      <input
        type="checkbox"
        checked={status !== "unfinished"}
        onChange={() => onFinishTodo()}
      />
      <FontAwesomeIcon icon={faMinusCircle} onClick={onDeleteTodo} />
    </TodoContainer>
  );
};

export default function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    setTodos(data);
  }, []);

  function handleUpdateContent(e, item) {
    const newTodos = todos.map(el => {
      if (el === item) {
        el = { ...el, [e.currentTarget.name]: e.currentTarget.value };
      }

      return el;
    });

    console.log("newTodos", newTodos);
    setTodos(newTodos);
  }

  function handleDelete(item) {
    const newTodos = todos.filter(el => el !== item);
    setTodos(newTodos);
  }

  function handleAddTodo() {
    const newTodos = { id: todos.length, content: "", status: "unfinished" };

    setTodos([...todos, newTodos]);
  }

  function handleFinsh(item) {
    const newTodos = todos.map(el => {
      if (el === item) {
        el.status = "finished";
      }
      return el;
    });
    setTodos(newTodos);
    console.log(todos);
  }

  return (
    <div className="App">
      <FontAwesomeIcon icon={faPlusCircle} onClick={handleAddTodo} />

      {todos
        .filter(el => el.status !== "finished")
        .map(el => {
          return (
            <Todo
              key={el.id}
              {...el}
              onFinishTodo={() => handleFinsh(el)}
              onDeleteTodo={() => handleDelete(el)}
              onUpdateContent={e => handleUpdateContent(e, el)}
            />
          );
        })}
    </div>
  );
}
