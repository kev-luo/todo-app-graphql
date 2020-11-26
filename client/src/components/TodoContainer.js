import React from 'react'
import { useQuery } from '@apollo/client';

import { GET_TODOS_QUERY } from '../utils/graphql';
import TodoInput from './TodoInput';
import Todos from './Todos';

export default function TodoContainer() {
  const { data } = useQuery(GET_TODOS_QUERY);

  return (
    <div>
      <TodoInput />
      <Todos todos={data?.getTodos}/>
    </div>
  )
}
