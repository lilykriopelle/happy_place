class AddLocationToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :location, :string
    change_column :places, :location, :string, null: false
    change_column :places, :note, :string
  end
end
