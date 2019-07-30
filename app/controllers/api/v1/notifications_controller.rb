class Api::V1::NotificationsController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    @notifications = Notification.all
  end

  def index_per_user
    @notifications_per_user = Notification.where(user_id: params[:user_id])
  end

  def create
    @notification = Notification.create(notification_params)

    format.json { render json: @notification.errors, status: :unprocessable_entity }
  end

  private

  def notification_params
    params.require(:notification).permit(:notification_type, :post_event_id, :user_id)
  end
end
