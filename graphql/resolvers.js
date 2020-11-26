const User = require("../models/User");
const Todo = require("../models/Todo");

module.exports = {
  Query: {
    getTodos: async () => {
      const todos = await Todo.find({}).populate("user");
      return todos;
    },
  },
  Mutation: {
    createTodo: async (_, args) => {
      const newTodo = await Todo.create(args);
      await User.findOneAndUpdate(
        { _id: args.user },
        { $push: { todos: newTodo.id } }
      );
      return newTodo;
    },
  },
};
