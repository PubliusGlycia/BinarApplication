class DeleteUserIdFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :user_id
  end
end
