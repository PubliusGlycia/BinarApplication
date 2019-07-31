FactoryBot.define do
  factory :notification do
    type { 1 }
    seen { "" }
    read { "2019-07-29 14:34:23" }
    user_id { 1 }
    post_event_id { 1 }
    message_id { 1 }
  end
end
