import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_TODO_MUTATION, GET_TODOS_QUERY } from "../utils/graphql";

export default function TodoInput() {
  const initialState = { title: "" };
  const [todo, setTodo] = useState(initialState);

  const [addTodo] = useMutation(CREATE_TODO_MUTATION, {
    // update: updateCache,
    onCompleted: clearInput,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setTodo({
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    addTodo({ variables: todo });
  };

  function updateCache(cache, { data }) {
    const cachedTodos = cache.readQuery({
      query: GET_TODOS_QUERY,
    });

    cache.writeQuery({
      query: GET_TODOS_QUERY,
      data: {
        ...cachedTodos, // what does this do?
        getTodos: [...cachedTodos.getTodos, data.createTodo],
      },
    });
  }

  function clearInput() {
    setTodo(initialState);
  }

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
