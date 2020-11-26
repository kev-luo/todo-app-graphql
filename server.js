const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const PORT = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect("mongodb://localhost/todo_app", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
    server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server running on port ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
