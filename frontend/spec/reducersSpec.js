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

    it('adds a player to the queue for a table upon receiving ENQUEUE_FOR_TABLE', () => {
      expect(tables([{ id: 1, queue: ['existing players'] }], {
        type: 'ENQUEUE_FOR_TABLE',
        player: { id: 1, table_id: 1 },
      })).toEqual([{
        id: 1,
        queue: ['existing players', { id: 1, table_id: 1 }],
      }]);
    });

    it('removes a player from the queue for a table upon receiving REMOVE_RESERVATION', () => {
      expect(tables([{
        id: 1,
        queue: [
          { id: 1, table_id: 1 },
          { id: 2, table_id: 1 },
          { id: 3, table_id: 1 },
        ],
      }], {
        type: 'REMOVE_RESERVATION',
        reservation: { id: 2, table_id: 1 },
      })).toEqual([{
        id: 1,
        queue: [
          { id: 1, table_id: 1 },
          { id: 3, table_id: 1 },
        ],
      }]);
    });
  });
});
