require 'test_helper'

class TablesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @table = tables(:with_reservations)
  end

  test 'fetching an individual table' do
    get "/tables/#{@table.id}"
    json = JSON.parse(response.body, symbolize_names: true)
    assert_response :success
    reservation = @table.reservations.first
    expected_json = {
      id: @table.id,
      created_at: @table.created_at.as_json,
      updated_at: @table.updated_at.as_json,
      reservations: [{
        id: reservation.id,
        table_id: @table.id,
        created_by: reservation.created_by,
        created_at: reservation.created_at.as_json,
        updated_at: reservation.updated_at.as_json
      }]
    }
    assert_equal expected_json, json
  end
end
