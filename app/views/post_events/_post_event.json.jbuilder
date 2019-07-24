json.extract! post_event, :id, :user_id, :title, :description, :category, :importance, :created_at, :updated_at
json.url post_event_url(post_event, format: :json)
json.likes_count post_event.likes.count
