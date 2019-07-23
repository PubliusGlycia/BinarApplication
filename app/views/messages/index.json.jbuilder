json.messages @post_messages do |message|
  json.id message.id
  json.author message.user.email
  json.content message.content
  json.created_at message.created_at
end
