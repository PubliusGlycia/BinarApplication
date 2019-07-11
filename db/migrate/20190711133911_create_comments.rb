class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.references :users, index:true
      t.timestamps
    end
    add_reference :post_events, :users, index: true
  end

end
