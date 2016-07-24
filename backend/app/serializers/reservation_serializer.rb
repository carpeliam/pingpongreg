class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :table_id, :created_at, :updated_at, :created_by

  def created_by
    JSON.parse(object.created_by) rescue object.created_by
  end
end
