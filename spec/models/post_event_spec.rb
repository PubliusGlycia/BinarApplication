require 'rails_helper'

RSpec.describe PostEvent, type: :model do

    describe 'attributes' do
        it { expect(subject.attributes).to include('title', 'description', 'category', 'importance') }
    end

    describe 'validation' do
        it { is_expected.to validate_presence_of(:title) }
        it { is_expected.to validate_length_of(:title).is_at_most(40) }
        it { is_expected.to validate_length_of(:description).is_at_most(300) }
    end

    describe 'choose one of options' do
        it { is_expected.to validate_inclusion_of(:category).in_array(%w[defect supply others]) }
        it { is_expected.to validate_inclusion_of(:importance).in_array(%w[important trivial]) }
    end

    describe 'images' do
        let(:sample_post) { build(:valid_post_event) }
        let(:bad_sample_post) { build(:invalid_post_event) }

        describe ' format of image ' do
            it 'invalid format of image' do
                bad_sample_post.validate
                expect(bad_sample_post.errors[:images]).to match_array( "image needs to be png / jpeg / jpg")
            end

            it 'valid format of image' do
                sample_post.validate
                expect(sample_post.errors[:images]).to be_empty
            end
        end
    end

end