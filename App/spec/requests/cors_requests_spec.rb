require 'rails_helper'

RSpec.describe "CorsRequests", type: :request do
  it "should return CORS headers" do
    reset!
    integration_session.__send__ :process, 'OPTIONS','/'

    expect(response.headers.keys).to include(
                                         'Access-Control-Allow-Origin',
                                         'Access-Control-Allow-Methods',
                                         'Access-Control-Allow-Headers',
                                         'Access-Control-Max-Age',
                                     )
  end
end
