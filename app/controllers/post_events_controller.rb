class PostEventsController < ApplicationController
  before_action :authenticate_user!
  def index
    @post_events = PostEvent.all
  end

end
