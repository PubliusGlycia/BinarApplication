class User < ApplicationRecord
    has_many :post_event
    has_many :message
end
