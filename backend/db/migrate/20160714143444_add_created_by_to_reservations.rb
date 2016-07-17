class AddCreatedByToReservations < ActiveRecord::Migration[5.0]
  def change
    add_column :reservations, :created_by, :string
  end
end
