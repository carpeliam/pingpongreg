class ReservationsRelayJob < ApplicationJob
  queue_as :default

  def perform(table_id)
    reservations = Table.find(table_id).reservations
    reservations_json = ActiveModelSerializers::SerializableResource.new(reservations).as_json
    ActionCable.server.broadcast 'tables', reservations: reservations_json
  end
end
