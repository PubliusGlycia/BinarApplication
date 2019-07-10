class CreatePostEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :posted_events do |t|
      t.string :title
      t.string :desc
      t.string :category
      t.string :importance
      t.timestamps
    end
  end

  def down
    drop_table :posted_events
  end

  def change
    create_table :post_events do |t|
      t.string :title
      t.string :desc
      t.string :category
      t.string :importance
      t.timestamps
    end
  end

end
