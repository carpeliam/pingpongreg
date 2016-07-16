import fetchMock from 'fetch-mock';
import { fetchTables, reserveTable, removeReservation } from '../app/js/actions';
import * as fetchCurrentUser from '../app/js/fetchCurrentUser';

describe('Actions', () => {
  let dispatchSpy;
  beforeEach(() => {
    dispatchSpy = jasmine.createSpy('dispatch');
    spyOn(fetchCurrentUser, 'default').and.returnValue('margaret');
  });
  afterEach(fetchMock.restore);

  describe('fetchTables', () => {
    it('responds with tables from the server', (done) => {
      fetchMock.mock('/tables', [{ id: 1 }]);
      fetchTables()(dispatchSpy).then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
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
      reserveTable(1)(dispatchSpy).then(() => {
        expect(fetchMock.lastOptions('/tables/1/reservations')).toBeDefined();
        expect(fetchMock.lastOptions('/tables/1/reservations').headers).toBeDefined();
        expect(
          fetchMock.lastOptions('/tables/1/reservations').headers.get('UserId')
        ).toEqual('margaret');
        expect(dispatchSpy).toHaveBeenCalledWith({
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
      removeReservation({ id: 2, table_id: 1 })(dispatchSpy).then(() => {
        expect(fetchMock.lastOptions('/reservations/2')).toBeDefined();
        expect(fetchMock.lastOptions('/reservations/2').headers).toBeDefined();
        expect(
          fetchMock.lastOptions('/reservations/2').headers.get('UserId')
        ).toEqual('margaret');
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: 'REMOVE_RESERVATION',
          reservation: { id: 2, table_id: 1 },
        });
        done();
      });
    });
  });
});
