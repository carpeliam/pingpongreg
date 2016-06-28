require 'test_helper'

class TableQueueEntriesControllerTest < ActionDispatch::IntegrationTest
  test 'enqueing an entry' do
    table = table_queues(:one)
    assert_difference 'TableQueueEntry.count', 1 do
      post "/table_queues/#{table.id}/table_queue_entries"
    end
    new_entry = TableQueueEntry.last
    json = JSON.parse(response.body, symbolize_names: true)
    assert_response :success
    expected_json = {
      id: new_entry.id,
      table_queue_id: table.id,
      created_at: new_entry.created_at.as_json,
      updated_at: new_entry.updated_at.as_json
    }
    assert_equal expected_json, json
  end

  test 'deleting a reservation' do
    reservation = table_queue_entries(:table_queue_child)
    assert_difference 'TableQueueEntry.count', -1 do
      delete "/table_queue_entries/#{reservation.id}"
    end
    assert_response :no_content
  end
end
