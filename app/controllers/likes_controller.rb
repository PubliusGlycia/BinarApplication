class LikesController < ApplicationController
  before_action :set_post_event
  before_action :set_like, only: [:destroy]
  before_action :authenticate_user!

  def create
    @post_event.likes.create(user_id: current_user.id) unless already_liked?
  end

  def index
    @likes_count = @post_event.likes.count
    @already_liked = already_liked?

    if @already_liked
      @user_like_id = @post_event.likes.where(user_id: current_user.id).first.id
    else
      @user_like_id = nil
    end
  end

  def destroy
    return head 404 unless already_liked?

    @like.destroy
  end

  private

  def set_post_event
    @post_event = PostEvent.find(params[:post_event_id])
  end

  def already_liked?
    Like.where(user_id: current_user.id, post_event_id: params[:post_event_id]).exists?
  end

  def set_like
    @like = @post_event.likes.find(params[:id])
  end
end
