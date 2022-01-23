import React, { useReducer } from 'react';
import reducer, {
  ACTIONS,
  initialState,
  IPayload,
  IStateItems,
} from './reducer';

interface IContext {
  pricelist: Array<IStateItems>;
  setData: (payload: IPayload) => void;
  removeData: (payload: IPayload) => void;
}

export const AppContext = React.createContext<IContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pricelist } = state;

  const setData = (payload: IPayload) => {
    dispatch({ type: ACTIONS.ADD_ISIN, payload });
  };

  const removeData = (payload: IPayload) => {
    dispatch({ type: ACTIONS.REMOVE_ISIN, payload });
  };

  return (
    <AppContext.Provider
      value={{
        pricelist,
        setData,
        removeData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
