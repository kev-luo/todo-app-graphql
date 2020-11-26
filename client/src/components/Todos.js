import React from "react";
import { makeStyles } from "@material-ui/core";

export default function Todos({ todos }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {todos?.map((todo) => {
        return (
          <div key={todo.id}>
            <div>{todo.title}</div>
          </div>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));
