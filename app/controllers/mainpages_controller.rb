class MainpagesController < ApplicationController
  before_action :set_mainpage, only: [:show, :edit, :update, :destroy]

  # GET /mainpages
  # GET /mainpages.json
  def index
    @mainpages = Mainpage.all
  end

  # GET /mainpages/1
  # GET /mainpages/1.json
  def show
  end

  # GET /mainpages/new
  def new
    @mainpage = Mainpage.new
  end

  # GET /mainpages/1/edit
  def edit
  end

  # POST /mainpages
  # POST /mainpages.json
  def create
    @mainpage = Mainpage.new(mainpage_params)

    respond_to do |format|
      if @mainpage.save
        format.html { redirect_to @mainpage, notice: 'Mainpage was successfully created.' }
        format.json { render :show, status: :created, location: @mainpage }
      else
        format.html { render :new }
        format.json { render json: @mainpage.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /mainpages/1
  # PATCH/PUT /mainpages/1.json
  def update
    respond_to do |format|
      if @mainpage.update(mainpage_params)
        format.html { redirect_to @mainpage, notice: 'Mainpage was successfully updated.' }
        format.json { render :show, status: :ok, location: @mainpage }
      else
        format.html { render :edit }
        format.json { render json: @mainpage.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mainpages/1
  # DELETE /mainpages/1.json
  def destroy
    @mainpage.destroy
    respond_to do |format|
      format.html { redirect_to mainpages_url, notice: 'Mainpage was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mainpage
      @mainpage = Mainpage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mainpage_params
      params.require(:mainpage).permit(:title)
    end
end
