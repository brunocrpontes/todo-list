import {useContext} from 'react';
import {RealmContext} from 'core/contexts';

export default function useRealm() {
  const realm = useContext(RealmContext);

  if (!realm) {
    throw new Error('This hook must be wrapped by an RealmProvider');
  }

  return realm;
}
