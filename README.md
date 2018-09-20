# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## Groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|chat_id|integer|null: false, foreign_key: true|

### Association
- has_many :menbers
- has_many :users, through: :members

## Usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|chat_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|mail|string|null: false|
|password|string|null: false|


### Association
- has_many :groups, through: :members
- has_many :chats

## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key: true|



### Association
- belongs_to :users
- belongs_to :groups


