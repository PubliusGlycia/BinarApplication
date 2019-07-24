require 'rails_helper'

RSpec.describe Api::V1::LikesController, type: :controller do
  let (:user1) {create(:user)}
  let (:user2) {create(:user)}
  let (:event) {create(:valid_post_event, user_id: user1.id) }

  before{sign_in(user1)}

  describe 'GET #index' do

    subject {get :index,
      params: { post_event_id: event.id },
      format: :json}

    describe 'successful response' do
      before { subject }
      it { expect(response).to be_successful }
      it { expect(response).to render_template('index') }
    end

    context 'post likes' do
      let!(:like1) {create(:like, user_id: user1.id, post_event_id: event.id)}
      let!(:like2) {create(:like, user_id: user2.id, post_event_id: event.id)}
      before { subject }
      describe 'likes info' do
        it { expect(assigns(:already_liked)).to eq(true) }
        it { expect(assigns(:likes_count)).to eq(2) }
      end
    end
  end

  describe 'POST #create' do
    context 'valid attributes' do
      subject { post :create, params: {post_event_id: event.id} }
      it { expect { subject }.to change(Like, :count) }
    end
  end

end
