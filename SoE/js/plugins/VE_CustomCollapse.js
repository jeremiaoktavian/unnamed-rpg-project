#==============================================================================
# ** Victor Engine - Custom Collapse
#------------------------------------------------------------------------------
# Author : Victor Sant
#
# Version History:
#  v 1.00 - 2011.12.28 > First release
#  v 1.01 - 2011.12.30 > Added custom collapse triggered by skills
#  v 1.02 - 2012.01.07 > Fixed bug with SE filename
#  v 1.03 - 2012.01.14 > Fixed the positive sign on some Regular Expressions
#  v 1.04 - 2012.01.15 > Fixed the Regular Expressions problem with "" and 灯
#  v 1.05 - 2012.08.02 > Compatibility with Basic Module 1.27
#  v 1.06 - 2012.08.18 > Compatibility with Custom Hit Formula
#  v 1.07 - 2012.12.13 > Fixed issue with opacity command
#------------------------------------------------------------------------------
#  This script allows you to create totally custom sequences for enemies and
# actors collapses. You can set wich frame of the collapse sequence each
# effect will be activated.
#------------------------------------------------------------------------------
# Compatibility
#   Requires the script 'Victor Engine - Basic Module' v 1.27 or higher
#   If used with 'Victor Engine - Custom Hit Formula' place this bellow it.
#
# * Overwrite methods
#   None
#
# * Alias methods
#   class Game_Battler < Game_BattlerBase
#     def item_apply(user, item)
#
#   class Game_Enemy < Game_Battler
#     def perform_collapse_effect
#
#   class Game_Actor < Game_Battler
#     def perform_collapse_effect
#
#   class Sprite_Battler < Sprite_Base
#     def initialize(viewport, battler = nil)
#     def start_effect(effect_type)
#     def update_origin
#     def update_effect
#     def revert_to_normal
#
#------------------------------------------------------------------------------
# Instructions:
#  To instal the script, open you script editor and paste this script on
#  a new section bellow the Materials section. This script must also
#  be bellow the script 'Victor Engine - Basic'
#
#------------------------------------------------------------------------------
# Enemies and Actors note tags:
#   Tags to be used on the Enemies and Actors note box in the database.
#
#  <priority collapse> 
#   This tag allows do make the target collapse to play always, even if
#   the action that killed it have a custom collapse.
#
#------------------------------------------------------------------------------
# Enemies, Actors, Skills and Items note tags:
#   Tags to be used on the Enemies, Actors, Skills and Items note box in the
#   database.
#
#  <custom collapse> 
#  duration: x
#  settings
#  </custom collapse>
#   This tag allows to add the custom collapse effect for enemies or
#   actors. You should set the duration of the collapse effect, then set
#   wich frame each effect will take place.
#     duration: x : Duration of the collapse effect. (60 frames = 1 second)
#     [x] effect  : effect setting, x is the frame wich the effect will take
#       place.
#   The effect must be one of the following values:
#     blend: x      : change blend type (0: normal, 1: add, 2: subtract)
#     opacity: x, y : Change opacity x = duration, y = opacity (0-255)
#     fade: x       : Make battler fades. x = duration (opitional)
#     sound: "name" : Play SE. "name" SE filename
#     bgm stop: x   : Fades BGM. x = duration (opitional)
#     animation: x  : Play battle animation. x = animation ID.
#     move x: y     : Move horizontally, y = numeric value, can be negative
#     move y: x     : Move vetically, x = numeric value, can be negative
#     wave on       : Turn on the wave effect
#     wave off      : Turn off the wave effect
#     shake on      : Turn on the shake effect
#     shake off     : Turn off the shake effect 
#     zoom x: d, z  : Horizontal Zoom. d = duration, z = Zoom (default 100)
#     zoom y: d, z  : Vertical Zoom. d = duration, z = Zoom (default 100)
#     color: x, r, g, b, a : change color. x = duration, r = red tone,
#                            g = green tone, b = blue tone, a = alpha channel
#     flash: x, r, g, b, a : screen flash. x = duration, r = red tone,
#                            g = green tone, b = blue tone, a = alpha channel
#     tone: x, r, g, b, y  : change screen tone. x = duration, r = red tone,
#                            g = green tone, b = blue tone, y = gray tone
#
#------------------------------------------------------------------------------
# Additional instructions:
#
#  This script is *VREY* obidient, he won't do anything alone, so every
#  single detail must be added by the user. So if you want a red fade,
#  you must add wich frame the color is changed to red, wich frame the
#  blend is changed to multiply, wich frame the fade starts, and wich frame
#  it plays the collapse sound.
#
#  In case of skills and items with collapse tags, the collapse will be 
#  triggered if the target is killed by the action, this have higher priority
#  than the enemy and actor collapse always, unless the enemy or actor have
#  the <priority collapse>, wich makes the target collapse always plays instead
#   
#  When using animations, remember that they use a different update rate.
#  By default it's 4, so an 30 frames animation, actually takes 120 frames
#  to play. Also, animations become invisible if the battler isn't visible.
#  Keep that in mind when dealing with animations during 
#
#------------------------------------------------------------------------------
# Examples:
#
# This effect have a 330 frames duration, at the start if flashes then
# makes the target fades away slowy while shaking.
#   <custom collapse>
#   duration: 330
#   [300] flash: 20, 255, 255, 255, 200
#   [300] sound: "Thunder6"
#   [250] flash: 20, 255, 255, 255, 200
#   [250] sound: "Earth4"
#   [250] shake on
#   [250] sound: "Thunder6"
#   [200] move y: 5
#   [200] flash: 20, 255, 255, 255, 200
#   [200] sound: "Thunder6"
#   [200] sound: "Monster4"
#   [200] fade
#   [200] blend: 1
#   [200] color: 0, 200,  64, 64, 160
#   [200] wave on
#   </custom collapse>
#   
# This effect display a battle animation and then makes the target fades
#   <custom collapse>
#   duration: 130
#   [120] animation: 97
#   [60] fade
#   </custom collapse>
#
# A simple red fade with collapse sound
#   <custom collapse>
#   duration: 40
#   [40] sound: "Collapse1"
#   [40] blend: 1
#   [40] color: 0, 255, 128, 128, 192
#   [40] fade
#    </custom collapse>
#
# A 'melting' effect
#   <custom collapse>
#   duration: 40
#   [40] sound: "Collapse2"
#   [40] fade
#   [40] zoom_x: 40, 300
#   [40] zoom_y: 40, 10
#   </custom collapse>
#
#==============================================================================

