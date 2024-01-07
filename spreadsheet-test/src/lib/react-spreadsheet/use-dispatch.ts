import { useContextSelector } from 'use-context-selector';
import context, { Dispatch } from './context';

function useDispatch(): Dispatch {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return useContextSelector(context, ([state, dispatch]) => dispatch);
}

export default useDispatch;
