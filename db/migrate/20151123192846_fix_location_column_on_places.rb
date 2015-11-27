class FixLocationColumnOnPlaces < ActiveRecord::Migration
  def change
    remove_column :places, :location
    add_column :places, :location, :string
  end
end
