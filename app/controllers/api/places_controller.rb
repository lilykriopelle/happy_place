class Api::PlacesController < ApplicationController

  def index
    @places = Place.in_bounds(params[:bounds])
    if (params[:only_current_user])
      @places = @places.where('user_id = ?', current_user.id)
    end
    render json: @places
  end

  def create
    @place = current_user.places.new(place_params)
    if @place.save
      render json: @place
    else
      render json: @place.errors.full_messages
    end
  end

  private
    def place_params
      params.require(:place).permit(:latitude, :longitude, :emoji, :location, :note)
    end
end
