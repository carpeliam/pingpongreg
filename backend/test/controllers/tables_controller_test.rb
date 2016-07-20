require 'test_helper'

def json_for(table)
  json_for_reservations = table.reservations.map do |reservation|
    {
      id: reservation.id,
      table_id: table.id,
      created_by: reservation.created_by,
      created_at: reservation.created_at.as_json,
      updated_at: reservation.updated_at.as_json
    }
  end
  {
    id: table.id,
    created_at: table.created_at.as_json,
    updated_at: table.updated_at.as_json,
    reservations: json_for_reservations
  }
end

class TablesControllerTest < ActionDispatch::IntegrationTest
  test 'fetching all tables' do
    get '/tables'
    json_response = JSON.parse(response.body, symbolize_names: true)
    assert_response :success
    expected_json = [
      json_for(tables(:with_reservations)),
      json_for(tables(:without_reservations))
    ]
    assert_equal expected_json, json_response
  end

  test 'fetching an individual table' do
    table = tables(:with_reservations)
    get "/tables/#{table.id}"
    json_response = JSON.parse(response.body, symbolize_names: true)
    assert_response :success
    assert_equal json_for(table), json_response
  end
end
