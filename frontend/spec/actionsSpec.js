import fetchMock from 'fetch-mock';
import { fetchTables, reserveTable, removeReservation } from '../app/js/actions';

describe('Actions', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jasmine.createSpy('dispatch');
  });
  describe('fetchTables', () => {
    afterEach(fetchMock.restore);
    it('responds with tables from the server', (done) => {
      fetchMock.mock('/tables', [{ id: 1 }]);
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
      fetchMock.mock('/tables/1/reservations', 'POST', { id: 1, table_id: 1 });
      reserveTable(1)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'ENQUEUE_FOR_TABLE',
          player: { id: 1, table_id: 1 },
        });
        done();
      });
    });
  });

  describe('removeReservation', () => {
    it('removes the given reservation from the system', (done) => {
      fetchMock.mock('/reservations/2', 'DELETE');
      removeReservation({ id: 2, table_id: 1 })(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: 'REMOVE_RESERVATION',
          reservation: { id: 2, table_id: 1 },
        });
        done();
      });
    });
  });
});
