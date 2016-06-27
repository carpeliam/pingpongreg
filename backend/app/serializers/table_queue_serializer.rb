class TableQueueSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at
  has_many :entries, key: :queue
end
