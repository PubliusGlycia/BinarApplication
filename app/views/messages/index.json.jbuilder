# json.array! @messages, partial: "messages/message", as: :message

json.users @messages.each do |message|
    json.author message.author
    json.content message.content
    json.created_at message.created_at
end
