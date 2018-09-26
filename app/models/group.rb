class Group < ApplicationRecord
  has_many :members
  has_many :messages
  has_many :users, through: :members
end
