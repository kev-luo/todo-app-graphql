import { gql } from "@apollo/client";

export const GET_TODOS_QUERY = gql`
  {
    getTodos {
      id
      title
      is_completed
      createdAt
    }
  }
`;

export const CREATE_TODO_MUTATION = gql`
  mutation createTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      is_completed
    }
  }
`;

export const UPDATE_TODO_MUTATION = gql`
  mutation updateTodo($todoId: ID!, $is_completed: Boolean) {
    updateTodo(todoId: $todoId, is_completed: $is_completed) {
      id
      title
      is_completed
    }
  }
`;

export const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId)
  }
`
