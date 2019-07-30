class PostEventsController < ApplicationController
  before_action :authenticate_user!

  def index
    @post_events = PostEvent.all
  end

  def generate_pdf
    if current_user.admin
      @post_events = PostEvent.where(id: params[:post_event_ids], category: 'supply')
      send_data(GeneratePdf.new(@post_events).render, filename: 'test', type: 'application/pdf', disposition: 'inline')
    else
      head 404
    end
  end

  private

  def check_admin
    return @current_user_id = true if current_user.admin
  end
end
