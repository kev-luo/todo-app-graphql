import React from "react";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";

import {
  UPDATE_TODO_MUTATION,
  DELETE_TODO_MUTATION,
  GET_TODOS_QUERY,
} from "../utils/graphql";

export default function Todos({ todo }) {
  const classes = useStyles();
  const [toggleCompleted] = useMutation(UPDATE_TODO_MUTATION);
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION);

  function toggleTodo() {
    toggleCompleted({
      variables: {
        todoId: todo.id,
        is_completed: !todo.is_completed,
      },
    });
  }

  function handleDelete() {
    deleteTodo({
      variables: { todoId: todo.id },
      optimisticResponse: true,
      update: (cache) => {
        const cachedTodos = cache.readQuery({
          query: GET_TODOS_QUERY,
        });
        const updatedTodos = cachedTodos.getTodos.filter((t) => {
          return t.id !== todo.id;
        });
        cache.writeQuery({
          query: GET_TODOS_QUERY,
          data: {
            getTodos: updatedTodos,
          },
        });
      },
    });
  }

  return (
    <div className={classes.root}>
      <div className={todo.is_completed ? classes.completed : ""}>
        {todo.title}
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
        <input
          type="checkbox"
          checked={todo.is_completed}
          onChange={toggleTodo}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  completed: {
    textDecoration: "line-through",
  },
}));
