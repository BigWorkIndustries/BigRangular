module V1
  class WidgetsApi < Grape::API
    include Defaults

    resource :widgets do
      oauth2 'private_user'

      get '' do
        present Widgets.all
      end

    end

  end
end