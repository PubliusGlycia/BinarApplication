Rails.application.routes.draw do

  devise_for :users
  get 'post_events/event' => 'post_events#search_filter'
  get 'post_events/download/:id/:image_position' => 'post_events#download'
  resources :post_events
  get 'user/check' => 'post_events#check_user'
  post 'archive' => 'post_events#archive_events'

  resources :forms

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

