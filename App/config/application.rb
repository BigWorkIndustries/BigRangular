require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.active_support.escape_html_entities_in_json = false

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true

    config.middleware.insert_before 0, Rack::Cors, :debug => true, :logger => (-> { Rails.logger }) do
      allow do
        origins '*'

        resource '/cors',
                 :headers => :any,
                 :methods => [:post],
                 :credentials => true,
                 :max_age => 0

        resource '*',
                 :headers => :any,
                 :methods => [:get, :post, :delete, :put, :patch, :options, :head],
                 :expose  => [ 'X-Total', 'X-Total-Pages', 'X-Page', 'X-Per-Page', 'X-Next-Page', 'X-Prev-Page', 'X-Offset']
                 #:expose  => ['access-token', 'expiry', 'token-type', 'uid', 'client'],
                 #:max_age => 0
      end
    end

    config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.helper false
      #g.views false
      g.template_engine false
      g.assets false
      g.test_framework :rspec, :view_specs => false #, :request_specs => false
      g.factory_girl dir: 'spec/factories'
    end

    # Use memory store for assets cache to avoid caching
    # to tmp/assets, because it causes hiding of deprecation messages in
    # stylesheets, sometimes break parallel_tests and doesn't always refresh
    # gem stylesheets in development
    config.assets.configure do |env|
      env.cache = ActiveSupport::Cache.lookup_store(:memory_store)
    end

    ### AUTOLOAD ###
    # LIB
    config.autoload_paths += %W(#{Rails.root}/lib/)
    config.autoload_paths += Dir["#{config.root}/lib/**/"]

    config.eager_load_paths += %W(#{Rails.root}/lib/)
    config.eager_load_paths += Dir["#{config.root}/lib/**/"]
    #config.autoload_paths += %W(#{config.root}/lib)
    #config.autoload_paths += Dir["#{config.root}/lib/**/"]
    # API

    #config.paths.add File.join('app', 'api'), glob: File.join('**', '*.rb')
    #config.autoload_paths += Dir[Rails.root.join('app', 'api', '*')]

    config.active_job.queue_adapter = :delayed_job

    config.logger = Logger.new(STDOUT)
    config.logger.level = Logger.const_get((ENV["LOG_LEVEL"] || "INFO").upcase)

    config.x.public = {}
    config.x.public[:services] = {}
    config.x.public[:services][:oauth] = {}

    config.x.public[:urls] = {}

    config.x.private = {}
    config.x.private[:services] = {}
    config.x.private[:services][:oauth] = {}
    config.x.private[:services][:analytics] = {}

  end
end
