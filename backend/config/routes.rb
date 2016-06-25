Rails.application.routes.draw do
  resources :table_queue_entries
  resources :table_queues do
    resources :table_queue_entries, only: :index
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
