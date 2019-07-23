require 'rails_helper'

RSpec.describe MessagesController, type: :controller do
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
    
    context 'events' do

      let(:message1) { create(:valid_message, user_id: user.id, post_event_id: post_event.id) }
      let(:message2) { create(:valid_message, user_id: user.id, post_event_id: post_event.id) }

      it 'returns all events' do
        subject
        expect(assigns(:post_messages)).to match_array([message1, message2])
      end
    end
  end

  # it 'should require content' do
  #   expect(user.messages.build()).to be_valid
  #   expect(user.messages.build(content: 'test')).to be_valid
  # end
end
