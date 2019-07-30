json.notifications @notifications_per_user do |notification|
  json.notification_type notification.notification_type
  json.user_id notification.user.id
  json.post_event_id notification.post_event_id
  json.created_at notification.created_at
  json.seen notification.seen
  json.read notification.read
end
