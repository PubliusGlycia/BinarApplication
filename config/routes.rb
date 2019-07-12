Rails.application.routes.draw do

  resources :post_events
  get 'post_events/event/:category' => 'post_events#show_by_category'

  resources :forms

  # root 'navbar#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

