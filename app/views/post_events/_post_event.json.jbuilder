json.extract! post_event, :id, :title, :category, :importance, :description, :created_at, :updated_at
json.url post_event_url(post_event, format: :json)
