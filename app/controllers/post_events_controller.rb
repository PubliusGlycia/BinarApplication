class PostEventsController < ApplicationController
  before_action :set_post_event, only: [:show, :edit, :update, :destroy]

  # GET /post_events
  # GET /post_events.json
  def index
    @post_events = PostEvent.all
  end

  # GET /post_events/1
  # GET /post_events/1.json
  def show
  end

  # GET /post_events/new
  def new
    @post_event = PostEvent.new
  end

  # GET /post_events/1/edit
  def edit
  end

  # POST /post_events
  # POST /post_events.json
  def create
    @post_event = PostEvent.new(post_event_params)

    respond_to do |format|
      if @post_event.save
        format.html { redirect_to @post_event, notice: 'Post event was successfully created.' }
        format.json { render :show, status: :created, location: @post_event }
      else
        format.html { render :new }
        format.json { render json: @post_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /post_events/1
  # PATCH/PUT /post_events/1.json
  def update
    respond_to do |format|
      if @post_event.update(post_event_params)
        format.html { redirect_to @post_event, notice: 'Post event was successfully updated.' }
        format.json { render :show, status: :ok, location: @post_event }
      else
        format.html { render :edit }
        format.json { render json: @post_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /post_events/1
  # DELETE /post_events/1.json
  def destroy
    @post_event.destroy
    respond_to do |format|
      format.html { redirect_to post_events_url, notice: 'Post event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post_event
      @post_event = PostEvent.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_event_params
      params.require(:post_event).permit(:title, :desc, :category, :importance)
    end
end
