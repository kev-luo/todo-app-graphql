import React from "react";
import { useQuery } from "@apollo/client";

import { GET_TODOS_QUERY } from "../utils/graphql";
import TodoInput from "./TodoInput";
import Todos from "./Todos";

export default function TodoContainer() {
  const { loading, error, data } = useQuery(GET_TODOS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error!</div>;
  }

  const todosList = data?.getTodos.map((todo) => {
    return <Todos key={todo.id} todo={todo} />;
  });

  return (
    <div>
      <TodoInput />
      {todosList}
    </div>
  );
}
