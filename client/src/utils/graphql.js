import { gql } from '@apollo/client';

export const GET_TODOS_QUERY = gql`
  {
    getTodos {
      id
      title
      is_completed
      createdAt
    }
  }
`

export const CREATE_TODO_MUTATION = gql`
  mutation createTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      is_completed
    }
  }
`