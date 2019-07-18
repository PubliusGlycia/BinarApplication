json.partial! "post_events/post_event", post_event: @post_event
json.images_url @post_event.images.each  do |image|
  json.key image.key
  json.filename image.filename
  json.url rails_blob_path(image, only_path: true)
end

