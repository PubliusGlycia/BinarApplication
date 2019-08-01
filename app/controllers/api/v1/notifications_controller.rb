class Api::V1::NotificationsController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index_per_user
    @count = Notification.select('max(id) as id, notification_type, post_event_id, user_id, count(*)').
      group(:notification_type, :post_event_id, :user_id)
    @notification_data = @count.where(user_id: params[:user_id])
    @user_email = User.where(id: params[:user_id]).first.email
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
