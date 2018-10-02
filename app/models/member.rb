class Member < ApplicationRecord
    belongs_to :group
    belongs_to :user
    # mount_uploader :image, ImageUploader
end
