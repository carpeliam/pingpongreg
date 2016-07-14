class RenameTableQueuesToTables < ActiveRecord::Migration[5.0]
  def change
    rename_table :table_queues, :tables
    rename_table :table_queue_entries, :reservations
    rename_column :reservations, :table_queue_id, :table_id
  end
end
