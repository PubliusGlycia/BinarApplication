Rails.application.routes.draw do

  devise_for :users
  resources :post_events
  get 'post_events/event/:category' => 'post_events#show_by_category'
  get 'post_events/download/:id/:image_position' => 'post_events#download'
  resources :forms

  # root 'navbar#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

