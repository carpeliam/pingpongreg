class Reservation < ApplicationRecord
  belongs_to :table

  after_commit { ReservationsRelayJob.perform_later(table.id) }
end
