import * as startsWith from 'lodash.startswith';
import * as assign from 'lodash.assign';

export interface IAction {
  type: string;
}

export interface IAsyncOperationAction<R, T, M> extends IAction {
  name: string;
  request: R;
  operation: (R) => Promise<T>;
  metadata?: M;
}

export interface IAsyncOperationRequestAction<R> extends IAction {
  request: R;
}

export interface IAsyncOperationSuccessAction<T> extends IAction {
  data: T;
}

export interface IAsyncOperationFailureAction extends IAction {
  error: Error;
}

export const AsyncOperationActionHelper = {
  types: {
    'async': 'ASYNC_OPERATION',
    requestPrefix: 'ASYNC_OPERATION_REQUEST',
    successPrefix: 'ASYNC_OPERATION_SUCCESS',
    failurePrefix: 'ASYNC_OPERATION_FAILURE',
  },
  newAsync: <R, T, M>(name: string,
                   request: R,
                   operation: (R) => Promise<T>,
                   metadata?: M): IAsyncOperationAction<R, T, M> => {
    return {
      type: AsyncOperationActionHelper.types.async,
      name,
      request,
      operation,
      metadata,
    };
  },
  newRequest: <R, T, M>(action: IAsyncOperationAction<R, T, M>): IAsyncOperationRequestAction<R> => {
    return assign({}, action.metadata, {
      type: `${AsyncOperationActionHelper.types.requestPrefix}_${action.name}`,
      request: action.request,
    });
  },
  newSuccess: <R, T, M>(action: IAsyncOperationAction<R, T, M>, data: T): IAsyncOperationSuccessAction<T> => {
    return assign({}, action.metadata, {
      type: `${AsyncOperationActionHelper.types.successPrefix}_${action.name}`,
      data,
    });
  },
  newFailure: <R, T, M>(action: IAsyncOperationAction<R, T, M>, error: Error): IAsyncOperationFailureAction => {
    return assign({}, action.metadata, {
      type: `${AsyncOperationActionHelper.types.failurePrefix}_${action.name}`,
      error,
    });
  },
  isAsync: (action: any): Boolean => {
    return action && action.type === AsyncOperationActionHelper.types.async;
  },
  isRequest: (action: any): Boolean => {
    return action && startsWith(action.type, AsyncOperationActionHelper.types.requestPrefix);
  },
  isSuccess: (action: any): Boolean => {
    return action && startsWith(action.type, AsyncOperationActionHelper.types.successPrefix);
  },
  isFailure: (action: any): Boolean => {
    return action && startsWith(action.type, AsyncOperationActionHelper.types.failurePrefix);
  },
};
