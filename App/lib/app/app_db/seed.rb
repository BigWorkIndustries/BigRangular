module App

  module AppDb

    class Seed

      def self.test

        non_production

      end

      def self.development

        non_production
        #create_demo_shipments

      end

      def self.qa

        non_production

      end

      def self.stage

        non_production

      end

      def self.production

        all_environments
        create_test_users

      end

      def self.non_production
        all_environments
        create_test_users
        create_demo_widgets
      end

      def self.all_environments
        create_oauth_applications

      end

      def self.create_test_users
        User.where(email: 'test@test.com').first_or_create({email: 'test@test.com', password: 'aaaaaaaa', password_confirmation: 'aaaaaaaa'}).save
      end

      def self.create_oauth_applications
        uid = Rails.configuration.x.public[:services][:oauth][:uid]
        secret = Rails.configuration.x.private[:services][:oauth][:secret]
        Doorkeeper::Application.where(name: 'web-app').first_or_create({name: 'web-app', scopes: 'private_user', redirect_uri: 'urn:ietf:wg:oauth:2.0:oob', uid: uid, secret: secret}).save
      end

      def self.create_demo_widgets


        Widget.where(name:'widget-1').first_or_create(name:'widget-1').save
        Widget.where(name:'widget-2').first_or_create(name:'widget-2').save
        Widget.where(name:'widget-3').first_or_create(name:'widget-3').save

      end



    end

  end
end