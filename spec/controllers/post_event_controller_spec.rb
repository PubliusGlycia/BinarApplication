require 'rails_helper'

RSpec.describe Api::V1::PostEventsController, type: :controller do
  let (:user) { create(:user) }
  before {sign_in(user)}

  describe 'GET #index' do
    subject { get :index, format: :json }

    describe 'successful response' do
      before { subject }
      it { expect(response).to be_successful }
      it { expect(response).to render_template('index') }
    end

    context 'events' do

      let(:event1) { create(:valid_post_event, user_id: user.id) }
      let(:event2) { create(:valid_post_event, user_id: user.id) }

      it 'returns all events' do
        subject
        expect(assigns(:post_events)).to match_array([event1, event2])
      end
    end
  end

  describe 'GET #show' do

    let(:event) { create(:valid_post_event, user_id: user.id) }
    before { get :show, params: { id: event.id }, format: :json  }

    describe 'successful response' do
      it { expect(response).to be_successful }
      it { expect(response).to render_template('show') }
    end

    context 'post' do
      it 'returns post by given id' do
        expect(assigns(:post_event)).to eq(event)
      end
    end
  end

  describe 'Archive' do

    let!(:event_to_archive) { create(:valid_post_event, user_id: user.id) }
    before { post :archive_events, params: {post_event_ids: event_to_archive.id} }

    describe 'Element succesfully' do
      it {expect(response).to be_successful}
      it {expect(event_to_archive.reload.archive).to eq(true)}
    end

  end

end