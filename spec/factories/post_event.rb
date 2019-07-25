FactoryBot.define do

    factory :post_event do

        trait :title do
            title { Faker::Lorem.paragraph_by_chars(40, false) }
        end

        trait :description do
            description { Faker::Movies::StarWars.quote }
        end

        trait :category do
            category { ['defect','supply','others'].sample }
        end

        trait :importance do
            importance { ['important', 'trivial'].sample }
        end

        trait :invalid_photo do
            after :build do |post_event|
                file = File.open(File.join(Rails.root, 'spec', 'support', 'text_files','test.txt'))
                post_event.images.attach(io: file, filename: 'test.txt', content_type: 'text/plain')
            end
        end

        trait :valid_photo do
            after :build do |post_event|
                file = File.open(File.join(Rails.root, 'spec', 'support', 'fixtures','test.png'))
                post_event.images.attach(io: file, filename: 'test.png', content_type: 'image/png')
            end
        end

        factory :valid_post_event,    traits: [:title, :description, :category, :importance, :valid_photo]
        factory :invalid_post_event,    traits: [:title, :description, :category, :importance, :invalid_photo]

    end

end