#==============================================================================
# ** Victor Engine
#------------------------------------------------------------------------------
#   Setting module for the Victor Engine
#==============================================================================

module Victor_Engine
  #--------------------------------------------------------------------------
  # * required
  #   This method checks for the existance of the basic module and other
  #   VE scripts required for this script to work, don't edit this
  #--------------------------------------------------------------------------
  def self.required(name, req, version, type = nil)
    if !$imported[:ve_basic_module]
      msg = "The script '%s' requires the script\n"
      msg += "'VE - Basic Module' v%s or higher above it to work properly\n"
      msg += "Go to http://victorenginescripts.wordpress.com/ to download this script."
      msgbox(sprintf(msg, self.script_name(name), version))
      exit
    else
      self.required_script(name, req, version, type)
    end
  end
  #--------------------------------------------------------------------------
  # * script_name
  #   Get the script name base on the imported value, don't edit this
  #--------------------------------------------------------------------------
  def self.script_name(name, ext = "VE")
    name = name.to_s.gsub("_", " ").upcase.split
    name.collect! {|char| char == ext ? "#{char} -" : char.capitalize }
    name.join(" ")
  end
end

$imported ||= {}
$imported[:ve_custom_collapse] = 1.07
Victor_Engine.required(:ve_custom_collapse, :ve_basic_module, 1.27, :above)

#==============================================================================
# ** Game_Battler
#------------------------------------------------------------------------------
#  This class deals with battlers. It's used as a superclass of the Game_Actor
# and Game_Enemy classes.
#==============================================================================

