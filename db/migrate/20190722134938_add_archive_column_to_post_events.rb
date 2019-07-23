class AddArchiveColumnToPostEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :post_events, :archive, :boolean, :default => false
  end
end
