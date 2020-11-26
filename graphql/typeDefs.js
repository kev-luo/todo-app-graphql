module.exports = `
  type Todo {
    id: ID!
    title: String!
    is_completed: Boolean
    is_public: Boolean
    user: User!
  }
  type User {
    id: ID!
    name: String!
  }
  type Query {
    getTodos: [Todo!]
  }
  type Mutation {
    createTodo(title: String!, is_completed: Boolean, is_public: Boolean, userId: ID): Todo!
  }
`
