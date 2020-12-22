import {v4 as UUID_V4} from 'uuid';

const Types = {
  SAVE_TODO: '@todo/save',
  DELETE_TODO: '@todo/delete',
  TOGGLE_TODO: '@todo/toggle-status',
};

const Actions = {
  save: (todo) => ({type: Types.SAVE_TODO, payload: todo}),
  delete: (todoID) => ({type: Types.DELETE_TODO, payload: todoID}),
  toggleStatus: (todoID) => ({type: Types.TOGGLE_TODO, payload: todoID}),
};

const INITIAL_STATE = [];

export default function todosReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SAVE_TODO: {
      const {payload: newTodo} = action;

      if (typeof newTodo !== 'object') {
        return state;
      }

      if (!newTodo.hasOwnProperty('id')) {
        return [{...newTodo, id: UUID_V4()}, ...state];
      }

      const indexOfTodo = state.findIndex(({id}) => id === newTodo.id);

      if (indexOfTodo === -1) {
        return [{...newTodo, id: UUID_V4()}, ...state];
      }

      const currentToDo = state[indexOfTodo];

      return [
        ...state.slice(0, indexOfTodo),
        {...currentToDo, ...newTodo},
        ...state.slice(indexOfTodo + 1),
      ];
    }

    case Types.DELETE_TODO: {
      const {payload: todoID} = action;

      const indexOfTodo = state.findIndex(({id}) => id === todoID);

      if (indexOfTodo === -1) {
        return state;
      }

      return [...state.slice(0, indexOfTodo), ...state.slice(indexOfTodo + 1)];
    }

    case Types.TOGGLE_TODO: {
      const {payload: todoID} = action;

      const indexOfTodo = state.findIndex(({id}) => id === todoID);

      if (indexOfTodo === -1) {
        return state;
      }

      const toggledTodo = state[indexOfTodo];

      return [
        ...state.slice(0, indexOfTodo),
        {...toggledTodo, done: !toggledTodo.done},
        ...state.slice(indexOfTodo + 1),
      ];
    }

    default:
      return state;
  }
}

todosReducer.actions = Actions;
todosReducer.initialState = INITIAL_STATE;
