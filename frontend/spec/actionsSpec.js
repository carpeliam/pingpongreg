import fetchMock from 'fetch-mock';
import shortid from 'shortid';
import {
  fetchTables,
  reserveTable,
  removeReservation,
  updateReservations,
  loginUser,
} from '../app/js/actions';
import * as cookieMonster from '../app/js/cookieMonster';
import * as subscribeToSocketEvents from '../app/js/subscribeToSocketEvents';

describe('Actions', () => {
  const user = { id: 'abc123', name: 'margaret' };
  let dispatchSpy;
  beforeEach(() => {
    dispatchSpy = jasmine.createSpy('dispatch');
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
      reserveTable({ tableId: 1, user })(dispatchSpy).then(() => {
        expect(fetchMock.lastOptions('/tables/1/reservations')).toBeDefined();
        expect(fetchMock.lastOptions('/tables/1/reservations').headers).toBeDefined();
        expect(
          fetchMock.lastOptions('/tables/1/reservations').headers.get('UserId')
        ).toEqual(JSON.stringify(user));
        done();
      });
    });
  });

  describe('removeReservation', () => {
    it('removes the given reservation from the system', (done) => {
      fetchMock.mock('/reservations/2', 'DELETE');
      removeReservation({ reservationId: 2, user })(dispatchSpy).then(() => {
        expect(fetchMock.lastOptions('/reservations/2')).toBeDefined();
        expect(fetchMock.lastOptions('/reservations/2').headers).toBeDefined();
        expect(
          fetchMock.lastOptions('/reservations/2').headers.get('UserId')
        ).toEqual(JSON.stringify(user));
        done();
      });
    });
  });

  describe('loginUser', () => {
    beforeEach(() => {
      spyOn(shortid, 'generate').and.returnValue('abc123');
      spyOn(cookieMonster, 'setUser');
      spyOn(subscribeToSocketEvents, 'default');
    });
    it('sets the current user, saves a cookie, and registers for websocket events', () => {
      loginUser({ name: 'margaret' })(dispatchSpy);
      expect(cookieMonster.setUser).toHaveBeenCalledWith(user);
      expect(subscribeToSocketEvents.default).toHaveBeenCalledWith(dispatchSpy, 'abc123');
      expect(dispatchSpy).toHaveBeenCalledWith({ type: 'LOGIN_USER', user });
    });
  });
});
