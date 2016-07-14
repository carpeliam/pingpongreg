class TablesController < ApplicationController
  def show
    render json: Table.find(params[:id])
  end
end
