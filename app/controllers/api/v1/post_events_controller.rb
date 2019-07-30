class Api::V1::PostEventsController < Api::V1::ApplicationController
  before_action :set_post_event, only: [:destroy]

  def index
    @post_events = PostEvent.all
  end

  def search_filter
    @post_events = PostEvent.where(category: params[:category])
    @post_events = @post_events.where(archive: false)
    # rubocop:disable Rails/DynamicFindBy
    @post_events = @post_events.find_by_title(params[:search_phrase]) if params[:search_phrase]
    # rubocop:enable Rails/DynamicFindBy
    @post_events = @post_events.order(:importance, :created_at)

  end

  def show
    @post_event = PostEvent.find(params[:id])
  end

  def download
    image = PostEvent.find(params[:id]).images[params[:image_position].to_i]
    send_data("http://localhost:3000#{rails_blob_path(image, only_path: true)}", filename: image.filename.to_s)
  end

  # UPDATE
  def update
    post_event = PostEvent.find(params[:id])
    post_event.update(post_event_params)
  end

  def archive_events
    @post_events = PostEvent.where(id: params[:post_event_ids])
    # rubocop:disable Rails/SkipsModelValidations
    @post_events.update_all(archive: true)
    # rubocop:enable Rails/SkipsModelValidations
    head :ok
  end

  def generate_pdf
    @post_event = PostEvent.where(id: params[:post_event_ids])
  end

  def destroy
    return head 404 unless @post_event.user_id == current_user.id || current_user.admin == true

    @post_event.destroy
  end

  def check_admin
    return @current_user_id = true if current_user.admin

    @current_user_id = current_user.id
    @current_user_email = current_user.email
  end

  def create
    @post_event = current_user.post_event.build(post_event_params)
    @post_event.images.attach(params[:image]) if params[:image]

    @post_event.save
  end

  def archive_list
    @post_events = PostEvent.where(archive: true).order(created_at: :desc) if current_user.admin
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post_event
    @post_event = PostEvent.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def post_event_params
    params.require(:post_event).permit(:title, :description, :category, :importance, :in_progress, :user_id)
  end
end
