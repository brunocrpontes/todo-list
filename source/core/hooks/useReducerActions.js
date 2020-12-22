import {useMemo} from 'react';
import {bindActionCreators} from 'core/utils/reducers/functions';

export default function useReducerActions(actions, dispatch) {
  return useMemo(() => bindActionCreators(actions, dispatch), [
    actions,
    dispatch,
  ]);
}
