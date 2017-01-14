require 'rails_helper'
require "rspec/json_expectations"

RSpec.describe 'WidgetsApi' do
  include Rack::Test::Methods

  def app
    API::V1::WidgetsApi
  end

  before(:each) do

  end

  it 'returns widgets' do

    widget = FactoryGirl.create(:widget)

    get '/api/v1/widgets'
    expect(last_response.status).to eq(200)
    expect(last_response.body).to be_json_eql [widget].to_json
  end


end