Rails.application.routes.draw do

  root 'post_events#index'

  devise_for :users
  namespace 'api' do
    namespace 'v1' do
      get 'post_events/event/:category' => 'post_events#show_by_category'
      resources :post_events
    end
  end

  get 'post_events/event' => 'post_events#search_filter'
  get 'post_events/download/:id/:image_position' => 'post_events#download'
  get 'user/check' => 'post_events#check_user'
  get 'post_events/event/:category' => 'post_events#show_by_category'

  resources :post_events
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
