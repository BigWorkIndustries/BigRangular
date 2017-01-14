module V1
  class Base < Grape::API
    version 'v1', using: :path
    mount V1::AuditsApi
    mount V1::WidgetsApi
  end
end