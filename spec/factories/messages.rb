FactoryGirl.define do
  factory :message do
    text Faker::Lorem.sentence
    user
    group
  end
end
