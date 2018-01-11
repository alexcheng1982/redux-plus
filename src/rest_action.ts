import {AsyncOperationActionHelper, IAsyncOperationAction} from "./action";

export type RestActionType = 'LIST' | 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

export interface IRestActionMetadata {
  entity: string;
  restActionType: RestActionType;
}

export interface IRestAction<R, T> extends IAsyncOperationAction<R, T, IRestActionMetadata> {

}

export interface IListRestAction<R, T> extends IRestAction<R, T> {}

export interface ICreateRestAction<R, T> extends IRestAction<R, T> {}

function createAsyncOperation<R, T>(entity: string,
                                    restActionType: RestActionType,
                                    request: R,
                                    operation: (R) => Promise<T>) {
  return AsyncOperationActionHelper.newAsync(`${restActionType}_${entity}`,
      request,
      operation,
      { entity, restActionType });
}

export const RestActionHelper = {
  newList: <R, T>(entity: string, request: R, operation: (R) => Promise<T>): IListRestAction<R, T> => {
    return createAsyncOperation(entity, "LIST", request, operation);
  },
  newCreate: <R, T>(entity: string, request: R, operation: (R) => Promise<T>): ICreateRestAction<R, T> => {
    return createAsyncOperation(entity, "CREATE", request, operation);
  },
  newRead: <R, T>(entity: string, request: R, operation: (R) => Promise<T>): ICreateRestAction<R, T> => {
    return createAsyncOperation(entity, "READ", request, operation);
  },
  newUpdate: <R, T>(entity: string, request: R, operation: (R) => Promise<T>): ICreateRestAction<R, T> => {
    return createAsyncOperation(entity, "UPDATE", request, operation);
  },
  newDelete: <R, T>(entity: string, request: R, operation: (R) => Promise<T>): ICreateRestAction<R, T> => {
    return createAsyncOperation(entity, "DELETE", request, operation);
  },
  isRest: (action: any): Boolean => {
    return action && action.restActionType;
  },
  isList: (action: any): Boolean => {
    return action && action.restActionType === "LIST";
  },
  isCreate: (action: any): Boolean => {
    return action && action.restActionType === "CREATE";
  },
  isRead: (action: any): Boolean => {
    return action && action.restActionType === "READ";
  },
  isUpdate: (action: any): Boolean => {
    return action && action.restActionType === "UPDATE";
  },
  isDelete: (action: any): Boolean => {
    return action && action.restActionType === "DELETE";
  },
};
