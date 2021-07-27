//=============================================================================
// Olivia Engine - Victory Sequence UI - for RPG Maker MV version 1.6.1
// Olivia_OneScreenVictory.js
//=============================================================================
 /*:
 * @plugindesc <VictorySequenceUI> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that makes the battle system's victory sequence
 * only a single screen. It puts together all of the reward information gained
 * from battle onto a compact screen to display everything at once before the
 * player goes back to the map scene.
 *
 * This plugin best works in a game with a higher resolution. I recommend a
 * 16:9 screen ratio of roughly 1280x720 size. If you want to change your game
 * screen's resolution, please use Yanfly's Core Engine plugin:
 * http://yanfly.moe/2015/10/09/yep-1-core-engine/
 *
 * For the best camera panning effect, I suggest you use Yanfly's Battle Engine
 * Core and Action Sequence Packs 1 through 3 together in your game alongside
 * this plugin. You can find them here:
 * http://yanfly.moe/2015/10/10/yep-3-battle-engine-core/
 * http://yanfly.moe/2015/10/11/yep-4-action-sequence-pack-1/
 * http://yanfly.moe/2015/10/12/yep-5-action-sequence-pack-2/
 * http://yanfly.moe/2015/10/12/yep-6-action-sequence-pack-3/
 *
 * There are many plugin parameters to set up.
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * Audio: Lets you adjust the settings for the sound effect played when a level
 * up occurs and the BGM that plays during the victory sequence.
 *
 * Transition: There is a brief moment of wait after the battle ends before
 * fading into the victory sequence. These plugin parameters let you control
 * all of that.
 *
 * Background: These plugin parameters adjust the many entities placed on the
 * victory sequence UI. Each one should be named after the section they are
 * responsible for managing.
 *
 * Rewards: These plugin parameters handle the displayed rewards found such as
 * money, EXP, and JP if you are using Yanfly's Job Points plugin.
 *
 * Status Windows: The status windows are in the lower left corner of the screen
 * and they display the actor's progress at the start of the victory sequence to
 * what they become after it. The plugin parameters manage those aspects.
 *
 * Continue Button: The continue button at the bottom right corner of the screen
 * appears after the status windows finish loading. They tell the player how to
 * exit the battle from the victory sequence.
 *
 * ---------------
 * Plugin Commands
 * ---------------
 *
 * If you want to turn on or off the victory sequence or the music, use these
 * plugin commands:
 *
 * EnableVictoryAftermath
 * DisableVictoryAftermath
 * This turns on or off the victory sequence. This one matches Yanfly's plugin
 * command so you don't have to change your game's plugin command call if you
 * are switching over.
 *
 * EnableVictoryMusic
 * DisableVictoryMusic
 * This turns on or off the victory BGM and ME. This one matches Yanfly's
 * plugin command so you don't have to change your game's plugin command call
 * if you are switching over.
 *
 * -------------------
 * W A R N I N G ! ! !
 * -------------------
 *
 * This plugin is made for RPG Maker MV versions 1.6.1 and below. If you update
 * RPG Maker MV past that and this plugin breaks, I am NOT responsible for it.
 *
 * -------------
 * Compatibility
 * -------------
 *
 * This plugin is compatible with the following plugins:
 *
 * - YEP Core Engine
 * - YEP Battle Engine Core
 * - YEP Action Sequence Packs 1, 2, 3
 * - YEP Animated Sideview Enemies
 * - YEP Buffs & States Core
 * - YEP Damage Core
 * - YEP Element Core
 * - YEP Item Core
 * - YEP Equip Core
 * - YEP Job Points
 *
 * Place this plugin under those in the Plugin Manager list.
 *
 * ------------
 * Terms of Use
 * ------------
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'Fallen Angel Olivia' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins without credit.
 *
 * -------
 * Credits
 * -------
 *
 * If you are using this plugin, credit the following people:
 * 
 * - Fallen Angel Olivia
 *
 * @param 
 * @param 
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param 
 * @param 
 *
 * @param Victory Screen Audio
 * @text Audio
 * @parent Victory Screen UI
 *
 * @param Victory Screen Level Sound
 * @text Level Sound
 * @parent Victory Screen Audio
 * @type file
 * @dir audio/se/
 * @desc Filename for the sound effect used when a level up occurs
 * @default Skill2
 *
 * @param Victory Screen Level Sound Volume
 * @text Volume
 * @parent Victory Screen Level Sound
 * @type number
 * @desc Volume of this sound effect
 * @default 90
 *
 * @param Victory Screen Level Sound Pitch
 * @text Pitch
 * @parent Victory Screen Level Sound
 * @type number
 * @desc Pitch of this sound effect
 * @default 100
 *
 * @param Victory Screen Level Sound Pan
 * @text Pan
 * @parent Victory Screen Level Sound
 * @type number
 * @desc Pan of this sound effect
 * @default 0
 *
 * @param Victory Screen BGM
 * @text BGM
 * @parent Victory Screen Audio
 * @type file
 * @dir audio/bgm/
 * @desc Filename for the BGM used during the victory sequence
 * @default Ship3
 *
 * @param Victory Screen BGM Volume
 * @text Volume
 * @parent Victory Screen BGM
 * @type number
 * @desc Volume of this sound effect
 * @default 90
 *
 * @param Victory Screen BGM Pitch
 * @text Pitch
 * @parent Victory Screen BGM
 * @type number
 * @desc Pitch of this sound effect
 * @default 100
 *
 * @param Victory Screen BGM Pan
 * @text Pan
 * @parent Victory Screen BGM
 * @type number
 * @desc Pan of this sound effect
 * @default 0
 *
 * @param Victory Screen Transition
 * @text Transition
 * @parent Victory Screen UI
 *
 * @param Victory Screen Transition Power
 * @text Transition Power
 * @parent Victory Screen Transition
 * @type number
 * @min 1
 * @desc Transition power when entering victory sequence. Use higher numbers to make transition faster.
 * @default 8
 *
 * @param Victory Screen Hide Window Delay
 * @text Hide Window Delay
 * @parent Victory Screen Transition
 * @type number
 * @desc Milliseconds used to wait before hiding the status windows
 * @default 500
 *
 * @param Victory Screen Display Delay
 * @text Display Delay
 * @parent Victory Screen Transition
 * @type number
 * @desc Milliseconds used to wait before showing the display
 * @default 1000
 *
 * @param Victory Screen Zoom
 * @text Zoom?
 * @parent Victory Screen Transition
 * @type boolean
 * @on On
 * @off Off
 * @desc Zoom in to the party during the transition?
 * @default true
 *
 * @param Victory Screen Zoom X
 * @text X
 * @parent Victory Screen Zoom
 * @type number
 * @desc X coordinate to zoom in at
 * @default 700
 *
 * @param Victory Screen Zoom Y
 * @text Y
 * @parent Victory Screen Zoom
 * @type number
 * @desc Y coordinate to zoom in at
 * @default 460
 *
 * @param Victory Screen Zoom Scale
 * @text Scale
 * @parent Victory Screen Zoom
 * @desc Scale to zoom in at
 * @default 2.0
 *
 * @param Victory Screen Zoom Duration
 * @text Duration
 * @parent Victory Screen Zoom
 * @type number
 * @desc Duration in frames for the whole zoom
 * @default 300
 *
 * @param Victory Screen Background
 * @text Background
 * @parent Victory Screen UI
 *
 * @param Victory Screen Background Dimmer Height
 * @text Dim Start Rate
 * @parent Victory Screen Background
 * @desc The veritcal portion of the screen to start dimming at
 * @default 0.2
 *
 * @param Victory Screen Background Side Thickness
 * @text Side Thickness
 * @parent Victory Screen Background
 * @type number
 * @desc Amount of distance between the side of the screen and the contents
 * @default 96
 *
 * @param Victory Screen Background Middle Thickness
 * @text Middle Thickness
 * @parent Victory Screen Background
 * @type number
 * @desc Amount of distance between content in the middle of the screen
 * @default 96
 *
 * @param Victory Screen Background Text Items
 * @text Item Reward Text
 * @parent Victory Screen Background
 * @desc Text used to display the items received from battle
 * @default Items Obtained
 *
 * @param Victory Screen Background Text Items Font Size
 * @text Font Size
 * @parent Victory Screen Background Text Items
 * @type number
 * @min 1
 * @desc Font size used for Item Reward Text
 * @default 36
 *
 * @param Victory Screen Background Text Victory
 * @text Victory Text
 * @parent Victory Screen Background
 * @desc Text to display for Victory screen title
 * @default Victory!
 *
 * @param Victory Screen Background Text Victory Font Size
 * @text Font Size
 * @parent Victory Screen Background Text Victory
 * @type number
 * @min 1
 * @desc Font size used for Victory Text
 * @default 60
 *
 * @param Victory Screen Rewards
 * @text Rewards
 * @parent Victory Screen Background
 *
 * @param Victory Screen Rewards Category Font Size
 * @text Category Font Size
 * @parent Victory Screen Rewards
 * @type number
 * @min 1
 * @desc Font size used for reward categories
 * @default 20
 *
 * @param Victory Screen Rewards Category Font Color
 * @text Category Font Color
 * @parent Victory Screen Rewards
 * @type number
 * @desc Text color used for reward categories
 * @default 8
 *
 * @param Victory Screen Rewards Results Font Size
 * @text Results Font Size
 * @parent Victory Screen Rewards
 * @type number
 * @min 1
 * @desc Font size used for reward results
 * @default 28
 *
 * @param Victory Screen Rewards Results Font Color
 * @text Results Font Color
 * @parent Victory Screen Rewards
 * @type number
 * @desc Text color used for reward results
 * @default 0
 *
 * @param Victory Screen Status Windows
 * @text Status Windows
 * @parent Victory Screen UI
 *
 * @param Victory Screen Status Actor Font Size
 * @text Actor Name Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for actor names
 * @default 20
 *
 * @param Victory Screen Status Level Font Size
 * @text Level Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for levels
 * @default 20
 *
 * @param Victory Screen Status Level Format
 * @text Level Format
 * @parent Victory Screen Status Windows
 * @desc Text format used for levels. %1 is 
 * @default Lv.%1
 *
 * @param Victory Screen Status JP Font Size
 * @text JP Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for JP
 * @default 16
 *
 * @param Victory Screen Status EXP Font Size
 * @text EXP Label Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for the EXP label
 * @default 16
 *
 * @param Victory Screen Status Update Duration
 * @text Update Duration
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Duration in frames for updating actors in the status windows
 * @default 180
 *
 * @param Victory Screen Status Current EXP Font Size
 * @text Current EXP Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size for current EXP
 * @default 20
 *
 * @param Victory Screen Status Current EXP Font Color
 * @text Current EXP Font Color
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color for current EXP
 * @default 0
 *
 * @param Victory Screen Status Next EXP Font Size
 * @text Next EXP Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size for next level's EXP
 * @default 18
 *
 * @param Victory Screen Status Next EXP Font Color
 * @text Next EXP Font Color
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Font color for next level's EXP
 * @default 8
 *
 * @param Victory Screen Status Exp Gauge Height
 * @text Gauge Height
 * @parent Victory Screen Status Windows
 * @type number
 * @min 3
 * @desc Height for EXP gauge
 * @default 18
 *
 * @param Victory Screen Status Exp Gauge Color 1
 * @text Gauge Color 1
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color 1 for EXP gauge
 * @default 30
 *
 * @param Victory Screen Status Exp Gauge Color 2
 * @text Gauge Color 2
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color 2 for EXP gauge
 * @default 31
 *
 * @param Victory Screen Status Level Up Text
 * @text Level Up Text
 * @parent Victory Screen Status Windows
 * @desc Text to display when a level is reached
 * @default Level Up!
 *
 * @param Victory Screen Status Level Up Font Size
 * @text Level Up Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size for Level Up Text
 * @default 36
 *
 * @param Victory Screen Status Level Up Color
 * @text Level Up Font Color
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color for Level Up Text
 * @default 17
 *
 * @param Victory Screen Continue Button
 * @text Continue Button
 * @parent Victory Screen UI
 *
 * @param Victory Screen Continue Duration
 * @text Duration
 * @parent Victory Screen Continue Button
 * @type number
 * @min 1
 * @desc Duration in frames to wait before continue button appears
 * @default 180
 *
 * @param Victory Screen Continue Text
 * @text Text
 * @parent Victory Screen Continue Button
 * @desc Text to display to show at the bottom of the screen when ready to exit battle
 * @default Press \c[27]Z\c[0] or \c[27]X\c[0] to continue
 *
 * @param 
 * @param 
 *
 */
