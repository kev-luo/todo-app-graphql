module.exports = `
  type Todo {
    id: ID!
    title: String!
    user: User!
    is_completed: Boolean
    is_public: Boolean
  }
  type User {
    id: ID!
    name: String!
  }
  type Query {
    getTodos: [Todo!]
  }
  type Mutation {
    createTodo(title: String!, user: ID, is_completed: Boolean, is_public: Boolean): Todo!
  }
`
