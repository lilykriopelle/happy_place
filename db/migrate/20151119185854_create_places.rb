class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :emoji, null: false
      t.integer :user_id, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.text :note, null: false
      t.timestamps null: false
    end

    add_index :places, :user_id
    add_index :users, :session_token, unique: true
  end
end
