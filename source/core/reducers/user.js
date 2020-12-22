const Types = {
  LOGIN_USER: '@user/login',
  LOGOUT_USER: '@user/logout',
  UPDATE_USER: '@user/update',
  DELETE_USER: '@user/delete',
};

const Actions = {
  login: (user) => ({type: Types.LOGIN_USER, payload: user}),
  logout: () => ({type: Types.LOGOUT_USER}),
  update: (newUserData) => ({type: Types.UPDATE_USER, payload: newUserData}),
  delete: () => ({type: Types.DELETE_USER}),
};

const INITIAL_VALUE = null;

export default function userReducer(state, action) {
  switch (action.type) {
    case Types.LOGIN_USER:
      const {payload: user} = action;

      console.log({user});

      if (typeof user !== 'object') {
        return state;
      }

      if (!['id', 'name', 'email'].some((key) => user.hasOwnProperty(key))) {
        return state;
      }

      return user;

    case Types.UPDATE_USER:
      const {payload: nextUser} = action;

      return {
        ...state,
        ...nextUser,
      };

    case Types.LOGOUT_USER:
    case Types.DELETE_USER:
      return INITIAL_VALUE;

    default:
      return state;
  }
}

userReducer.actions = Actions;
userReducer.initialState = INITIAL_VALUE;
