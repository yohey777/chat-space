class AddTextToMessages < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :text, :string
  end
end
