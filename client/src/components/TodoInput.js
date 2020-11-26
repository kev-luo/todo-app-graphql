import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_TODO_MUTATION } from "../utils/graphql";

export default function TodoInput() {
  const [todo, setTodo] = useState({ title: "" });

  const [addTodo] = useMutation(CREATE_TODO_MUTATION);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ variables: todo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={todo.title}
        onChange={handleChange}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