class Game_Battler < Game_BattlerBase
  #--------------------------------------------------------------------------
  # * Public Instance Variables
  #--------------------------------------------------------------------------
  attr_reader :collapse_sequence
  #--------------------------------------------------------------------------
  # * Alias method: item_apply
  #--------------------------------------------------------------------------
  alias :item_apply_ve_custom_collapse :item_apply
  def item_apply(user, item)
    @alive = alive?
    item_apply_ve_custom_collapse(user, item)
    acotion_collapse_effect(item)
  end
  #--------------------------------------------------------------------------
  # * New method: acotion_collapse_effect
  #--------------------------------------------------------------------------
  def acotion_collapse_effect(item)
    regexp = get_all_values("CUSTOM COLLAPSE")
    @collapse_sequence = item.note =~ regexp ? $1.dup : nil
  end
  #--------------------------------------------------------------------------
  # * New method: set_custom_collapse
  #--------------------------------------------------------------------------
  def set_custom_collapse
    priority = note =~ /<PRIORITY COLLAPSE>/i
    if @collapse_sequence && !priority
      @sprite_effect_type = :custom_collapse
      return true
    elsif !@collapse_sequence || (@collapse_sequence && priority)
      regexp  = get_all_values("CUSTOM COLLAPSE")
      if note =~ regexp
        @collapse_sequence  = $1.dup
        @sprite_effect_type = :custom_collapse
        return true
      end
    end
    return false
  end
end

#==============================================================================
# ** Game_Enemy
#------------------------------------------------------------------------------
#  This class handles enemy characters. It's used within the Game_Troop class
# ($game_troop).
#==============================================================================

class Game_Enemy < Game_Battler
  #--------------------------------------------------------------------------
  # * Alias method: perform_collapse_effect
  #--------------------------------------------------------------------------
  alias :perform_collapse_effect_ve_custom_collapse :perform_collapse_effect
  def perform_collapse_effect
    return if set_custom_collapse
    perform_collapse_effect_ve_custom_collapse
  end
end

#==============================================================================
# ** Game_Actor
#------------------------------------------------------------------------------
#  This class handles actors. It's used within the Game_Actors class
# ($game_actors) and referenced by the Game_Party class ($game_party).
#==============================================================================

class Game_Actor < Game_Battler
  #--------------------------------------------------------------------------
  # * Alias method: perform_collapse_effect
  #--------------------------------------------------------------------------
  alias :perform_collapse_effect_ve_custom_collapse :perform_collapse_effect
  def perform_collapse_effect
    return if set_custom_collapse
    perform_collapse_effect_ve_custom_collapse
  end
end

#==============================================================================
# ** Sprite_Battler
#------------------------------------------------------------------------------
#  This sprite is used to display battlers. It observes a instance of the
# Game_Battler class and automatically changes sprite conditions.
#==============================================================================

