module V1
  class AuditsApi < Grape::API
    include Defaults

    resource :audits do
      oauth2 'private_user'

      route_param :id do

        desc 'Get a specific Audit record'
        get '' do
          present Audited::Audit.where(id:params[:id]).first
        end
      end

      desc 'Gets all audit records'
      get '' do
        present Audited::Audit.all
      end

      delete 'prune' do

        Audited::Audit.order('created_at DESC').offset(10000).destroy_all
        present {}

      end


    end

  end
end