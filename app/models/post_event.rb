class PostEvent < ApplicationRecord
    validates :title, presence:true
    validates :title, length: { maximum: 40 }
    validates :description, length: { maximum: 300 }
    validates :category, inclusion: { in: %w(defect supply others)}
    validates :importance, inclusion: { in: %w(important trivial)}
    validate :file_size_have_to_be_less_than_5MB, on: :create
    validate :file_format_jpg_jpeg_png, on: :create
    #belongs_to :user
    has_many_attached :images
    has_many :message
    

    def file_size_have_to_be_less_than_5MB
        if images.attached?
            images.attachments.each do |photo|
                if photo.byte_size > 5000000
                    errors.add(:images, "can't be greater than 2MB")
                end
            end
        end
    end

    def file_format_jpg_jpeg_png
        if images.attached?
            images.attachments.each do |photo|
                if photo.content_type != "image/png" && photo.content_type != "image/jpg" && photo.content_type != "image/jpeg"
                    errors.add(:images, "image needs to be png / jpeg / jpg")
                end
            end
        end
    end

end
