require 'test_helper'

class TableQueuesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @table = table_queues(:one)
  end

  test 'fetching an individual table' do
    get "/table_queues/#{@table.id}"
    json = JSON.parse(response.body, symbolize_names: true)
    assert_response :success
    table_queue_entry = @table.entries.first
    expected_json = {
      id: @table.id,
      created_at: @table.created_at.as_json,
      updated_at: @table.updated_at.as_json,
      queue: [{
        id: table_queue_entry.id,
        table_queue_id: @table.id,
        created_at: table_queue_entry.created_at.as_json,
        updated_at: table_queue_entry.updated_at.as_json
      }]
    }
    assert_equal expected_json, json
  end
end
