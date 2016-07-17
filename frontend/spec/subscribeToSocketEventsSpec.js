import { WebSocket, Server } from 'mock-socket';
import ActionCable from 'actioncable';
import subscribeToSocketEvents from '../app/js/subscribeToSocketEvents';
import * as actions from '../app/js/actions';
import * as fetchCurrentUser from '../app/js/fetchCurrentUser';

describe('subscribeToSocketEvents', () => {
  const uid = 'margaret';
  let originalWebSocket;
  let server;
  let dispatchSpy;
  beforeEach(() => {
    dispatchSpy = jasmine.createSpy('dispatch');
    spyOn(fetchCurrentUser, 'default').and.returnValue(uid);
    spyOn(actions, 'updateReservations').and.returnValue('updateReservations result');

    originalWebSocket = ActionCable.WebSocket;
    ActionCable.WebSocket = WebSocket;
    server = new Server('ws://cable.example.com/');
    const consumer = ActionCable.createConsumer('ws://cable.example.com/');
    spyOn(ActionCable, 'createConsumer').and.returnValue(consumer);

    consumer.connect();
  });
  afterEach(() => {
    ActionCable.WebSocket = originalWebSocket;
  });

  it('sets global var on receiving data', (done) => {
    subscribeToSocketEvents(dispatchSpy);
    server.on('connection', () => {
      server.send(JSON.stringify({
        identifier: JSON.stringify({ channel: 'TablesChannel', uid }),
        message: { table_id: 1, reservations: [] },
      }));
      expect(actions.updateReservations).toHaveBeenCalledWith(1, []);
      expect(dispatchSpy).toHaveBeenCalledWith('updateReservations result');
      done();
    });
  });
});
