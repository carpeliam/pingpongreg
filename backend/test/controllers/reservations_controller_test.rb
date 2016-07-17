require 'test_helper'

class ReservationsControllerTest < ActionDispatch::IntegrationTest
  test 'enqueing an entry' do
    table = tables(:with_reservations)
    assert_difference 'Reservation.count', 1 do
      post "/tables/#{table.id}/reservations", headers: {UserId: 'margaret'}
    end
    new_entry = Reservation.last
    json = JSON.parse(response.body, symbolize_names: true)
    assert_response :success
    expected_json = {
      id: new_entry.id,
      table_id: table.id,
      created_by: 'margaret',
      created_at: new_entry.created_at.as_json,
      updated_at: new_entry.updated_at.as_json
    }
    assert_equal expected_json, json
  end

  test 'deleting a reservation' do
    reservation = reservations(:table_one_reservation)
    assert_difference 'Reservation.count', -1 do
      delete "/reservations/#{reservation.id}"
    end
    assert_response :no_content
  end
end
