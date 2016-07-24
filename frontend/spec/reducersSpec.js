import { tables, currentUser } from '../app/js/reducers';

describe('reducers', () => {
  describe('tables reducer', () => {
    it('initializes to a default state', () => {
      expect(tables(undefined, {})).toEqual([]);
    });

    it('sets the state to the JSON response upon receiving RECEIVE_TABLES', () => {
      expect(tables(['existing tables'], {
        type: 'RECEIVE_TABLES',
        tables: [{ id: 1 }],
      })).toEqual([{ id: 1 }]);
    });

    it('updates the reservations for a table upon receiving UPDATE_TABLES', () => {
      const initialState = [
        { id: 1, reservations: [] },
        { id: 2, reservations: [{ id: 1, table_id: 2 }] },
        { id: 3, reservations: [] },
      ];
      const updateAction = {
        type: 'UPDATE_RESERVATIONS',
        tableId: 2,
        reservations: [{ id: 2, table_id: 2 }],
      };
      expect(tables(initialState, updateAction)).toEqual([
        { id: 1, reservations: [] },
        { id: 2, reservations: [{ id: 2, table_id: 2 }] },
        { id: 3, reservations: [] },
      ]);
    });
  });

  describe('currentUser reducer', () => {
    it('has a default state of null', () => {
      expect(currentUser(undefined, { type: 'SOME_ACTION' })).toBeNull();
    });
    it('sets the user upon receiving a LOGIN_USER action', () => {
      const user = { id: 'abc123', name: 'margaret' };
      expect(currentUser(undefined, { type: 'LOGIN_USER', user })).toEqual(user);
    });
  });
});
