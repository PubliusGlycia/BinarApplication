class PostEvent < ApplicationRecord
  validates :title, presence: true
  validates :title, length: { maximum: 40 }
  validates :description, length: { maximum: 300 }
  validates :category, inclusion: { in: %w[defect supply others], message: 'Category need to be choosen' }
  validates :importance, inclusion: { in: %w[important trivial], message: 'Importance need to be choosen' }
  validate :file_size_have_to_be_less_than_5mb, on: :create
  validate :file_format_jpg_jpeg_png, on: :create
  belongs_to :user

  has_many :messages, dependent: :destroy

  has_many_attached :images

  scope :find_by_title, ->(query) do where('title ILIKE ?', "%#{sanitize_sql_like(query)}%") end

  def file_size_have_to_be_less_than_5mb
    return false unless images.attached?

    images.attachments.each { |photo| errors.add(:images, 'can\'t be greater than 5MB') if photo.byte_size > 5_000_000 }
  end

  def file_format_jpg_jpeg_png
    return false unless images.attached?

    images.attachments.each do |photo|
      if photo.content_type != 'image/png' && photo.content_type != 'image/jpg' && photo.content_type != 'image/jpeg'
        errors.add(:images, 'image needs to be png / jpeg / jpg')
      end
    end
  end
end
