const Todo = require("../models/Todo");

const NEW_TODO = "NEW_TODO";
const UPDATED_TODO = "UPDATED_TODO";

module.exports = {
  Query: {
    getTodos: async () => {
      const todos = await Todo.find({});
      return todos;
    },
  },
  Mutation: {
    createTodo: async (_, args, context) => {
      const newTodo = await Todo.create(args);
      context.pubsub.publish(NEW_TODO, { todoAdded: newTodo });
      return newTodo;
    },
    updateTodo: async (_, args, context) => {
      const updateTodo = await Todo.findOneAndUpdate(
        { _id: args.todoId },
        { is_completed: args.is_completed },
        { new: true }
      );
      context.pubsub.publish(UPDATED_TODO, { todoUpdated: updateTodo })
      return updateTodo;
    },
    deleteTodo: async (_, args) => {
      const deleteTodo = await Todo.deleteOne({ _id: args.todoId });
      return deleteTodo.deletedCount;
    },
  },
  Subscription: {
    todoAdded: {
      subscribe: (_, __, context) => {
        return context.pubsub.asyncIterator(NEW_TODO);
      },
    },
    todoUpdated: {
      subscribe: (_, __, context) => {
        return context.pubsub.asyncIterator(UPDATED_TODO);
      }
    }
  },
};
