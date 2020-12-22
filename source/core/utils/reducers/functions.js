export function bindActionCreators(actions, dispatch) {
  const bindedActions = {};

  for (const actionName in actions) {
    if (!actions.hasOwnProperty(actionName)) {
      continue;
    }

    if (typeof actions[actionName] !== 'function') {
      continue;
    }

    bindedActions[actionName] = (...args) =>
      dispatch(actions[actionName](...args));
  }

  return bindedActions;
}
