Rails.application.routes.draw do
  root 'post_events#index'

  devise_for :users

  get 'post_events/event' => 'post_events#search_filter'
  
  resources :post_events do
    resources :likes
  end

  get 'post_events/event/:category' => 'post_events#show_by_category'
  get 'post_events/download/:id/:image_position' => 'post_events#download'
  get 'user/check' => 'post_events#check_user'

  resources :forms
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

