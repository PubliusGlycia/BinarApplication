class Api::V1::MessagesController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    message_with_user = Message.includes(:user)
    @post_messages = message_with_user.where(post_event_id: params[:id]).order(created_at: :desc)
  end

  def create
    @message = current_user.messages.build(message_params)

    admin_id = User.where(admin: true).first.id

    if (admin_id != @message.user_id)
      Notification.create(notification_type: 5, post_event_id: @message.post_event_id, user_id: admin_id)
      SlackNotifier::CLIENT.ping "💸 Hey! New comment from #{current_user.email}! 💸"
    end

    if (@message.post_event.user_id != @message.user_id)
      Notification.create(notification_type: 5, post_event_id: @message.post_event_id, user_id: @message.post_event.user_id)
    end

    format.json { render json: @message.errors, status: :unprocessable_entity } unless @message.save
  end

  def update_content
    message = Message.find(params[:id])
    new_message = params[:message]

    message.update(content: new_message)
  end

  private

  def message_params
    params.require(:message).permit(:content, :post_event_id)
  end
end
