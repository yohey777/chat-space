json.array! @users do |user|
  # 《json.array!....@users》でひとかたまり
  json.id user.id
  json.name user.name
end
# @users = [<user1>,,,]
# <user1>
# user = @users[1]
#   user.id
#   user.name


# [<user1>,<user2>,,].each do |user|
#   json.id = user.id
#   ..
# end

# jsons = [<user1>,<user2>,../]
# <user1>
#   json.id
#   json.name


# json.array! @users = [<user1>,<user2>,...]

# @users.each = [<user1...]
