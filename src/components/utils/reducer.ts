export const enum ACTIONS {
  ADD_ISIN = 'ADD_ISIN',
  REMOVE_ISIN = 'REMOVE_ISIN',
}

export interface IPayload {
  isin: string;
  price?: string;
}

interface IAction {
  type: ACTIONS;
  payload: IPayload;
}

export interface IStateItems {
  isin: string;
  price?: string;
}

interface IState {
  pricelist: Array<IStateItems>;
}

export const initialState: IState = { pricelist: [] };

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.ADD_ISIN: {
      const index = state.pricelist.findIndex(
        (item) => item.isin === action.payload.isin
      );
      const stateCopy = Object.assign([], state);
      if (index !== -1) {
        stateCopy.pricelist[index] = action.payload;
        return stateCopy;
      }
      stateCopy.pricelist.push(action.payload);
      return stateCopy;
    }

    case ACTIONS.REMOVE_ISIN: {
      const index = state.pricelist.findIndex(
        (item) => item.isin === action.payload.isin
      );
      const stateCopy = Object.assign([], state);
      stateCopy.pricelist.splice(index, 1);
      return stateCopy;
    }

    default:
      return state;
  }
};

export default reducer;
