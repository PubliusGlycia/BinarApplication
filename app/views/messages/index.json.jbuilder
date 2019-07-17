# json.array! @messages, partial: "messages/message", as: :message

json.users @messages.each do |message|
    json.author message.author
    json.content message.content        
end
