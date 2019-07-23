require 'rails_helper'

RSpec.describe Api::V1::MessagesController, type: :controller do
  let (:user) { create(:user) }
  let (:post_event) { create(:valid_post_event, user_id: user.id) }
  before {sign_in(user)}

  describe 'GET #index' do
    subject { get :index , params: { id: post_event.id} }

    describe 'successful response' do
      before { subject }
      it { expect(response).to be_successful }
      it { expect(response).to render_template('index') }
    end
    
    context 'messages' do

      let(:message1) { create(:valid_message, user_id: user.id, post_event_id: post_event.id) }
      let(:message2) { create(:valid_message, user_id: user.id, post_event_id: post_event.id) }

      it 'returns all messages' do
        subject
        expect(assigns(:post_messages)).to match_array([message1, message2])
      end
    end
  end

  describe 'POST #create' do
    let(:message) { create(:valid_message, user_id: user.id, post_event_id: post_event.id) }    

    describe 'successful response' do
      it { expect(response).to be_successful }
    end

    it 'creates a message' do
      get :index , params: { id: post_event.id}
      expect(assigns(:post_messages)).to match_array([message])
    end

  end

end
