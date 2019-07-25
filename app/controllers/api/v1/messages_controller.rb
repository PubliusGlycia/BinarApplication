class Api::V1::MessagesController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    message_with_user = Message.includes(:user)
    @post_messages = message_with_user.where(post_event_id: params[:id]).order(created_at: :desc)
  end

  def create
    @message = current_user.messages.build(message_params)

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
