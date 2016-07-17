import ActionCable from 'actioncable';
import fetchCurrentUser from './fetchCurrentUser';
import { updateReservations } from './actions';

export default function subscribeToSocketEvents(dispatch) {
  const uid = fetchCurrentUser();
  const cable = ActionCable.createConsumer();
  cable.subscriptions.create({ channel: 'TablesChannel', uid }, {
    // connected: () => console.log('connected'),
    received: ({ table_id, reservations }) => {
      dispatch(updateReservations(table_id, reservations));
    },
  });
}
