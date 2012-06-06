require 'active_record'
require 'yaml'

config = YAML::load( File.open('db/config.yml') )['development']
ActiveRecord::Base.establish_connection(config)

class Note < ActiveRecord::Base
end

class Notable < Sinatra::Base
  
  require 'json'

  get '/' do
    haml :index
  end

  get '/notes' do
    notes = Note.all
    status_ok
    body notes.to_json
  end

  post '/notes' do
    note = Note.new(params)
    if note.save
      status_ok
      body note.to_json
    else
      status_unprocessable_entity
      body({ :error => "Could not save note, don't look at me!" }.to_json)
    end
  end

  private

  def status_ok
    status 200
  end

  def status_unprocessable_entity
    status 422
  end

end