json.notifications do
  json.array! @notification_data do |notification_data|
    json.call(notification_data, :notification_type, :count, :post_event_id, :user_id)
    json.user_email notification_data.post_event.user.email
  end
end
