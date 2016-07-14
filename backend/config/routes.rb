Rails.application.routes.draw do
  resources :reservations
  resources :tables do
    resources :reservations, only: [:index, :create]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
