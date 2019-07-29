class CreateMainpages < ActiveRecord::Migration[5.2]
  def change
    create_table :mainpages do |t|
      t.string :title

      t.timestamps
    end
  end
end
