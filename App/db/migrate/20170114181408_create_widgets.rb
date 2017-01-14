class CreateWidgets < ActiveRecord::Migration[5.0]
  def change
    create_table :widgets do |t|

      t.timestamps
      t.string :name, null:false
    end
  end
end
