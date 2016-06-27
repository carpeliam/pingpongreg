import fetchMock from 'fetch-mock';
import { fetchTables, reserveTable } from '../app/js/actions';

describe('Actions', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jasmine.createSpy('dispatch');
  });
  describe('fetchTables', () => {
    afterEach(fetchMock.restore);
    it('responds with tables from the server', (done) => {
      fetchMock.mock('/table_queues', [{ id: 1 }]);
      fetchTables()(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'RECEIVE_TABLES',
          tables: [{ id: 1 }],
        });
        done();
      });
    });
  });

  describe('reserveTable', () => {
    it('reserves the given table on the server', (done) => {
      fetchMock.mock('/table_queues/1/table_queue_entries', 'POST', { id: 1, table_id: 1 });
      reserveTable(1)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'ENQUEUE_FOR_TABLE',
          player: { id: 1, table_id: 1 },
        });
        done();
      });
    });
  });
});
