import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_TODOS_QUERY, NEW_TODO_SUBSCRIPTION, UPDATE_TODO_SUBSCRIPTION } from "../utils/graphql";
import TodoInput from "./TodoInput";
import Todos from "./Todos";

export default function TodoContainer() {
  const { subscribeToMore, loading, error, data } = useQuery(GET_TODOS_QUERY);

  useEffect(() => {
    const unsubscribe = newTodoSubscription();
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    const unsubscribe = updateTodoSubscription();
    return () => unsubscribe();
  }, [])

  function newTodoSubscription() {
    return subscribeToMore({
      document: NEW_TODO_SUBSCRIPTION,
      updateQuery: (prevTodos, { subscriptionData }) => {
        if(!subscriptionData) return prevTodos;
        const newTodo = subscriptionData.data.todoAdded;
        console.log({
          ...prevTodos,
          getTodos: [...prevTodos.getTodos, newTodo]
        })
        return {
          ...prevTodos,
          getTodos: [...prevTodos.getTodos, newTodo]
        }
      }
    })
  }

  function updateTodoSubscription() {
    return subscribeToMore({
      document: UPDATE_TODO_SUBSCRIPTION,
      updateQuery: (prevTodos, { subscriptionData }) => {
        if(!subscriptionData) return prevTodos;
        const updatedTodo = subscriptionData.data.todoUpdated;
        const updatedList = prevTodos.getTodos.map(t => {
          if(t.id === updatedTodo.id) {
            return {
              ...t,
              is_completed: updatedTodo.is_completed
            }
          } else {
            return t
          }
        })
        return {
          ...prevTodos,
          getTodos: [...updatedList]
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
