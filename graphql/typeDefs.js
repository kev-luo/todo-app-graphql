module.exports = `
  type Todo {
    id: ID!
    title: String!
    is_completed: Boolean!
  }
  type Query {
    getTodos: [Todo!]
  }
  type Mutation {
    createTodo(title: String!): Todo!
    updateTodo(todoId: ID!, is_completed: Boolean): Todo!
  }
`
