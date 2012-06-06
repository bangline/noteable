class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title
      t.text :content
      t.boolean :starred, :default => false
      t.timestamps
    end
  end
end