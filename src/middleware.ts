import {AsyncOperationActionHelper, IAsyncOperationAction} from "./action";

export function asyncOperation({dispatch}) {
  return next => action => {
    if (!AsyncOperationActionHelper.isAsync(action)) {
      return next(action);
    }
    const asyncAction = action as IAsyncOperationAction<any, any, any>;
    dispatch(AsyncOperationActionHelper.newRequest(asyncAction));

    return asyncAction.operation(asyncAction.request).then(
        response => dispatch(AsyncOperationActionHelper.newSuccess(asyncAction, response)),
        error => dispatch(AsyncOperationActionHelper.newFailure(asyncAction, error))
    );
  };
}
