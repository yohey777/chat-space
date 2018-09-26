Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  resources :users,only: [:index,:edit,:update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
