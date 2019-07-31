# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 10.times { Message.create!(author: Faker::Internet.email, content: Faker::Movies::HarryPotter.quote) }
admin = User.create(email: 'admin@binar.app', password: '123456', admin: true)
10.times do
  name = Faker::JapaneseMedia::SwordArtOnline.real_name
  User.create(email: Faker::Internet.email(name: name), password: '123456', admin: false)
end

users = User.where(admin: false)

categories = ['defect', 'supply', 'others']
importances = ['trivial', 'important']

users.each do |user|
  5.times do
    category = categories.sample

    if category == 'supply'
      title = Faker::JapaneseMedia::SwordArtOnline.item
    elsif category == 'defect'
      title = Faker::Book.title
    else
      title = Faker::Coffee.blend_name
    end

    importance = importances.sample

    description = Faker::Lorem.paragraph

    PostEvent.create(title: title, description: description, category: category, importance: importance, user: user)
  end
end

post_events = PostEvent.all

users.each do |user|
  15.times do
    Like.create(post_event: post_events.sample, user: user)
  end
end

post_events.each do |post_event|
  rand(3..7).times do
    content = Faker::Hacker.say_something_smart
    Message.create(content: content, post_event: post_event, user: users.sample)
  end
end
