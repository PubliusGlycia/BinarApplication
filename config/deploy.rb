# config valid for current version and patch releases of Capistrano
lock "~> 3.11.0"

set :repo_url,  "git@github.com:PubliusGlycia/BinarApplication.git"
set :stages,    %w(production)

append :linked_files, %w(config/database.yml config/unicorn.rb)
append :linked_dirs, %w(log vendor/bundle tmp/sockets tmp/pids tmp/cache)

set :keep_releases, 5
set :normalize_asset_timestamps, %(public/images public/javascripts public/stylesheets)
