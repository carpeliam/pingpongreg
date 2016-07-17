import fetchMock from 'fetch-mock';
import {
  fetchTables,
  reserveTable,
  removeReservation,
  updateReservations,
} from '../app/js/actions';
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

  describe('updateReservations', () => {
    it('creates an action with the tableId and reservations listing', () => {
      expect(updateReservations(1, [{ id: 1, table_id: 1 }])).toEqual({
        type: 'UPDATE_RESERVATIONS',
        tableId: 1,
        reservations: [{ id: 1, table_id: 1 }],
      });
    });
  });

  describe('reserveTable', () => {
    it('submits a reservation for the given table to the server', (done) => {
      fetchMock.mock('/tables/1/reservations', 'POST', { id: 1, table_id: 1 });
      reserveTable(1)(dispatchSpy).then(() => {
        expect(fetchMock.lastOptions('/tables/1/reservations')).toBeDefined();
        expect(fetchMock.lastOptions('/tables/1/reservations').headers).toBeDefined();
        expect(
          fetchMock.lastOptions('/tables/1/reservations').headers.get('UserId')
        ).toEqual('margaret');
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
        done();
      });
    });
  });
});
