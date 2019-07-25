class RemoveAuthorFromMessage < ActiveRecord::Migration[5.2]
  def change
    remove_column :messages, :author, :string

    add_reference :messages, :author, foreign_key: { to_table: :users }
  end
end
