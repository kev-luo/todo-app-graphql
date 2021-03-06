module.exports = `
  type Todo {
    id: ID!
    title: String!
    is_completed: Boolean!
    createdAt: String
  }
  type Query {
    getTodos: [Todo!]
  }
  type Mutation {
    createTodo(title: String!): Todo!
    updateTodo(todoId: ID!, is_completed: Boolean): Todo!
    deleteTodo(todoId: ID!): String!
  }
  type Subscription {
    todoAdded: Todo!
    todoUpdated: Todo!
  }
`
