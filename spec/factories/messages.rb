FactoryBot.define do
  factory :message do
    trait :content do
      content { Faker::Movies::StarWars.quote }
    end

    trait :wrong_content do
      content { Faker::Alphanumeric.alpha 201 }
    end

    factory :valid_message,    traits: [:content]
    factory :invalid_message,    traits: [:wrong_content]
  end
end
