class PostEventsController < ApplicationController
  before_action :authenticate_user!

  def index
    @post_events = PostEvent.all
  end

  def generate_pdf
    if current_user.admin
      @post_events = PostEvent.where(id: params[:post_event_ids], category: 'supply').order(title: :asc)
      name = 'Shopping_list_' + Date.current.to_s

      send_data(GeneratePdf.new(@post_events).render, filename: name, type: 'application/pdf', disposition: 'inline')
    else
      head 404
    end
  end
end
