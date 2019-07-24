require 'rails_helper'

RSpec.describe Message, type: :model do
  
  describe 'attributes' do
    it { expect(subject.attributes).to include('content', 'user_id', 'post_event_id') }
  end

  describe 'relations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:post_event) }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:content) }
    it { is_expected.to validate_length_of(:content).is_at_most(200) }
  end

end
