class Like < ApplicationRecord
  belongs_to :post_event
  belongs_to :user
end
