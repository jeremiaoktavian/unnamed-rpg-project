class Scene_Title < Scene_Base
  alias :font_change_draw_game_title :draw_game_title
  def draw_game_title
    @foreground_sprite.bitmap.font.name = ["Aquiline Two"]
    font_change_draw_game_title
  end
end