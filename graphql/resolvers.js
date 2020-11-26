const Todo = require("../models/Todo");

module.exports = {
  Query: {
    getTodos: async () => {
      const todos = await Todo.find({});
      return todos;
    },
  },
  Mutation: {
    createTodo: async (_, args) => {
      const newTodo = await Todo.create(args);
      return newTodo;
    },
    updateTodo: async (_, args) => {
      const updateTodo = await Todo.findOneAndUpdate(
        { _id: args.todoId },
        { is_completed: args.is_completed },
        { new: true }
      );
      return updateTodo;
    },
    deleteTodo: async (_, args) => {
      const deleteTodo = await Todo.deleteOne({ _id: args.todoId });
      return deleteTodo.deletedCount;
    }
  },
};
