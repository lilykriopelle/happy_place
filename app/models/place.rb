class Place < ActiveRecord::Base
  validates :emoji, :user_id, :latitude, :longitude, presence: true
  validates :emoji, inclusion: {in: %w(hearts happy blush calm crying smirk happy_cry grumpy dizzy disappointed tongue flushed)}

  def self.in_bounds(bounds)
      right_lat = bounds["northEast"]["lat"]
      left_lat = bounds["southWest"]["lat"]

      bottom_lng = bounds["northEast"]["lng"]
      top_lng = bounds["southWest"]["lng"]

      Place
        .where('latitude BETWEEN ? AND ?', left_lat, right_lat)
        .where('longitude BETWEEN ? AND ?', top_lng, bottom_lng)
    end

end
