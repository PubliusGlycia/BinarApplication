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
  User.create(email: Faker::Internet.email(name: name), password: '123456')
end

users = User.where(admin: false)

categories = ['defect', 'supply', 'others']
importances = ['trival', 'important']

users.each do
  category = categories.sample
  if category == 'supply'
    title = Faker::JapaneseMedia::SwordArtOnline.item
  elsif category == 'defect'
    title = Faker::Games::Fallout.quote
  else
    title = Faker::Lorem.paragraph_by_chars(number: 25, supplemental: false)
  end
end