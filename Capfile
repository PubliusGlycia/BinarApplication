require 'capistrano/setup'
require 'capistrano/deploy'

require 'capistrano/scm/git'
install_plugin Capistrano::SCM::Git

require 'capistrano/rvm'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
# require 'capistrano/rbenv'
# require 'capistrano/chruby'
# require 'capistrano/passenger'

Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
