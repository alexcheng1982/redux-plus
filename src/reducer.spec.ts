import * as Promise from 'bluebird';
import {AsyncOperationActionHelper} from "./action";
import {RestActionHelper} from "./rest_action";
import {createRestActionReducer} from "./reducer";

const users = [
  {
    id: 1,
    name: 'Alex',
  },
  {
    id: 2,
    name: 'Bob',
  },
  {
    id: 3,
    name: 'David'
  }
];

describe('reducer', () => {
  it('handles LIST operation', () => {
    const listAction = RestActionHelper.newList('user', null, Promise.resolve(users));
    const successAction = AsyncOperationActionHelper.newSuccess(listAction, users);
    const reducer = createRestActionReducer();
    let state = reducer([], successAction);
    expect(state).toHaveLength(3);
  });
});