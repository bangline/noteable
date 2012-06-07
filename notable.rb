require 'active_record'
require 'yaml'

config = YAML::load( File.open('db/config.yml') )['development']
ActiveRecord::Base.establish_connection(config)

ActiveRecord::Base.include_root_in_json = false

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
    puts notes.to_json.inspect
    body notes.to_json
  end

  post '/notes' do
    note = Note.new(note_params)
    if note.save
      status_ok
      body note.to_json
    else
      status_unprocessable_entity
      body({ :error => "Could not save note, don't look at me!" }.to_json)
    end
  end

  put '/notes/:id' do
    note = Note.find(params[:id])
    if note.update_attributes(note_params)
      status_ok
      body note.to_json
    else
      status_unprocessable_entity
      body({ :error => "Could not save note, don't look at me!" }.to_json)
    end
  end

  delete '/notes/:id' do
    note = Note.find(params[:id])
    if note.delete
      status_ok
    else
      status_unprocessable_entity
      body({ :error => "Could not save note, don't look at me!" }.to_json)
    end
  end

private

  def note_params
    JSON.parse(request.body.read)
  end

  def status_ok
    status 200
  end

  def status_unprocessable_entity
    status 422
  end

end