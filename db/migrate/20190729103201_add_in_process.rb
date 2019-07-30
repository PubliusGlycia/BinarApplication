class AddInProcess < ActiveRecord::Migration[5.2]
  def change
    add_column :post_events, :in_progress, :boolean, :default => false
  end
end
