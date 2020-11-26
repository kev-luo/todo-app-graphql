import React from "react";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { UPDATE_TODO_MUTATION } from "../utils/graphql";

export default function Todos({ todo }) {
  const classes = useStyles();
  const [toggleCompleted] = useMutation(UPDATE_TODO_MUTATION);

  const toggleTodo = () => {
    toggleCompleted({
      variables: {
        todoId: todo.id,
        is_completed: !todo.is_completed,
      },
    });
  };

  return (
    <div className={classes.root}>
      <div className={todo.is_completed ? classes.completed : ""}>
        {todo.title}
      </div>
      <input onClick={toggleTodo} type="checkbox" checked={todo.is_completed} />
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
