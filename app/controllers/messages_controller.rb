class MessagesController < ApplicationController
    before_action :set_message, only: [:show, :edit, :update, :destroy]
    before_action :authenticate_user!

    def index
        message_with_user = Message.includes(:user)
        @post_messages = message_with_user.where(post_event_id: params[:id]).order(created_at: :desc)
    end

    def create
        @message = current_user.messages.build(message_params)
        
        if !@message.save
            format.json { render json: @message.errors, status: :unprocessable_entity }
        end
    end

    private

    def set_post_event
        @post_event = PostEvent.find(params[:id])
    end

    def message_params
        params.require(:message).permit(:content, :post_event_id)
    end
end
