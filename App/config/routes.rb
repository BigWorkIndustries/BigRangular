
Rails.application.routes.draw do
  mount Delayed::Web::Engine, at: '/jobs'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: redirect('/app')

  scope 'api' do
    scope 'v1' do
      devise_for :users
      use_doorkeeper
    end

  end

  mount API => '/'
end
