module PostEventControllerMacros

def login_user
    before(:each) do
        @request.env["devise.mapping"] = Devise.mappings[:user]
        user = create(:user)
        user.confirm! 
        sign_in user
        return user
    end
end