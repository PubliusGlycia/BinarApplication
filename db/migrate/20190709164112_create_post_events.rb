class CreatePostEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :post_events do |t|
      t.string :title
      t.string :description
      t.string :category
      t.string :importance
      t.timestamps
    end
  end

end
