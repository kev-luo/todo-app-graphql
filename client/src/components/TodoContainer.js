import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_TODOS_QUERY, NEW_TODO_SUBSCRIPTION } from "../utils/graphql";
import TodoInput from "./TodoInput";
import Todos from "./Todos";

export default function TodoContainer() {
  const { subscribeToMore, loading, error, data } = useQuery(GET_TODOS_QUERY);

  useEffect(() => {
    const unsubscribe = newTodoSubscription();
    return () => unsubscribe();
  }, [])

  function newTodoSubscription() {
    return subscribeToMore({
      document: NEW_TODO_SUBSCRIPTION,
      updateQuery: (prevTodos, { subscriptionData }) => {
        if(!subscriptionData) return prevTodos;
        const newTodo = subscriptionData.data.todoAdded;
        console.log(Object.assign({}, prevTodos, {getTodos: [...prevTodos.getTodos, newTodo]}))
        return {
          getTodos: [...prevTodos.getTodos, newTodo]
        }
      }
    })
  }

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
