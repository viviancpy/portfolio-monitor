import { SUBSCRIBE_SYMBOL, UNSUBSCRIBE_SYMBOL } from '../constants/ActionTypes';

const initialState = {
  symbolDependenciesCount: {}
}

export default function symbolReducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE_SYMBOL:
      return {
        ...state,
        symbolDependenciesCount: {
          ...state.symbolDependenciesCount,
          [action.symbol]: Number((state.symbolDependenciesCount && state.symbolDependenciesCount[action.symbol]) || 0) + 1
        }
      };
    case UNSUBSCRIBE_SYMBOL:
      const count = state.symbolDependenciesCount.hasOwnProperty(action.symbol)
        ? state.symbolDependenciesCount[action.symbol] : 0;
      if (count <= 1) {
        const { symbolDependenciesCount: { [action.symbol]: deleted, ...symbolDependenciesCount } } = state;
        return {
          ...state,
          symbolDependenciesCount
        };
      } else {
        return {
          ...state,
          symbolDependenciesCount: {
            ...state.symbolDependenciesCount,
            [action.symbol]: count - 1
          }
        };
      }
    default:
      return state
  }
}
