class AddNotificationToMessage < ActiveRecord::Migration[5.2]
  def change
    add_reference :messages, :post_event, foreign_key: true
  end
end
