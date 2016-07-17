require 'test_helper'

class ReservationTest < ActiveSupport::TestCase
  include ActiveJob::TestHelper

  test 'enqueues relay job with table id upon commit' do
    assert_enqueued_with(job: ReservationsRelayJob, args: [tables(:with_reservations).id]) do
      tables(:with_reservations).reservations.create
    end
  end
end
