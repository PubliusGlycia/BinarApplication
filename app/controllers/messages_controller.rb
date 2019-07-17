class MessagesController < ApplicationController
    before_action :set_message, only: [:show, :edit, :update, :destroy]

    def index
        @messages = Message.all
        # render json: @messages, status: :ok
    end

    def new
        @message = Message.new
    end

    def create
        @message = Message.new(message_params)

        respond_to do |format|
            if @message.save
              format.json { render :create, status: :created, location: @message }
            else
              format.json { render json: @message.errors, status: :unprocessable_entity }
            end
        end
    end

    private

    def set_post_event
        @post_event = PostEvent.find(params[:id])
    end

    def message_params
        params.require(:message).permit(:author, :content)
    end
end
