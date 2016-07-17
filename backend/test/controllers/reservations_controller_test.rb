require 'test_helper'

class ReservationsControllerTest < ActionDispatch::IntegrationTest
  test 'enqueing an entry' do
    table = tables(:with_reservations)
    assert_difference 'Reservation.count', 1 do
      post "/tables/#{table.id}/reservations", headers: {UserId: 'margaret'}
    end
    new_entry = Reservation.last
    assert_equal table.id, new_entry.table_id
    assert_equal 'margaret', new_entry.created_by
    assert_response :created
  end

  test 'deleting a reservation' do
    reservation = reservations(:table_one_reservation)
    assert_difference 'Reservation.count', -1 do
      delete "/reservations/#{reservation.id}"
    end
    assert_response :no_content
  end
end
