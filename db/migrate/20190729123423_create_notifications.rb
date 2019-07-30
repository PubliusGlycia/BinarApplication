class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.integer :notification_type
      t.datetime :seen
      t.datetime :read
      t.integer :post_event_id, index: true
      t.integer :user_id, index: true

      t.timestamps
    end
  end
end
