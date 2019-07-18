json.extract! post_event, :id, :title, :importance
json.likes_count post_event.likes.count
json.url post_event_url(post_event, format:  :json)