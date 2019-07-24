Rails.application.routes.draw do
  root 'post_events#index'


  devise_for :users

  namespace 'api' do
    namespace 'v1' do
      get 'post_events/event' => 'post_events#search_filter'
      get 'post_events/download/:id/:image_position' => 'post_events#download'
      post 'archive' => 'post_events#archive_events'
      get 'admin/check' => 'post_events#check_admin'
      resources :post_events do
        resources :likes, :only => [:create, :destroy, :index]
      end
      get '/messages_by_post/:id' => 'messages#index'
      resources :messages
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
