/*:
 * @plugindesc <ActionCutins> for RPG Maker MV version 1.6.2.
 * @author RPG Maker Irina
 *
 * @help
 * *** Introduction ***
 *
 *      This RPG Maker MV plugin lets you add action cutins display actor and
 * enemy faces in a cutout box with speedlines going through the back. It can be
 * used inside and outside of battle provided that you use the right notetags
 * and/or script calls with them. It can be used to put emphasis on which actor
 * or enemy is currently performing an action or it can be solely used for very
 * strong attacks. The choice is yours.
 * 
 *      You will be able to customize how action cutins look for each facet of
 * a skill or item or even make templates when used with multiple battlers at
 * a time. You can also choose what graphic to use for each actor/enemy when a
 * cutin appears, as well as the scaling, the offsets, and anti-aliasing.
 * 
 *      Those who lack the time and/or ability to make their own graphics for
 * cutins, don't worry. This plugin will automatically convert face graphics
 * and enemy graphics* into a usable form for cutin effects as it will work
 * right out of the box as long as you download the Speedlines graphic that
 * comes with this plugin.
 * 
 * *Note: The automatic conversion will not be applied to animated Dragonbones
 * battlers because that's a whole different animal to tackle and you're better
 * off using still graphics for that.
 *
 *
 *
 * *** Recommendations ***
 * 
 * This plugin works best with the following plugins:
 * 
 * Battle Engine Core:
 * http://yanfly.moe/2015/10/10/yep-3-battle-engine-core/
 * 
 *      This plugin gives access to new action sequences that become available
 * if Battle Engine Core is installed in the same project. The action sequences
 * allow you to set up cutins anywhere and anytime you want them during an
 * action sequence with a full range of customization settings.
 *
 * Animation Screen Effects:
 * https://ariesofsheratan.itch.io/001-animation-screen-effects
 * - or -
 * Screen Shake Effects:
 * https://ariesofsheratan.itch.io/001l-screen-effects
 * 
 *      Both of these plugins give access to a better looking screen shake,
 * which makes cutins appear even more intense as they zoom across the screen.
 *
 *
 *
 * *** Instructions ***
 * 
 * 1. Download the 'Speedlines' graphic from this plugin's page.
 * 2. Place it inside your project's img/pictures/ folder.
 * 3. If you're using YEP_BattleEngineCore, place this plugin beneath it.
 * 4. If you're using MogHunter's Battle HUD, place this plugin above it.
 * 5. Configure the settings in the Plugin Parameters to your liking.
 * 6. Configure your actors, enemies, skills, and items with notetags.
 * 7. Use action sequences and script calls to call action cutins outside of
 * the normal scope of item and skill usage.
 *
 *
 *
 * *** Plugin Parameters ***
 *
 * Here's an explanation of the what the Plugin Parameters do:
 * 
 * General Settings:
 * 
 * Above Window Layer:
 *
 *      Cutins have their own graphics layer. They can be placed either beneath
 * the Window Layer or above it. If it is beneat the Window Layer, then the UI
 * elements added to the game's Window Layer will be visible. If it is above it,
 * then the UI elements will appear behind the cutins, though parts of the UI
 * can be seen if the cutins use certain blend modes.
 * 
 * All ___ Have Cutins:
 * 
 *      These settings allow you to automatically set certain subsets of skills
 * and/or items to have cutins appear whenever used. Keep in mind that just
 * because one is set to false doesn't mean they're forever kept away from
 * having cutins. As long as another condition is met, cutins will appear. You
 * can also force cutins to appear with the <Action Cutin> notetag placed inside
 * of a skill or item's notebox. Likewise, you can prevent them from appearing
 * if the <No Action Cutin> notetag is present as well. The settings from these
 * auto cutins will occur whenever a "perform start" action sequence occurs, or
 * if you're using the default battle system, the "performActionStart" entry
 * occurs in Window_BattleLog.
 * 
 * Templates:
 * 
 *      JavaScript users can create their own action cutin templates here to
 * make certain styles of cutins occur. Included with this plugin are two
 * example pieces for a group "horizontal" and "vertical" action cutin combo
 * where multiple appear at once. Look further down in the help file to learn
 * how to use templates.
 * 
 * Default Speedlines:
 * 
 *      These settings determine the default settings for the speedlines graphic
 * that appears with the action cutins. These settings aren't final for all
 * action cutins, but instead, serve as the base/default settings and can always
 * be changed with notetags, action sequences, and templates.
 * 
 * Default Face Settings:
 * 
 *      The face that appears during a cutin sequence will move from one
 * direction to the other. You can adjust the settings here to change how it
 * moves by default. These settings aren't final for all action cutins, but
 * instead, serve as the base/default settings and can always be changed with
 * notetags, action sequences, and templates.
 * 
 * Auto-Flash
 * 
 *      Turning this on will accompany a screen flash when the action cutin
 * appears. Here, you can adjust the default color and duration of the flash.
 * These settings aren't final for all action cutins, but instead, serve as the
 * base/default settings and can always be changed with notetags, action
 * sequences, and templates.
 * 
 * Auto-Shake
 * 
 *      Turning this on will accompany a screen shake when the action cutin
 * appears. Here, you can adjust the power, speed, and duration of the shake.
 * These settings aren't final for all action cutins, but instead, serve as the
 * base/default settings and can always be changed with notetags, action
 * sequences, and templates.
 * 
 * Auto-Sound
 * 
 *      Turning this on will accompany a sound effect when the action cutin
 * appears. Here, you can pick the file, volume, pitch, and pan of the sound.
 * These settings aren't final for all action cutins, but instead, serve as the
 * base/default settings and can always be changed with notetags, action
 * sequences, and templates.
 * 
 * Other:
 * 
 *      These are the other settings that you can adjust for action cutins,
 * including the total duration of the action cutin and the opacity speed at
 * which it fades in and out. These settings aren't final for all action cutins,
 * but instead, serve as the base/default settings and can always be changed
 * with notetags, action sequences, and templates.
 *
 *
 * 
 * *** Notetags ***
 *
 *      Insert the following notetags in the appropriate database entries. The
 * notetags placed into Actor and Enemy noteboxes are used to define their own
 * personal cutins. The notetags placed inside Skill and Item noteboxes are
 * used to define the cutin settings associated when using that skill/item.
 * 
 * -------------------------------
 * Actor, Class and Enemy Notetags
 * -------------------------------
 * 
 * If you are using these notetags for actors and classes, priority will be
 * given to the actor notetags before given to the class notetags.
 * 
 * <Action Cutin Picture: filename>
 * Changes this actor/enemy's cutin to use that of a picture.
 * - Replace 'filename' with the filename of a graphic in img/pictures/
 * - The filename is case sensitive!
 * 
 * <Action Cutin Face: filename, index>
 * Changes this actor/enemy's cutin to use that of a face graphic.
 * - Replace 'filename' with the filename of a graphic in img/faces/
 * - The filename is case sensitive!
 * - Replace 'index' with a number indicating the cell of the graphic.
 * - Index starts from 0 and counts upwards.
 *
 * <Action Cutin SV: filename, index>
 * Changes this actor/enemy's cutin to use that of a SV Actor graphic.
 * - Replace 'filename' with the filename of a graphic in img/sv_actors/
 * - The filename is case sensitive!
 * - Replace 'index' with a number indicating the cell of the graphic.
 * - Index starts from 0 and counts upwards.
 *
 * <Action Cutin Battler: filename>
 * <Action Cutin Battler: filename, hue>
 * Changes this actor/enemy's cutin to use that of a battler graphic.
 * - Replace 'filename' with the filename of a graphic in either img/enemies/
 * or img/sv_enemies/ depending on if your game is front view or sideview.
 * - Replace 'hue' with a numeric value between (0 to 360) representing hue.
 *
 * <Action Cutin Scale: n>
 * Changes the actor/enemy's cutin graphic's scale.
 * - Replace 'n' with a numeric value to represent scale.
 * - 1.0 is 100%. 0.5 is 50%. 2.25 is 225%.
 *
 * <Action Cutin Offset X: +n>
 * <Action Cutin Offset X: -n>
 * <Action Cutin Offset Y: +n>
 * <Action Cutin Offset Y: -n>
 * Changes the actor/enemy's cutin graphic's offset position for X and Y.
 * - Replace 'n' with a numeric value in pixels to alter the x/y offset.
 *
 * <Action Cutin Anti-Alias>
 * <Action Cutin No Anti-Alias>
 * Changes the anti-alias settings for the cutin graphic.
 *
 * -----------------------
 * Skill and Item Notetags
 * -----------------------
 * 
 * <Action Cutin>
 * <No Action Cutin>
 * Changes whether or not this skill/item will have an action cutin or not.
 * This will bypass the settings in the Plugin Parameters.
 * 
 * <Action Cutin Image: filename>
 * Changes the speedline graphic behind the face cutin to a different image.
 * - Replace 'filename' with the filename of a graphic in img/pictures/
 * - The filename is case sensitive!
 *
 * <Action Cutin Hue: n>
 * Changes the hue of the speedline graphic behind the face cutin.
 * - Replace 'n' with a numeric value between (0 to 360) representing hue.
 *
 * <Action Cutin Blend Mode: Normal>
 * <Action Cutin Blend Mode: Additive>
 * <Action Cutin Blend Mode: Multiply>
 * <Action Cutin Blend Mode: Screen>
 * Changes the blend mode of the speedline graphic behind the face cutin.
 *
 * <Action Cutin Border Thickness: n>
 * Changes the thickness of the borders for the action cutin.
 * - Replace 'n' with a numeric value in pixels to represent border thickness.
 * 
 * <Action Cutin Border Color: color>
 * Changes the color of the borders for the action cutin.
 * - Replace 'color' with the name of a color or a hex code representing color.
 * 
 * <Action Cutin Screen X: n>
 * <Action Cutin Screen Y: n>
 * Changes the speedline graphic's screen X and Y positions.
 * - Replace 'n' with a numeric value representing their coordinates.
 * - The X position will be the far left of the speedlines graphic.
 * - The Y position will be the middle of the speedlines graphic.
 * 
 * <Action Cutin Shift Distance X: n>
 * <Action Cutin Shift Distance Y: n>
 * Changes how far the face shifts from side to side.
 * - Replace 'n' with a numeric value representing the distance in pixels.
 *
 * <Action Cutin Shift Frames: n>
 * Changes the duration of the shift.
 * - Replace 'n' with a numeric value representing the duration in frames.
 *
 * <Action Cutin Flash>
 * <Action Cutin No Flash>
 * Changes whether or not the screen flash is enabled or disabled.
 *
 * <Action Cutin Flash Color: red, green, blue, intensity>
 * Changes the color of the screen flash.
 * - Replace 'red' with a numeric value (0 to 255).
 * - Replace 'green' with a numeric value (0 to 255).
 * - Replace 'blue' with a numeric value (0 to 255).
 * - Replace 'intensity' with a numeric value (0 to 255).
 *
 * <Action Cutin Flash Duration: n>
 * Changes the duration of the screen flash.
 * - Replace 'n' with a numeric value representing the duration in frames.
 *
 * <Action Cutin Shake>
 * <Action Cutin No Shake>
 * Changes whether or not the screen shake is enabled or disabled.
 *
 * <Action Cutin Shake Power: n>
 * Changes the power of the screen shake.
 * - Replace 'n' with a numeric value representing the shake power.
 *
 * <Action Cutin Shake Speed: n>
 * Changes the speed of the screen speed.
 * - Replace 'n' with a numeric value representing the shake speed.
 *
 * <Action Cutin Shake Duration: n>
 * Changes the duration of the screen shake.
 * - Replace 'n' with a numeric value representing the duration in frames.
 *
 * <Action Cutin Sound>
 * <Action Cutin No Sound>
 * Changes whether or not a sound is played when this action cutin occurs.
 *
 * <Action Cutin Sound Filename: filename>
 * Changes the sound played for the sound effect.
 * - Replace 'filename' with the filename of a sound in audio/se/
 * - The filename is case sensitive!
 *
 * <Action Cutin Sound Volume: n>
 * Changes the volume of the sound effect played.
 * - Replace 'n' with a numeric value representing the volume.
 *
 * <Action Cutin Sound Pitch: n>
 * Changes the pitch of the sound effect played.
 * - Replace 'n' with a numeric value representing the pitch.
 *
 * <Action Cutin Sound Pan: n>
 * Changes the pan of the sound effect played.
 * - Replace 'n' with a numeric value representing the pan.
 * - Negative for left.
 * - Positive for right.
 *
 * <Action Cutin Duration: n>
 * Changes the duration of the action cutin.
 * - Replace 'n' with a numeric value representing the duration in frames.
 *
 * <Action Cutin Opacity Speed: n>
 * Changes the rate at which the action cutin fades in and out.
 * - Replace 'n' with a numeric value representing the change.
 * - Lower numbers are slower.
 * - Higher numbers are faster.
 * 
 * <Action Cutin Forced Scale: n>
 * Forces the face graphic of the battler to be scaled a certain value.
 * - Replace 'n' with a numeric value to represent scale.
 * - 1.0 is 100%. 0.5 is 50%. 2.25 is 225%.
 *
 * <Action Cutin Forced Anti-Alias>
 * <Action Cutin Forced No Anti-Alias>
 * Forces the face graphic of the battler to use anti-alias or not.
 *
 * <Action Cutin Forced Offset X: +n>
 * <Action Cutin Forced Offset X: -n>
 * <Action Cutin Forced Offset Y: +n>
 * <Action Cutin Forced Offset Y: -n>
 * Forces the actor/enemy's cutin graphic's offset position for X and Y.
 * - Replace 'n' with a numeric value in pixels to alter the x/y offset.
 *
 *
 * *** Script Calls ***
 * 
 *      Action cutins can be called upon and used in either in battle or on the
 * map screen. To call them, there's various ways of doing so. Look below for
 * instructions on how to get each one working. These require knowledge of how
 * to use JavaScript to utilize. I am not responsible for improper usage or
 * teaching you how to use JavaScript so you can further use these. If you wish
 * to understand how to use RPG Maker MV's JavaScript base, I suggest taking a
 * look at Trihan's "Jump Into JavaScript" article found here:
 * 
 * https://rpgmaker.net/tutorials/1230/
 *
 * ---------------------------
 * Single Battler Action Cutin
 * ---------------------------
 * 
 * var battler = $gameActors.actor(1);
 * var settings = $actionCutinSettings();
 * $actionCutin(battler, settings);
 * - This will create a singular cutin of the designated battler while using
 * the default cutin settings defined in the Plugin Parameters. In the above
 * example, it creates a singular action cutin of actor 1 while using the
 * default cutin settings.
 * 
 * var battler = $gameActors.leader();
 * var settings = $actionCutinSettings($dataSkills[10]);
 * $actionCutin(battler, settings);
 * - This will create a singular cutin of the designated battler while using
 * the cutin settings associated with a skill's notetags in the database. In the
 * above example, it creates a singular action cutin of the party leader while
 * using skill 10's notetag settings.
 * 
 * var battler = $gameTroop.members()[0];
 * var settings = $actionCutinSettings($dataItems[20]);
 * $actionCutin(battler, settings);
 * - This will create a singular cutin of the designated battler while using
 * the cutin settings associated with an item's notetags in the database. In the
 * above example, it creates a singular action cutin of the game troop member
 * with index 0 while using item 20's notetag settings.
 *
 * ------------------------------
 * Multiple Battlers Action Cutin
 * ------------------------------
 * 
 * var battlers = [];
 * battlers.push($gameActors.actor(1));
 * battlers.push($gameActors.actor(2));
 * battlers.push($gameActors.actor(3));
 * battlers.push($gameActors.actor(4));
 * var settings = $actionCutinSettings($dataSkills[10]);
 * var template = 'Horizontal';
 * $actionCutinTemplate(battlers, settings, template);
 * - This uses the templates found in the Plugin Parameters to create multiple
 * cutins of battlers at a time and using certain notetag settings from a
 * designated skill selected by the game dev. In the above example, actors 1
 * through 4 are listed as a part of the battlers, with notetag settings from
 * skill 10 in the database, and the 'Horizontal' template that's defined in
 * the Plugin Parameters.
 * 
 * var battlers = [];
 * battlers.push($gameParty.members()[0]);
 * battlers.push($gameParty.members()[1]);
 * battlers.push($gameParty.members()[2]);
 * battlers.push($gameParty.members()[3]);
 * var settings = $actionCutinSettings($dataItems[20]);
 * var template = 'Vertical';
 * $actionCutinTemplate(battlers, settings, template);
 * - This uses the templates found in the Plugin Parameters to create multiple
 * cutins of battlers at a time and using certain notetag settings from a
 * designated item selected by the game dev. In the above example, party members
 * with an index value between 0 and 3 are listed as a part of the battlers,
 * with notetag settings from item 20 in the database, and the 'Vertical'
 * template that's defined in the Plugin Parameters.
 * 
 * var battlers = [];
 * battlers.push($gameTroop.members()[0]);
 * battlers.push($gameTroop.members()[1]);
 * battlers.push($gameTroop.members()[2]);
 * battlers.push($gameTroop.members()[3]);
 * var settings = $actionCutinSettings();
 * var template = 'Horizontal';
 * $actionCutinTemplate(battlers, settings, template);
 * - This uses the templates found in the Plugin Parameters to create multiple
 * cutins of battlers at a time and using the default cutin settings defined in
 * the Plugin Parameters. In the above example, enemy troop members with an
 * index value between 0 and 3 are listed as a part of the battlers, with
 * default cutin settings, and the 'Horizontal' template that's defined in the
 * Plugin Parameters.
 *
 * ---------------
 * Custom Settings
 * ---------------
 * 
 *      If you don't like the settings made in certain skills/items or would
 * just like to create your own without having to create new skills/items, then
 * start with the following code.
 *
 * var settings = $actionCutinSettings();
 * 
 *      This grabs the default cutin settings. As long as you modify it before
 * inserting it into $actionCutin or $actionCutinTemplate, then the settings
 * will behave differently from the default. Below is a list of the various
 * things you can do to your code to change it up. You're not required to use
 * all of them. Just pick the settings alterations that need changing.
 * 
 * settings.backgroundImg = 'Speedlines';
 * settings.backgroundHue = 0;
 * settings.blendMode = 1;
 * settings.borderThickness = 5;
 * settings.borderColor = 'black';
 *
 * settings.x = 0;
 * settings.y = Graphics.boxHeight / 2;
 * settings.width = Graphics.boxWidth;
 * settings.height = 300;
 * settings.speedX = 40;
 * settings.speedY = 0;
 *
 * settings.shiftDistanceX = 480;
 * settings.shiftDistanceY = 0;
 * settings.shiftFrames = 16;
 *
 * settings.flash = true;
 * settings.flashColor = [255, 255, 255, 170];
 * settings.flashDuration = 20;
 * 
 * settings.shake = true;
 * settings.shakePower = 5;
 * settings.shakeSpeed = 5;
 * settings.shakeDuration = 20;
 * 
 * settings.sound = true;
 * settings.soundName = 'Magic3';
 * settings.soundVolume = 90;
 * settings.soundPitch = 150;
 * settings.soundPan = 0;
 *
 * settings.duration = 90;
 * settings.opacitySpeed = 16;
 *
 * settings.forcedScale = 2.0;
 * settings.forcedAntiAlias = false;
 * settings.forcedOffsetX = 0;
 * settings.forcedOffsetY = 0;
 *
 *      Pick and choose the setting changes you want before inserting them into
 * $actionCutin or $actionCutinTemplate's arguments. Below is an example of how
 * to use it in a complete script call.
 *
 * var battler = $gameParty.leader();
 * var settings = $actionCutinSettings();
 * settings.backgroundHue = 180;
 * settings.blendMode = 0;
 * $actionCutin(battler, settings);
 *
 *      The above script call changes the speedlines to have a hue of 180 while
 * changing the blend mode to 'Normal'. A regular single battler action cutin is
 * then used through the $actionCutin function.
 *
 * ----------------------------
 * Changing Battler Face Cutins
 * ----------------------------
 *
 * var battler = $gameActors.actor(1);
 * battler.changeActionCutinFaceData(type, filename, index, hue);
 * - Replace 'type' with 'picture', 'face', 'svbattler', or 'battler' (keep
 * the quotes). This determines the type of asset to use.
 * - Replace 'filename' with the filename of the associated graphic.
 * - The filename is case sensitive!
 * - Replace 'index' with a numeric value starting from 0 to determine the cell.
 * - Index is used with 'face' and 'svbattler'.
 * - Replace 'hue' with a numeric value (0 to 360) to determine its hue.
 * - Hue is used with 'battler'.
 * 
 * var battler = $gameActors.actor(1);
 * battler.changeActionCutinFaceScale(scale);
 * - Replace 'scale' with a numeric value to determine the cutin's scale.
 * - 1.0 is 100%. 0.5 is 50%. 2.25 is 225%.
 * 
 * var battler = $gameActors.actor(1);
 * battler.changeActionCutinFaceOffset(offsetX, offsetY);
 * - Replace 'offsetX' and 'offsetY' with numeric values to determine how many
 * pixels to offset the face cutin by.
 * 
 * var battler = $gameActors.actor(1);
 * battler.changeActionCutinFaceAntiAlias(boolean);
 * - Replace 'boolean' with 'true' or 'false' (remove the quotes) to determine
 * if the face cutin graphic will use anti-alias or not.
 * 
 * var battler = $gameActors.actor(1);
 * battler.clearActionCutinFaceData();
 * - Removes all changes made to the designated battler regarding face cutins.
 * This will revert the battler to using its original face cutin data that's
 * made through notetags or through the plugin's defaults.
 *
 *
 *
 * *** Action Sequences ***
 * 
 *      This section only applies to you if you use Yanfly's Battle Engine Core
 * and its action sequences. If you don't use either, you're free to ignore
 * this section. This part of the document will be formatted like Yanfly's
 * Action Sequence help file to bring about a sense of familiarity.
 *
 *=============================================================================
 * ACTION CUTIN targets: arguments
 *
 * (optional parameters)
 * TEMPLATE name
 * IMG filename
 * HUE value

 * BLENDMODE NORMAL
 * BLENDMODE ADDITIVE
 * BLENDMODE MULTIPLY
 * BLENDMODE SCREEN

 * BORDER THICKNESS value
 * BORDER COLOR color

 * SCREEN X value
 * SCREEN Y value
 * WIDTH value
 * HEIGHT value
 * SPEED X value
 * SPEED Y value
 * 
 * SHIFT X value
 * SHIFT Y value
 * SHIFT FRAMES value
 *
 * FLASH ON
 * FLASH OFF
 * 
 * SHAKE ON
 * SHAKE OFF
 * 
 * SOUND ON
 * SOUND OFF
 * 
 * DURATION value
 * OPACITY SPEED value
 * 
 * FORCED SCALE value
 * FORCED ANTIALIAS ON
 * FORCED ANTIALIAS OFF
 * FORCED OFFSET x y
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Plays an action cutin during the action sequence. The action cutin will use
 * the default cutin settings unless you use the optional arguments listed. The
 * following below explain what each argument does:
 * 
 * Template: picks a template from the Plugin Parameters matching the name used
 * Img: picks a speedline graphic of a matching filename from img/pictures/
 * Hue: changes the speedline graphic's hue (pick a number between 0 and 360)
 * BlendMode: changes the blend mode of the speedline graphic
 * Border Thickness: changes the border thickness to 'value'
 * Border Color: changes the color of the border to 'color'
 * Screen X: sets the speedline graphic's left x position to 'value'
 * Screen Y: sets the speedline graphic's middle y position to 'value'
 * Width: sets the speedline graphic's width to 'value'
 * Height: sets the speedline graphic's height to 'value'
 * Speed X: sets the speedline's x movement speed to 'value'
 * Speed Y: sets the speedline's y movement speed to 'value'
 * Shift X: sets the distance the face cutin travels horizontally to 'value'
 * Shift Y: sets the distance the face cutin travels vertically to 'value'
 * Shift Frames: sets the time in frames the face cutin travels in 'value'
 * Flash On/Off: Turns on/off the default Screen Flash for this action cutin
 * Shake On/Off: Turns on/off the default Screen Shake for this action cutin
 * Sound On/Off: Turns on/off the default Sound Effect for this action cutin
 * Duration: sets the duration of the action cutin to 'value'
 * Opacity Speed: sets the opacity speed ford fading in/out to 'value'
 * Forced Scale: If used, forces all cutins to use this scale 'value'
 * Forced AntiAlias On/Off: If used, forces anti-alias to be on/off
 * Forced Offset: If used, forces face cutin to be offset by 'x' and 'y' pixels
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: Action Cutin User
 *      Action Cutin Allies: template Horizontal
 *      Action Cutin Targets: template Vertical, Hue 360, BlendMode Normal
 *=============================================================================
 * 
 * 
 *
 * *** RPG Maker Version ***
 *
 * This plugin is made for and tested on RPG Maker MV with version 1.6.2.
 * I cannot guarantee if it works on lower versions.
 *
 *
 *
 * *** Terms of Use ***
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'RPG Maker Irina' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins.
 *
 * *** Help End ***
 *
 * @param 
 *
 * @param General
 * @text General Settings
 *
 * @param aboveOrBelowWindowLayer
 * @text Above Window Layer
 * @parent General
 * @type boolean
 * @on Above
 * @off Below
 * @desc Puts action cutins above the window layer (UI layer).
 * @default true
 *
 * @param defaultAllSkillsHaveCutins
 * @text All Skills Have Cutins
 * @parent General
 * @type boolean
 * @on Yes
 * @off No
 * @desc Sets all skills to have cutins unless they have the
 * <No Action Cutin> notetag.
 * @default true
 *
 * @param defaultAllItemsHaveCutins
 * @text All Items Have Cutins
 * @parent General
 * @type boolean
 * @on Yes
 * @off No
 * @desc Sets all item to have cutins unless they have the
 * <No Action Cutin> notetag.
 * @default false
 *
 * @param defaultAllPhysicalHaveCutins
 * @text Physical Action Cutins
 * @parent General
 * @type boolean
 * @on Yes
 * @off No
 * @desc Sets physical actions to have cutins unless they have the
 * <No Action Cutin> notetag.
 * @default false
 *
 * @param defaultAllMagicalHaveCutins
 * @text Magical Action Cutins
 * @parent General
 * @type boolean
 * @on Yes
 * @off No
 * @desc Sets magical actions to have cutins unless they have the
 * <No Action Cutin> notetag.
 * @default false
 *
 * @param defaultAllCertainHaveCutins
 * @text Certain Hit Action Cutins
 * @parent General
 * @type boolean
 * @on Yes
 * @off No
 * @desc Sets certain hit actions to have cutins unless they have the
 * <No Action Cutin> notetag.
 * @default true
 *
 * @param
 *
 * @param Templates
 * @type struct<Template>[]
 * @desc Templates that can be used with action sequences and script calls. Look in the help for more instructions.
 * @default ["{\"Name\":\"Example\",\"Code\":\"\\\"for (var i = 0; i < battlers.length; i++) {\\\\n   // Get current battler.\\\\n   var battler = battlers[i];\\\\n\\\\n   // Get current settings or make new default settings.\\\\n   var settings = settings || $actionCutinSettings();\\\\n\\\\n   // Display action cutin\\\\n   $actionCutin(battler, settings);\\\\n}\\\"\"}","{\"Name\":\"Horizontal\",\"Code\":\"\\\"var totalTime = Math.max(120, 80 + (battlers.length * 10));\\\\nfor (var i = 0; i < battlers.length; i++) {\\\\n    var battler = battlers[i];\\\\n    var settings = JsonEx.makeDeepCopy(settings) || $actionCutinSettings();\\\\n    settings.height = Math.round(Graphics.boxHeight / battlers.length) - (settings.borderThickness * 2);\\\\n    settings.y = settings.height * (i + 0.5) + (settings.borderThickness * 2 * (i + 0.5));\\\\n    settings.forcedScale = 5.0;\\\\n    settings.forcedOffsetY = 48;\\\\n    settings.shiftDistanceX = 400;\\\\n    settings.shiftDistanceY = 0;\\\\n    settings.duration = totalTime - (i * 10);\\\\n    settings.backgroundHue = i * Math.round(360 / battlers.length);\\\\n    var time = 1000 / 60 * i * 10;\\\\n    setTimeout($actionCutin.bind(this, battler, settings), time);\\\\n}\\\"\"}","{\"Name\":\"Vertical\",\"Code\":\"\\\"var totalTime = Math.max(120, 80 + (battlers.length * 10));\\\\nfor (var i = 0; i < battlers.length; i++) {\\\\n    var battler = battlers[i];\\\\n    var settings = JsonEx.makeDeepCopy(settings) || $actionCutinSettings();\\\\n    settings.width = Math.round(Graphics.boxWidth / battlers.length) - (settings.borderThickness * 2);\\\\n    settings.height = Graphics.boxHeight * 1.20;\\\\n    settings.x = settings.width * i + (settings.borderThickness * 2 * (i + 0.5));\\\\n    settings.forcedScale = 'auto';\\\\n    settings.shiftDistanceX = 0;\\\\n    settings.shiftDistanceY = 400 * (i % 2 === 0 ? 1 : -1);\\\\n    settings.duration = totalTime - (i * 10);\\\\n    settings.backgroundHue = i * Math.round(360 / battlers.length);\\\\n    var time = 1000 / 60 * i * 10;\\\\n    setTimeout($actionCutin.bind(this, battler, settings), time);\\\\n}\\\"\"}"]
 *
 * @param
 *
 * @param Speedlines
 * @text Default Speedlines
 *
 * @param defaultSpeedlineImg
 * @text Speedline Graphic
 * @parent Speedlines
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Default image used for speedlines.
 * @default Speedlines
 *
 * @param defaultSpeedlineHue
 * @text Hue
 * @parent Speedlines
 * @desc Default hue used for speedlines.
 * @default 0
 *
 * @param defaultSpeedlineBlendMode
 * @text Blend Mode
 * @parent Speedlines
 * @type select
 * @option (0) Normal
 * @value 0
 * @option (1) Additive
 * @value 1
 * @option (2) Multiply
 * @value 2
 * @option (3) Screen
 * @value 3
 * @desc Default blend mode used for speedlines.
 * @default 1
 *
 * @param defaultBorderThickness
 * @text Border Thickness
 * @parent Speedlines
 * @desc Default border thickness used for speedlines.
 * @default 5
 *
 * @param defaultBorderColor
 * @text Border Color
 * @parent Speedlines
 * @type combo
 * @option black
 * @option white
 * @option red
 * @option yellow
 * @option green
 * @option blue
 * @desc Default border color used for speedlines.
 * @default black
 *
 * @param SpeedlinePositions
 * @text Positioning
 * @parent Speedlines
 *
 * @param defaultSpeedlineScreenX
 * @text Screen X
 * @parent SpeedlinePositions
 * @desc Default Screen X used for speedlines. This is the left side of the speedlines box.
 * @default 0
 *
 * @param defaultSpeedlineScreenY
 * @text Screen Y
 * @parent SpeedlinePositions
 * @desc Default Screen X used for speedlines. This is the center side of the speedlines box.
 * @default Graphics.boxHeight / 2
 *
 * @param defaultSpeedlineWidth
 * @text Box Width
 * @parent SpeedlinePositions
 * @desc Default Screen X used for speedlines.
 * @default Graphics.boxWidth
 *
 * @param defaultSpeedlineHeight
 * @text Box Height
 * @parent SpeedlinePositions
 * @desc Default Screen X used for speedlines.
 * @default 300
 *
 * @param defaultSpeedlineScrollX
 * @text Scroll X Speed
 * @parent SpeedlinePositions
 * @desc How fast the speedlines scroll horizontally.
 * @default 40
 *
 * @param defaultSpeedlineScrollY
 * @text Scroll Y Speed
 * @parent SpeedlinePositions
 * @desc How fast the speedlines scroll vertically.
 * @default 0
 *
 * @param
 *
 * @param Face
 * @text Default Face Settings
 *
 * @param defaultFaceShiftDistanceX
 * @text Shift Distance X
 * @parent Face
 * @desc How much to horizontally move faces in action cutins.
 * @default 480
 *
 * @param defaultFaceShiftDistanceY
 * @text Shift Distance Y
 * @parent Face
 * @desc How much to vertically move faces in action cutins.
 * @default 0
 *
 * @param defaultFaceShiftFrames
 * @text Shift Frames
 * @parent Face
 * @desc Total frames of movement for shifts.
 * @default 16
 *
 * @param defaultFaceAntiAlias
 * @text Anti-Alias
 * @parent Face
 * @type boolean
 * @on Yes
 * @off No
 * @desc Turns on anti-alias for all faces.
 * @default false
 *
 * @param
 *
 * @param AutoFlash
 * @text Auto-Flash
 *
 * @param defaultAutoFlash
 * @text Enable
 * @parent AutoFlash
 * @type boolean
 * @on Yes
 * @off No
 * @desc Enable auto-flash for cutins.
 * @default true
 *
 * @param defaultFlashColor
 * @text Flash Color
 * @parent AutoFlash
 * @desc Color settings for flash. Separate number values with a space.
 * Red Green Blue Intensity
 * @default 255 255 255 170
 *
 * @param defaultFlashDuration
 * @text Duration
 * @parent AutoFlash
 * @desc Duration in frames for the flash.
 * @default 20
 *
 * @param
 *
 * @param AutoShake
 * @text Auto-Shake
 *
 * @param defaultAutoShake
 * @text Enable
 * @parent AutoShake
 * @type boolean
 * @on Yes
 * @off No
 * @desc Enable auto-shake for cutins.
 * @default true
 *
 * @param defaultShakePower
 * @text Shake Power
 * @parent AutoShake
 * @desc Default shake power for cutins.
 * @default 5
 *
 * @param defaultShakeSpeed
 * @text Shake Speed
 * @parent AutoShake
 * @desc Default shake speed for cutins.
 * @default 5
 *
 * @param defaultShakeDuration
 * @text Duration
 * @parent AutoShake
 * @desc Duration in frames for the flash.
 * @default 20
 *
 * @param
 *
 * @param AutoSound
 * @text Auto-Sound
 *
 * @param defaultAutoSound
 * @text Enable
 * @parent AutoSound
 * @type boolean
 * @on Yes
 * @off No
 * @desc Enable auto-sound for cutins.
 * @default true
 *
 * @param defaultSoundName
 * @text Filename
 * @parent AutoSound
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Filename used for the sound effect.
 * @default Magic3
 *
 * @param defaultSoundVolume
 * @text Volume
 * @parent AutoSound
 * @desc Volume of the sound effect.
 * @default 90
 *
 * @param defaultSoundPitch
 * @text Pitch
 * @parent AutoSound
 * @desc Pitch of the sound effect.
 * @default 150
 *
 * @param defaultSoundPan
 * @text Pan
 * @parent AutoSound
 * @desc Pan direction of the sound effect.
 * @default 0
 *
 * @param
 *
 * @param Other
 *
 * @param defaultDuration
 * @text Total Duration
 * @parent Other
 * @desc Total duration of the cutin.
 * @default 90
 *
 * @param defaultOpacitySpeed
 * @text Opacity Speed
 * @parent Other
 * @desc Speed at which the opacity changes
 * @default 16
 *
 * @param
 *
*/
/*~struct~Template:
 *
 * @param Name
 * @desc Template's name when used with action sequences or script calls
 * @default Example
 *
 * @param Code
 * @type note
 * @desc Code used for the template.
 * @default "for (var i = 0; i < battlers.length; i++) {\n   // Get current battler.\n   var battler = battlers[i];\n\n   // Get current settings or make new default settings.\n   var settings = settings || $actionCutinSettings();\n\n   // Display action cutin\n   $actionCutin(battler, settings);\n}"
 */
