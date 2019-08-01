# Preview all emails at http://localhost:3000/rails/mailers/notification_mailer
class NotificationMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/notification_mailer/post_create_email
  def post_create_email
    NotificationMailer.post_create_email('default@email.com')
  end

  # Preview this email at http://localhost:3000/rails/mailers/notification_mailer/post_edit_email
  def post_edit_email
    NotificationMailer.post_edit_email('default@email.com')
  end

  # Preview this email at http://localhost:3000/rails/mailers/notification_mailer/post_delete_email
  def post_delete_email
    NotificationMailer.post_delete_email('default@email.com')
  end

    # Preview this email at http://localhost:3000/rails/mailers/notification_mailer/post_approve_email
    def post_approve_email
      NotificationMailer.post_approve_email('default@email.com')
    end

      # Preview this email at http://localhost:3000/rails/mailers/notification_mailer/comment_new_email
  def comment_new_email
    NotificationMailer.comment_new_email('default@email.com')
  end
end
