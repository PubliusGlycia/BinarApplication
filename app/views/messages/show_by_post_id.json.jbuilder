# json.array! @post_messages, partial: "post_messages/message", as: :message

json.messages @post_messages do |message|
    json.author message.user.email
    json.content message.content
    json.created_at message.created_at
end