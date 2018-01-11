import * as findIndex from 'lodash.findindex';
import * as filter from 'lodash.filter';
import { RestActionHelper } from "./rest_action";
import { AsyncOperationActionHelper, IAsyncOperationSuccessAction } from "./action";

export function createRestActionReducer(initialState = []) {
  return (state = initialState, action) => {
    if (RestActionHelper.isRest(action) && AsyncOperationActionHelper.isSuccess(action)) {
      const restAction = action as IAsyncOperationSuccessAction<any>;
      const data = restAction.data;
      if (RestActionHelper.isList(action)) {
        return [...data];
      } else if (RestActionHelper.isCreate(action)) {
        return [...state, data];
      } else if (RestActionHelper.isUpdate(action)) {
        const index = findIndex(state, ['id', data.id]);
        if (index !== -1) {
          state[index] = data;
          return state;
        } else {
          return [...state, data];
        }
      } else if (RestActionHelper.isDelete(action)) {
        return filter(state, 'id', data.id);
      } else {
        return state;
      }
    } else {
      return state;
    }
  };
}
