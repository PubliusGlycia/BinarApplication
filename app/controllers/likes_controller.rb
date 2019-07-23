class LikesController < ApplicationController
  before_action :find_post_event

  def create
    @post_event.likes.create(user_id: current_user.id) unless already_liked?
  end

  private

  def find_post_event
    @post_event = PostEvent.find(params[:post_event_id])
  end

  def already_liked?
    Like.where(user_id: current_user.id, post_event_id:
    params[:post_event_id]).exists?
  end
end
