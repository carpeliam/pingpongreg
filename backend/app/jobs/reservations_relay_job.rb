class ReservationsRelayJob < ApplicationJob
  queue_as :default

  def perform(table_id)
    reservations = Table.find(table_id).reservations
    ActionCable.server.broadcast 'tables', reservations: reservations
  end
end
