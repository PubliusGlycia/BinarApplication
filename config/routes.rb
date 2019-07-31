Rails.application.routes.draw do
  root 'post_events#index'
  get 'shopping_list' => 'post_events#generate_pdf'

  devise_for :users, :controllers => {
      omniauth_callbacks: 'users/omniauth_callbacks'
  }

  namespace 'api' do
    namespace 'v1' do
      get 'post_events/event' => 'post_events#search_filter'
      get 'post_events/archive' => 'post_events#archive_list'
      get 'post_events/download/:id/:image_position' => 'post_events#download'
      post 'archive' => 'post_events#archive_events'
      get 'admin/check' => 'post_events#check_admin'

      resources :post_events do
        resources :likes, :only => [:create, :destroy, :index]
      end

      get '/messages_by_post/:id' => 'messages#index'
      patch '/messages/update_content/:id/:message' => 'messages#update_content'
      resources :messages
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
