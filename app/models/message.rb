class Message < ApplicationRecord
  belongs_to :post_event
  belongs_to :user

  validates :content, presence: true
  validates :content, length: { maximum: 200 }
end
