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
|group_name|integer|null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

## Usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|integer|null: false,add_index unique: true|
|mail|string|null: false,add_index,unique: true|
|password|string|null: false|


### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|image|integer||
|text|integer||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false,foreign_key: true|


### Association
- belongs_to :user
- belongs_to :group


