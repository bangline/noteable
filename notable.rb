class Notable < Sinatra::Base
  
  require 'json'

  get '/' do
    haml :index
  end

end