class MessagesController < ApplicationController
    before_action :set_message, only: [:show, :edit, :update, :destroy]
    before_action :authenticate_user!

    def index
        @messages = Message.all
        # render json: @messages, status: :ok
    end

    def new
        @message = Message.new
    end

    def show_by_post_id
        @post_messages = Message.where(post_event_id: params[:id])
    end

    # POST /messages
    # POST /messages.json
    def create
        #message = Message.new(message_params)
        @message = current_user.message.build(message_params)
        # console.log('USER: ' + current_user)
        #message.user = current_user
        #@message = message
        @message.save

        # respond_to do |format|
        #     if @message.save
        #       format.json { render :create, status: :created, location: @message }
        #     else
        #       format.json { render json: @message.errors, status: :unprocessable_entity }
        #     end
        # end
    end

    private

    def set_post_event
        @post_event = PostEvent.find(params[:id])
    end

    def message_params
        params.require(:message).permit(:user_id, :content, :post_event_id)
    end
end
