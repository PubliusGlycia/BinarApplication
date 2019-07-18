class ChangeUserIdFieldName < ActiveRecord::Migration[5.2]
  def change
    rename_column :post_events, :users_id, :user_id
  end
end
