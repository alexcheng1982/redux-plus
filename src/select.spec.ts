import { Config } from "./config";
import {Selector} from "./select";

const state = {
  [Config.getStoreKey()]: {
    user: {
      entities: {
        1: {
          name: 'Alex',
        },
        2: {
          name: 'Bob',
        },
        3: {
          name: 'David',
        }
      },
      list: [1, 2, 3],
      loading: {
        list: false,
      },
      error: {
        create: new Error('create error'),
      },
    }
  }
};

describe('selector', () => {
  it('should select list of entities', () => {
    expect(Selector.entitiesListSelector('user')(state)).toHaveLength(3);
  });

  it('should select an entity', () => {
    expect(Selector.entitySelector('user', 1)(state)).toEqual({name: 'Alex'});
  });
});


