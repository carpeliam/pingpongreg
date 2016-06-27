class TableQueueEntriesController < ApplicationController
  def create
    render json: TableQueue.find(params[:table_queue_id]).entries.create
  end
end
