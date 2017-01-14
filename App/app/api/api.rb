class API < Grape::API
  prefix 'api'
  format :json
  mount V1::Base
  add_swagger_documentation
end