import {UserContext} from 'core/contexts';
import {useReducerActions} from 'core/hooks';
import {userReducer} from 'core/reducers';
import React, {useReducer} from 'react';

const {initialState, actions} = userReducer;

export default function UserProvider({initialUser, ...props}) {
  const [user, dispatch] = useReducer(userReducer, initialUser || initialState);

  const bindedActions = useReducerActions(actions, dispatch);

  return <UserContext.Provider {...props} value={[user, bindedActions]} />;
}
