require 'rails_helper'

RSpec.describe PostEventsController, type: :controller do

    describe 'GET #index' do
    subject { get :index }

    describe 'successful response' do
      before { subject }
      it { expect(response).to be_successful }
      it { expect(response).to render_template('index') }
    end

    context 'authors' do
      let(:event1) { create(:valid_post_event) }
      let(:event2) { create(:valid_post_event) }

      it 'returns all authors' do
        subject
        expect(assigns(:post_events)).to match_array([event1, event2])
      end
    end
  end

  describe 'GET #show' do
    let(:event) { create(:valid_post_event) }
    before { get :show, params: { id: event.id } }

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

end