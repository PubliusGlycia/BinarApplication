# json.array! @post_messages, partial: "post_messages/message", as: :message

json.messages @post_messages do |mess|
    json.author mess.author
    json.content mess.content
    json.post_event_id mess.post_event_id
end