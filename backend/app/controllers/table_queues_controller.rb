class TableQueuesController < ApplicationController
  def show
    render json: TableQueue.find(params[:id])
  end
end
