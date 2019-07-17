Rails.application.routes.draw do

  devise_for :users
  resources :post_events do
    resources :likes
  end
  get 'post_events/event/:category' => 'post_events#show_by_category'

  resources :forms

  root 'post_events#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

