Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resources :places, only: [:create, :index]
  end

  root to: "static_pages#root"
end
