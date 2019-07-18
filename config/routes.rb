Rails.application.routes.draw do

  resources :post_events
  get 'post_events/event/:category' => 'post_events#show_by_category'

  resources :forms
  resources :messages
  
  root 'navbar#home'

  get '/messages_by_post/:id' => 'messages#show_by_post_id'

  # get '/messages' => 'messages#index';
  # get '/messages/new' => 'messages#new';
  # post '/messages' => 'messages#create';

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

