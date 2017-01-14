module App

  module AppConfig

    class Client

      def self.config

        return Rails.configuration.x.public

      end

    end

  end
end