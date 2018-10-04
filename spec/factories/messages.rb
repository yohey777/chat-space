FactoryGirl.define do
  factory :message do
    text Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/6239_ext_01_0.jpg")
    user
    group
  end
end
