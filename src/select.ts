import {createSelector} from "reselect";
import * as map from 'lodash.map';
import { RestActionType } from "./rest_action";

const entityRootSelector = (entity: string) => state => state[entity];

const entitiesSelector = (entity: string) => createSelector(entityRootSelector(entity), root => root.entities);

const entitySelector = (entity: string, id: any) => createSelector(entitiesSelector(entity), root => root[id]);

const listSelector = (entity: string) => createSelector(entityRootSelector(entity), root => root.list);

const entitiesListSelector = (entity: string) => createSelector(listSelector(entity), entitiesSelector(entity),
    (list, entities) => map(list, id => entities[id]));

const loadingSelector = (entity: string) => createSelector(entityRootSelector(entity), root => root.loading);

const loadingActionTypeSelector = (entity: string, actionType: RestActionType) =>
    createSelector(loadingSelector(entity), loading => loading[actionType]);

const errorSelector = (entity: string) => createSelector(entityRootSelector(entity), root => root.error);

const errorActionTypeSelector = (entity: string, actionType: RestActionType) =>
    createSelector(errorSelector(entity), error => error[actionType]);

export const Selector = {
  selectEntities: entitiesSelector,
  selectEntity: entitySelector,
  selectList: entitiesListSelector,
  selectLoading: loadingActionTypeSelector,
  selectError: errorActionTypeSelector,
};
