namespace :app do
  desc 'Writes a JSON config file for use in the web application.'
  task :write_config, [:file] => [:environment] do |t, args|
    #puts "work", args
    #puts "Rails.env: " + Rails.env
    #puts Dir.pwd

    config = App::AppConfig::Client.config

    File.open(args[:file],"w") do |f|
      f.write(config.to_json)
    end

    end

end
