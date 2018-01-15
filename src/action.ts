import * as startsWith from 'lodash.startswith';

export interface IAction {
  type: string;
}

export interface IAsyncOperationAction<R, T, M> extends IAction {
  name: string;
  request: R;
  operation: (R) => Promise<T>;
  metadata?: M;
}

export interface IAsyncOperationDerivedAction<M> extends IAction {
  metadata?: M;
}

export interface IAsyncOperationRequestAction<R, M> extends IAsyncOperationDerivedAction<M> {
  request: R;
}

export interface IAsyncOperationSuccessAction<T, M> extends IAsyncOperationDerivedAction<M> {
  data: T;
}

export interface IAsyncOperationFailureAction<M> extends IAsyncOperationDerivedAction<M> {
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
  newRequest: <R, T, M>(action: IAsyncOperationAction<R, T, M>): IAsyncOperationRequestAction<R, M> => {
    return {
      type: `${AsyncOperationActionHelper.types.requestPrefix}_${action.name}`,
      request: action.request,
      metadata: action.metadata,
    };
  },
  newSuccess: <R, T, M>(action: IAsyncOperationAction<R, T, M>, data: T): IAsyncOperationSuccessAction<T, M> => {
    return {
      type: `${AsyncOperationActionHelper.types.successPrefix}_${action.name}`,
      data,
      metadata: action.metadata,
    };
  },
  newFailure: <R, T, M>(action: IAsyncOperationAction<R, T, M>, error: Error): IAsyncOperationFailureAction<M> => {
    return {
      type: `${AsyncOperationActionHelper.types.failurePrefix}_${action.name}`,
      error,
      metadata: action.metadata,
    };
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
