class Group < ApplicationRecord
  has_many :members
  has_many :messages
  has_many :users, through: :members

   def show_last_message
      #メッセージが存在してるかどうか
    if (last_message = messages.last).present?
      # last_message.text? ? last_message.text : '画像が投稿されています'
      last_message != nil  ? last_message.text : '画像が投稿されています'
      # price==0
    else
      'まだメッセージはありません。'
    end
  end
end
