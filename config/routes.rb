Rails.application.routes.draw do
  
  root 'post_events#index'

  devise_for :users
  get 'post_events/event' => 'post_events#search_filter'
  get 'post_events/download/:id/:image_position' => 'post_events#download'
  resources :post_events

  get 'user/check' => 'post_events#check_user'

  resources :forms
  resources :messages
  get '/messages_by_post/:id' => 'messages#show_by_post_id'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

