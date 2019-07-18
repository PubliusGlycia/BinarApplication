class LikesController < ApplicationController
    before_action :find_post_event

    def create
        if current_user && !already_liked?
            @post_event.likes.create(user_id: current_user.id)
        end
    end

    def show_likes_count
        @post_event.likes.count
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
