require 'rails_helper'

RSpec.describe Message, type: :model do
  # describe '#create' do
  #   context 'can save' do
  #     it 'is valid with text' do
  #       expect(build(:message, image: nil)).to be_valid
  #     end

  #     it 'is valid with image' do
  #       expect(build(:message, text: nil)).to be_valid
  #     end

  #     it 'is valid with text and image' do
  #       expect(build(:message)).to be_valid
  #     end
  #   end

  #   context 'can not save' do
  #     it 'is invalid without content and image' do
  #       message = build(:message, text: nil, image: nil)
  #       message.valid?
  #       expect(message.errors[:text]).to include('を入力してください')
  #     end

  #     it 'is invalid without group_id' do
  #       message = build(:message, group_id: nil)
  #       message.valid?
  #       expect(message.errors[:group]).to include('を入力してください')
  #     end

  #     it 'is invalid without user_id' do
  #       message = build(:message, user_id: nil)
  #       message.valid?
  #       expect(message.errors[:user]).to include('を入力してください')
  #     end
  #   end
  # end

describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
end
