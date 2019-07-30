class GeneratePdf < Prawn::Document
    def initialize(post_events)
      super(page_size: 'A4')
      @post_events = post_events
      draw_pdf
    end

    def draw_pdf
      move_down 50
      text 'Hello PDF'
      @post_events.each do |post_event|
        move_down 25
        text '- ' + post_event.title
      end
    end
end