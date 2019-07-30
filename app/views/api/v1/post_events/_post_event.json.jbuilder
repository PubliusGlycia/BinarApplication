json.extract! post_event, :id, :user_id, :title, :description, :category, :importance, :in_progress, :created_at, :updated_at
json.likes_count post_event.likes.count
