class PostEvent < ApplicationRecord
    validates :title, :description, presence:true
    validates :title, length: { maximum: 30 }
    validates :description, length: { maximum: 300 }
    validates :category, inclusion: { in: %w(defect supply others)}
    validates :importance, inclusion: { in: %w(important medium small)}
    has_many_attached :images
    validate :file_size_have_to_be_less_than_250kB, on: :create

    def file_size_have_to_be_less_than_250kB
        images.attachments.each do |photo|
            if photo.byte_size > 2000000
                errors.add(:images, "can't be greater than 2MB")
            end
        end
    end
end
