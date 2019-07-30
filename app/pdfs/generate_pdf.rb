class GeneratePdf < Prawn::Document
  def initialize(post_events)
    super(page_size: 'A4')
    @post_events = post_events
    fonts_initialize
    draw_pdf
  end

  def fonts_initialize
    font_families.update('LatoRegular' =>
      { normal: Rails.root.join('app', 'assets', 'fonts', 'Lato-Regular.ttf').to_s })
    font_families.update('LatoBold' =>
      { normal: Rails.root.join('app', 'assets', 'fonts', 'Lato-Bold.ttf').to_s })
    font_families.update('LatoBlack' =>
      { normal: Rails.root.join('app', 'assets', 'fonts', 'Lato-Black.ttf').to_s })
    font_families.update('LatoLight' =>
      { normal: Rails.root.join('app', 'assets', 'fonts', 'Lato-Light.ttf').to_s })
  end

  def draw_pdf
    font 'LatoBlack'
    move_down 50
    text "binar<font name='LatoLight'>lista</font>", align: :center, size: 40, color: '2B185C', inline_format: true

    move_down 10
    date = Date.current.to_s
    text date, align: :right, color: '4919AA'
    fill_color '000000'
    font 'LatoRegular'
    @post_events.each do |post_event|
      move_down 25
      fill { circle [0, cursor - 7], 2 }
      text_box post_event.title, size: 14, at: [10, cursor]
    end
  end
end
