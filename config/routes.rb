Rails.application.routes.draw do
  get 'post_events/event' => 'post_events#show_by_category'
  resources :post_events
    
  resources :forms

  # root 'navbar#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

