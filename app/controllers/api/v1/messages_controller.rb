class Api::V1::MessagesController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    message_with_user = Message.includes(:user)
    @post_messages = message_with_user.where(post_event_id: params[:id]).order(created_at: :desc)
  end

  def create
    @message = current_user.messages.build(message_params)

    admin = User.where(admin: true).first

    if @message.save
      if admin.id != @message.user_id
        Notification.create(notification_type: 5, post_event_id: @message.post_event_id, user_id: admin.id)

        # [fix] email_fix # 'adamjedrzejec@gmail.com' -> admin.email
        NotificationMailer.comment_new_email('adamjedrzejec@gmail.com').deliver

        SlackNotifier::CLIENT.ping "💸 Hey! Nowy komentarz od #{current_user.email}! 💸"
      end

      if @message.post_event.user_id != @message.user_id
        Notification.create(notification_type: 5,
                            post_event_id: @message.post_event_id,
                            user_id: @message.post_event.user_id)
        post_author = User.where(id: @message.post_event.user_id).first

        # [fix] email_fix # 'adamjedrzejec@gmail.com' -> post_author.email
        NotificationMailer.comment_new_email('adamjedrzejec@gmail.com').deliver
      end
    else
      render json: @message.errors, status: :unprocessable_entity
    end
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