//=============================================================================

var parameters=$plugins.filter(function(t){return t.description.contains("<ActionCutins>")})[0].parameters;var Imported=Imported||{};Imported.Irina_ActionCutins={};(function(parameters){var keys=["defaultSpeedlineImg","defaultBorderColor","defaultSoundName"];for(var i=0;i<keys.length;i++){var key=keys[i];Imported.Irina_ActionCutins[key]=String(parameters[key])||""}var keys=["defaultSpeedlineHue","defaultSpeedlineBlendMode","defaultBorderThickness","defaultFaceShiftDistanceX","defaultFaceShiftDistanceY","defaultFaceShiftFrames","defaultFlashDuration","defaultShakePower","defaultShakeSpeed","defaultShakeDuration","defaultSoundVolume","defaultSoundPitch","defaultSoundPan","defaultDuration","defaultOpacitySpeed"];for(var i=0;i<keys.length;i++){var key=keys[i];Imported.Irina_ActionCutins[key]=Number(parameters[key])||0}var keys=["aboveOrBelowWindowLayer","defaultAllSkillsHaveCutins","defaultAllItemsHaveCutins","defaultAllPhysicalHaveCutins","defaultAllMagicalHaveCutins","defaultAllCertainHaveCutins","defaultFaceAntiAlias","defaultAutoFlash","defaultAutoShake","defaultAutoSound"];for(var i=0;i<keys.length;i++){var key=keys[i];Imported.Irina_ActionCutins[key]=eval(parameters[key])||false}var keys=["defaultSpeedlineScreenX","defaultSpeedlineScreenY","defaultSpeedlineWidth","defaultSpeedlineHeight","defaultSpeedlineScrollX","defaultSpeedlineScrollY"];for(var i=0;i<keys.length;i++){var key=keys[i];Imported.Irina_ActionCutins[key]=new Function("return "+String(parameters[key]))}Imported.Irina_ActionCutins.defaultFlashColor=String(parameters["defaultFlashColor"]).split(" ");for(var i=0;i<Imported.Irina_ActionCutins.defaultFlashColor.length;i++){Imported.Irina_ActionCutins.defaultFlashColor[i]=Number(Imported.Irina_ActionCutins.defaultFlashColor[i])}var templates=JSON.parse(parameters["Templates"]);Imported.Irina_ActionCutins.Templates={};for(var i=0;i<templates.length;i++){var template=JSON.parse(templates[i]);var name=template.Name.trim().toUpperCase();Imported.Irina_ActionCutins.Templates[name]=new Function("battlers","settings",JSON.parse(template.Code))}})(parameters);$actionCutinSettings=function(t){var e={backgroundImg:Imported.Irina_ActionCutins.defaultSpeedlineImg,backgroundHue:Imported.Irina_ActionCutins.defaultSpeedlineHue,blendMode:Imported.Irina_ActionCutins.defaultSpeedlineBlendMode,borderThickness:Imported.Irina_ActionCutins.defaultBorderThickness,borderColor:Imported.Irina_ActionCutins.defaultBorderColor,x:Imported.Irina_ActionCutins.defaultSpeedlineScreenX.call(SceneManager._scene),y:Imported.Irina_ActionCutins.defaultSpeedlineScreenY.call(SceneManager._scene),width:Imported.Irina_ActionCutins.defaultSpeedlineWidth.call(SceneManager._scene),height:Imported.Irina_ActionCutins.defaultSpeedlineHeight.call(SceneManager._scene),speedX:Imported.Irina_ActionCutins.defaultSpeedlineScrollX.call(SceneManager._scene),speedY:Imported.Irina_ActionCutins.defaultSpeedlineScrollY.call(SceneManager._scene),shiftDistanceX:Imported.Irina_ActionCutins.defaultFaceShiftDistanceX,shiftDistanceY:Imported.Irina_ActionCutins.defaultFaceShiftDistanceY,shiftFrames:Imported.Irina_ActionCutins.defaultFaceShiftFrames,flash:Imported.Irina_ActionCutins.defaultAutoFlash,flashColor:Imported.Irina_ActionCutins.defaultFlashColor,flashDuration:Imported.Irina_ActionCutins.defaultFlashDuration,shake:Imported.Irina_ActionCutins.defaultAutoShake,shakePower:Imported.Irina_ActionCutins.defaultShakePower,shakeSpeed:Imported.Irina_ActionCutins.defaultShakeSpeed,shakeDuration:Imported.Irina_ActionCutins.defaultShakeDuration,sound:Imported.Irina_ActionCutins.defaultAutoSound,soundName:Imported.Irina_ActionCutins.defaultSoundName,soundVolume:Imported.Irina_ActionCutins.defaultSoundVolume,soundPitch:Imported.Irina_ActionCutins.defaultSoundPitch,soundPan:Imported.Irina_ActionCutins.defaultSoundPan,duration:Imported.Irina_ActionCutins.defaultDuration,opacitySpeed:Imported.Irina_ActionCutins.defaultOpacitySpeed,forcedScale:0,forcedAntiAlias:0,forcedOffsetX:0,forcedOffsetY:0};if(t)Imported.Irina_ActionCutins.updateSettingsToItem(t,e);return e};Imported.Irina_ActionCutins.updateSettingsToItem=function(item,settings){if(!item)return;var note=item.note;if(note.length<=0)return;if(note.match(/<Action Cutin Image:[ ](.*)>/i)){settings.backgroundImg=String(RegExp.$1).trim()}if(note.match(/<Action Cutin Hue:[ ](.*)>/i)){settings.backgroundHue=parseInt(RegExp.$1).clamp(0,360)}if(note.match(/<Action Cutin Blend Mode:[ ](.*)>/i)){var mode=String(RegExp.$1).trim().toUpperCase();if(mode==="NORMAL")settings.blendMode=0;if(mode==="ADDITIVE")settings.blendMode=1;if(mode==="MULTIPLY")settings.blendMode=2;if(mode==="SCREEN")settings.blendMode=3}if(note.match(/<Action Cutin Border Thickness:[ ](.*)>/i)){settings.borderThickness=parseInt(RegExp.$1)}if(note.match(/<Action Cutin Border Color:[ ](.*)>/i)){settings.borderColor=String(RegExp.$1).trim()}if(note.match(/<Action Cutin Screen X:[ ](.*)>/i)){settings.x=eval(RegExp.$1)}if(note.match(/<Action Cutin Screen Y:[ ](.*)>/i)){settings.y=eval(RegExp.$1)}if(note.match(/<Action Cutin Width:[ ](.*)>/i)){settings.width=eval(RegExp.$1)}if(note.match(/<Action Cutin Height:[ ](.*)>/i)){settings.height=eval(RegExp.$1)}if(note.match(/<Action Cutin Speed X:[ ](.*)>/i)){settings.speedX=eval(RegExp.$1)}if(note.match(/<Action Cutin Speed Y:[ ](.*)>/i)){settings.speedY=eval(RegExp.$1)}if(note.match(/<Action Cutin Shift Distance X:[ ](.*)>/i)){settings.shiftDistanceX=Number(RegExp.$1)}if(note.match(/<Action Cutin Shift Distance Y:[ ](.*)>/i)){settings.shiftDistanceY=Number(RegExp.$1)}if(note.match(/<Action Cutin Shift Frames:[ ](.*)>/i)){settings.shiftFrames=Number(RegExp.$1)}if(note.match(/<Action Cutin Flash>/i)){settings.flash=true}else if(note.match(/<Action Cutin No Flash>/i)){settings.flash=false}if(note.match(/<Action Cutin Flash Color:[ ](.*)>/i)){var array=String(RegExp.$1).trim();for(var i=0;i<array.length;i++){array[i]=parseInt[i]}settings.flashColor=array}if(note.match(/<Action Cutin Flash Duration:[ ](.*)>/i)){settings.flashDuration=Number(RegExp.$1)}if(note.match(/<Action Cutin Shake>/i)){settings.shake=true}else if(note.match(/<Action Cutin No Shake>/i)){settings.shake=false}if(note.match(/<Action Cutin Shake Power:[ ](.*)>/i)){settings.shakePower=Number(RegExp.$1)}if(note.match(/<Action Cutin Shake Speed:[ ](.*)>/i)){settings.shakeSpeed=Number(RegExp.$1)}if(note.match(/<Action Cutin Shake Duration:[ ](.*)>/i)){settings.shakeDuration=Number(RegExp.$1)}if(note.match(/<Action Cutin Sound>/i)){settings.sound=true}else if(note.match(/<Action Cutin No Sound>/i)){settings.sound=false}if(note.match(/<Action Cutin Sound Filename:[ ](.*)>/i)){settings.soundName=String(RegExp.$1).trim()}if(note.match(/<Action Cutin Sound Volume:[ ](.*)>/i)){settings.soundVolume=Number(RegExp.$1)}if(note.match(/<Action Cutin Sound Pitch:[ ](.*)>/i)){settings.soundPitch=Number(RegExp.$1)}if(note.match(/<Action Cutin Sound Pan:[ ](.*)>/i)){settings.soundPan=Number(RegExp.$1)}if(note.match(/<Action Cutin Duration:[ ](.*)>/i)){settings.duration=Number(RegExp.$1)}if(note.match(/<Action Cutin Opacity Speed:[ ](.*)>/i)){settings.opacitySpeed=Number(RegExp.$1)}if(note.match(/<Action Cutin Forced Scale:[ ](.*)>/i)){settings.forcedScale=Number(RegExp.$1)}if(note.match(/<Action Cutin Forced Anti-Alias>/i)){settings.forcedAntiAlias=true}else if(note.match(/<Action Cutin Forced No Anti-Alias>/i)){settings.forcedAntiAlias=false}if(note.match(/<Action Cutin Forced Offset X:[ ](.*)>/i)){settings.forcedOffsetX=Number(RegExp.$1)}if(note.match(/<Action Cutin Forced Offset Y:[ ](.*)>/i)){settings.forcedOffsetY=Number(RegExp.$1)}};Imported.Irina_ActionCutins.checkActionCutinValid=function(t){if(!t)return false;if(!SceneManager._scene)return false;if(!SceneManager._scene._windowLayer)return false;if(Imported.Irina_ActSeqFsFwdSkip){if($gameTemp._actionSequenceSkippingForward)return false;if(ConfigManager.actionSequenceAutoSkipForward)return false}return true};$actionCutin=function(t,e){if(!Imported.Irina_ActionCutins.checkActionCutinValid(t))return;var i=new TilingSprite_ActionCutin(t,e);var a=SceneManager._scene._actionCutinContainer;a.addChild(i)};$actionCutinTemplate=function(t,e,i){if(!Imported.Irina_ActionCutins.checkActionCutinValid(t))return;i=i.trim().toUpperCase();e=e||$actionCutinSettings();if(i==="DEFAULT"){$actionCutin(t[0],e)}else if(Imported.Irina_ActionCutins.Templates[i]){Imported.Irina_ActionCutins.Templates[i].call(this,t,e)}else{$actionCutin(t[0],e)}};if(Imported.YEP_BattleEngineCore){Imported.Irina_ActionCutins.BattleManager_processActionSequence=BattleManager.processActionSequence;BattleManager.processActionSequence=function(t,e){if(t.match(/ACTION CUTIN[ ](.*)/i)){var i=String(RegExp.$1);if(this.makeActionTargets(i).length>0){return this.actionActionCutin(i,e)}}if(t.match(/WAIT FOR ACTION CUTIN/i)){this._logWindow.waitForActionCutin();return false}return Imported.Irina_ActionCutins.BattleManager_processActionSequence.call(this,t,e)}}BattleManager.actionActionCutin=function(string,actionArgs){var battlers=this.makeActionTargets(string);var settings=$actionCutinSettings();var template="DEFAULT";for(var a=0;a<actionArgs.length;a++){var actionArg=actionArgs[a];if(actionArg.match(/TEMPLATE[ ](.*)/i)){template=String(RegExp.$1).trim().toUpperCase()}else if(actionArg.match(/IMG[ ](.*)/i)){settings.backgroundImg=String(RegExp.$1)}else if(actionArg.match(/HUE[ ](.*)/i)){settings.backgroundHue=String(RegExp.$1)}else if(actionArg.match(/BLENDMODE[ ](.*)/i)){var blendModes=["NORMAL","ADDITIVE","MULTIPLY","SCREEN"];settings.blendMode=blendModes.indexOf(String(RegExp.$1).trim().toUpperCase())}else if(actionArg.match(/BORDER THICKNESS[ ](.*)/i)){settings.borderThickness=eval(RegExp.$1)}else if(actionArg.match(/BORDER COLOR[ ](.*)/i)){settings.borderColor=String(RegExp.$1)}else if(actionArg.match(/SCREEN X[ ](.*)/i)){settings.x=eval(RegExp.$1)}else if(actionArg.match(/SCREEN Y[ ](.*)/i)){settings.y=eval(RegExp.$1)}else if(actionArg.match(/WIDTH[ ](.*)/i)){settings.width=eval(RegExp.$1)}else if(actionArg.match(/HEIGHT[ ](.*)/i)){settings.height=eval(RegExp.$1)}else if(actionArg.match(/SPEED X[ ](.*)/i)){settings.speedX=eval(RegExp.$1)}else if(actionArg.match(/SPEED Y[ ](.*)/i)){settings.speedY=eval(RegExp.$1)}else if(actionArg.match(/SHIFT X[ ](.*)/i)){settings.shiftDistanceX=eval(RegExp.$1)}else if(actionArg.match(/SHIFT Y[ ](.*)/i)){settings.shiftDistanceX=eval(RegExp.$1)}else if(actionArg.match(/SHIFT FRAMES[ ](.*)/i)){settings.shiftFrames=eval(RegExp.$1)}else if(actionArg.match(/FLASH ON/i)){settings.flash=true}else if(actionArg.match(/FLASH OFF/i)){settings.flash=false}else if(actionArg.match(/SHAKE ON/i)){settings.shake=true}else if(actionArg.match(/SHAKE OFF/i)){settings.shake=true}else if(actionArg.match(/SOUND ON/i)){settings.sound=true}else if(actionArg.match(/SOUND OFF/i)){settings.sound=true}else if(actionArg.match(/DURATION[ ](.*)/i)){settings.duration=true}else if(actionArg.match(/OPACITY SPEED[ ](.*)/i)){settings.opacitySpeed=true}else if(actionArg.match(/FORCED SCALE[ ](.*)/i)){settings.forcedScale=eval(RegExp.$1)}else if(actionArg.match(/FORCED ANTIALIAS ON/i)){settings.forcedAntiAlias=true}else if(actionArg.match(/FORCED ANTIALIAS OFF/i)){settings.forcedAntiAlias=false}else if(actionArg.match(/FORCED OFFSET[ ](.*)/i)){var values=String(RegExp.$1).split(" ");settings.forcedOffsetX=Number(values[0]);settings.forcedOffsetY=Number(values[1])}}$actionCutinTemplate(battlers,settings,template.trim().toUpperCase());return false};Game_Battler.prototype.getActionCutinFaceData=function(){if(this._actionCutinFaceData!==undefined)return this._actionCutinFaceData;var t={faceName:this.isActor()?this.faceName():this.battlerName(),faceMode:this.isActor()?"face":"battler",faceIndex:this.isActor()?this.faceIndex():0,faceHue:this.isActor()?0:this.battlerHue(),faceScale:"auto",offsetX:0,offsetY:0,antialias:Imported.Irina_ActionCutins.defaultFaceAntiAlias};if(Imported.KELYEP_DragonBones&&this.isEnemy()&&this.isReplacedByDragonBonesBattler()){t.faceName=dragonBonesIntegration.Game_Enemy_battlerName.call(this)}var e=this.isActor()?this.actor().note:this.enemy().note;var i=this.isActor()?this.currentClass().note:this.enemy().note;if(e.match(/<Action Cutin Picture: (.*)>/i)||i.match(/<Action Cutin Picture: (.*)>/i)){t.faceName=String(RegExp.$1);t.faceMode="picture";t.faceIndex=0}else if(e.match(/<Action Cutin Face: (.*),[ ](\d+)>/i)||i.match(/<Action Cutin Face: (.*),[ ](\d+)>/i)){t.faceName=String(RegExp.$1);t.faceMode="face";t.faceIndex=Number(RegExp.$2);if(t.faceName.match(/\[BUST\]/i)){t.faceMode="facebust";t.faceIndex=0}}else if(e.match(/<Action Cutin SV: (.*),[ ](\d+)>/i)||i.match(/<Action Cutin SV: (.*),[ ](\d+)>/i)){t.faceName=String(RegExp.$1);t.faceMode="svbattler";t.faceIndex=Number(RegExp.$2)}else if(e.match(/<Action Cutin Battler: (.*),[ ](\d+)>/i)||i.match(/<Action Cutin Battler: (.*),[ ](\d+)>/i)){t.faceName=String(RegExp.$1);t.faceMode="battler";t.faceHue=Number(RegExp.$2)}else if(e.match(/<Action Cutin Battler: (.*)>/i)||i.match(/<Action Cutin Battler: (.*)>/i)){t.faceName=String(RegExp.$1);t.faceMode="battler";t.faceHue=0}if(e.match(/<Action Cutin Scale: (.*)>/i)||i.match(/<Action Cutin Scale: (.*)>/i)){t.faceScale=Number(RegExp.$1)||1}if(e.match(/<Action Cutin Offset X: (.*)>/i)||i.match(/<Action Cutin Offset X: (.*)>/i)){t.offsetX=Number(RegExp.$1)}if(e.match(/<Action Cutin Offset Y: (.*)>/i)||i.match(/<Action Cutin Offset Y: (.*)>/i)){t.offsetY=Number(RegExp.$1)}if(e.match(/<Action Cutin Anti-Alias>/i)||i.match(/<Action Cutin Anti-Alias>/i)){t.antialias=true}else if(e.match(/<Action Cutin No Anti-Alias>/i)||i.match(/<Action Cutin No Anti-Alias>/i)){t.antialias=false}return t};Game_Battler.prototype.clearActionCutinFaceData=function(){this._actionCutinFaceData=undefined};Game_Battler.prototype.changeActionCutinFaceData=function(t,e,i,a){this._actionCutinFaceData=this.getActionCutinFaceData();this._actionCutinFaceData.faceMode=t.toLowerCase();this._actionCutinFaceData.faceName=e;this._actionCutinFaceData.faceIndex=i||0;this._actionCutinFaceData.faceHue=a||0;if(t==="face"&&e.match(/\[BUST\]/i))this._actionCutinFaceData.faceMode="facebust"};Game_Battler.prototype.changeActionCutinFaceScale=function(t){this._actionCutinFaceData=this.getActionCutinFaceData();this._actionCutinFaceData.faceScale=Number(t)||1};Game_Battler.prototype.changeActionCutinFaceOffset=function(t,e){this._actionCutinFaceData=this.getActionCutinFaceData();this._actionCutinFaceData.offsetX=Number(t)||0;this._actionCutinFaceData.offsetY=Number(e)||0};Game_Battler.prototype.changeActionCutinFaceAntiAlias=function(t){this._actionCutinFaceData=this.getActionCutinFaceData();this._actionCutinFaceData.antialias=t};Imported.Irina_ActionCutins.Scene_Base_createWindowLayer=Scene_Base.prototype.createWindowLayer;Scene_Base.prototype.createWindowLayer=function(){if(!Imported.Irina_ActionCutins.aboveOrBelowWindowLayer)this.createActionCutinContainer();Imported.Irina_ActionCutins.Scene_Base_createWindowLayer.call(this);if(Imported.Irina_ActionCutins.aboveOrBelowWindowLayer)this.createActionCutinContainer()};Scene_Base.prototype.createActionCutinContainer=function(){this._actionCutinContainer=new Sprite;this.addChild(this._actionCutinContainer)};Imported.Irina_ActionCutins.Scene_Battle_createDisplayObjects=Scene_Battle.prototype.createDisplayObjects;Scene_Battle.prototype.createDisplayObjects=function(){Imported.Irina_ActionCutins.Scene_Battle_createDisplayObjects.call(this);this.createFailSafeActionCutinContainer()};Scene_Battle.prototype.createFailSafeActionCutinContainer=function(){if(this._actionCutinContainer){var t=this.children.indexOf(this._windowLayer);if(Imported.Irina_ActionCutins.aboveOrBelowWindowLayer)t+=1;this._actionCutinContainer=new Sprite;this.addChildAt(this._actionCutinContainer,t)}};function TilingSprite_ActionCutin(){this.initialize.apply(this,arguments)}TilingSprite_ActionCutin.prototype=Object.create(TilingSprite.prototype);TilingSprite_ActionCutin.prototype.constructor=TilingSprite_ActionCutin;TilingSprite_ActionCutin.prototype.initialize=function(t,e){this._battler=t;this.initSettings(e);TilingSprite.prototype.initialize.call(this);this.createBitmap();this.createFaceSprite();this.createBorderSprites();this.createMask();this.performFlash();this.performShake();this.performSound();this.setBattlerFace(t);this.setForcedSettings();this.opacity=0};TilingSprite_ActionCutin.prototype.initSettings=function(t){this._settings=t||$actionCutinSettings();if(this._battler.isActor())this._settings.speedX*=-1;this._duration=this._settings.duration;this._fadeMark=Math.ceil(255/this._settings.opacitySpeed)};TilingSprite_ActionCutin.prototype.createBitmap=function(){var t=this._settings.backgroundHue;this.bitmap=ImageManager.loadPicture(this._settings.backgroundImg,t);this.blendMode=this._settings.blendMode;this.anchor.y=.5};TilingSprite_ActionCutin.prototype.createFaceSprite=function(){this._faceSprite=new Sprite(new Bitmap(1,1));this.addChild(this._faceSprite);this._faceSprite.anchor.x=.5;this._faceSprite.anchor.y=.5;this._faceMode="face";this._faceIndex=0};TilingSprite_ActionCutin.prototype.createBorderSprites=function(){var t=this._settings.borderThickness;var e=this._settings.width;var i=this._settings.height+this._settings.borderThickness*2;this._borderTopSprite=new Sprite(new Bitmap(e,t));this._borderTopSprite.bitmap.fillAll(this._settings.borderColor);this._borderTopSprite.anchor.y=1;this._borderTopSprite.anchor.x=.5;this.addChild(this._borderTopSprite);this._borderBottomSprite=new Sprite(new Bitmap(e,t));this._borderBottomSprite.bitmap.fillAll(this._settings.borderColor);this._borderBottomSprite.anchor.x=.5;this.addChild(this._borderBottomSprite);this._borderLeftSprite=new Sprite(new Bitmap(t,i));this._borderLeftSprite.bitmap.fillAll(this._settings.borderColor);this._borderLeftSprite.anchor.x=1;this._borderLeftSprite.anchor.y=.5;this.addChild(this._borderLeftSprite);this._borderRightSprite=new Sprite(new Bitmap(t,i));this._borderRightSprite.bitmap.fillAll(this._settings.borderColor);this._borderRightSprite.anchor.y=.5;this.addChild(this._borderRightSprite)};TilingSprite_ActionCutin.prototype.createMask=function(){this._maskSprite=new Sprite(new Bitmap(Graphics.boxWidth,Graphics.boxHeight));this._maskSprite.bitmap.fillAll("black");this._maskSprite.bitmap.fillRect(this._settings.x,this._settings.y-this._settings.height/2,this._settings.width,this._settings.height,"white");this._faceSprite._mask=this._maskSprite};TilingSprite_ActionCutin.prototype.performFlash=function(){if(this._settings.flash)$gameScreen.startFlash(this._settings.flashColor,this._settings.flashDuration)};TilingSprite_ActionCutin.prototype.performShake=function(){if(this._settings.shake)$gameScreen.startShake(this._settings.shakePower,this._settings.shakeSpeed,this._settings.shakeDuration)};TilingSprite_ActionCutin.prototype.performSound=function(){if(this._settings.sound){AudioManager.playSe({name:this._settings.soundName,volume:this._settings.soundVolume,pitch:this._settings.soundPitch,pan:this._settings.soundPan})}};TilingSprite_ActionCutin.prototype.setBattlerFace=function(t){if(!t)return;var e=t.getActionCutinFaceData();var i=e.faceName;this._faceMode=e.faceMode;this._faceIndex=e.faceIndex;this._faceScale=e.faceScale;this._faceOffsetX=e.offsetX;this._faceOffsetY=e.offsetY;this._originalFaceOffsetX=this._faceOffsetX;this._originalFaceOffsetY=this._faceOffsetY;this._antiAlias=e.antialias;switch(this._faceMode){case"picture":this._faceSprite.bitmap=ImageManager.loadPicture(i);break;case"svbattler":this._faceSprite.bitmap=ImageManager.loadSvActor(i);break;case"face":case"facebust":this._faceSprite.bitmap=ImageManager.loadFace(i);break;case"battler":var a=e.faceHue;if(Graphics.isWebGL()){this._faceSprite._colorMatrixFilter=new PIXI.filters.ColorMatrixFilter;this._faceSprite._colorMatrixFilter.hue(a);this._faceSprite._filters=[this._faceSprite._colorMatrixFilter];a=0}if($gameSystem.isSideView()){this._faceSprite.bitmap=ImageManager.loadSvEnemy(i,a)}else{this._faceSprite.bitmap=ImageManager.loadEnemy(i,a)}break}this._faceOffsetTargetX=this._faceOffsetX;var n=this._settings.shiftDistanceX;this._faceOffsetX+=t.isActor()?n:-n;this._faceOffsetTargetY=this._faceOffsetY;this._faceOffsetY-=this._settings.shiftDistanceY};TilingSprite_ActionCutin.prototype.setForcedSettings=function(){if(this._settings.forcedScale!==0)this._faceScale=this._settings.forcedScale;if(this._settings._antiAlias!==0)this._antiAlias=this._settings.forcedAntiAlias;this._faceOffsetX+=this._settings.forcedOffsetX;this._faceOffsetY+=this._settings.forcedOffsetY;this._originalFaceOffsetX+=this._settings.forcedOffsetX;this._originalFaceOffsetY+=this._settings.forcedOffsetY;this._faceOffsetTargetX+=this._settings.forcedOffsetX;this._faceOffsetTargetY+=this._settings.forcedOffsetY};TilingSprite_ActionCutin.prototype.update=function(){TilingSprite.prototype.update.call(this);this.updateDimensions();this.updateScrolling();this.updateFaceShift();this.updateFaceSprite();this.updateOpacity()};TilingSprite_ActionCutin.prototype.updateDimensions=function(){this.move(this._settings.x,this._settings.y,this._settings.width,this._settings.height);this._borderTopSprite.x=this._settings.width/2;this._borderTopSprite.y=this._settings.height/-2;this._borderBottomSprite.x=this._settings.width/2;this._borderBottomSprite.y=this._settings.height/2;this._borderLeftSprite.x=0;this._borderRightSprite.x=this._settings.width};TilingSprite_ActionCutin.prototype.updateScrolling=function(){this.origin.x+=this._settings.speedX;this.origin.y+=this._settings.speedY};TilingSprite_ActionCutin.prototype.updateFaceShift=function(){var t=this._duration;if(t>this._settings.duration-this._settings.shiftFrames){t-=this._settings.duration-this._settings.shiftFrames;this._faceOffsetX=(this._faceOffsetX*(t-1)+this._faceOffsetTargetX)/t;this._faceOffsetY=(this._faceOffsetY*(t-1)+this._faceOffsetTargetY)/t}else if(t<=this._settings.shiftFrames){this._faceOffsetTargetX=this._originalFaceOffsetX-(this._battler.isActor()?this._settings.shiftDistanceX:-this._settings.shiftDistanceX);this._faceOffsetTargetY=this._originalFaceOffsetY+this._settings.shiftDistanceY;this._faceOffsetX=(this._faceOffsetX*(t-1)+this._faceOffsetTargetX)/t;this._faceOffsetY=(this._faceOffsetY*(t-1)+this._faceOffsetTargetY)/t}else{this._faceOffsetX=this._faceOffsetTargetX;this._faceOffsetY=this._faceOffsetTargetY}};TilingSprite_ActionCutin.prototype.updateFaceSprite=function(){if(!this._faceSprite.bitmap&&this._faceSprite.bitmap.height>0)return;this._faceSprite.x=this._settings.width/2;this._faceSprite.x+=this._faceOffsetX;this._faceSprite.y=this._faceOffsetY;switch(this._faceMode){case"face":this.updateFaceSpriteFaceFrame();break;case"svbattler":this.updateFaceSpriteSvBattlerFrame();break;default:this.updateFaceSpriteFullFrame()}this.updateFaceScale();this.updateFaceAntialias()};TilingSprite_ActionCutin.prototype.updateFaceSpriteFaceFrame=function(){var t=Window_Base._faceWidth;var e=Window_Base._faceHeight;var i=this._faceIndex%4*t;var a=Math.floor(this._faceIndex/4)*e;this._faceSprite.setFrame(i,a,t,e)};TilingSprite_ActionCutin.prototype.updateFaceSpriteSvBattlerFrame=function(){var t=this._faceSprite.bitmap.width/9;var e=this._faceSprite.bitmap.height/6;var i=this._faceIndex%9*t;var a=Math.floor(this._faceIndex/9)*e;this._faceSprite.setFrame(i,a,t,e)};TilingSprite_ActionCutin.prototype.updateFaceSpriteFullFrame=function(){var t=this._faceSprite.bitmap.width;var e=this._faceSprite.bitmap.height;this._faceSprite.setFrame(0,0,t,e)};TilingSprite_ActionCutin.prototype.updateFaceScale=function(){if(this._faceScale==="auto"){var t=(this._settings.height+2)/this._faceSprite.height;this._faceSprite.scale.x=this._faceSprite.scale.y=t}else{this._faceSprite.scale.x=this._faceSprite.scale.y=this._faceScale}this._faceSprite.scale.y=Math.abs(this._faceSprite.scale.y)};TilingSprite_ActionCutin.prototype.updateFaceAntialias=function(){if(this._antiAlias){this._faceSprite.bitmap._baseTexture.scaleMode=PIXI.SCALE_MODES.LINEAR}else{this._faceSprite.bitmap._baseTexture.scaleMode=PIXI.SCALE_MODES.NEAREST}};TilingSprite_ActionCutin.prototype.updateOpacity=function(){if(this._duration>0&&this._duration>this._fadeMark){this.opacity+=this._settings.opacitySpeed;this._duration--}else if(this._duration>0&&this._duration<=this._fadeMark){this.opacity-=this._settings.opacitySpeed;this._duration--}else{this.opacity-=this._settings.opacitySpeed}if(this._duration<=0&&this.opacity<=0&&this.parent){this.parent.removeChild(this)}};Imported.Irina_ActionCutins.Window_BattleLog_performActionStart=Window_BattleLog.prototype.performActionStart;Window_BattleLog.prototype.performActionStart=function(t,e){Imported.Irina_ActionCutins.Window_BattleLog_performActionStart.call(this,t,e);if(this.checkActionCutinAvailable(e))this.performActionCutin(t,e)};Window_BattleLog.prototype.checkActionCutinAvailable=function(t){if(!t)return false;if(!t.item())return false;if(t.item().note.match(/<No Action Cutin>/i))return false;if(t.item().note.match(/<Action Cutin>/i))return true;if(t.isAttack())return false;if(t.isGuard())return false;if(t.isSkill()&&Imported.Irina_ActionCutins.defaultAllSkillsHaveCutins)return true;if(t.isItem()&&Imported.Irina_ActionCutins.defaultAllItemsHaveCutins)return true;if(t.isPhysical()&&Imported.Irina_ActionCutins.defaultAllPhysicalHaveCutins)return true;if(t.isMagical()&&Imported.Irina_ActionCutins.defaultAllMagicalHaveCutins)return true;if(t.isCertainHit()&&Imported.Irina_ActionCutins.defaultAllCertainHaveCutins)return true;return false};Window_BattleLog.prototype.performActionCutin=function(t,e){var i=$actionCutinSettings(e.item());$actionCutin(t,i);this.push("waitForActionCutin")};Window_BattleLog.prototype.waitForActionCutin=function(){this.setWaitMode("actionCutin")};Imported.Irina_ActionCutins.Window_BattleLog_updateWaitMode=Window_BattleLog.prototype.updateWaitMode;Window_BattleLog.prototype.updateWaitMode=function(){if(this._waitMode==="actionCutin"){if(SceneManager._scene._actionCutinContainer.children.length>0)return true}return Imported.Irina_ActionCutins.Window_BattleLog_updateWaitMode.call(this)};