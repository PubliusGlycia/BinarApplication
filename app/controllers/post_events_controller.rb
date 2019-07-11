class PostEventsController < ApplicationController
  before_action :set_post_event, only: [:show, :edit, :update, :destroy]

  # GET /post_events
  # GET /post_events.json
  def index
    @post_events = PostEvent.all
  end

  def show_by_category
    @post_events = PostEvent.where(category: params[:category])
  end

  # POST /post_events
  # POST /post_events.json
  def create

    @post_event = PostEvent.new(post_event_params)
    
    #if @post_event.images.attached?
      @post_event.images.attach(params[:image])
    #end
      
    respond_to do |format|
      if @post_event.save
        format.json { render :show, status: :created, location: @post_event }
      else
        format.json { render json: @post_event.errors, status: :unprocessable_entity }
      end
    end
  end

  def show_by_category
    @post_events = PostEvent.where(category: params[:category])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post_event
      @post_event = PostEvent.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_event_params
      params.require(:post_event).permit(:title, :description, :category, :importance, )
    end
end
