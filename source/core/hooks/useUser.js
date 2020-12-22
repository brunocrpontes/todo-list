import {useContext} from 'react';
import {UserContext} from 'core/contexts';

export default function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('This hook must be wrapped by an UserProvider');
  }

  return context;
}
