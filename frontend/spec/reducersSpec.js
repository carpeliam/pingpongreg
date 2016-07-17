import { tables } from '../app/js/reducers';

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
        { id: 1, queue: [] },
        { id: 2, queue: [{ id: 1, table_id: 2 }] },
        { id: 3, queue: [] },
      ];
      const updateAction = {
        type: 'UPDATE_RESERVATIONS',
        tableId: 2,
        reservations: [{ id: 2, table_id: 2 }],
      };
      expect(tables(initialState, updateAction)).toEqual([
        { id: 1, queue: [] },
        { id: 2, queue: [{ id: 2, table_id: 2 }] },
        { id: 3, queue: [] },
      ]);
    });

    it('adds a player to the queue for a table upon receiving ENQUEUE_FOR_TABLE', () => {
      const initialState = [
        { id: 1, queue: ['existing players'] },
        { id: 2, queue: [] },
      ];
      const enqueueAction = {
        type: 'ENQUEUE_FOR_TABLE',
        player: { id: 1, table_id: 1 },
      };
      expect(tables(initialState, enqueueAction)).toEqual([
        { id: 1, queue: ['existing players', { id: 1, table_id: 1 }] },
        { id: 2, queue: [] },
      ]);
    });

    it('removes a player from the queue for a table upon receiving REMOVE_RESERVATION', () => {
      const initialState = [
        {
          id: 1,
          queue: [
            { id: 1, table_id: 1 },
            { id: 2, table_id: 1 },
            { id: 3, table_id: 1 },
          ],
        },
        { id: 2, queue: [] },
      ];
      const removeAction = {
        type: 'REMOVE_RESERVATION',
        reservation: { id: 2, table_id: 1 },
      };
      expect(tables(initialState, removeAction)).toEqual([
        {
          id: 1,
          queue: [
            { id: 1, table_id: 1 },
            { id: 3, table_id: 1 },
          ],
        },
        { id: 2, queue: [] },
      ]);
    });
  });
});
