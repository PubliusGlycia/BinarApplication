class PostEvent < ApplicationRecord
    validates :title, :description, presence:true
    validates :title, length: { maximum: 30 }
    validates :description, length: { maximum: 300 }
    validates :category, inclusion: { in: %w(defect supply others)}
    validates :importance, inclusion: { in: %w(important medium small)}
end
