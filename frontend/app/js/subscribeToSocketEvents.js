import ActionCable from 'actioncable';
import { updateReservations } from './actions';

export default function subscribeToSocketEvents(dispatch, uid) {
  const cable = ActionCable.createConsumer(ACTION_CABLE_SERVER_URL);
  cable.subscriptions.create({ channel: 'TablesChannel', uid }, {
    // connected: () => console.log('connected'),
    received: ({ table_id, reservations }) => {
      dispatch(updateReservations(table_id, reservations));
    },
  });
}
