Rails.application.routes.draw do
  
  root 'post_events#index'

  devise_for :users
  namespace 'api' do
    namespace 'v1' do
      get '/post_events/event/:category' => 'post_events#show_by_category'
      resources :post_events
      get '/messages_by_post/:id' => 'messages#index'
      patch '/messages/update_content/:id/:message' => 'messages#update_content'
      resources :messages
    end
  end

  get 'post_events/event' => 'post_events#search_filter'
  get 'post_events/download/:id/:image_position' => 'post_events#download'

  resources :post_events
  get 'admin/check' => 'post_events#check_admin'
  post 'archive' => 'post_events#archive_events'

  resources :forms

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
