class ReservationsController < ApplicationController
  def create
    Table.find(params[:table_id]).reservations.create(created_by: request.headers.fetch(:UserId))
    head :created
  end

  def destroy
    Reservation.find(params[:id]).destroy
    head :no_content
  end
end
