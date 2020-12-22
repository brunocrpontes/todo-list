import {useContext} from 'react';
import {ToDosContext} from 'to-do/contexts';

export default function useToDos() {
  return useContext(ToDosContext);
}
