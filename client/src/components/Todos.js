import React from "react";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { UPDATE_TODO_MUTATION } from "../utils/graphql";

export default function Todos({ todo }) {
  const classes = useStyles();
  const [toggleCompleted] = useMutation(UPDATE_TODO_MUTATION);

  return (
    <div className={classes.root}>
      <div>{todo.title}</div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));