//=============================================================================

var _0x1e16=['makeItemList','drawBackgroundStrip','ActorLevelFontSize','RewardCategoryFontSize','Victory\x20Screen\x20Level\x20Sound\x20Pan','OctoBattle','_tempActor','createLevelUpSprite','Victory\x20Screen\x20Background\x20Middle\x20Thickness','fillStyle','round','moveTo','levelUp','ceil','Victory\x20Screen\x20Status\x20Level\x20Up\x20Color','normalColor','dimColor1','ZoomInTransition','terminate','bind','drawForegroundJPLabel','clearZoom','createActorWindows','_index','contains','isArmor','drawBackgroundRewardStrip','textPadding','_skipVictoryMusic','Enabled','resetFontSettings','_gaugeWidth','_phase','ActorJPFontSize','isItem','initMembers','boxHeight','Victory\x20Screen\x20Background\x20Text\x20Victory\x20Font\x20Size','Util','playBgm','Victory\x20Screen\x20Continue\x20Duration','min','ZoomScale','drawBackgroundRewardStrips','maxCols','createVictoryWindows','height','WaitDisplayVictory','Victory\x20Screen\x20Status\x20Level\x20Format','_expTarget','fontSize','___Game_Actor_shouldDisplayLevelUp___','_skipVictoryAftermath','drawBackgroundMajorFadeOut','name','drawText','Victory\x20Screen\x20Status\x20Level\x20Font\x20Size','_victoryWindow','processVictory','_continueWindow','ExpGaugeColor2','Victory\x20Screen\x20Level\x20Sound','width','apply','string','center','isBusy','Victory\x20Screen\x20Background\x20Text\x20Items','createItemListWindow','YEP_X_ActSeqPack3','Victory\x20Screen\x20Status\x20Actor\x20Font\x20Size','startBattleZoom','ActorLevelFormat','ExpNextFontSize','Victory\x20Screen\x20Continue\x20Text','standardPadding','BackgroundDimHeight','textWidthEx','makeDeepCopy','Victory\x20Screen\x20Status\x20Current\x20EXP\x20Font\x20Color','ExpGaugeColor1','currencyUnit','drawForeground','textColor','push','Victory\x20Screen\x20Status\x20Exp\x20Gauge\x20Height','drawBattlePolygon','YEP_BattleEngineCore','isEnabled','Victory\x20Screen\x20Status\x20Next\x20EXP\x20Font\x20Size','_victoryPhase','toLocaleString','drawForegroundActorName','parameters','select','___BattleManager_isBusy___','makeRewards','VictoryUI','constructor','WaitHideWindows','gold','extractDrops','drawBackground','drawForegroundItemsObtained','strokeStyle','fillRect','children','_duration','lineHeight','sort','textWidth','_jpTextWidth','_jp','LevelUpSound','updateGaugeSpriteWidth','toGroup','Victory\x20Screen\x20Zoom','updateLevelUpSpriteScale','floor','Victory\x20Screen\x20Zoom\x20Scale','MiddleThickness','___Game_Interpreter_pluginCommand___','refresh','Victory\x20Screen\x20Status\x20Current\x20EXP\x20Font\x20Size','changeTextColor','replayBgmAndBgs','TextItemsFontSize','addWindow','YEP_JobPoints','ZoomDuration','update','_jpTarget','ActorUpdateDuration','setupConstants','cancel','GaugeOutline','left','needsNumber','anchor','Victory\x20Screen\x20Hide\x20Window\x20Delay','_exp','ExpGaugeHeight','isRepeated','makeTempActors','Victory\x20Screen\x20Rewards\x20Results\x20Font\x20Size','_windowLayer','LevelUpText','LevelUpTextFontSize','members','description','Victory\x20Screen\x20Status\x20Exp\x20Gauge\x20Color\x202','addChild','fill','_gaugeSprite','_dropItems','filter','createContinueWindow','Victory\x20Screen\x20Status\x20EXP\x20Font\x20Size','beginPath','_levelUpSprite','startZoom','_cameraX','battleEnd','performVictory','right','Victory\x20Screen\x20BGM\x20Pitch','RewardResultsFontColor','drawTextEx','___Scene_Battle_terminate___','contents','_dropArmors','Victory\x20Screen\x20BGM\x20Pan','_scene','___Game_System_initialize___','SideThickness','updateActorExp','_playLevelUpSound','createGaugeSprite','isTriggered','$&,','Victory\x20Screen\x20Rewards\x20Category\x20Font\x20Color','TransitionPower','Victory','_setDirty','calculateNextLevelConstants','_actor','_subWindow','_levelUp','RewardCategoryFontColor','VictoryBgm','forEach','match','RewardResultsFontSize','boxWidth','_expWidth','_ending','playVictoryMe','TextVictory','Victory\x20Screen\x20Background\x20Dimmer\x20Height','_levelUpSpriteFade','processReady','___BattleManager_initMembers___','skipVictoryAftermath','createSubWindow','Victory\x20Screen\x20BGM','_tempActors','expForLevel','items','drawForgreoundVictoryText','changePaintOpacity','drawActorExpInformation','opacity','currentExp','removeBattleStates','_dropWeapons','drawActorLevelInformation','show','create','ExpNextFontColor','_context','_currentLevelExp','ContinueText','Victory\x20Screen\x20Rewards\x20Results\x20Font\x20Color','lineTo','Param','TextVictoryFontSize','endVictoryPhase','LevelUpTextColor','ZoomX','Victory\x20Screen\x20Zoom\x20Y','length','Victory\x20Screen\x20BGM\x20Volume','replace','setCameraDuration','_rewards','bitmap','ExpCurrentFontColor','inBattle','Victory\x20Screen\x20Status\x20Next\x20EXP\x20Font\x20Color','clear','translucentOpacity','Victory\x20Screen\x20Status\x20JP\x20Font\x20Size','skipVictoryMusic','pluginCommand','gaugeBackColor','ActorNameFontSize','Victory\x20Screen\x20Status\x20Exp\x20Gauge\x20Color\x201','_itemWindow','initialize','getCount','_level','_data','scale','Victory\x20Screen\x20Transition\x20Power','Victory\x20Screen\x20Status\x20Level\x20Up\x20Text','playLevelUpSound','updateLevelUpSpriteFade','Victory\x20Screen\x20Level\x20Sound\x20Volume','hideAllWindows','drawForegroundRewardText','updateBattleEnd','gainRewards','contentsOpacity','Victory\x20Screen\x20Level\x20Sound\x20Pitch','save','gradientFillRect','YEP_CoreEngine','ActorEXPFontSize','shouldDisplayLevelUp','_cameraY','prototype','ExpCurrentFontSize','_levelText','call','_nextLevelExp','drawActorJpInformation','drawForegroundRewards','Victory\x20Screen\x20Zoom\x20Duration','numItems','level','drawForegroundGaugeBack','format','exp','playSe','_maxLevel','Victory\x20Screen\x20Status\x20Level\x20Up\x20Font\x20Size','addChildToBack','hide','drawItemNumber','globalAlpha','startVictoryZoom','isWeapon'];(function(_0x118556,_0x1e1644){var _0x5bb558=function(_0x5245aa){while(--_0x5245aa){_0x118556['push'](_0x118556['shift']());}};_0x5bb558(++_0x1e1644);}(_0x1e16,0xad));var _0x5bb5=function(_0x118556,_0x1e1644){_0x118556=_0x118556-0x0;var _0x5bb558=_0x1e16[_0x118556];return _0x5bb558;};var Imported=Imported||{};Imported['Olivia_OctoBattle']=!![];var Olivia=Olivia||{};Olivia[_0x5bb5('0x7c')]=Olivia[_0x5bb5('0x7c')]||{};var parameters=$plugins[_0x5bb5('0x112')](function(_0x3a3e21){return _0x3a3e21[_0x5bb5('0x10c')]['contains']('<VictorySequenceUI>');})[0x0][_0x5bb5('0xd4')];Olivia['OctoBattle']['VictoryUI']={'Enabled':!![],'LevelUpSound':{'name':String(parameters[_0x5bb5('0xb4')]),'volume':Number(parameters[_0x5bb5('0x54')]),'pitch':Number(parameters[_0x5bb5('0x5a')]),'pan':Number(parameters[_0x5bb5('0x7b')])},'VictoryBgm':{'name':String(parameters[_0x5bb5('0x1f')]),'volume':Number(parameters[_0x5bb5('0x3a')]),'pitch':Number(parameters[_0x5bb5('0x11c')]),'pan':Number(parameters[_0x5bb5('0x122')])},'TransitionPower':Number(parameters[_0x5bb5('0x50')]),'WaitHideWindows':Number(parameters[_0x5bb5('0x102')]),'WaitDisplayVictory':Number(parameters['Victory\x20Screen\x20Display\x20Delay']),'ZoomInTransition':eval(parameters[_0x5bb5('0xeb')]),'ZoomX':Number(parameters['Victory\x20Screen\x20Zoom\x20X']),'ZoomY':Number(parameters[_0x5bb5('0x38')]),'ZoomScale':Number(parameters[_0x5bb5('0xee')]),'ZoomDuration':Number(parameters[_0x5bb5('0x68')]),'BackgroundDimHeight':Number(parameters[_0x5bb5('0x19')]),'SideThickness':Number(parameters['Victory\x20Screen\x20Background\x20Side\x20Thickness']),'MiddleThickness':Number(parameters[_0x5bb5('0x7f')]),'TextItems':String(parameters[_0x5bb5('0xba')]),'TextItemsFontSize':Number(parameters['Victory\x20Screen\x20Background\x20Text\x20Items\x20Font\x20Size']),'TextVictory':String(parameters['Victory\x20Screen\x20Background\x20Text\x20Victory']),'TextVictoryFontSize':Number(parameters[_0x5bb5('0x9c')]),'RewardCategoryFontSize':Number(parameters['Victory\x20Screen\x20Rewards\x20Category\x20Font\x20Size']),'RewardCategoryFontColor':Number(parameters[_0x5bb5('0x7')]),'RewardResultsFontSize':Number(parameters[_0x5bb5('0x107')]),'RewardResultsFontColor':Number(parameters[_0x5bb5('0x31')]),'ActorNameFontSize':Number(parameters[_0x5bb5('0xbd')]),'ActorLevelFontSize':Number(parameters[_0x5bb5('0xaf')]),'ActorLevelFormat':String(parameters[_0x5bb5('0xa7')]),'ActorJPFontSize':Number(parameters[_0x5bb5('0x44')]),'ActorEXPFontSize':Number(parameters[_0x5bb5('0x114')]),'ActorUpdateDuration':Number(parameters['Victory\x20Screen\x20Status\x20Update\x20Duration']),'ExpCurrentFontSize':Number(parameters[_0x5bb5('0xf2')]),'ExpCurrentFontColor':Number(parameters[_0x5bb5('0xc6')]),'ExpNextFontSize':Number(parameters[_0x5bb5('0xd0')]),'ExpNextFontColor':Number(parameters[_0x5bb5('0x41')]),'ExpGaugeHeight':Number(parameters[_0x5bb5('0xcc')]),'ExpGaugeColor1':Number(parameters[_0x5bb5('0x49')]),'ExpGaugeColor2':Number(parameters[_0x5bb5('0x10d')]),'LevelUpText':String(parameters[_0x5bb5('0x51')]),'LevelUpTextFontSize':Number(parameters[_0x5bb5('0x70')]),'LevelUpTextColor':Number(parameters[_0x5bb5('0x85')]),'ContinueDuration':Number(parameters[_0x5bb5('0x9f')]),'ContinueText':String(parameters[_0x5bb5('0xc1')])};if(Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x94')]){Olivia[_0x5bb5('0x7c')]['Victory']=Olivia[_0x5bb5('0x7c')][_0x5bb5('0x9')]||{};Bitmap[_0x5bb5('0x61')][_0x5bb5('0xcd')]=function(_0x2818b2,_0x2ef82d,_0x402f43,_0x263fa0,_0x172212){var _0x40354e=this[_0x5bb5('0x2e')];_0x40354e[_0x5bb5('0x5b')]();_0x40354e[_0x5bb5('0x115')]();_0x40354e[_0x5bb5('0x82')](_0x2818b2[0x0],_0x2818b2[0x1]);for(var _0x3df3b2=0x2;_0x3df3b2<_0x2818b2[_0x5bb5('0x39')];_0x3df3b2+=0x2){_0x40354e[_0x5bb5('0x32')](_0x2818b2[_0x3df3b2],_0x2818b2[_0x3df3b2+0x1]);}_0x40354e['lineTo'](_0x2818b2[0x0],_0x2818b2[0x1]);_0x40354e[_0x5bb5('0xdf')]=_0x2ef82d;_0x40354e['lineWidth']=_0x402f43;if(_0x172212){_0x40354e['stroke']();}_0x40354e[_0x5bb5('0x74')]=_0x263fa0;_0x40354e[_0x5bb5('0x80')]=_0x2ef82d;_0x40354e[_0x5bb5('0x10f')]();_0x40354e[_0x5bb5('0x74')]=0x1;_0x40354e['restore']();this[_0x5bb5('0xa')]();};Olivia[_0x5bb5('0x7c')][_0x5bb5('0x9')][_0x5bb5('0x1c')]=BattleManager[_0x5bb5('0x9a')];BattleManager[_0x5bb5('0x9a')]=function(){Olivia['OctoBattle'][_0x5bb5('0x9')][_0x5bb5('0x1c')][_0x5bb5('0x64')](this);this[_0x5bb5('0xd1')]=![];};Olivia[_0x5bb5('0x7c')][_0x5bb5('0x9')][_0x5bb5('0xd6')]=BattleManager[_0x5bb5('0xb9')];BattleManager[_0x5bb5('0xb9')]=function(){if(this[_0x5bb5('0x97')]==='battleEnd'&&this[_0x5bb5('0xd1')]){return!![];}else{return Olivia[_0x5bb5('0x7c')][_0x5bb5('0x9')][_0x5bb5('0xd6')][_0x5bb5('0x64')](this);}};BattleManager[_0x5bb5('0xb1')]=function(){this['_logWindow']['clear']();this[_0x5bb5('0xd1')]=!![];if(this['_windowLayer']){this['_windowLayer']['x']=0x0;}this[_0x5bb5('0x97')]=_0x5bb5('0x119');$gameParty[_0x5bb5('0x28')]();if(!$gameSystem[_0x5bb5('0x45')]()&&!$gameSystem['skipVictoryAftermath']()){this[_0x5bb5('0x17')]();this['playVictoryBgm']();}this['makeTempActors']();this[_0x5bb5('0xd7')]();this[_0x5bb5('0x58')]();this['endBattle'](0x0);if($gameSystem[_0x5bb5('0x1d')]()){setTimeout(BattleManager[_0x5bb5('0x57')][_0x5bb5('0x8a')](this),0x3e8);}else{if(Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x88')]){this[_0x5bb5('0x75')]();}$gameParty[_0x5bb5('0x11a')]();setTimeout(SceneManager[_0x5bb5('0x123')][_0x5bb5('0x55')][_0x5bb5('0x8a')](SceneManager[_0x5bb5('0x123')]),Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xda')]);setTimeout(SceneManager['_scene'][_0x5bb5('0xa4')][_0x5bb5('0x8a')](SceneManager[_0x5bb5('0x123')]),Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0xa6')]);}};BattleManager['playVictoryBgm']=function(){AudioManager[_0x5bb5('0x9e')](Olivia[_0x5bb5('0x7c')]['VictoryUI'][_0x5bb5('0x10')]);};BattleManager[_0x5bb5('0x106')]=function(){var _0xf06fd3=$gameParty[_0x5bb5('0x10b')]();this[_0x5bb5('0x20')]=[];for(var _0x5ba6fa=0x0;_0x5ba6fa<_0xf06fd3[_0x5bb5('0x39')];_0x5ba6fa++){var _0x406ab5=_0xf06fd3[_0x5ba6fa];this[_0x5bb5('0x20')][_0x5ba6fa]=JsonEx[_0x5bb5('0xc5')](_0x406ab5);}};BattleManager[_0x5bb5('0x75')]=function(){var _0x3ea580=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x37')];var _0x9ee805=Olivia[_0x5bb5('0x7c')]['VictoryUI']['ZoomY'];var _0x1e3b77=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xa1')];var _0x471abe=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xf8')];if(Imported[_0x5bb5('0xce')]&&Imported[_0x5bb5('0xbc')]){this[_0x5bb5('0x118')]=_0x3ea580;this[_0x5bb5('0x60')]=_0x9ee805;$gameScreen[_0x5bb5('0x3c')](_0x471abe);$gameScreen[_0x5bb5('0xbe')](_0x1e3b77,_0x471abe);}else{$gameScreen[_0x5bb5('0x117')](_0x3ea580,_0x9ee805,_0x1e3b77,_0x471abe);}};BattleManager[_0x5bb5('0x35')]=function(){this[_0x5bb5('0x57')]();this[_0x5bb5('0xf4')]();};Olivia[_0x5bb5('0x7c')][_0x5bb5('0x9')][_0x5bb5('0x0')]=Game_System[_0x5bb5('0x61')]['initialize'];Game_System['prototype']['initialize']=function(){Olivia['OctoBattle']['Victory']['___Game_System_initialize___'][_0x5bb5('0x64')](this);this['_skipVictoryAftermath']=![];this[_0x5bb5('0x93')]=![];};Game_System[_0x5bb5('0x61')][_0x5bb5('0x1d')]=function(){return this[_0x5bb5('0xab')];};Game_System[_0x5bb5('0x61')][_0x5bb5('0x45')]=function(){return this['_skipVictoryMusic'];};Olivia[_0x5bb5('0x7c')][_0x5bb5('0x9')][_0x5bb5('0xaa')]=Game_Actor[_0x5bb5('0x61')][_0x5bb5('0x5f')];Game_Actor[_0x5bb5('0x61')][_0x5bb5('0x5f')]=function(){if($gameParty[_0x5bb5('0x40')]()){return![];}return Olivia['OctoBattle'][_0x5bb5('0x9')]['___Game_Actor_shouldDisplayLevelUp___'][_0x5bb5('0x64')](this);};Olivia[_0x5bb5('0x7c')][_0x5bb5('0x9')][_0x5bb5('0xf0')]=Game_Interpreter[_0x5bb5('0x61')][_0x5bb5('0x46')];Game_Interpreter[_0x5bb5('0x61')][_0x5bb5('0x46')]=function(_0x1964f0,_0x220588){Olivia[_0x5bb5('0x7c')][_0x5bb5('0x9')][_0x5bb5('0xf0')]['call'](this,_0x1964f0,_0x220588);if(_0x1964f0[_0x5bb5('0x12')](/DisableVictoryAftermath/i)){$gameSystem[_0x5bb5('0xab')]=!![];}else if(_0x1964f0[_0x5bb5('0x12')](/EnableVictoryAftermath/i)){$gameSystem['_skipVictoryAftermath']=![];}else if(_0x1964f0[_0x5bb5('0x12')](/DisableVictoryMusic/i)){$gameSystem[_0x5bb5('0x93')]=!![];}else if(_0x1964f0[_0x5bb5('0x12')](/EnableVictoryMusic/i)){$gameSystem['_skipVictoryMusic']=![];}};Scene_Battle['prototype']['hideAllWindows']=function(){for(var _0xb3df38=0x0;_0xb3df38<this['_windowLayer'][_0x5bb5('0xe1')][_0x5bb5('0x39')];_0xb3df38++){var _0x7a177d=this[_0x5bb5('0x108')][_0x5bb5('0xe1')][_0xb3df38];if(!!_0x7a177d){_0x7a177d[_0x5bb5('0x72')]();}}};Scene_Battle[_0x5bb5('0x61')][_0x5bb5('0xa4')]=function(){this['_victoryWindow']=new Window_BattleVictory();this[_0x5bb5('0xf6')](this[_0x5bb5('0xb0')]);};Olivia[_0x5bb5('0x7c')]['Victory'][_0x5bb5('0x11f')]=Scene_Battle[_0x5bb5('0x61')]['terminate'];Scene_Battle[_0x5bb5('0x61')][_0x5bb5('0x89')]=function(){Olivia[_0x5bb5('0x7c')]['Victory']['___Scene_Battle_terminate___'][_0x5bb5('0x64')](this);if(Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x88')]){$gameScreen[_0x5bb5('0x8c')]();}};function Window_BattleVictory(){this['initialize'][_0x5bb5('0xb6')](this,arguments);}Window_BattleVictory[_0x5bb5('0x61')]=Object[_0x5bb5('0x2c')](Window_Base[_0x5bb5('0x61')]);Window_BattleVictory[_0x5bb5('0x61')][_0x5bb5('0xd9')]=Window_BattleVictory;Window_BattleVictory['prototype'][_0x5bb5('0x4b')]=function(){var _0x41b930=Graphics[_0x5bb5('0x14')];var _0x355189=Graphics[_0x5bb5('0x9b')];Window_Base['prototype'][_0x5bb5('0x4b')]['call'](this,0x0,0x0,_0x41b930,_0x355189);this[_0x5bb5('0x26')]=0x0;this[_0x5bb5('0x59')]=0x0;this['createSubWindows']();this[_0x5bb5('0xf1')]();};Window_BattleVictory[_0x5bb5('0x61')][_0x5bb5('0xc2')]=function(){return 0x0;};Window_BattleVictory['prototype']['createSubWindows']=function(){if(BattleManager[_0x5bb5('0x3d')][_0x5bb5('0x22')]['length']>0x0){this[_0x5bb5('0xbb')]();}this[_0x5bb5('0x8d')]();this[_0x5bb5('0x113')]();};Window_BattleVictory[_0x5bb5('0x61')][_0x5bb5('0xbb')]=function(){var _0x3bd8ed=Math[_0x5bb5('0x81')]((this['width']+Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xef')])/0x2);var _0x484d30=Math[_0x5bb5('0x81')](this[_0x5bb5('0xa5')]*Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xc3')])+Math[_0x5bb5('0x81')](this['lineHeight']()*2.5);var _0x37c9fa=this[_0x5bb5('0xb5')]-_0x3bd8ed-Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x1')];var _0x37e6e0=this[_0x5bb5('0xa5')]-_0x484d30-this[_0x5bb5('0xe3')]()*1.5-Window_Base['prototype']['standardPadding'][_0x5bb5('0x64')](this)*0x2;this['_itemWindow']=new Window_BattleVictoryItems(_0x3bd8ed,_0x484d30,_0x37c9fa,_0x37e6e0);this['addChild'](this[_0x5bb5('0x4a')]);};Window_BattleVictory[_0x5bb5('0x61')][_0x5bb5('0x8d')]=function(){var _0xca9284=$gameParty[_0x5bb5('0x10b')]();for(var _0x466252=0x0;_0x466252<_0xca9284[_0x5bb5('0x39')];_0x466252++){var _0xdf3b8d=_0xca9284[_0x466252];if(!!_0xdf3b8d){var _0x588286=new Window_BattleVictoryActor(_0x466252,_0xdf3b8d);this[_0x5bb5('0x10e')](_0x588286);}}};Window_BattleVictory[_0x5bb5('0x61')]['createContinueWindow']=function(){this[_0x5bb5('0xb2')]=new Window_BattleVictoryContinue();this[_0x5bb5('0x10e')](this[_0x5bb5('0xb2')]);};Window_BattleVictory['prototype'][_0x5bb5('0xf9')]=function(){Window_Base[_0x5bb5('0x61')]['update'][_0x5bb5('0x64')](this);this[_0x5bb5('0x59')]+=Olivia[_0x5bb5('0x7c')]['VictoryUI'][_0x5bb5('0x8')];};Window_BattleVictory[_0x5bb5('0x61')][_0x5bb5('0xf1')]=function(){this[_0x5bb5('0x120')][_0x5bb5('0x42')]();this[_0x5bb5('0xdd')]();this['drawForeground']();};Window_BattleVictory[_0x5bb5('0x61')][_0x5bb5('0xdd')]=function(){this[_0x5bb5('0xac')]();this[_0x5bb5('0xa2')]();};Window_BattleVictory['prototype'][_0x5bb5('0xac')]=function(){var _0xb74c4=Math[_0x5bb5('0x81')](this[_0x5bb5('0xa5')]*Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xc3')]);var _0x47212d=this['lineHeight']()+Window_Base[_0x5bb5('0x61')][_0x5bb5('0xc2')][_0x5bb5('0x64')](this)*0x2;var _0x6f8663=this['height']-_0xb74c4-_0x47212d;var _0x2dabbc=this['width']*0x2;this[_0x5bb5('0x120')][_0x5bb5('0x5c')](0x0,_0xb74c4,_0x2dabbc,_0x6f8663,this[_0x5bb5('0x87')](),this['dimColor2']());this['contents']['gradientFillRect'](0x0,this[_0x5bb5('0xa5')]-_0x47212d+0x2,this['width'],_0x47212d-0x2,this['dimColor2'](),this['dimColor1']());this[_0x5bb5('0x24')](![]);this[_0x5bb5('0x120')][_0x5bb5('0xe0')](0x0,_0xb74c4-0x2,_0x2dabbc,0x2,this[_0x5bb5('0x86')]());this[_0x5bb5('0x120')][_0x5bb5('0xe0')](0x0,this[_0x5bb5('0xa5')]-_0x47212d,_0x2dabbc,0x2,this[_0x5bb5('0x86')]());if(BattleManager['_rewards'][_0x5bb5('0x22')][_0x5bb5('0x39')]>0x0){var _0x572d10=Math[_0x5bb5('0x81')](this[_0x5bb5('0xb5')]/0x2);var _0x235b77=_0xb74c4+this[_0x5bb5('0xe3')]()*0x2;var _0x33ae0d=this[_0x5bb5('0xb5')]-_0x572d10-Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x1')];this[_0x5bb5('0x120')][_0x5bb5('0xe0')](_0x572d10,_0x235b77,_0x33ae0d,0x2,this[_0x5bb5('0x86')]());}};Window_BattleVictory['prototype'][_0x5bb5('0xa2')]=function(){var _0x5de154=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x1')];var _0x4813d4=Math[_0x5bb5('0x81')](this[_0x5bb5('0xa5')]*Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xc3')])+this[_0x5bb5('0xe3')]();var _0x16f92c=_0x4813d4+this[_0x5bb5('0xe3')]()+0x2;var _0x3be936=_0x16f92c+this[_0x5bb5('0xe3')]()+0x2;var _0x144b4d=Math[_0x5bb5('0x81')](this[_0x5bb5('0xb5')]/0x2)-Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0x1')]-Math[_0x5bb5('0x81')](Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')]['MiddleThickness']/0x2);var _0x1e868a=Math[_0x5bb5('0x81')](_0x144b4d*0.8);var _0x560ef7=_0x144b4d-_0x1e868a;this[_0x5bb5('0x24')](![]);this[_0x5bb5('0x91')](_0x5de154,_0x4813d4,_0x1e868a,_0x560ef7);this[_0x5bb5('0x91')](_0x5de154,_0x16f92c,_0x1e868a,_0x560ef7);if(Imported[_0x5bb5('0xf7')]){this[_0x5bb5('0x91')](_0x5de154,_0x3be936,_0x1e868a,_0x560ef7);}};Window_BattleVictory[_0x5bb5('0x61')][_0x5bb5('0x91')]=function(_0x52712d,_0x2a84ca,_0x1ed5e6,_0x1eb688){var _0x3321ef=this['lineHeight']();var _0x2f48a6=Math['round'](this[_0x5bb5('0xe3')]()/0x2);_0x52712d+=_0x2f48a6;_0x1ed5e6-=_0x2f48a6;var _0x321b3a=[_0x52712d,_0x2a84ca,_0x52712d-_0x2f48a6,_0x2a84ca+_0x2f48a6,_0x52712d,_0x2a84ca+_0x3321ef];this[_0x5bb5('0x24')](![]);var _0x361770=this[_0x5bb5('0x43')]()/0xff;this[_0x5bb5('0x120')][_0x5bb5('0xcd')](_0x321b3a,this[_0x5bb5('0x86')](),0x0,_0x361770,![]);this[_0x5bb5('0x120')][_0x5bb5('0xe0')](_0x52712d,_0x2a84ca,_0x1ed5e6,_0x3321ef,this[_0x5bb5('0x86')]());this[_0x5bb5('0x120')][_0x5bb5('0x5c')](_0x52712d+_0x1ed5e6,_0x2a84ca,_0x1eb688,_0x3321ef,this[_0x5bb5('0x86')](),this['dimColor2']());};Window_BattleVictory[_0x5bb5('0x61')][_0x5bb5('0xc9')]=function(){this[_0x5bb5('0x23')]();this[_0x5bb5('0x56')]();if(BattleManager[_0x5bb5('0x3d')][_0x5bb5('0x22')][_0x5bb5('0x39')]>0x0){this[_0x5bb5('0xde')]();}};Window_BattleVictory[_0x5bb5('0x61')]['drawForgreoundVictoryText']=function(){this['changePaintOpacity'](!![]);this[_0x5bb5('0x95')]();var _0x337be2=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x18')];this[_0x5bb5('0x120')][_0x5bb5('0xa9')]=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x34')];var _0x25d4a8=Olivia[_0x5bb5('0x7c')]['VictoryUI'][_0x5bb5('0x1')];var _0x57b0f5=Math[_0x5bb5('0x81')](this['height']*Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0xc3')])-Math[_0x5bb5('0x81')](Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x34')]/0x2);this[_0x5bb5('0xae')](_0x337be2,_0x25d4a8,_0x57b0f5,this['width']);};Window_BattleVictory[_0x5bb5('0x61')][_0x5bb5('0x56')]=function(){this[_0x5bb5('0x24')](!![]);this['resetFontSettings']();var _0x85e6cd=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x1')]+Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()/0x2);var _0x3a27b4=Math[_0x5bb5('0x81')](this[_0x5bb5('0xa5')]*Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xc3')])+this[_0x5bb5('0xe3')]();var _0x18656d=_0x3a27b4+this[_0x5bb5('0xe3')]()+0x2;var _0x2d998e=_0x18656d+this[_0x5bb5('0xe3')]()+0x2;var _0x222f65=Math[_0x5bb5('0x81')](this[_0x5bb5('0xb5')]/0x2)-Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x1')]-Math[_0x5bb5('0x81')](Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0xef')]/0x2);var _0xfce985=Math[_0x5bb5('0x81')](_0x222f65*0.5);var _0x3bb7b0=Math['round'](_0x222f65*0.75);this['drawForegroundRewards'](_0x85e6cd,_0x3a27b4,_0xfce985,_0x3bb7b0,_0x5bb5('0xdb'));this[_0x5bb5('0x67')](_0x85e6cd,_0x18656d,_0xfce985,_0x3bb7b0,_0x5bb5('0x6d'));if(Imported[_0x5bb5('0xf7')]){this[_0x5bb5('0x67')](_0x85e6cd,_0x2d998e,_0xfce985,_0x3bb7b0,'jp');}};Window_BattleVictory[_0x5bb5('0x61')][_0x5bb5('0x67')]=function(_0x505f13,_0x480661,_0x15677d,_0x32e7b9,_0x359c1){if(_0x359c1==='gold'){var _0x1eb0d3=TextManager[_0x5bb5('0xc8')];var _0x1cd5bb=BattleManager[_0x5bb5('0x3d')]['gold'];}else if(_0x359c1===_0x5bb5('0x6d')){var _0x1eb0d3=TextManager[_0x5bb5('0x6d')];var _0x1cd5bb=BattleManager[_0x5bb5('0x3d')]['exp'];}else if(_0x359c1==='jp'){var _0x1eb0d3=Yanfly[_0x5bb5('0x33')]['Jp'];var _0x1cd5bb=BattleManager['_rewards']['jp'];}else{return;}if(Imported[_0x5bb5('0x5d')]){_0x1cd5bb=Yanfly[_0x5bb5('0x9d')][_0x5bb5('0xea')](_0x1cd5bb);}this[_0x5bb5('0x24')](![]);this['contents']['fontSize']=Olivia[_0x5bb5('0x7c')]['VictoryUI'][_0x5bb5('0x7a')];this[_0x5bb5('0xf3')](this[_0x5bb5('0xca')](Olivia[_0x5bb5('0x7c')]['VictoryUI'][_0x5bb5('0xf')]));this['drawText'](_0x1eb0d3,_0x505f13,_0x480661,_0x15677d,_0x5bb5('0xff'));this[_0x5bb5('0x24')](!![]);this[_0x5bb5('0x120')][_0x5bb5('0xa9')]=Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0x13')];this[_0x5bb5('0xf3')](this[_0x5bb5('0xca')](Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x11d')]));this[_0x5bb5('0xae')](_0x1cd5bb,_0x505f13,_0x480661,_0x32e7b9,_0x5bb5('0x11b'));};Window_BattleVictory['prototype'][_0x5bb5('0xde')]=function(){this[_0x5bb5('0x24')](!![]);this['resetFontSettings']();var _0xb0dccf=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')]['TextItems'];var _0x53e0ce=Math[_0x5bb5('0x81')]((this[_0x5bb5('0xb5')]+Olivia['OctoBattle']['VictoryUI'][_0x5bb5('0xef')])/0x2);var _0x5e874c=Math[_0x5bb5('0x81')](this['height']*Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xc3')]);var _0x47b716=this[_0x5bb5('0xb5')]-_0x53e0ce-Olivia[_0x5bb5('0x7c')]['VictoryUI'][_0x5bb5('0x1')];this[_0x5bb5('0x120')][_0x5bb5('0xa9')]=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xf5')];this[_0x5bb5('0x120')][_0x5bb5('0xae')](_0xb0dccf,_0x53e0ce,_0x5e874c,_0x47b716,this[_0x5bb5('0xe3')]()*0x2,'left');};function Window_BattleVictoryContinue(){this[_0x5bb5('0x4b')]['apply'](this,arguments);}Window_BattleVictoryContinue[_0x5bb5('0x61')]=Object[_0x5bb5('0x2c')](Window_Base['prototype']);Window_BattleVictoryContinue[_0x5bb5('0x61')][_0x5bb5('0xd9')]=Window_BattleVictoryContinue;Window_BattleVictoryContinue[_0x5bb5('0x61')][_0x5bb5('0x4b')]=function(){this[_0x5bb5('0xe2')]=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')]['ContinueDuration'];Window_Base[_0x5bb5('0x61')][_0x5bb5('0x4b')]['call'](this,0x0,0x0,Graphics[_0x5bb5('0x14')],this[_0x5bb5('0xe3')]());this[_0x5bb5('0x26')]=0x0;this[_0x5bb5('0x59')]=0x0;this[_0x5bb5('0xf1')]();};Window_BattleVictoryContinue['prototype']['standardPadding']=function(){return 0x0;};Window_BattleVictoryContinue[_0x5bb5('0x61')][_0x5bb5('0xf9')]=function(){Window_Base[_0x5bb5('0x61')][_0x5bb5('0xf9')][_0x5bb5('0x64')](this);if(this[_0x5bb5('0xe2')]>0x0){if(Input[_0x5bb5('0x105')]('ok')||Input[_0x5bb5('0x105')](_0x5bb5('0xfd'))||TouchInput[_0x5bb5('0x5')]()){Input[_0x5bb5('0x42')]();TouchInput[_0x5bb5('0x42')]();this[_0x5bb5('0xe2')]=0x1;}else{this[_0x5bb5('0xe2')]--;}}else if(!this['_ending']&&(Input[_0x5bb5('0x105')]('ok')||Input[_0x5bb5('0x105')](_0x5bb5('0xfd'))||TouchInput[_0x5bb5('0x5')]())){Input[_0x5bb5('0x42')]();TouchInput[_0x5bb5('0x42')]();this[_0x5bb5('0x16')]=!![];BattleManager[_0x5bb5('0x35')]();}else{this[_0x5bb5('0x59')]+=Olivia[_0x5bb5('0x7c')]['VictoryUI'][_0x5bb5('0x8')];}};Window_BattleVictoryContinue[_0x5bb5('0x61')][_0x5bb5('0xf1')]=function(){this[_0x5bb5('0x120')]['clear']();var _0x2207b8=Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0x30')];this[_0x5bb5('0x11e')](_0x2207b8,this[_0x5bb5('0x92')](),0x0);var _0x30a8fe=this[_0x5bb5('0xc4')](_0x2207b8)+this[_0x5bb5('0x92')]()*0x2;this['x']=Graphics[_0x5bb5('0x14')]-Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x1')]-_0x30a8fe;this['y']=Graphics['boxHeight']-Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()*1.5);};Window_BattleVictoryContinue[_0x5bb5('0x61')][_0x5bb5('0xc4')]=function(_0x4400b4){return this[_0x5bb5('0x11e')](_0x4400b4,0x0,this['contents'][_0x5bb5('0xa5')]);};function Window_BattleVictoryItems(){this[_0x5bb5('0x4b')][_0x5bb5('0xb6')](this,arguments);}Window_BattleVictoryItems[_0x5bb5('0x61')]=Object['create'](Window_ItemList[_0x5bb5('0x61')]);Window_BattleVictoryItems[_0x5bb5('0x61')][_0x5bb5('0xd9')]=Window_BattleVictoryItems;Window_BattleVictoryItems[_0x5bb5('0x61')][_0x5bb5('0x4b')]=function(_0x2129b5,_0x2c004f,_0x32d43c,_0x2f0e47){_0x2f0e47=Math[_0x5bb5('0xed')](_0x2f0e47/this[_0x5bb5('0xe3')]())*this[_0x5bb5('0xe3')]();Window_ItemList[_0x5bb5('0x61')][_0x5bb5('0x4b')][_0x5bb5('0x64')](this,_0x2129b5,_0x2c004f,_0x32d43c,_0x2f0e47);this[_0x5bb5('0x26')]=0x0;this[_0x5bb5('0x59')]=0x0;this[_0x5bb5('0x2b')]();this[_0x5bb5('0xf1')]();var _0x283381=Math[_0x5bb5('0x84')](0xff/Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x8')]);setTimeout(this[_0x5bb5('0x1b')][_0x5bb5('0x8a')](this),_0x283381);};Window_BattleVictoryItems[_0x5bb5('0x61')][_0x5bb5('0xc2')]=function(){return 0x0;};Window_BattleVictoryItems[_0x5bb5('0x61')][_0x5bb5('0xa3')]=function(){return 0x1;};Window_BattleVictoryItems[_0x5bb5('0x61')]['processReady']=function(){if(this[_0x5bb5('0x4e')][_0x5bb5('0x39')]>this['height']/this[_0x5bb5('0xe3')]()){this['activate']();this[_0x5bb5('0xd5')](0x0);}};Window_BattleVictoryItems[_0x5bb5('0x61')]['update']=function(){Window_ItemList[_0x5bb5('0x61')]['update'][_0x5bb5('0x64')](this);this[_0x5bb5('0x59')]+=Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0x8')];};Window_BattleVictoryItems[_0x5bb5('0x61')][_0x5bb5('0x77')]=function(){this[_0x5bb5('0x4e')]=[];this['_dropItems']=[];this[_0x5bb5('0x29')]=[];this[_0x5bb5('0x121')]=[];this[_0x5bb5('0xdc')]();};Window_BattleVictoryItems[_0x5bb5('0x61')][_0x5bb5('0xcf')]=function(_0x33aaf0){return!![];};Window_BattleVictoryItems[_0x5bb5('0x61')][_0x5bb5('0xdc')]=function(){BattleManager[_0x5bb5('0x3d')][_0x5bb5('0x22')][_0x5bb5('0x11')](function(_0x4b38f8){if(!_0x4b38f8)return;if(DataManager[_0x5bb5('0x99')](_0x4b38f8))this[_0x5bb5('0x111')][_0x5bb5('0xcb')](_0x4b38f8['id']);if(DataManager[_0x5bb5('0x76')](_0x4b38f8))this['_dropWeapons'][_0x5bb5('0xcb')](_0x4b38f8['id']);if(DataManager[_0x5bb5('0x90')](_0x4b38f8))this[_0x5bb5('0x121')][_0x5bb5('0xcb')](_0x4b38f8['id']);},this);this[_0x5bb5('0x111')][_0x5bb5('0xe4')](function(_0x4fff43,_0xe9904a){return _0x4fff43-_0xe9904a;});this['_dropWeapons'][_0x5bb5('0xe4')](function(_0x2c25ba,_0x204dfd){return _0x2c25ba-_0x204dfd;});this[_0x5bb5('0x121')][_0x5bb5('0xe4')](function(_0x215b8f,_0x5f1858){return _0x215b8f-_0x5f1858;});this[_0x5bb5('0x111')]['forEach'](function(_0x10c7c7){var _0x4cc7e3=$dataItems[_0x10c7c7];if(_0x4cc7e3&&!this['_data']['contains'](_0x4cc7e3))this['_data']['push'](_0x4cc7e3);},this);this[_0x5bb5('0x29')][_0x5bb5('0x11')](function(_0x1e8c4f){var _0x4d95f6=$dataWeapons[_0x1e8c4f];if(_0x4d95f6&&!this[_0x5bb5('0x4e')]['contains'](_0x4d95f6))this[_0x5bb5('0x4e')][_0x5bb5('0xcb')](_0x4d95f6);},this);this[_0x5bb5('0x121')][_0x5bb5('0x11')](function(_0x2a22a2){var _0x544e91=$dataArmors[_0x2a22a2];if(_0x544e91&&!this[_0x5bb5('0x4e')][_0x5bb5('0x8f')](_0x544e91))this[_0x5bb5('0x4e')][_0x5bb5('0xcb')](_0x544e91);},this);};Window_BattleVictoryItems[_0x5bb5('0x61')][_0x5bb5('0x73')]=function(_0x16d505,_0x3c9b8f,_0x48a0f8,_0x3ce1b1){if(!this[_0x5bb5('0x100')]())return;var _0x2dd5ef=this[_0x5bb5('0x69')](_0x16d505);if(Imported[_0x5bb5('0x5d')]){_0x2dd5ef=Yanfly[_0x5bb5('0x9d')][_0x5bb5('0xea')](this[_0x5bb5('0x69')](_0x16d505));this[_0x5bb5('0x120')][_0x5bb5('0xa9')]=Yanfly[_0x5bb5('0x33')]['ItemQuantitySize']||0x1c;}else{this['contents'][_0x5bb5('0xa9')]=0x14;}this[_0x5bb5('0xae')]('×'+_0x2dd5ef,_0x3c9b8f,_0x48a0f8,_0x3ce1b1,_0x5bb5('0x11b'));this[_0x5bb5('0x95')]();};Window_BattleVictoryItems['prototype'][_0x5bb5('0x69')]=function(_0x55f141){if(DataManager[_0x5bb5('0x99')](_0x55f141)){return this[_0x5bb5('0x4c')](_0x55f141['id'],this[_0x5bb5('0x111')]);}if(DataManager[_0x5bb5('0x76')](_0x55f141)){return this[_0x5bb5('0x4c')](_0x55f141['id'],this[_0x5bb5('0x29')]);}if(DataManager[_0x5bb5('0x90')](_0x55f141)){return this['getCount'](_0x55f141['id'],this['_dropArmors']);}return 0x0;};Window_BattleVictoryItems[_0x5bb5('0x61')][_0x5bb5('0x4c')]=function(_0x586648,_0x18db5d){var _0x4c47f6=0x0;for(var _0x5c16e6=0x0;_0x5c16e6<_0x18db5d[_0x5bb5('0x39')];_0x5c16e6++){if(_0x18db5d[_0x5c16e6]===_0x586648)_0x4c47f6++;}return _0x4c47f6;};Yanfly[_0x5bb5('0x9d')]['toGroup']=function(_0x390b18){if(typeof _0x390b18===_0x5bb5('0xb7'))return _0x390b18;return _0x390b18[_0x5bb5('0xd2')]('en');return _0x390b18[_0x5bb5('0x3b')](/(^|[^\w.])(\d{4,})/g,function(_0x2f3a9f,_0x490524,_0x38e763){return _0x490524+_0x38e763[_0x5bb5('0x3b')](/\d(?=(?:\d\d\d)+(?!\d))/g,_0x5bb5('0x6'));});};function Window_BattleVictoryActor(){this[_0x5bb5('0x4b')]['apply'](this,arguments);}Window_BattleVictoryActor[_0x5bb5('0x61')]=Object[_0x5bb5('0x2c')](Window_Base[_0x5bb5('0x61')]);Window_BattleVictoryActor[_0x5bb5('0x61')][_0x5bb5('0xd9')]=Window_BattleVictoryActor;Window_BattleVictoryActor['prototype'][_0x5bb5('0x4b')]=function(_0x5042dd,_0x453bb6){this[_0x5bb5('0x8e')]=_0x5042dd;this[_0x5bb5('0xc')]=_0x453bb6;this[_0x5bb5('0x7d')]=BattleManager[_0x5bb5('0x20')][_0x5042dd];var _0x58f91e=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x1')];var _0x32ef19=Math['round'](Graphics[_0x5bb5('0x9b')]*Olivia['OctoBattle'][_0x5bb5('0xd8')]['BackgroundDimHeight'])+this[_0x5bb5('0xe3')]()*0x5-0x4;_0x32ef19+=_0x5042dd*this[_0x5bb5('0xe3')]()*0x2+_0x5042dd*Math[_0x5bb5('0x84')](this[_0x5bb5('0xe3')]()/0x4)-Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()/0x4);if(!Imported[_0x5bb5('0xf7')]){_0x32ef19-=Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()/0x2)+0x2;}var _0xc29a5b=Math[_0x5bb5('0x81')](Graphics[_0x5bb5('0x14')]/0x2)-Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x1')]-Math['round'](Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xef')]/0x2);var _0x49136a=this[_0x5bb5('0xe3')]()*0x2;Window_Base[_0x5bb5('0x61')][_0x5bb5('0x4b')][_0x5bb5('0x64')](this,_0x58f91e,_0x32ef19,_0xc29a5b,_0x49136a);this[_0x5bb5('0x1e')]();this[_0x5bb5('0x26')]=0x0;this[_0x5bb5('0x59')]=0x0;this[_0x5bb5('0xf1')]();};Window_BattleVictoryActor[_0x5bb5('0x61')][_0x5bb5('0xc2')]=function(){return 0x0;};Window_BattleVictoryActor['prototype'][_0x5bb5('0xf9')]=function(){Window_Base[_0x5bb5('0x61')][_0x5bb5('0xf9')]['call'](this);this[_0x5bb5('0x59')]+=Olivia['OctoBattle']['VictoryUI'][_0x5bb5('0x8')];};Window_BattleVictoryActor[_0x5bb5('0x61')][_0x5bb5('0x1e')]=function(){this[_0x5bb5('0xd')]=new Window_BattleVictoryActorSub(this,this[_0x5bb5('0xc')],this[_0x5bb5('0x7d')]);this['addChild'](this[_0x5bb5('0xd')]);};Window_BattleVictoryActor[_0x5bb5('0x61')][_0x5bb5('0xf1')]=function(){this[_0x5bb5('0x120')][_0x5bb5('0x42')]();this['drawBackgroundStrip']();this[_0x5bb5('0x6b')]();this['drawForegroundActorName']();if(Imported[_0x5bb5('0xf7')]){this['drawForegroundJPLabel']();}};Window_BattleVictoryActor['prototype'][_0x5bb5('0x78')]=function(){this[_0x5bb5('0x24')](![]);var _0xd06e84=this['lineHeight']();var _0x323c75=Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()/0x2);var _0x4b1400=this[_0x5bb5('0xb5')]-_0xd06e84;var _0x4ae2e4=[_0x323c75,0x0,0x0,_0x323c75,_0x323c75,_0xd06e84,_0x323c75+_0x4b1400,_0xd06e84,_0x4b1400+_0xd06e84,_0x323c75,_0x4b1400+_0x323c75,0x0];this[_0x5bb5('0x120')][_0x5bb5('0xcd')](_0x4ae2e4,this[_0x5bb5('0x87')](),0x0,0xff,![]);this[_0x5bb5('0x120')]['fillRect'](_0x323c75,this[_0x5bb5('0xa5')]-0x2,_0x4b1400,0x2,this[_0x5bb5('0x86')]());};Window_BattleVictoryActor[_0x5bb5('0x61')][_0x5bb5('0x6b')]=function(){this[_0x5bb5('0x24')](![]);var _0x57f97b=this['width']-this[_0x5bb5('0xe3')]();var _0x417dda=Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0x104')];var _0x5ee912=Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()/0x2);var _0x34ac50=this[_0x5bb5('0xa5')]-_0x417dda-0x6;this[_0x5bb5('0x120')][_0x5bb5('0xe0')](_0x5ee912,_0x34ac50,_0x57f97b,_0x417dda,this[_0x5bb5('0x47')]());};Window_BattleVictoryActor[_0x5bb5('0x61')][_0x5bb5('0xd3')]=function(){this['changePaintOpacity'](!![]);this[_0x5bb5('0x95')]();this[_0x5bb5('0x120')][_0x5bb5('0xa9')]=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x48')];this['drawText'](this[_0x5bb5('0xc')][_0x5bb5('0xad')](),Math['round'](this[_0x5bb5('0xe3')]()/0x2),0x0,this[_0x5bb5('0xb5')]-this[_0x5bb5('0xe3')]());};Window_BattleVictoryActor['prototype'][_0x5bb5('0x8b')]=function(){this['changePaintOpacity'](!![]);this['resetFontSettings']();this[_0x5bb5('0x120')]['fontSize']=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x98')];this[_0x5bb5('0xae')](Yanfly[_0x5bb5('0x33')]['Jp'],Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()/0x2),0x0,this[_0x5bb5('0xb5')]-this['lineHeight'](),'right');};function Window_BattleVictoryActorSub(){this[_0x5bb5('0x4b')][_0x5bb5('0xb6')](this,arguments);}Window_BattleVictoryActorSub[_0x5bb5('0x61')]=Object[_0x5bb5('0x2c')](Window_Base[_0x5bb5('0x61')]);Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0xd9')]=Window_BattleVictoryActorSub;Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0x4b')]=function(_0x34ff34,_0x3e4e18,_0x783fc9){this[_0x5bb5('0xc')]=_0x3e4e18;this[_0x5bb5('0x7d')]=_0x783fc9;this['_duration']=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xfb')]||0x1;Window_Base[_0x5bb5('0x61')][_0x5bb5('0x4b')][_0x5bb5('0x64')](this,0x0,0x0,_0x34ff34[_0x5bb5('0xb5')],_0x34ff34['height']);this[_0x5bb5('0xfc')]();this[_0x5bb5('0xb')]();this['createGaugeSprite']();this[_0x5bb5('0x7e')]();this[_0x5bb5('0x26')]=0x0;this[_0x5bb5('0x59')]=0x0;this[_0x5bb5('0xf1')]();};Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0xc2')]=function(){return 0x0;};Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0xfc')]=function(){this[_0x5bb5('0x15')]=this['width']-this[_0x5bb5('0xe3')]();this[_0x5bb5('0x103')]=this[_0x5bb5('0x7d')][_0x5bb5('0x27')]();this[_0x5bb5('0xa8')]=this[_0x5bb5('0xc')][_0x5bb5('0x27')]();this[_0x5bb5('0x4d')]=this[_0x5bb5('0x7d')][_0x5bb5('0x6a')];this['_levelText']=this[_0x5bb5('0x4d')];this[_0x5bb5('0x63')]=Yanfly[_0x5bb5('0x9d')][_0x5bb5('0xea')](this[_0x5bb5('0x63')]);this[_0x5bb5('0x63')]=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xbf')][_0x5bb5('0x6c')](this[_0x5bb5('0x63')]);this[_0x5bb5('0x6f')]=this[_0x5bb5('0x7d')]['isMaxLevel']();if(Imported['YEP_JobPoints']){this['contents']['fontSize']=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x98')];this[_0x5bb5('0xe6')]=this[_0x5bb5('0xe5')](Yanfly[_0x5bb5('0x33')]['Jp']+'\x20');this[_0x5bb5('0xe7')]=this[_0x5bb5('0x7d')]['jp']();this[_0x5bb5('0xfa')]=this[_0x5bb5('0xc')]['jp']();}};Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0xb')]=function(){if(this[_0x5bb5('0x4d')]>=this[_0x5bb5('0xc')]['maxLevel']()){this[_0x5bb5('0x4d')]=this['_actor']['maxLevel']();this[_0x5bb5('0x2f')]='-';this[_0x5bb5('0x65')]='-';this[_0x5bb5('0x6f')]=!![];}else{this[_0x5bb5('0x2f')]=this[_0x5bb5('0xc')]['expForLevel'](this[_0x5bb5('0x4d')]);this[_0x5bb5('0x65')]=this['_actor'][_0x5bb5('0x21')](this[_0x5bb5('0x4d')]+0x1);}};Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0x4')]=function(){var _0x57d483=this[_0x5bb5('0xb5')]-this[_0x5bb5('0xe3')]();var _0x1bd180=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')]['ExpGaugeHeight'];var _0x41c440=Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()/0x2);var _0x77a78d=this[_0x5bb5('0xa5')]-_0x1bd180-0x6;var _0x2f26b6=this['textColor'](Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xc7')]);var _0x396f90=this[_0x5bb5('0xca')](Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0xb3')]);if(Imported[_0x5bb5('0x5d')]&&Yanfly['Param'][_0x5bb5('0xfe')]){_0x41c440+=0x1;_0x77a78d+=0x1;_0x57d483-=0x2;_0x1bd180-=0x2;}this['_gaugeWidth']=_0x57d483;this['_gaugeSprite']=new Sprite();this[_0x5bb5('0x71')](this[_0x5bb5('0x110')]);this[_0x5bb5('0x110')]['x']=_0x41c440;this[_0x5bb5('0x110')]['y']=_0x77a78d;this[_0x5bb5('0x110')][_0x5bb5('0x26')]=0x0;this['_gaugeSprite'][_0x5bb5('0x3e')]=new Bitmap(_0x57d483,_0x1bd180);this[_0x5bb5('0x110')][_0x5bb5('0x3e')][_0x5bb5('0x5c')](0x0,0x0,_0x57d483,_0x1bd180,_0x2f26b6,_0x396f90);};Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0x7e')]=function(){this[_0x5bb5('0x95')]();var _0x34f3ae=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x109')];this['contents'][_0x5bb5('0xa9')]=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x10a')];var _0x36c222=this[_0x5bb5('0xe5')](_0x34f3ae);+this[_0x5bb5('0xe3')]();this[_0x5bb5('0x116')]=new Sprite();this[_0x5bb5('0x10e')](this[_0x5bb5('0x116')]);this[_0x5bb5('0x116')]['x']=Math[_0x5bb5('0x81')](this[_0x5bb5('0xb5')]*0.5);if(Imported[_0x5bb5('0xf7')]){this[_0x5bb5('0x116')]['y']=Math['round'](this[_0x5bb5('0xe3')]()*1.5);}else{this[_0x5bb5('0x116')]['y']=Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()*0.5);}this[_0x5bb5('0x116')][_0x5bb5('0x101')]['x']=0.5;this[_0x5bb5('0x116')][_0x5bb5('0x101')]['y']=0.5;this[_0x5bb5('0x116')][_0x5bb5('0x4f')]['x']=0x0;this[_0x5bb5('0x116')][_0x5bb5('0x4f')]['y']=0x0;this[_0x5bb5('0x116')][_0x5bb5('0x3e')]=new Bitmap(_0x36c222,this['lineHeight']()*0x2);this[_0x5bb5('0x116')]['bitmap'][_0x5bb5('0xca')]=this[_0x5bb5('0xca')](Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x36')]);this[_0x5bb5('0x116')][_0x5bb5('0x3e')][_0x5bb5('0xa9')]=Olivia[_0x5bb5('0x7c')]['VictoryUI'][_0x5bb5('0x10a')];this['_levelUpSprite'][_0x5bb5('0x3e')]['drawText'](_0x34f3ae,0x0,0x0,_0x36c222,this[_0x5bb5('0xe3')]()*0x2,_0x5bb5('0xb8'));this[_0x5bb5('0xe')]=![];this[_0x5bb5('0x1a')]=0x0;this[_0x5bb5('0x95')]();};Window_BattleVictoryActorSub['prototype'][_0x5bb5('0xf9')]=function(){Window_Base[_0x5bb5('0x61')][_0x5bb5('0xf9')][_0x5bb5('0x64')](this);this[_0x5bb5('0x59')]+=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x8')];if(!!this[_0x5bb5('0x110')]){this[_0x5bb5('0x110')]['opacity']=this[_0x5bb5('0x59')];}if(this['_duration']>0x0){this[_0x5bb5('0xf1')]();if(Input[_0x5bb5('0x105')]('ok')||Input[_0x5bb5('0x105')]('cancel')){this[_0x5bb5('0xe2')]=0x1;}else{this[_0x5bb5('0xe2')]--;}}if(this[_0x5bb5('0xe')]){this[_0x5bb5('0xec')]();}if(this[_0x5bb5('0x1a')]!==0x0){this[_0x5bb5('0x53')]();}};Window_BattleVictoryActorSub[_0x5bb5('0x61')]['updateLevelUpSpriteScale']=function(){this[_0x5bb5('0x116')][_0x5bb5('0x4f')]['x']=Math[_0x5bb5('0xa0')](0x1,this[_0x5bb5('0x116')][_0x5bb5('0x4f')]['x']+0.02);this[_0x5bb5('0x116')][_0x5bb5('0x4f')]['y']=Math[_0x5bb5('0xa0')](0x1,this[_0x5bb5('0x116')]['scale']['y']+0.02);if(this['_levelUpSprite'][_0x5bb5('0x4f')]['x']>=0x1){}};Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0x53')]=function(){this[_0x5bb5('0x116')][_0x5bb5('0x26')]+=this[_0x5bb5('0x1a')];if(this['_levelUpSprite'][_0x5bb5('0x26')]>=0xff||this['_levelUpSprite'][_0x5bb5('0x26')]<=0x0){this[_0x5bb5('0x1a')]*=-0x1;}};Window_BattleVictoryActorSub['prototype']['refresh']=function(){this[_0x5bb5('0x120')][_0x5bb5('0x42')]();if(Imported['YEP_JobPoints']){this[_0x5bb5('0x66')]();}this[_0x5bb5('0x2')]();this[_0x5bb5('0x2a')]();this[_0x5bb5('0x25')]();this[_0x5bb5('0xe9')]();this[_0x5bb5('0x52')]();};Window_BattleVictoryActorSub['prototype']['drawActorJpInformation']=function(){this[_0x5bb5('0x24')](!![]);this['resetFontSettings']();var _0x2ba277=this[_0x5bb5('0xe2')]||0x1;this['_jp']=(this[_0x5bb5('0xe7')]*(_0x2ba277-0x1)+this[_0x5bb5('0xfa')])/_0x2ba277;var _0x80fd7e=Yanfly['Util'][_0x5bb5('0xea')](Math[_0x5bb5('0x81')](this[_0x5bb5('0xe7')]));var _0x6c97f4=Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()/0x2);var _0xa9718b=this['width']-this['lineHeight']()-this[_0x5bb5('0xe6')];this[_0x5bb5('0x120')][_0x5bb5('0xa9')]=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x98')];this[_0x5bb5('0xae')](_0x80fd7e,_0x6c97f4,0x0,_0xa9718b,_0x5bb5('0x11b'));};Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0x2')]=function(){var _0x9c3321=this[_0x5bb5('0xe2')]||0x1;this['_exp']=(this[_0x5bb5('0x103')]*(_0x9c3321-0x1)+this[_0x5bb5('0xa8')])/_0x9c3321;while(this[_0x5bb5('0x103')]>=this[_0x5bb5('0x65')]){this[_0x5bb5('0x83')]();}};Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0x83')]=function(){if(!this[_0x5bb5('0x6f')]){this[_0x5bb5('0x4d')]+=0x1;this[_0x5bb5('0xe')]=!![];this[_0x5bb5('0x3')]=!![];this[_0x5bb5('0x1a')]=this[_0x5bb5('0x1a')]||0x4;this[_0x5bb5('0xb')]();this[_0x5bb5('0x63')]=this[_0x5bb5('0x4d')];this[_0x5bb5('0x63')]=Yanfly[_0x5bb5('0x9d')][_0x5bb5('0xea')](this['_levelText']);this[_0x5bb5('0x63')]=Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0xbf')][_0x5bb5('0x6c')](this[_0x5bb5('0x63')]);}};Window_BattleVictoryActorSub['prototype'][_0x5bb5('0x2a')]=function(){this[_0x5bb5('0x24')](!![]);this[_0x5bb5('0x95')]();var _0x895942=Math[_0x5bb5('0x81')](this[_0x5bb5('0xe3')]()/0x2);var _0x454c28=this[_0x5bb5('0xb5')]-this[_0x5bb5('0xe3')]();if(Imported[_0x5bb5('0xf7')]){var _0x403294=_0x5bb5('0xb8');}else{var _0x403294=_0x5bb5('0x11b');}this[_0x5bb5('0x120')]['fontSize']=Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0x79')];this['drawText'](this[_0x5bb5('0x63')],_0x895942,0x0,_0x454c28,_0x403294);};Window_BattleVictoryActorSub[_0x5bb5('0x61')]['drawActorExpInformation']=function(){if(this[_0x5bb5('0x6f')]){var _0x46da95=this[_0x5bb5('0x65')];var _0x1b265d=this[_0x5bb5('0x2f')];}else{var _0x46da95=this[_0x5bb5('0x65')]-this['_currentLevelExp'];var _0x1b265d=Math['round'](this[_0x5bb5('0x103')]-this['_currentLevelExp']);if(Imported[_0x5bb5('0x5d')]){_0x46da95=Yanfly[_0x5bb5('0x9d')][_0x5bb5('0xea')](_0x46da95);_0x1b265d=Yanfly[_0x5bb5('0x9d')][_0x5bb5('0xea')](_0x1b265d);}}_0x46da95='/'+_0x46da95;var _0x8daa4c=Math['round'](this[_0x5bb5('0xe3')]()/0x2)+this[_0x5bb5('0x92')]();var _0xcc3467=this[_0x5bb5('0xb5')]-this[_0x5bb5('0xe3')]()-this[_0x5bb5('0x92')]()*0x2;this[_0x5bb5('0x120')][_0x5bb5('0xa9')]=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x5e')];this[_0x5bb5('0xae')](TextManager[_0x5bb5('0x6d')],_0x8daa4c,this[_0x5bb5('0xe3')](),_0xcc3467,_0x5bb5('0xff'));this[_0x5bb5('0xf3')](this[_0x5bb5('0xca')](Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x2d')]));this[_0x5bb5('0x120')][_0x5bb5('0xa9')]=Olivia['OctoBattle']['VictoryUI'][_0x5bb5('0xc0')];this[_0x5bb5('0xae')](_0x46da95,_0x8daa4c,this[_0x5bb5('0xe3')](),_0xcc3467,_0x5bb5('0x11b'));_0xcc3467-=this['textWidth'](_0x46da95);this[_0x5bb5('0xf3')](this[_0x5bb5('0xca')](Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x3f')]));this[_0x5bb5('0x120')][_0x5bb5('0xa9')]=Olivia[_0x5bb5('0x7c')][_0x5bb5('0xd8')][_0x5bb5('0x62')];this[_0x5bb5('0xae')](_0x1b265d,_0x8daa4c,this[_0x5bb5('0xe3')](),_0xcc3467,'right');};Window_BattleVictoryActorSub[_0x5bb5('0x61')]['updateGaugeSpriteWidth']=function(){if(this[_0x5bb5('0x6f')]){var _0x4e2eee=this[_0x5bb5('0x96')];}else{var _0x46ea12=this[_0x5bb5('0x65')]-this[_0x5bb5('0x2f')];var _0x1e5d52=Math[_0x5bb5('0x81')](this[_0x5bb5('0x103')]-this[_0x5bb5('0x2f')]);var _0x123c03=Math[_0x5bb5('0xa0')](_0x1e5d52/_0x46ea12,0x1);var _0x4e2eee=Math[_0x5bb5('0x81')](this[_0x5bb5('0x96')]*_0x123c03);}this[_0x5bb5('0x110')][_0x5bb5('0xb5')]=_0x4e2eee;};Window_BattleVictoryActorSub[_0x5bb5('0x61')][_0x5bb5('0x52')]=function(){if(this[_0x5bb5('0x3')]){this[_0x5bb5('0x3')]=![];AudioManager[_0x5bb5('0x6e')](Olivia['OctoBattle'][_0x5bb5('0xd8')][_0x5bb5('0xe8')]);}};}