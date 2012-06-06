require 'rake'
require 'active_record'
require 'yaml'
require 'logger'

namespace :db do
  task :loadconfig do
    DB_config = YAML::load( File.open('db/config.yml') )['development']
  end

  desc "Run migrations"
  task :migrate => :loadconfig do
    ActiveRecord::Base.logger = Logger.new(STDOUT)
    ActiveRecord::Base.establish_connection(DB_config)
    ActiveRecord::Migrator.up "db/migrate/"  
  end
end