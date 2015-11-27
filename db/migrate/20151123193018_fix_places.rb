class FixPlaces < ActiveRecord::Migration
  def change
    remove_column :places, :note, :string
    add_column :places, :note, :text

    change_column :places, :location, :string, null: false
  end
end
