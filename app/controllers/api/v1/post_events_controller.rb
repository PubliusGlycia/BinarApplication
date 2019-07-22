class Api::V1::PostEventsController < Api::V1::ApplicationController
    before_action :set_post_event, only: [:show, :edit, :update, :destroy]
    before_action :authenticate_user!
    # GET /post_events.json
    def index
      if current_user
        @post_events = PostEvent.all
      end
    end
  
    def show_by_category
      if current_user
        @post_events = PostEvent.where(category: params[:category])
        render :index
      end
    end
  
    def show
      @post_event = PostEvent.find(params[:id])
    end

    # POST /post_events.json
    def create
  
      if current_user
        post_event = PostEvent.new(post_event_params)
        post_event.user = current_user
        @post_event = post_event
      
        if params[:image]
          @post_event.images.attach(params[:image])
        end
  
      end
  
      respond_to do |format|
        if @post_event.save
          format.json { render :show, status: :created, location: @post_event }
        else
          format.json { render json: @post_event.errors, status: :unprocessable_entity }
        end
      end
    end
  
  
    # DESTROY
    def destroy
      if @post_event.user_id == current_user.id
        @post_event.destroy
      else
        head 404
      end
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
  