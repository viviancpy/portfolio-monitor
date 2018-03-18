import reducer from '../symbolReducer';
import { SUBSCRIBE_SYMBOL, UNSUBSCRIBE_SYMBOL } from '../../constants/ActionTypes';
import expect from 'expect';

describe('symbol reducer unit tests', ()=>{
  const initState = {
    symbolDependenciesCount: {}
  }

  const symbolWithDependencies = {
    symbolDependenciesCount:{
      'FB': 2
    }
  }

  it('should return the initial state', ()=>{
    expect(
      reducer(undefined, {})
    ).toEqual(initState);
  });

  it('should handle SUBSCRIBE_SYMBOL for a new coming symbol', ()=>{
    const reducerAfterAction = reducer(initState, {type: SUBSCRIBE_SYMBOL, symbol: 'FB'});
    expect(reducerAfterAction.symbolDependenciesCount).not.toEqual(null);
    expect(reducerAfterAction.symbolDependenciesCount).not.toEqual(undefined);
    expect(reducerAfterAction.symbolDependenciesCount.hasOwnProperty('FB')).toEqual(true);
    expect(reducerAfterAction.symbolDependenciesCount['FB']).toEqual(1);
  });

  it('should handle SUBSCRIBE_SYMBOL for an existing symbol', ()=>{
    const reducerAfterAction = reducer(symbolWithDependencies, {type: SUBSCRIBE_SYMBOL, symbol: 'FB'});
    expect(reducerAfterAction.symbolDependenciesCount).not.toEqual(null);
    expect(reducerAfterAction.symbolDependenciesCount).not.toEqual(undefined);
    expect(reducerAfterAction.symbolDependenciesCount.hasOwnProperty('FB')).toEqual(true);
    expect(reducerAfterAction.symbolDependenciesCount['FB']).toEqual(3);
  });

  it('should handle UNSUBSCRIBE_SYMBOL for a non existing symbol', ()=>{
    const reducerAfterAction = reducer(initState, {type: UNSUBSCRIBE_SYMBOL, symbol: 'FB'});
    expect(reducerAfterAction.symbolDependenciesCount).not.toEqual(null);
    expect(reducerAfterAction.symbolDependenciesCount).not.toEqual(undefined);
    expect(reducerAfterAction.symbolDependenciesCount.hasOwnProperty('FB')).toEqual(false);
  });

  it('should handle UNSUBSCRIBE_SYMBOL for an existing symbol', ()=>{
    const reducerAfterAction = reducer(symbolWithDependencies, {type: UNSUBSCRIBE_SYMBOL, symbol: 'FB'});
    expect(reducerAfterAction.symbolDependenciesCount).not.toEqual(null);
    expect(reducerAfterAction.symbolDependenciesCount).not.toEqual(undefined);
    expect(reducerAfterAction.symbolDependenciesCount.hasOwnProperty('FB')).toEqual(true);
    expect(reducerAfterAction.symbolDependenciesCount['FB']).toEqual(1);
  });
});
