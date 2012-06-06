require 'rake'
require 'active_record'
require 'yaml'
require 'logger'

namespace :db do
  task :loadconfig do
    db_config = YAML::load( File.open('db/config.yml') )['development']
  end

  desc "Run migrations"
  task :migrate => :loadconfig do
    ActiveRecord::Base.logger = Logger.new(STDOUT)
    ActiveRecord::Base.establish_connection(db_config)
    ActiveRecord::Migrator.up "db/migrate/"  
  end
end