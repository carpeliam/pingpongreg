class TableQueue < ApplicationRecord
  has_many :entries, class_name: 'TableQueueEntry'
end
