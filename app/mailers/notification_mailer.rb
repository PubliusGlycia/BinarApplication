class NotificationMailer < ApplicationMailer
  def post_create_email(email)
    @email = email
    mail to: @email, subject: '[BO] New post has been created!'
  end

  def post_edit_email(email)
    @email = email
    mail to: @email, subject: '[BO] Post has been edited!'
  end

  def post_delete_email(email)
    @email = email
    mail to: @email, subject: '[BO] Post has been deleted!'
  end

  def post_approve_email(email)
    @email = email
    mail to: @email, subject: '[BO] Your post has been approved!'
  end

  def comment_new_email(email)
    @email = email
    mail to: @email, subject: '[BO] You have some new comments under your post!'
  end
end
