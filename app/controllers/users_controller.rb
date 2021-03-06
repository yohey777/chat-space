class UsersController < ApplicationController
  def index
    #currentユーザーは取り除く
    # @users =User.where('name LIKE(?) and name != ?', "%#{params[:keyword]}%",current_user.name)
    @users =User.where('name LIKE(?) and name != ?', "%#{params[:keyword]}%",current_user.name)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit

  end

  def update
    if current_user.update(user_params)
        redirect_to root_path
      else
        render :edit
      end
  end

  private
  def user_params
    params.require(:user).permit(:mail,:name)
  end
end
