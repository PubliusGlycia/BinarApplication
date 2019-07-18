class Message < ApplicationRecord
    belongs_to :post_event
    belongs_to :user
end
