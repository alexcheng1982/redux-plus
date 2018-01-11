import * as Promise from 'bluebird';
import configureStore from 'redux-mock-store';
import {asyncOperation} from './middleware';
import {AsyncOperationActionHelper} from "./action";
import {RestActionHelper} from "./rest_action";

const middlewares = [asyncOperation];
const mockStore = configureStore(middlewares);

describe('REST actions', () => {
  it('creates success actions', () => {
    const store = mockStore({});
    const action = RestActionHelper.newList('user', null, () => Promise.resolve([{'name': 'Alex'}]));
    return store.dispatch(action).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(AsyncOperationActionHelper.isRequest(actions[0]));
      expect(AsyncOperationActionHelper.isSuccess(actions[1]));
    });
  });
});
