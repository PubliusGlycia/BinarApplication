json.extract! post_event, :id, :user_id, :title, :description, :category, :importance, :created_at, :updated_at
json.user_email post_event.user.email
