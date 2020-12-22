import {useReducerActions} from 'core/hooks';
import React, {useReducer} from 'react';
import {ToDosContext} from 'to-do/contexts';
import {todosReducer} from 'to-do/reducers';
import sortToDos from 'to-do/utils/functions';

const {actions, initialState} = todosReducer;

export default function ToDosProvider({initialToDos, ...props}) {
  const [todos, dispatch] = useReducer(
    todosReducer,
    initialToDos || initialState,
  );

  const bindedActions = useReducerActions(actions, dispatch);

  return (
    <ToDosContext.Provider
      {...props}
      value={[sortToDos(todos), bindedActions]}
    />
  );
}