class Sprite_Battler < Sprite_Base
  #--------------------------------------------------------------------------
  # * Alias method: initialize
  #--------------------------------------------------------------------------
  alias :initialize_ve_custom_collapse :initialize
  def initialize(viewport, battler = nil)
    initialize_ve_custom_collapse(viewport, battler)
    init_collapse_instances
  end
  #--------------------------------------------------------------------------
  # * Alias method: start_effect
  #--------------------------------------------------------------------------
  alias :start_effect_ve_custom_collapse :start_effect
  def start_effect(effect_type)
    start_effect_ve_custom_collapse(effect_type)
    case @effect_type
    when :custom_collapse
      sequence = @battler.collapse_sequence
      if sequence
        @collapse_settings = create_collapse_settings(sequence)
        @collapse_settings.sort! {|a, b| b.first <=> a.first}
        @battler_visible = false
      end
    end
  end
  #--------------------------------------------------------------------------
  # * Alias method: update_origin
  #--------------------------------------------------------------------------
  alias :update_origin_ve_custom_collapse :update_origin
  def update_origin
    update_origin_ve_custom_collapse
    update_collapse_shake
  end
  #--------------------------------------------------------------------------
  # * Alias method: update_effect
  #--------------------------------------------------------------------------
  alias :update_effect_ve_custom_collapse :update_effect
  def update_effect
    if @effect_type == :custom_collapse && @effect_duration > 0
      update_custom_collapse
    end
    update_effect_ve_custom_collapse
  end
  #--------------------------------------------------------------------------
  # * Alias method: revert_to_normal
  #--------------------------------------------------------------------------
  alias :revert_to_normal_ve_custom_collapse :revert_to_normal
  def revert_to_normal
    revert_to_normal_ve_custom_collapse
    init_collapse_instances
  end
  #--------------------------------------------------------------------------
  # * New method: init_collapse_instances
  #--------------------------------------------------------------------------
  def init_collapse_instances
    @collapse_move_x  = 0
    @collapse_move_y  = 0
    @collapse_speed_x = 0
    @collapse_speed_y = 0
    @collapse_shake_x = 0
    @opacity_duration = 0
    @zoom_x_duration  = 0
    @zoom_y_duration  = 0
    @color_duration   = 0
    @tone_duration    = 0
    @opacity_target   = 0
    @zoom_x_target    = 0
    @zoom_y_target    = 0
    @color_target     = Color.new
    @tone_target      = Tone.new
    @collapse_wave    = false
    @collapse_shake   = false
    self.src_rect.x   = 0
    self.src_rect.y   = 0
    self.wave_amp     = 0
    self.zoom_x       = 1.0
    self.zoom_y       = 1.0
  end
  #--------------------------------------------------------------------------
  # * New method: update_collapse_shake
  #--------------------------------------------------------------------------
  def update_collapse_shake
    if @collapse_shake
      while @old_shake == @collapse_shake_x
        @collapse_shake_x = ((rand(4) + 1) * 3) - ((rand(4) + 1) * 3)
      end
      @old_shake = @collapse_shake_x
    else
      @collapse_shake_x = 0
    end
    self.ox += @collapse_shake_x
  end
  #--------------------------------------------------------------------------
  # * New method: create_collapse_settings
  #--------------------------------------------------------------------------
  def create_collapse_settings(note)
    value = []
    @effect_duration = note =~ /DURATION: (\d+)/i ? $1.to_i + 1 : 0
    note.scan(/\[(\d+)\] *([^><\r\n]*)/i) do |time, string|
      case string
      when /BLEND: (\d+)/i
        value.push([time.to_i, :blend, $1.to_i])
      when /COLOR: (\d+) *, *((?:\d+,? *){3,4})/i
        value.push(get_color_setting(time.to_i, :color, $1, $2))
      when /FLASH: (\d+) *, *((?:\d+,? *){3,4})/i
        value.push(get_color_setting(time.to_i, :flash, $1, $2))
      when /TONE: (\d+) *, *((?:\d+,? *){3,4})/i
        value.push(get_tone_setting(time.to_i, :tone, $1, $2))
      when /OPACITY: (\d+) *, *(\d+)/i
        value.push([time.to_i, :opacity, [$1.to_i, $2.to_i]])
      when /FADE(?:: (\d+))?/i
        value.push([time.to_i, :fade, $1])
      when /SOUND: #{get_filename}/i
        value.push([time.to_i, :sound, $1])
      when /BGM STOP(?:: (\d+))?/i
        value.push([time.to_i, :bgm_stop, $1])
      when /ANIMATION: (\d+)/i
        value.push([time.to_i, :anim, $1.to_i])
      when /MOVE X: ([+-]?\d+)/i
        value.push([time.to_i, :move_x, $1.to_i])
      when /MOVE Y: ([+-]?\d+)/i
        value.push([time.to_i, :move_y, $1.to_i])
      when /ZOOM X: (\d+) *, *(\d+)/i
        value.push([time.to_i, :zoom_x, [$1.to_i, $2.to_f]])
      when /ZOOM Y: (\d+) *, *(\d+)/i
        value.push([time.to_i, :zoom_y, [$1.to_i, $2.to_f]])
      when /WAVE (ON|OFF)/i
        value.push([time.to_i, :wave, $1.upcase == "ON" ? true : false])
      when /SHAKE (ON|OFF)/i
        value.push([time.to_i, :shake, $1.upcase == "ON" ? true : false])
      end
    end
    value
  end
  #--------------------------------------------------------------------------
  # * New method: get_color_setting
  #--------------------------------------------------------------------------
  def get_color_setting(time, type, duration, note)
    if note =~ /(\d+) *, *(\d+) *, *(\d+) *, *(\d+)?/i
      red   = $1.to_i
      green = $2.to_i
      blue  = $3.to_i
      alpha = $4 ? $4.to_i : 255
      return [time, type, [duration.to_i, Color.new(red, green, blue, alpha)]]
    end
    return [time, type, [duration.to_i, Color.new(255, 255, 255, 0)]]
  end
  #--------------------------------------------------------------------------
  # * New method: get_tone_setting
  #--------------------------------------------------------------------------
  def get_tone_setting(time, type, duration, note)
    if note =~ /(\d+) *, *(\d+) *, *(\d+) *, *(\d+)?/i
      red   = $1.to_i
      green = $2.to_i
      blue  = $3.to_i
      gray  = $4 ? $4.to_i : 0
      return [time, type, [duration.to_i, Tone.new(red, green, blue, gray)]]
    end
    return [time, type, [duration.to_i, Tone.new(0, 0, 0, 0)]]
  end
  #--------------------------------------------------------------------------
  # * New method: update_custom_collapse
  #--------------------------------------------------------------------------
  def update_custom_collapse
    add_collapse_effect
    updade_collapse_opacity
    updade_collapse_color
    updade_collapse_tone
    updade_collapse_move
    updade_collapse_wave
    updade_collapse_zoom_x
    updade_collapse_zoom_y
  end
  #--------------------------------------------------------------------------
  # * New method: add_collapse_effect
  #--------------------------------------------------------------------------
  def add_collapse_effect
    return if !@collapse_settings.first
    return if @collapse_settings.first.first != @effect_duration
    get_current_effect.each do |current|
      case current[1]
      when :blend    then collapse_blend(current[2])
      when :color    then collapse_color(current[2])
      when :flash    then collapse_flash(current[2])
      when :tone     then collapse_tone(current[2])
      when :opacity  then collapse_opacity(current[2])
      when :fade     then collapse_fade(current[2])
      when :sound    then collapse_sound(current[2])
      when :bgm_stop then collapse_bgm_stop(current[2])
      when :anim     then collapse_animation(current[2])
      when :move_x   then collapse_move_x(current[2])
      when :move_y   then collapse_move_y(current[2])
      when :zoom_x   then collapse_zoom_x(current[2])
      when :zoom_y   then collapse_zoom_y(current[2])
      when :wave     then collapse_wave(current[2])
      when :shake    then collapse_shake(current[2])
      end
      @collapse_settings.delete(current)
    end
  end
  #--------------------------------------------------------------------------
  # * New method: get_current_effect
  #--------------------------------------------------------------------------
  def get_current_effect
    @collapse_settings.select { |value| value.first == @effect_duration }
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_blend
  #--------------------------------------------------------------------------
  def collapse_blend(effect)
    self.blend_type = effect
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_color
  #--------------------------------------------------------------------------
  def collapse_color(effect)
    @color_duration = effect.first == 0 ? 1 : effect.first
    @color_target   = effect.last
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_flash
  #--------------------------------------------------------------------------
  def collapse_flash(effect)
    duration = effect.first == 0 ? 1 : effect.first
    color    = effect.last
    $game_troop.screen.start_flash(color, duration)
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_tone
  #--------------------------------------------------------------------------
  def collapse_tone(effect)
    @tone_duration = effect.first == 0 ? 1 : effect.first
    @tone_target   = effect.last
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_opacity
  #--------------------------------------------------------------------------
  def collapse_opacity(effect)
    @opacity_duration = effect.first == 0 ? 1 : effect.first
    @opacity_target   = effect.last
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_fade
  #--------------------------------------------------------------------------
  def collapse_fade(effect)
    d = effect
    @opacity_duration = d ? d.to_i == 0 ? 1 : d.to_i : @effect_duration
    @opacity_target   = 0
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_sound
  #--------------------------------------------------------------------------
  def collapse_sound(effect)
    sound = RPG::SE.new(effect)
    sound.play
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_bgm_stop
  #--------------------------------------------------------------------------
  def collapse_bgm_stop(effect)
    duration = effect ? effect.to_i : 60
    RPG::BGM.fade(duration / 60.0 * 1000)
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_animation
  #--------------------------------------------------------------------------
  def collapse_animation(effect)
    return if effect <= 0 || !$data_animations[effect]
    animation = $data_animations[effect]
    start_animation(animation)
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_wave
  #--------------------------------------------------------------------------
  def collapse_wave(effect)
    @collapse_wave = effect
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_shake
  #--------------------------------------------------------------------------
  def collapse_shake(effect)
    @collapse_shake = effect
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_move_x
  #--------------------------------------------------------------------------
  def collapse_move_x(effect)
    @collapse_move_x  = self.src_rect.x
    @collapse_speed_x = effect
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_move_y
  #--------------------------------------------------------------------------
  def collapse_move_y(effect)
    @collapse_move_y  = self.src_rect.y
    @collapse_speed_y = effect
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_zoom_x
  #--------------------------------------------------------------------------
  def collapse_zoom_x(effect)
    @zoom_x_duration = effect.first == 0 ? 1 : effect.first
    @zoom_x_target   = effect.last
  end
  #--------------------------------------------------------------------------
  # * New method: collapse_zoom_y
  #--------------------------------------------------------------------------
  def collapse_zoom_y(effect)
    @zoom_y_duration = effect.first == 0 ? 1 : effect.first
    @zoom_y_target   = effect.last
  end
  #--------------------------------------------------------------------------
  # * New method: updade_collapse_opacity
  #--------------------------------------------------------------------------
  def updade_collapse_opacity
    return if @opacity_duration == 0
    d = @opacity_duration
    self.opacity = (self.opacity * (d - 1) + @opacity_target) / d
    @opacity_duration -= 1
  end
  #--------------------------------------------------------------------------
  # * New method: updade_collapse_zoom_x
  #--------------------------------------------------------------------------
  def updade_collapse_zoom_x
    return if @zoom_x_duration == 0
    d = @zoom_x_duration
    self.zoom_x = (self.zoom_x * (d - 1) + (@zoom_x_target / 100.0)) / d
    @zoom_x_duration -= 1
  end
  #--------------------------------------------------------------------------
  # * New method: updade_collapse_zoom_y
  #--------------------------------------------------------------------------
  def updade_collapse_zoom_y
    return if @zoom_y_duration == 0
    d = @zoom_y_duration
    self.zoom_y = (self.zoom_y * (d - 1) + (@zoom_y_target / 100.0)) / d
    @zoom_y_duration -= 1
  end
  #--------------------------------------------------------------------------
  # * New method: updade_collapse_color
  #--------------------------------------------------------------------------
  def updade_collapse_color
    return if @color_duration == 0
    d = @color_duration
    self.color.red   = (self.color.red   * (d - 1) + @color_target.red)   / d
    self.color.green = (self.color.green * (d - 1) + @color_target.green) / d
    self.color.blue  = (self.color.blue  * (d - 1) + @color_target.blue)  / d
    self.color.alpha = (self.color.alpha  * (d - 1) + @color_target.alpha) / d
    @color_duration -= 1
  end
  #--------------------------------------------------------------------------
  # * New method: updade_collapse_tone
  #--------------------------------------------------------------------------
  def updade_collapse_tone
    return if @tone_duration == 0
    d = @tone_duration
    tone = $game_troop.screen.tone
    tone.red   = (tone.red   * (d - 1) + @tone_target.red)   / d
    tone.green = (tone.green * (d - 1) + @tone_target.green) / d
    tone.blue  = (tone.blue  * (d - 1) + @tone_target.blue)  / d
    tone.gray  = (tone.gray  * (d - 1) + @tone_target.gray)  / d
    @tone_duration -= 1
  end
  #--------------------------------------------------------------------------
  # * New method: updade_collapse_move
  #--------------------------------------------------------------------------
  def updade_collapse_move
    updade_collapse_move_x if @collapse_speed_x != 0
    updade_collapse_move_y if @collapse_speed_y != 0
  end
  #--------------------------------------------------------------------------
  # * New method: updade_collapse_move_x
  #--------------------------------------------------------------------------
  def updade_collapse_move_x
    @collapse_move_x -= @collapse_speed_x / 10.0
    self.src_rect.x   = @collapse_move_x
  end
  #--------------------------------------------------------------------------
  # * New method: updade_collapse_move_y
  #--------------------------------------------------------------------------
  def updade_collapse_move_y
    @collapse_move_y -= @collapse_speed_y / 10.0
    self.src_rect.y   = @collapse_move_y
  end
  #--------------------------------------------------------------------------
  # * New method: updade_collapse_wave
  #--------------------------------------------------------------------------
  def updade_collapse_wave
    if @collapse_wave && self.wave_amp == 0
      self.wave_amp = 8
    elsif @collapse_wave && self.wave_amp > 0
      self.wave_amp += 1 if @effect_duration % 20 == 0
    else
      self.wave_amp    = 0
    end
  end
end