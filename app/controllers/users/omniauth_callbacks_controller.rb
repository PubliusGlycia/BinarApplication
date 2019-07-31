class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user.email == 'karolina@binarapps.com'
      @user.admin = true
    else
      @user.admin = @user.id
    end

    if @user.persisted?
      sign_in_and_redirect @user, event: authenticate_user!
      set_flash_message(:notice, :success, kind: 'Gmail') if is_navigational_format?
    else
      session['devise.google_oauth2_data'] = request.env['omniauth.auth']
      redirect_to new user_registration_url
    end
  end

  def failure
    redirect_to root_path, alert: 'Gmail login failed'
  end
end
