import { WebSocket, Server } from 'mock-socket';
import ActionCable from 'actioncable';
import subscribeToSocketEvents from '../app/js/subscribeToSocketEvents';
import * as actions from '../app/js/actions';

function configureServer() {
  ActionCable.WebSocket = WebSocket;
  const server = new Server('ws://cable.example.com/');
  const consumer = ActionCable.createConsumer('ws://cable.example.com/');
  spyOn(ActionCable, 'createConsumer').and.returnValue(consumer);
  consumer.connect();
  return server;
}

describe('subscribeToSocketEvents', () => {
  let originalWebSocket;
  let server;
  let dispatchSpy;
  beforeEach(() => {
    dispatchSpy = jasmine.createSpy('dispatch');
    spyOn(actions, 'updateReservations').and.returnValue('updateReservations result');

    originalWebSocket = ActionCable.WebSocket;
    server = configureServer();
  });
  afterEach(() => { ActionCable.WebSocket = originalWebSocket; });

  it('dispatches updateReservations upon receiving data', (done) => {
    subscribeToSocketEvents(dispatchSpy, 'abc123');
    server.on('connection', () => {
      server.send(JSON.stringify({
        identifier: JSON.stringify({ channel: 'TablesChannel', uid: 'abc123' }),
        message: { table_id: 1, reservations: [] },
      }));
      expect(actions.updateReservations).toHaveBeenCalledWith(1, []);
      expect(dispatchSpy).toHaveBeenCalledWith('updateReservations result');
      done();
    });
  });
});
