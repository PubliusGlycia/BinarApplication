Rails.application.routes.draw do

  resources :mainpages
  devise_for :users, :controllers => {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  get 'post_events/event' => 'post_events#search_filter'
  get 'post_events/download/:id/:image_position' => 'post_events#download'
  resources :post_events

  resources :forms

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

