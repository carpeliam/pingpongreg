class CreateTableQueueEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :table_queue_entries do |t|
      t.belongs_to :table_queue
      t.timestamps
    end
  end
end
