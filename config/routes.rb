Rails.application.routes.draw do

  devise_for :users
  resources :post_events
  get 'post_events/event/:category' => 'post_events#show_by_category'
  get 'post_events/download/:id/:image_position' => 'post_events#download'
  resources :forms
  resources :messages
  
  # root 'navbar#home'

  get '/messages_by_post/:id' => 'messages#show_by_post_id'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

