json.partial! @post_event, as: :post_event
json.extract! @post_event, :description, :category, :created_at
json.url post_event_url(@post_event, format:  :json)