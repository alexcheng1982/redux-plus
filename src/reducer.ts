import * as map from 'lodash.map';
import { IDeleteRestAction, IRestActionMetadata, RestActionHelper } from "./rest_action";
import {
  AsyncOperationActionHelper, IAsyncOperationDerivedAction, IAsyncOperationFailureAction,
  IAsyncOperationSuccessAction
} from "./action";
import { List, Map } from "immutable";

export function createRestActionReducer(initialState = Map()) {
  return (state = initialState, action) => {
    if (RestActionHelper.isRest(action) && AsyncOperationActionHelper.isSuccess(action)) {
      const restAction = action as IAsyncOperationDerivedAction<IRestActionMetadata>;
      const {metadata: {entity, restActionType}} = restAction;
      const loadingPath = [entity, 'loading', restActionType];
      const errorPath = [entity, 'error', restActionType];
      if (AsyncOperationActionHelper.isSuccess(action)) {
        const successAction = restAction as IAsyncOperationSuccessAction<any, IRestActionMetadata>;
        const entitiesPath = [entity, 'entities'];
        const {data} = successAction;
        state.setIn(loadingPath, false);
        if (RestActionHelper.isList(action)) {
          const items = Array.isArray(data) ? data : [data];
          return state.withMutations(mutable => {
            items.forEach(item => mutable.setIn([...entitiesPath, item.id], item));
            mutable.setIn([entity, 'list'], List.of(...map(items, 'id')));
          });
        } else if (RestActionHelper.isRead(action)) {
          return state.setIn([...entitiesPath, data.id], data);
        } else if (RestActionHelper.isCreate(action)) {
          return state.setIn([...entitiesPath, data.id], data);
        } else if (RestActionHelper.isUpdate(action)) {
          return state.setIn([...entitiesPath, data.id], data);
        } else if (RestActionHelper.isDelete(action)) {
          const { request: {id} } = restAction as IDeleteRestAction<any>;
          return state.deleteIn([...entitiesPath, id]);
        } else {
          return state;
        }
      } else if (AsyncOperationActionHelper.isRequest(action)) {
        return state.setIn(loadingPath, true);
      } else if (AsyncOperationActionHelper.isFailure(action)) {
        const failureAction = restAction as IAsyncOperationFailureAction<IRestActionMetadata>;
        const {error} = failureAction;
        return state.setIn(loadingPath, false).setIn(errorPath, error);
      } else {
        return state;
      }
    } else {
      return state;
    }
  };
}
