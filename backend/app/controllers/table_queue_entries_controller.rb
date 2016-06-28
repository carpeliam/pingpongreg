class TableQueueEntriesController < ApplicationController
  def create
    render json: TableQueue.find(params[:table_queue_id]).entries.create
  end

  def destroy
    TableQueueEntry.find(params[:id]).destroy
    head :no_content
  end
end
