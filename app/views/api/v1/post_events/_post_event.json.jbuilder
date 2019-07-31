json.extract! post_event, :id, :user_id, :title, :description, :category, :importance, :in_progress, :created_at
json.user_email post_event.user.email
