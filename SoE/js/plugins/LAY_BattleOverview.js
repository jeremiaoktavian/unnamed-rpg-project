//=============================================================================
// Lay - Battle Overview
// LAY_BattleOverview.js
//=============================================================================

var Imported = Imported || {};
Imported.Lay_BattleOverview = true;

var Lay = Lay || {};
Lay.BOV = Lay.BOV || {};
Lay.BOV.version = 0.3;

//=============================================================================
 /*:
 * @plugindesc v0.3
 * @author Lay
 *
 *
 *
 * @param ---General---
 * @default ----------------------------
 *
 * @param Add Command to Window
 * @parent ---General---
 * @type select
 * @option Party
 * @option Actor
 * @option Never
 * @default Actor
 * @desc Where would you like to add the overview command ?
 *  Actor : ActorCommand Window - Party : PartyCommand Window
 *
 * @param Command Name
 * @parent ---General---
 * @default Overview
 *
 *
 * @param ---State Area---
 * @default ----------------------------
 *
 * @param State Area Header
 * @parent ---State Area---
 * @default States
 *
 * @param State Area X
 * @parent ---State Area---
 * @desc the X position of the area dedicated to the
 * state list.
 * @default this.standardPadding()
 *
 * @param State Area Y
 * @parent ---State Area---
 * @desc the Y position of the area dedicated to the
 * state list.
 * @default this.standardPadding()
 *
 * @param State Area Width
 * @parent ---State Area---
 * @desc the width of the area dedicated to the
 * state list.
 * @default Graphics.boxWidth * 0.25
 *
 * @param State Area Height
 * @parent ---State Area---
 * @desc the height of the area dedicated to the
 * state list.
 * @default Graphics.boxHeight * 0.45
 *
 * @param No State Name
 * @parent ---State Area---
 * @desc The string to draw in the state list if the battler
 * isn't affected by any state
 * @default None
 *
 * @param ---State Description---
 * @default ----------------------------
 *
 * @param State Desc Header
 * @parent ---State Description---
 * @default State Description
 *
 * @param State Desc X
 * @parent ---State Description---
 * @default this.standardPadding()
 *
 * @param State Desc Y
 * @parent ---State Description---
 * @default Graphics.boxHeight - 294
 *
 * @param State Desc Width
 * @parent ---State Description---
 * @default Graphics.boxWidth - this.standardPadding()
 *
 * @param State Desc Height
 * @parent ---State Description---
 * @default Graphics.boxHeight - this.y
 *
 *
 *
 * @param ---Battler Sprite---
 * @default ----------------------------
 *
 * @param Battler Sprite Show
 * @parent ---Battler Sprite---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show Batter Sprite ?
 * NO - false     YES - true
 * @default true
 *
 * @param Battler Sprite X
 * @parent ---Battler Sprite---
 * @default Graphics.boxWidth * 0.25 + 2*this.standardPadding()
 *
 * @param Battler Sprite Y
 * @parent ---Battler Sprite---
 * @default 2 * this.standardPadding()
 *
 * @param Battler Sprite Scale X
 * @parent ---Battler Sprite---
 * @default 1
 *
 * @param Battler Sprite Scale Y
 * @parent ---Battler Sprite---
 * @default 1
 *
 *
 *
 * @param ---Battler Gauges---
 * @default ----------------------------
 *
 * @param -- HP --
 * @parent ---Battler Gauges---
 * @default -------------
 *
 * @param Battler HP Gauge Show
 * @parent -- HP --
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show Batter HP gauge ?
 * NO - false     YES - true
 * @default true
 *
 * @param Battler HP Gauge X
 * @parent -- HP --
 * @default Graphics.boxWidth * 0.25 + 100
 *
 * @param Battler HP Gauge Y
 * @parent -- HP --
 * @default this.standardPadding()
 *
 * @param Battler HP Gauge Width
 * @parent -- HP --
 * @default Graphics.boxWidth * 0.30
 *
 *
 * @param -- MP --
 * @parent ---Battler Gauges---
 * @default -------------
 *
 * @param Battler MP Gauge Show
 * @parent -- MP --
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show Batter MP gauge ?
 * NO - false     YES - true
 * @default true
 *
 * @param Battler MP Gauge X
 * @parent -- MP --
 * @desc use 'hpGaugeX' to retrieve the value of Battler HP Gauge X
 * @default hpGaugeX
 *
 * @param Battler MP Gauge Y
 * @parent -- MP --
 * @desc use 'hpGaugeY' to retrieve the value of Battler HP Gauge Y
 * @default hpGaugeY + 30
 *
 * @param Battler MP Gauge Width
 * @parent -- MP --
 * @desc use 'hpGaugeWd' to retieve the value of
 * Battler HP Gauge Width.
 * @default (hpGaugeWd / 2) -5
 *
 * @param -- TP --
 * @parent ---Battler Gauges---
 * @default -------------
 *
 * @param Battler TP Gauge Show
 * @parent -- TP --
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show Batter TP gauge ?
 * NO - false     YES - true
 * @default true
 *
 * @param Battler TP Gauge X
 * @parent -- TP --
 * @desc use 'hpGauge?' or 'mpGauge?' to retrieve the value of
 * HP and MP Gauges. ? can be X (x), Y (y) and Wd (width).
 * @default mpGaugeX + mpGaugeWd +10
 *
 * @param Battler TP Gauge Y
 * @parent -- TP --
 * @desc use 'hpGauge?' or 'mpGauge?' to retrieve the value of
 * HP and MP Gauges. ? can be X (x), Y (y) and Wd (width).
 * @default mpGaugeY
 *
 * @param Battler TP Gauge Width
 * @parent -- TP --
 * @desc use 'hpGauge?' or 'mpGauge?' to retrieve the value of
 * HP and MP Gauges. ? can be X (x), Y (y) and Wd (width).
 * @default mpGaugeWd
 *
 * @param -- UNK --
 * @parent ---Battler Gauges---
 * @default -------------
 *
 * @param UNK Gauge Color
 * @parent -- UNK --
 * @desc the two colors to use for UNK gauges.
 * @default #a3a3a3,#c1c1c1
 *
 * @param UNK Gauge Text
 * @parent -- UNK --
 * @desc the two colors to use for UNK gauges.
 * @default ???/???
 *
 *
 * @param ---Parameters---
 * @default ----------------------------
 *
 * @param Parameters Show
 * @parent ---Parameters---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show Batter parameters ?
 * NO - false     YES - true
 * @default true
 *
 * @param Parameters X
 * @parent ---Parameters---
 * @desc
 * @default Graphics.boxWidth * 0.25 + 100 + this.height * 0.15 + 20
 *
 * @param Parameters Y
 * @parent ---Parameters---
 * @desc
 * @default this.height * 0.38
 *
 * @param Parameters Radius
 * @parent ---Parameters---
 * @desc
 * @default this.height * 0.15
 *
 * @param Param Pie Color
 * @parent ---Parameters---
 * @desc pie colors used for the pie diagram
 * comma separated values. !! No spaces !!
 * @default #ed1c24,#f7941d,#605ca8,#448ccb,#39b54a,#fff568
 *
 * @param Param Pie Legend
 * @parent ---Parameters---
 * @desc the text to write next to each pie.
 * comma separated values. !! No spaces !!
 * @default ATK,DEF,MAT,MDF,AGI,LUK
 *
 * @param Battler Parameters
 * @parent ---Parameters---
 * @desc the parameters to show. use atk, def, mat, mdf agi
 * or luk or any battler property separated by comma w/o space.
 * @default atk,def,mat,mdf,agi,luk
 *
 * @param Pie Size Slice Ratio
 * @parent ---Parameters---
 * @desc The pie slices width in % of the total area dedicated
 * to each pie. 1 = full slices, 0.5 = half of a full slice...
 * @default 0.75
 *
 * @param Pie Diagram Phase
 * @parent ---Parameters---
 * @desc The angle to rotate the diagram on itself
 * @default Math.PI/6
 *
 * @param Pie Diagram 100%
 * @parent ---Parameters---
 * @desc In the pie diagram, 100% correspond to this value.
 * @default paramMean*2
 *
 * @param Pie Opacity
 * @parent ---Parameters---
 * @desc The diagram opacity
 * @default 0.75
 *
 * @param Pie Border Width
 * @parent ---Parameters---
 * @desc The diagram borders width
 * insert value 0.1 to not draw
 * @default 1
 *
 * @param Pie Border Color
 * @parent ---Parameters---
 * @type text
 * @desc The diagram borders color. comma separated values,
 * no space. Single value is applied to all.
 * @default #ffffff
 *
 * @param Number of Concentric Circles
 * @parent ---Parameters---
 * @desc the number of concentric circles to draw in the
 * pie diagram background.
 * @default 5
 *
 * @param Concentric Circles Color
 * @parent ---Parameters---
 * @desc color of the concentric circles draw in the
 * pie diagram background
 * @default #919191
 *
 *
 * @param ---Elements Affinity---
 * @default ----------------------------
 *
 * @param Elements Diagram Show
 * @parent ---Elements Affinity---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show Batter Elemental affinity ?
 * NO - false     YES - true
 * @default true
 *
 * @param Elements Diagram X
 * @parent ---Elements Affinity---
 * @desc
 * @default this.width*0.75
 *
 * @param Elements Diagram Y
 * @parent ---Elements Affinity---
 * @desc
 * @default this.standardPadding();
 *
 * @param Elements Diagram Width
 * @parent ---Elements Affinity---
 * @desc
 * @default 25
 *
 * @param Elements Diagram Height
 * @parent ---Elements Affinity---
 * @desc
 * @default this.height * 0.5
 *
 *
 * @param Elements Icons
 * @parent ---Elements Affinity---
 * @type text[]
 * @desc give the icon corresponding to the element of same index.
 * elements with icon 0 will not be drawn.
 * @default ["77","64","65","66","67","68","69","70","71"]
 *
 * @param Draw Icon Condition
 * @parent ---Elements Affinity---
 * @type note
 * @desc The condition to draw Icons. use 'resi' to refer to
 * the element affinity value.
 * @default "resi != 1"
 *
 * @param Draw Icon Overlap
 * @parent ---Elements Affinity---
 * @desc Adjacent Icons can overlap by the amount specified here
 * @default 8
 *
 * @param Gradient Colors
 * @parent ---Elements Affinity---
 * @type text[]
 * @desc list the colors you want from low to high resi value
 * @default ["#e56767","#ffffff","#6772e5","#cc67e5"]
 *
 * @param Gradient Intervals Ratio
 * @parent ---Elements Affinity---
 * @type text[]
 * @desc give the height ratio at which the different colors gradient
 * might be placed.
 * @default ["0","0.33","0.66","1"]
 *
 * @param Gradient Opacity
 * @parent ---Elements Affinity---
 * @desc the gradient opacity.
 * 0 = fully transparent ; 1 = fully opaque
 * @default 0.8
 *
 * @param Gradient Border Color
 * @parent ---Elements Affinity---
 * @desc the color for the borders
 * @default #ffffff
 *
 * @param Gradient Border Width
 * @parent ---Elements Affinity---
 * @desc the width for the borders
 * @default 2
 *
 * @param Max Element Rate Threshold
 * @parent ---Elements Affinity---
 * @desc the maximal element rate for diagram scaling.
 * @default 2
 *
 * @param Min Element Rate Threshold
 * @parent ---Elements Affinity---
 * @desc the minimal element rate for diagram scaling.
 * @default -2
 *
 * @param Element Rate Scaling Script
 * @parent ---Elements Affinity---
 * @type note
 * @dec a script to transform element rate into
 * height ratio for icon plot.
 * @default "linear"
 *
 * @param Legend Names
 * @parent ---Elements Affinity---
 * @type text[]
 * @desc list of the diagram legend names.
 * @default ["absorb","resist","natural","weak"]
 *
 * @param Legend Elemental Rate
 * @parent ---Elements Affinity---
 * @type text[]
 * @desc The position along the gradient at which those names
 * will be draw. Give them as height ratio.
 * @default ["-1","0","1","2"]
 *
 * @param Legend Name Font Size
 * @parent ---Elements Affinity---
 * @desc the element affinity diagram legend font size
 * @default 18
 *
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin add a new feature to battles that allow the player to visually
 * get information on battlers. A new command is added. It open a new window
 * from which the player can select the battler of interest. Doing so, the
 * player can retreive information on the states the battler is currently
 * affected by, the battler parameters and the battler elemental affinity.
 *
 * This plugin has been made with respect to Yanfly plugins architecture and
 * should be compatible with most of the Yanfly plugins. On the other hand,
 * this plugin is redundant with the YEP_InBattleStatus plugin. However, it was
 * made to bring information on both Actors and Enemies, a feature that Yanfly
 * plugins don't propose.
 *
 * Finally, a lot of effort has been dedicated to window customization. Thus,
 * this plugin propose a huge amount of adjustable parameters. I strongly
 * recommand to carefully read this help page in which each parameters will
 * be described with much more details than what the plugin manager will show.
 *
 * ============================================================================
 * Plugin Requirement
 * ============================================================================
 *
 *      - LAY_WindowDrawPolygon (mandatory)
 *      - YEP_CoreEngine (optional - modify the gauges aspect)
 *      - YEP_X_AnimatedSVEnemies (optional - needed to draw battler sprite)
 *      - YEP_ElementCore (optional)
 *
 * ============================================================================
 * Feature Description
 * ============================================================================
 *
 * The massive development of RMMV plugins has open the door to the creation of
 * very elaborate battle strategy. Mainly, battle complexity has been provided
 * by the ability to create complex states and skills. Unfortunately, from the
 * player point of view, there isn't a satisfacting way to acess a nice and
 * clear description of what those complex states really do. On the other hand,
 * the use of specific skills usually need to have at least an estimation of
 * the opponent parameters and elemental affinity. As consequence, players are,
 * for most of them, invited to adopt a "die and retry" game plan until the
 * effect of states has been perfectly understood according to how battlers
 * behave and react to them. However, not all developers expect from there
 * game to require this kind of game plan to be understand. For them, this
 * plugin propose a way to give the player the minimal information he needs to
 * elaborate a battle strategy.
 *
 * A command named "overview" (by default) is added either to the Actor Command
 * Window or the Party Command Window. This command open a window that display
 * the following information about the selected battler and the selected state :
 *
 *   - State List :
 *           this is the list of all states the selected battler is
 *           currently affected by.
 *
 *   - State Description :
 *           While a state is selected from the state list, an area of the
 *           window is dedicated to a description of this state. The size of
 *           this area is fully customizable and the state description is
 *           setup to each states using notetags.
 *
 *   - Battler Sprite :
 *           This feature required YEP_X_AnimatedSVEnemies.
 *           The selected battler sprite is drawn. Taking much less room than
 *           the use of Faces. Moreover, using battler sprite for enemies
 *           is much more relevent since no faces are associated to enemies
 *           during battles.
 *
 *   - Battler Parameters :
 *           Draw a diagram that allow the player to approximately estimate
 *           the parameters values.
 *
 *   - Battler Elemental Affinity :
 *           Draw a diagram that allow the player to approximately estimate
 *           the elemental affinity of the opponent.
 *
 * ============================================================================
 * Plugin Parameters
 * ============================================================================
 *
 *  ---- GENERAL ----
 *
 *   > Add Command to Window
 *
 * This parameter dictate from which window the overview command run.
 * Could be Actor for the Actor command window or Party for the party command
 * window.
 *
 * > Command Name
 *
 * The name of the command that will be display in the Window specified
 * above.
 *
 * ---- STATE AREA ----
 *
 * > State Area Header
 *
 * Enter here the sentence you want to be drawn above the state list.
 *
 * > State Area X
 * > State Area Y
 * > State Area Width
 * > State Area Height
 *
 * Those are used to determine the position of the area dedicated to the state
 * list the selected battler is currently affected by. X and Y are the
 * coordinates of the upper left corner in the window.
 *
 * ---- State Description ----
 *
 * > State Desc Header
 *
 * Enter here the sentence you want to be drawn above the state list.
 *
 * > State Desc X
 * > State Desc Y
 * > State Desc Width
 * > State Desc Height
 *
 * Those are used to determine the position of the area dedicated to state
 * description.
 *
 * > No State Name
 *
 * Even when a battler is not affected by any state, the window used to
 * select a state is still active and has a better looking if something
 * is written in it. Enter here the string you want to be drawn for
 * battlers that aren't affected by any states.
 *
 * ---- Battler Sprite ----
 *
 * > Battler Sprite Show
 *
 * A boolean value that determine if the battler sprite has to be drawn.
 * this parameter will not be took into acount if you are not using
 * YEP_X_AnimatedSVEnemies. true to draw the sprite. false to don't draw it.
 *
 * > Battler Sprite X
 * > Battler Sprite Y
 *
 * Determine here the position of the sprite in the Window. X and Y are the
 * upper left corner of the sprite.
 *
 * > Battler Sprite Scale X
 * > Battler Sprite Scale Y
 *
 * Those are factors to apply on the sprite scalling. Higher scaling values
 * will draw a bigger sprite. Naegative values will flip the sprite accross
 * the corresponding coordinate. It is recommanded to setup those parameters
 * with the same absolute value to prevent from sprite deformation.
 *
 * ---- Battler Gauges ----
 *
 * ?? :  HP , MP or TP
 *
 * > Battler ?? Gauge Show
 *
 * setup this parameter to true for gauges you want to draw and to false for
 * gauges you don't want to show.
 *
 * > Battler ?? Gauge X
 * > Battler ?? Gauge Y
 * > Battler ?? Gauge Width
 *
 * Determine the position and the width of gauges.
 * for MP gauges, you can use the keywords 'hpGaugeX', 'hpGaugeY' and
 * 'hpGaugeWd' to quickly retreive the values of HP Gauge X, HP Gauge Y and
 * HP Gauge Width respectively.
 * for TP gauges, you can use the same keywords. Additionaly, you can use
 * 'mpGaugeX', 'mpGaugeY' and 'mpGaugeWd' for MP Gauge X, Y and Width
 * respectively
 *
 * > Unk Gauge Color
 *
 * The colors you want to use for unknown gauges. This parameter can be a
 * single html color or two html colors separated by a comma and without
 * space. If two colors are specified, gradient gauge will be drawn.
 *
 * > Unk Gauge Text
 *
 * The text to display instead of the value / max value typical gauges.
 *
 *
 * ---- Parameters ----
 *
 * > Parameters Show
 *
 * Determine if the parameters diagram wil be drawn (true) or not (false).
 *
 * > Parameters X
 * > Parameters Y
 * > Parameters Radius
 *
 * Determine the position and the size of the diagram in the window.
 * Because the diagram is circular, the X and Y coordinates refer here to
 * the center of the diagram.
 *
 * > Param Pie Color
 *
 * The list of colors you want to use for each parameters you want to draw.
 * the colors must be in html format, separated by comma without spaces.
 * the number of colors in the list have to be the same than the number of
 * parameters specified in the Battler Parameters (see below).
 *
 * > Param Pie Legend
 *
 * The list of text you want to draw next to each parameters.
 * this list have to be comma separated values without any space.
 * the length of this list have to be the same than Battler Parameters length.
 * (see below)
 *
 * > Battler Parameters
 *
 * The list of parameters you want to draw.
 * This entry must be in the comma separated values format (no spaces allowed)
 * you can use the following keyword to retreive standard values :
 *        battler : the battler object of the current selected battler.
 *        atk : the attack of the current battler (param index : 2)
 *        def : the defense of the current battler (param index 3)
 *        mdf : the magical defense of the current battler (param index 5)
 *        mat : the magical attack of the current battler (param index 4)
 *        agi : the agility of the current battler (param index 6)
 *        luk : the luck of the current battler (param index 7)
 *
 * > Pie Size Slice Ratio
 *
 * The plugin automatically compute the angle of the circle dedicated to
 * each parameters. This parameter modify this angle by the specified ratio.
 *
 * > Pie Diagram Phase
 *
 * enter here the angle (in radiant) by which you want to rotate the diagram.
 * usefull to customize the position of parameters.
 *
 * > Pie Diagram 100%
 *
 * What is the value that must correspond to 100% in the diagram ?
 * enter here a formula that will be evaluated. You can use the following
 * keywords to acess usefull values :
 *
 *         paramSum : the sum of all parameters values
 *         paramMean : the average of all parameters values
 *         paramMax : the maximal values of all parameters
 *         paramMin : the minimal value of all parameters
 *
 * the allowed keywords from Battler Parameters can also be used here.
 * In order to prevent the diagram to draw a parameter outside of the diagram,
 * any parameter value that is higher than this value will be set to 100%.
 *
 * > Pie Opacity
 *
 * Setup the opacity of the diagram. value of 1 means completely opaque and
 * a value of 0 means completely transparent.
 *
 * > Pie Border Width
 * > Pie Border Color
 *
 * the width and the color of the diagram borders lines.
 *
 * > Number of Concentric Circles
 * > Concentric Circles Color
 *
 * The scale of the diagram is show using concentric circles drawn at the
 * diagram background. Those parameters control the number of concentric
 * circles that must be draw and their color.
 *
 * ---- Elements Affinity ----
 *
 * > Elements Diagram Show
 *
 * Enable/Disable the element affinity diagram to be show
 *
 * > Elements Diagram X
 * > Elements Diagram Y
 * > Elements Diagram Width
 * > Elements Diagram Height
 *
 * Determine the position and the size of the Element Diagram in the window.
 *
 * > Elements Icons
 *
 * Since there isn't any option to associate elements type with icons in
 * the editor, enter here the icon index you want to use for each elements
 * you setup for your game.
 * This parameter open a text list. The index of this list might fit with the
 * index of the element in the editor.
 *
 * example : if my Fire element has the index 3 in the editor, I set the line 3
 * with the Icon index I want to use for Fire.
 *
 * You can leave empty lines if you don't want to show the element affinity
 * of the corresponding element.
 *
 * example : ["77","",64]
 * this will show the element index 1 and 3 with icon 77 and 64 respectively.
 * The element index 2 will be ignored in the diagram.
 *
 * > Draw Icon Condition
 *
 * For games that use a huge amount of elements, visualizing the elemental
 * affinity of a battler can become a mess. Especially, if the battler has all
 * the element affinity set to 100%, the icons list can draw outside of the
 * window.
 * Enter here a condition that will beevaluated. If the condition is met,
 * the element will be display in the diagram. Set this field to '1' or 'true'
 * if you want to always display all elements.
 *
 * > Draw Icon Overlap
 *
 * When two elements have the same element rate, the icons are drawn next to
 * each other. You can make those two Icons overlapping by the given amount
 * of pixels here.
 *
 * > Gradient Color
 *
 * The colors used for the gradient in the element affinity diagram.
 * list the colors you want from top to bottom. Top is dedicated to
 * low element rate (decreasing damages) and bottom is dedicated to
 * high element rate (increasing damages).
 *
 * > Gradients Interval Ratio
 *
 * Give here the position at which all the colors listed above should take
 * place along the diagram. Give those position as ratio of height. Thus,
 * values might be between 0 and 1.
 *
 * > Gradient Opacity
 *
 * The opacity of the diagram. This value must e between 0 and 1.
 * 0 means totally transparent and 1 means totally opaque.
 *
 * > Gradient Border Color
 *
 * The color of the rectangle borders in which the gradient will be draw.
 *
 * > Gradient Border Width
 *
 * The size of the rectangles border lines.
 *
 * > Max Element Rate Threshold
 *
 * This is the maximal Element rate to consider for the plot.
 * Element rate above this value will be drawn at the very
 * bottom of the plot.
 *
 * > Min Element Rate Threshold
 *
 * This if the minimal element rate to consider for the plot.
 * Element rate under this value will be drawn at the top
 * of the plot.
 *
 * > Element Rate Scaling Script
 *
 * This is a script that will be executed for scaling elemental
 * affinity between 0 and 1. If you want a linear scaling, you
 * just have to write "linear" in the text box.
 * If you want to have a more complex scaling function, you can
 * write it in the note box.
 *
 * the variable value is the element rate. The script you
 * write have to modify value in order to scale it between
 * 0 and 1.
 * the variable min is the min element rate threshold you
 * have previously scecified.
 * the variable max is the max element rate threshold you
 * have previously specified.
 *
 * > Legend Names
 *
 * Give here the text you want to draw as plot legend.
 *
 * > Legend Elemental Rate
 *
 * Indicate here what the element rate the previously defined
 * legend names should correspond to.
 *
 * > Legend Name Font Size
 * The font size used for the element affinity diagram legend.
 *
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * States
 *   <Overview Description>
 *     ...
 *   </Overview Description>
 *   This notetag is used for state description.
 *
 * Enemies
 *   <Hide Elem Icons: x>
 *   Replace x by the desire Icon ID.
 *   This notetag will replace the Element Icon list by a list of icon x.
 *   As a consequence, all element icon will be drawn with the same icon.
 *   Use this notetag if you don't want to show the element affinity of a
 *   specific enemy.
 *   Note : the icon ID '0' is an empty icon. Thus nothing will be draw.
 *   Using a different icon than an empty icon will show the enemy
 *   elemental affinity but the player will not be able to know what
 *   element correspond to the corresponding affinity.
 *
 * Classes & Enemies
 *   <Overview *Param* Gauge: *TYPE*>
 *   Replace *Param* by HP, MP or TP.
 *   Replace *TYPE* by "hide", "ukn" or "show".
 *   This will modify the gauges display for this specific enemy of actor
 *   class. 'hide' will disable the gauge drawing. 'show' will enable the
 *   gauge drawing, 'ukn' will draw a gauge in a unknown state.
 *
 *   <Overview *Param* Gauge *N*: *EVAL*>
 *   Replace *PARAM* by HP, MP or TP.
 *   Replace *N* by 'X', 'Y' or 'Width'
 *   Replace *EVAL* by a javascript executable line.
 *   This notetag allow you to modify for a specific enemy of actor class
 *   the position and the width of the corresponding gauge.
 *   For MP Gauge, you can retreive the HP positionning using the following
 *   keywords : 'hpGaugeX', 'hpGaugeY', 'hpGaugeWd'
 *   For TP Gauge, you can rerteive the HP and MP positionning using the
 *   same keywords than above :
 *  'hpGaugeX', 'hpGaugeY', 'hpGaugeWd', 'mpGaugeX', 'mpGaugeY', 'mpGaugeWd'
 *
 *   example :
 *      <Overview TP Gauge: hide>
 *      <Overview MP Gauge Width: hpGaugeWd>
 *   those two notetags will hide the TP gauge and will fit the MP gauge
 *   width to the HP gauge width.
 *
 *
 *
 * ============================================================================
 * Usefull Functions
 * ============================================================================
 *
 * Game_Party.setElemIconDefault( enemyID, elementID)
 *
 *   if the enemyID correspond to an enemy that has the <Hide Elem Icons: x>
 *   notetag, this function will replace the elementID icon by the
 *   corresponding icon as specified in the plugin parameters.
 *
 *   example of use with YEP_SkillCore :
 *
 *   Skill notetag :
 *
 *   <Post-Damage Eval>
 *     var targetId = target._enemyId;
 *     var elementId = 1;
 *     $gameParty.setElemIconDefault(targetId,elementId)
 *   </Post-Damage Eval>
 *
 * When the skill that contain this notetag is casted on an enemy that have
 * hidden elements icons, the element 1 will now be draw according to the
 * element icon. Thus, when looking in the Overview window, all elements
 * doesn't appear but the element 1 is well draw.
 *
 *   example of use with YEP_BuffsStatesCore and YEP_ElementCore :
 *
 *   State notetag :
 *
 *   <Custom Respond Effect>
 *    if (target.isEnemy() && target.result().hpDamage > 0) {
 *       var EnemyId = target.enemyId();
 *       var elements = this.getItemElements();
 *       $gameParty.setElemIconDefault(EnemyId,elements);
 *    }
 *   </Custom Respond Effect>
 *
 * When the enemy affected by this state get hit by a skill and lose Hp,
 * The element icon corresponding to the element of the skill will now
 * be draw according to the element icons plugin parameter.
 *
 *
 *
 *  Game_Party.prototype.setUpDiscoEnemWeak()
 *
 * When the enemy database or the element list in the system database are
 * modified, it can create index conflict. Unfortunately, there aren't
 * possibilities for this pugin to identify those conflicts and they are
 * susceptible to create graphical bugs in the battle overview elemental
 * affinity graph. If you observe such a bug that could be induced by
 * index conflict, run this command to reset the element icons assigned
 * to enemies.
 * Index conflict can be induced when you change the index of an
 * element or of an enemy in the database.
 * Note that Index conflict can only happen if you load a save file that
 * has been created before a database modification.
 *
 *
 */
//=============================================================================


Lay.Parameters = PluginManager.parameters('LAY_BattleOverview');
Lay.Param = Lay.Param || {};

Lay.Param.AddCommand2Window = String(Lay.Parameters["Add Command to Window"]);
Lay.Param.CommandName = String(Lay.Parameters["Command Name"]);

Lay.Param.ShowElementAffinity = eval( String( Lay.Parameters["Elements Diagram Show"] ));
Lay.Param.ElemIcons = eval(Lay.Parameters["Elements Icons"]);
Lay.Param.ElemIcons = [null].concat(Lay.Param.ElemIcons);

Lay.Param.IconOverlap = String(Lay.Parameters["Draw Icon Overlap"] );

Lay.Param.GradientColors = eval( Lay.Parameters["Gradient Colors"] );
Lay.Param.GradientIntervalsRatio = eval( Lay.Parameters["Gradient Intervals Ratio"] );
Lay.Param.LegendNames = eval(Lay.Parameters["Legend Names"] );
Lay.Param.LegendRatio = eval(Lay.Parameters["Legend Elemental Rate"] );

Lay.Param.GradientOpacity = String(Lay.Parameters["Gradient Opacity"] );
Lay.Param.GradientBorderColor = String(Lay.Parameters["Gradient Border Color"] );
Lay.Param.GradientBorderWidth = String(Lay.Parameters["Gradient Border Width"] );

Lay.Param.MaxElementRate = String(Lay.Parameters["Max Element Rate Threshold"] );
Lay.Param.MinElementRate = String(Lay.Parameters["Min Element Rate Threshold"] );

Lay.Param.ElemLegFontSize = String(Lay.Parameters["Legend Name Font Size"]);
Lay.Param.DrawElemIconCdt = JSON.parse(Lay.Parameters["Draw Icon Condition"])
Lay.Param.ElementDiagramX = String( Lay.Parameters["Elements Diagram X"] );
Lay.Param.ElementDiagramY = String( Lay.Parameters["Elements Diagram Y"] );
Lay.Param.ElementDiagramWidth= String( Lay.Parameters["Elements Diagram Width"] );
Lay.Param.ElementDiagramHeight = String( Lay.Parameters["Elements Diagram Height"] );

Lay.Param.ElemScalScript = JSON.parse( Lay.Parameters["Element Rate Scaling Script"] );

Lay.Param.ShowParam = eval( String( Lay.Parameters["Parameters Show"] ));
Lay.Param.ParamX = String( Lay.Parameters["Parameters X"] );
Lay.Param.ParamY = String( Lay.Parameters["Parameters Y"] );
Lay.Param.ParamRadius = String( Lay.Parameters["Parameters Radius"] );
Lay.Param.ParamPieColor = String( Lay.Parameters["Param Pie Color"] ).split(",");
Lay.Param.ParamPieLegend = String( Lay.Parameters["Param Pie Legend"] ).split(",");
Lay.Param.BattlerParam = String( Lay.Parameters["Battler Parameters"] ).split(",")
Lay.Param.PieRatio = String( Lay.Parameters["Pie Size Slice Ratio"] );
Lay.Param.PiePhase = eval( String( Lay.Parameters["Pie Diagram Phase"] ));
Lay.Param.MaxAmplitude = String( Lay.Parameters["Pie Diagram 100%"] );
Lay.Param.PieOpacity = String( Lay.Parameters["Pie Opacity"] );
Lay.Param.PieBdWidth = String( Lay.Parameters["Pie Border Width"] );
Lay.Param.PieBdColor = String( Lay.Parameters["Pie Border Color"] ).split(",");
Lay.Param.NumberOfConcentricCircles = String( Lay.Parameters["Number of Concentric Circles"]);
Lay.Param.ColorOfConcentricCircles = String( Lay.Parameters["Concentric Circles Color"] );

Lay.Param.BattlerHPgaugeShow = eval( String( Lay.Parameters["Battler HP Gauge Show"] ));
Lay.Param.BattlerHPgaugeX = String( Lay.Parameters["Battler HP Gauge X"] );
Lay.Param.BattlerHPgaugeY = String( Lay.Parameters["Battler HP Gauge Y"] );
Lay.Param.BattlerHPgaugeWidth = String( Lay.Parameters["Battler HP Gauge Width"] );

Lay.Param.BattlerMPgaugeShow = eval( String( Lay.Parameters["Battler MP Gauge Show"] ));
Lay.Param.BattlerMPgaugeX = String( Lay.Parameters["Battler MP Gauge X"] );
Lay.Param.BattlerMPgaugeY = String( Lay.Parameters["Battler MP Gauge Y"] );
Lay.Param.BattlerMPgaugeWidth = String( Lay.Parameters["Battler MP Gauge Width"] );

Lay.Param.BattlerTPgaugeShow = eval( String( Lay.Parameters["Battler TP Gauge Show"] ));
Lay.Param.BattlerTPgaugeX = String( Lay.Parameters["Battler TP Gauge X"] );
Lay.Param.BattlerTPgaugeY = String( Lay.Parameters["Battler TP Gauge Y"] );
Lay.Param.BattlerTPgaugeWidth = String( Lay.Parameters["Battler TP Gauge Width"] );

Lay.Param.BattlerUnkGaugeColor = String( Lay.Parameters["UNK Gauge Color"] ).split(",");
Lay.Param.BattlerUnkGaugeTxt = String( Lay.Parameters["UNK Gauge Text"] ).split("/");

Lay.Param.StateAreaHeader = String( Lay.Parameters["State Area Header"] );
Lay.Param.StateAreaX = String( Lay.Parameters["State Area X"] );
Lay.Param.StateAreaY = String( Lay.Parameters["State Area Y"] );
Lay.Param.StateAreaWidth =  String( Lay.Parameters["State Area Width"] );
Lay.Param.StateAreaHeight = String( Lay.Parameters["State Area Height"] );
Lay.Param.StateNone = String( Lay.Parameters["No State Name"] )

Lay.Param.StateDescHeader = String( Lay.Parameters["State Desc Header"] );
Lay.Param.StateDescriptionX = String( Lay.Parameters["State Desc X"] );
Lay.Param.StateDescriptionY = String( Lay.Parameters["State Desc Y"] );
Lay.Param.StateDescriptionWidth = String( Lay.Parameters["State Desc Width"] );
Lay.Param.StateDescriptionHeight = String( Lay.Parameters["State Desc Height"] );

Lay.Param.BattlerSpriteShow = eval( String( Lay.Parameters["Battler Sprite Show"] ));
Lay.Param.BattlerSpriteX = String( Lay.Parameters["Battler Sprite X"] );
Lay.Param.BattlerSpriteY = String( Lay.Parameters["Battler Sprite Y"] );
Lay.Param.BattlerSpriteScaleX = String( Lay.Parameters["Battler Sprite Scale X"] )
Lay.Param.BattlerSpriteScaleY = String( Lay.Parameters["Battler Sprite Scale Y"] )

Lay.Param.BattlerSpriteMethod = "YEP"
Lay.Param.BuffColorUp   = "#2cb834";
Lay.Param.BuffColorDown = "#b82c2c";

if (Lay.Param.GradientColors.length != Lay.Param.GradientIntervalsRatio.length) {
  console.log("LAY BOV WARNING : Gradient colors length != Gradient Color Intervals Length");
};
if (Lay.Param.LegendNames.length != Lay.Param.LegendRatio.length) {
  console.log("LAY BOV WARNING : Legend names length != Legend ratio length");
};
if (Lay.Param.BattlerUnkGaugeTxt.length != 2){
  console.log("LAY BOV WARNING : Unk Gauge Text > bad input")
};
if (Lay.Param.ParamPieColor.length != Lay.Param.BattlerParam.length){
  console.log("LAY BOV WARNING : Pie Colors length != number of parameters")
};
if (Lay.Param.ParamPieLegend.length != Lay.Param.BattlerParam.length){
  console.log("LAY BOV WARNING : Pie Legend length != number of parameters")
};
//=============================================================================
// DataManager
//=============================================================================



Lay.BOV.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Lay.BOV.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Lay._loaded_LAY_BattleOverview) {
    this.processBOVNotetags1($dataEnemies);
    this.processBOVNotetags1($dataClasses);
    Lay._loaded_LAY_BattleOverview = true;
  };
  return true;
};

DataManager.processBOVNotetags1 = function(group){

  if (Lay.Param.ElemIcons.length < $dataSystem.elements.length){
    var deltaIconLength = $dataSystem.elements.length - Lay.Param.ElemIcons.length;
    var exessArray = Array(deltaIconLength).fill("0");
    Lay.Param.ElemIcons = Lay.Param.ElemIcons.concat( exessArray );
  };

  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.elementsIcons = Object.assign( [] , Lay.Param.ElemIcons );
    obj.bov = {}
    obj.bov.HpGauge = "show";
    obj.bov.MpGauge = "show";
    obj.bov.TpGauge = "show";
    obj.bov.HpGaugeX = null;
    obj.bov.MpGaugeX = null;
    obj.bov.TpGaugeX = null;
    obj.bov.HpGaugeY = null;
    obj.bov.MpGaugeY = null;
    obj.bov.TpGaugeY = null;
    obj.bov.HpGaugeWd = null;
    obj.bov.MpGaugeWd = null;
    obj.bov.TpGaugeWd = null;
    obj.bov.param = null;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];

      if (line.match(/<(?:HIDE ELEM ICONS):[ ](\d+)>/i)) {
        for (var j=0; j<obj.elementsIcons.length; j++){
          if (obj.elementsIcons[j] != '0') obj.elementsIcons[j] = String(RegExp.$1);
        };
      } else if ( line.match(/<(?:OVERVIEW HP GAUGE):[ ](.*)>/i) ) {
        obj.bov.HpGauge = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW MP GAUGE):[ ](.*)>/i) ) {
        obj.bov.MpGauge = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW TP GAUGE):[ ](.*)>/i) ) {
        obj.bov.TpGauge = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW HP GAUGE X):[ ](.*)>/i) ) {
        obj.bov.HpGaugeX = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW MP GAUGE X):[ ](.*)>/i) ) {
        obj.bov.MpGaugeX = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW TP GAUGE X):[ ](.*)>/i) ) {
        obj.bov.TpGaugeX = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW HP GAUGE Y):[ ](.*)>/i) ) {
        obj.bov.HpGaugeY = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW MP GAUGE Y):[ ](.*)>/i) ) {
        obj.bov.MpGaugeY = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW TP GAUGE Y):[ ](.*)>/i) ) {
        obj.bov.TpGaugeY = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW HP GAUGE WIDTH):[ ](.*)>/i) ) {
        obj.bov.HpGaugeWd = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW MP GAUGE WIDTH):[ ](.*)>/i) ) {
        obj.bov.MpGaugeWd = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW TP GAUGE WIDTH):[ ](.*)>/i) ) {
        obj.bov.TpGaugeWd = String(RegExp.$1);
      } else if ( line.match(/<(?:OVERVIEW PARAM):[ ](.*)>/i) ) {
        obj.bov.param = String(RegExp.$1);
      };
    };
  };
};

Lay.BOV.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents){
  Lay.BOV.DataManager_extractSaveContents.call(this,contents);
  this.checkDataEnemiesUpdate();
};

DataManager.checkDataEnemiesUpdate = function() {
  // CHECK GAME PARTY AS BEEN INITIALIZE WITH THE PLUGIN
  if (!$gameParty._DiscoveredEnemiesWeakness) {
    console.log("LAY_BOV : Discovered Enemies Weakness not found")
    $gameParty.setUpDiscoEnemWeak();
    console.log("LAY_BOV : processing Setup Discovered Enemies Weakness")
    return true;
  };

  var elementsSysList = $dataSystem.elements;
  for (var n=1; n<$dataEnemies.length; n++){
    var enemy = $dataEnemies[n];
    var discoveredEnemiesWeak = $gameParty._DiscoveredEnemiesWeakness[n]

    if (!enemy) {
      console.log("LAY_BOV : can't find enemy id "+n)
      $gameParty._DiscoveredEnemiesWeakness.push(undefined);
      continue;
    };
    if (!discoveredEnemiesWeak){
      console.log("LAY_BOV : can't find Discovery Enemies Weakness of enemy id "+n);
      $gameParty.resetAllElemIcon(n);
      console.log("LAY_BOV : Discovery Enemies Weakness of enemy id "+n+" has been reset");
    } else if (discoveredEnemiesWeak.length != elementsSysList.length) {
      console.log(elementsSysList)
      console.log("LAY_BOV : Discovery Enemies Weakness length of enemy id "+n+" doesn't match system elements");
      $gameParty.resetAllElemIcon(n);
      console.log("LAY_BOV : Discovery Enemies Weakness of enemy id "+n+" has been reset");
    } else {
      continue
    };

  };
};

//=============================================================================
// Scene_Battle
//=============================================================================


// ADDING AND ORGANIZING WINDOW #################

Lay.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    Lay.Scene_Battle_createAllWindows.call(this);
    this.create_BOW_ShowInfo();
    this.create_BOW_SelectBattler();
    this.create_BOW_SelectState();
    this.buildArchitecture();
};

Scene_Battle.prototype.buildArchitecture = function() {
    this._BOW_SelectBattler._BOW_SelectState = this._BOW_SelectState;
    this._BOW_SelectBattler._BOW_SelectState._BOW_ShowInfo = this._BOW_ShowInfo;
}

Scene_Battle.prototype.create_BOW_ShowInfo = function() {
    this._BOW_ShowInfo = new Window_BattleOverview_ShowInfo(); // create the window
    this.addChild(this._BOW_ShowInfo); // add the window in scene battle children
    //this.addWindow(this._BOW_ShowInfo);
    this._BOW_ShowInfo.hide();
}

Scene_Battle.prototype.create_BOW_SelectState = function(){
    this._BOW_SelectState = new Window_BattleOverview_SelectState();
    this.addChild(this._BOW_SelectState);
    //this.addWindow(this._BOW_SelectState);
    this._BOW_SelectState.deactivate();
    this._BOW_SelectState.hide();
}

Scene_Battle.prototype.create_BOW_SelectBattler = function(){
    this._BOW_SelectBattler = new Window_BattleOverview_SelectBattler();
    this.addChild(this._BOW_SelectBattler);
    //this.addWindow(this._BOW_SelectBattler);
    this._BOW_SelectBattler.setHandler('cancel',this.onBattleOverviewWindowCancel.bind(this));
    this._BOW_SelectBattler.deactivate();
    this._BOW_SelectBattler.hide()
};

// WINDOW COMMANDS #################

Lay.Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow
Scene_Battle.prototype.createActorCommandWindow = function() {
    Lay.Scene_Battle_createActorCommandWindow.call(this);
    if (Lay.Param.AddCommand2Window === "Actor") this._actorCommandWindow.setHandler('overview',this.commandBattleOverview.bind(this));
};

Lay.Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow
Scene_Battle.prototype.createPartyCommandWindow = function() {
    Lay.Scene_Battle_createPartyCommandWindow.call(this);
    if (Lay.Param.AddCommand2Window === "Party") this._partyCommandWindow.setHandler('overview',this.commandBattleOverview.bind(this));
};

Scene_Battle.prototype.commandBattleOverview = function(){

    this._BOW_SelectBattler.show();
    this._BOW_SelectBattler.select(0);
    this._BOW_SelectBattler.activate();
    //this._BOW_SelectBattler.refresh();

    this._BOW_SelectState.show();
    this._BOW_SelectState.select(0);
    this._BOW_SelectState.activate();
    //this._BOW_SelectState.refresh();

    this._BOW_ShowInfo.show();
    //this._BOW_ShowInfo.refresh();

    if (Lay.Param.AddCommand2Window === "Actor") this._actorCommandWindow.hide();
    if (Lay.Param.AddCommand2Window === "Party") this._partyCommandWindow.hide();
    this._statusWindow.hide();

    this._BOW_SelectBattler.refresh();
    this._BOW_SelectState.refresh();
    this._BOW_ShowInfo.refresh();
};

Scene_Battle.prototype.onBattleOverviewWindowCancel = function(){

    this._BOW_SelectBattler.hide();
    this._BOW_ShowInfo.hide();
    this._BOW_SelectState.hide();

    this._BOW_SelectState.deactivate();
    this._BOW_SelectBattler.deactivate();


    if (Lay.Param.AddCommand2Window === "Actor") {
      this._actorCommandWindow.activate();
      this._actorCommandWindow.show();
    } else if (Lay.Param.AddCommand2Window === "Party") {
      this._partyCommandWindow.activate();
      this._partyCommandWindow.show();
    };

    this._statusWindow.show();
};

Lay.Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
    if (this._BOW_SelectBattler && this._BOW_SelectBattler.active) return true;
    return Lay.Scene_Battle_isAnyInputWindowActive.call(this);
}

//=============================================================================
// Game_Party
//=============================================================================

Lay.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
  Lay.Game_Party_initialize.call(this);
  this.setUpDiscoEnemWeak();
};

Game_Party.prototype.setUpDiscoEnemWeak = function(){
  this._DiscoveredEnemiesWeakness = [null];
  for (var n=1; n<$dataEnemies.length; n++) {
    enemy = $dataEnemies[n];
    if (enemy) var elementsIcons = Object.assign( [] , enemy.elementsIcons );
    this._DiscoveredEnemiesWeakness.push(elementsIcons);
  };
};

Game_Party.prototype.setElemIcon = function(enemyID, elemID, iconID){
  //elemID -= 1;
  this._DiscoveredEnemiesWeakness[enemyID][elemID] = iconID
};

Game_Party.prototype.setElemIconDefault = function(enemyID, elemID){
  //elemID -= 1;
  this._DiscoveredEnemiesWeakness[enemyID][elemID] = Lay.Param.ElemIcons[elemID];
};

Game_Party.prototype.resetElemIcon = function(enemyID, elemID){
  //elemID -= 1;
  originValue = $dataEnemies[enemyID].elementsIcons[elemID];
  this._DiscoveredEnemiesWeakness[enemyID][elemID] = originValue;
};

Game_Party.prototype.resetAllElemIcon = function(enemyID){
  this._DiscoveredEnemiesWeakness[enemyID] = Object.assign( [], $dataEnemies[enemyID].elementsIcons);
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Lay.Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
    Lay.Window_ActorCommand_makeCommandList.call(this);
    if (Lay.Param.AddCommand2Window === "Actor") this.makeBattleOverviewCommand();
};

Window_ActorCommand.prototype.makeBattleOverviewCommand = function() {
    this.addCommand(Lay.Param.CommandName,'overview',true)
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Lay.Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
    Lay.Window_PartyCommand_makeCommandList.call(this);
    if (Lay.Param.AddCommand2Window === "Party") this.makeBattleOverviewCommand();
};

Window_PartyCommand.prototype.makeBattleOverviewCommand = function() {
    this.addCommand(Lay.Param.CommandName,'overview',true)
};

//=============================================================================
// Window_BattleOverview_SelectBattler
//=============================================================================

function Window_BattleOverview_SelectBattler(){
  this.initialize.apply(this,arguments);
};

Window_BattleOverview_SelectBattler.prototype = Object.create(Window_HorzCommand.prototype);
Window_BattleOverview_SelectBattler.prototype.constructor = Window_BattleOverview_SelectBattler;

Window_BattleOverview_SelectBattler.prototype.initialize = function() {
    x = 0;
    y = 0;
    Window_HorzCommand.prototype.initialize.call(this,x,y);
    this._data = null
    this._currentBattler = null;
};

Window_BattleOverview_SelectBattler.prototype.windowWidth = function() {return Graphics.boxWidth};

Window_BattleOverview_SelectBattler.prototype.maxCols = function(){return 5};

Window_BattleOverview_SelectBattler.prototype.numVisibleRows = function(){return 1};

Window_BattleOverview_SelectBattler.prototype.maxItems = function() {return this._data ? this._data.length : 1;};

Window_BattleOverview_SelectBattler.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_BattleOverview_SelectBattler.prototype.drawItem = function(index) {
    if (!this._data) return;
    var item = this._data[index];
    var rect = this.itemRect(index);
    this.drawText(item.name(),rect.x+2, rect.y +2);
};

Window_BattleOverview_SelectBattler.prototype.refresh = function() {
    this._data = this.getData();
    this.createContents();
    this.drawAllItems();
};

Window_BattleOverview_SelectBattler.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);

    if (!this._data) {
      this._data = this.getData();
      this.refresh();
    }

    if (!this._currentBattler) {
      this._currentBattler = this.getCurrentBattler();
      this._BOW_SelectState._battler = this._currentBattler;
      this._BOW_SelectState._BOW_ShowInfo._battler = this._currentBattler;

    } else if (this._currentBattler != this._data[this.index()]) {
      this._currentBattler = this.getCurrentBattler();
      this._BOW_SelectState._battler = this._currentBattler;
      this._BOW_SelectState._BOW_ShowInfo._battler = this._currentBattler;
      var states = this._currentBattler.states();
      if (states.length > 0){
          this._BOW_SelectState._statesList = states;
      } else {
          this._BOW_SelectState._statesList = ["none"];
      };
      this._BOW_SelectState.refresh();
      this._BOW_SelectState.select(0);
    };
};

Window_BattleOverview_SelectBattler.prototype.getData = function() {
  var data = [];
  for (i=0; i<$gameParty.battleMembers().length; i++){
    data.push($gameParty.battleMembers()[i]);
  };

  for (i=0; i<$gameTroop.members().length; i++){
    var battleUnit = $gameTroop.members()[i]
    if (!battleUnit._hidden) data.push(battleUnit);
  };
  return data;
};

Window_BattleOverview_SelectBattler.prototype.getCurrentBattler = function() {
  var index = this.index();
  return this._data[index];
}

Window_BattleOverview_SelectBattler.prototype.cursorDown = function(){
};

Window_BattleOverview_SelectBattler.prototype.cursorUp = function(){
};

Window_BattleOverview_SelectBattler.prototype.cursorRight = function(){
    Window_Selectable.prototype.cursorRight.call(this);
    //Window_BattleOverview_SelectBattler.updateOnMove();
};

Window_BattleOverview_SelectBattler.prototype.cursorLeft = function(){
    Window_Selectable.prototype.cursorLeft.call(this);
    //Window_BattleOverview_SelectBattler.updateOnMove();
};

//=============================================================================
// Window_BattleOverview_SelectState
//=============================================================================

function Window_BattleOverview_SelectState(){
  this.initialize.apply(this,arguments);
};

Window_BattleOverview_SelectState.prototype = Object.create(Window_Selectable.prototype);
Window_BattleOverview_SelectState.prototype.constructor = Window_BattleOverview_SelectBattler;

Window_BattleOverview_SelectState.prototype.initialize = function() {
    var x = eval(Lay.Param.StateAreaX) + this.standardPadding();
    var y = eval(Lay.Param.StateAreaY) + 140;
    var height = eval(Lay.Param.StateAreaHeight)-70; // Lay.BOV.StateAreaHeight
    var width  = eval(Lay.Param.StateAreaWidth); //Graphics.boxWidth * 0.2;
    Window_Selectable.prototype.initialize.call(this,x,y,width,height);
    this._statesList = null
    this._currentState = null
    this._battler = null
    this.opacity = 0;
    this.backOpacity = 0;
};

Window_BattleOverview_SelectState.prototype.item = function(){
    var index = this.index();

    return this._statesList && index >= 0 ? this._statesList[index] : null;
};

Window_BattleOverview_SelectState.prototype.maxItems = function() {
    return this._statesList ? this._statesList.length : 1;
};

Window_BattleOverview_SelectState.prototype.drawItem = function(index) {
    if (!this._statesList) return;
    if (this._statesList.length === 0){
      this._statesList = ["none"]
    }
    var item = this._statesList[index];
    var rect = this.itemRect(index);
    if (item.priority === 0) return;
    if (item === "none"){
        this.drawText(Lay.Param.StateNone,rect.x+2, rect.y +2);
    } else {
        this.drawItemName(item,rect.x+2, rect.y +2);
    };
};

Window_BattleOverview_SelectState.prototype.getStateDescription = function(notedata){
    notedata = notedata.split(/[\r\n]+/);
    var description = "";
    var evalMode = 'none'
    for (i=0; i<notedata.length; i++){
        var line = notedata[i];
        if (line.match(/<(?:OVERVIEW|DESCRIPTION|OVERVIEW DESCRIPTION)>/i)) {
            evalMode = 'help description';
        } else if (line.match(/<\/(?:OVERVIEW|DESCRIPTION|OVERVIEW DESCRIPTION)>/i)) {
            evalMode = 'none';
        } else if (evalMode === 'help description') {
            description += line + "\n";
        }
    };
    return description;
};

Window_BattleOverview_SelectState.prototype.refresh = function() {
    var cleanStates = []
    for (var i=0; i<this._statesList.length; i++){
      if (this._statesList[i].priority)  cleanStates.push(this._statesList[i])
    };
    if (cleanStates.length === 0) cleanStates = ["none"]
    this._statesList = cleanStates;
    this.createContents();
    this.drawAllItems();
};

Window_BattleOverview_SelectState.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);

    var index = this.index();

    if (!this._battler) {
      return;
    };

    if (!this._statesList){
      this._statesList = this._battler.states();
      if (this._statesList.length === 0){
          this._statesList = ["none"];
          this._BOW_ShowInfo._stateDescription = ""
      };
      this.refresh();
      this._BOW_ShowInfo.refresh();
    };

    if (!this._currentState) {
        this._currentState = this._statesList[index];

        if (this._currentState && this._currentState != "none") {
            var description = this.getStateDescription(this._currentState.note);
            this._BOW_ShowInfo._stateDescription = description;
            this._BOW_ShowInfo.refresh();
        };

    } else if ( this._currentState != this._statesList[index] ) {
        this._currentState = this._statesList[index];
        if (this._currentState != 'none'){
            var note = this._currentState.note;
            var description = this.getStateDescription(note);
            this._BOW_ShowInfo._stateDescription = description;
        } else {
            this._BOW_ShowInfo._stateDescription = "";
        };
        this._BOW_ShowInfo.refresh();
    };
};

//=============================================================================
// Window_BattleOverview_ShowInfo
//=============================================================================

function Window_BattleOverview_ShowInfo(){
  this.initialize.apply(this,arguments);
};

Window_BattleOverview_ShowInfo.prototype = Object.create(Window_Base.prototype);
Window_BattleOverview_ShowInfo.prototype.constructor = Window_BattleOverview_ShowInfo;

Window_BattleOverview_ShowInfo.prototype.initialize = function() {
    var x = 0;
    var y = 72;
    var width = Graphics.boxWidth - x;
    var height = Graphics.boxHeight - y;
    Window_Base.prototype.initialize.call(this,x,y,width,height);
    this.drawAllItems();
    this._stateDescription = "";
    this._battler = null;
    this._currentDisplay = null;
};

Window_BattleOverview_ShowInfo.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this._currentDisplay != this._battler){
        this._currentDisplay = this._battler;
        this.refresh();
    };
};

Window_BattleOverview_ShowInfo.prototype.refresh = function(){
    this.createContents();
    this.drawAllItems();
};

Window_BattleOverview_ShowInfo.prototype.drawAllItems = function() {
    if (this._battler) {
      this.drawStateArea();
      this.drawStateDescription();
      if (Lay.Param.BattlerSpriteShow) {
        if (Imported.YEP_X_AnimatedSVEnemies && Lay.Param.BattlerSpriteMethod === "YEP") this.drawBattlerSpriteYEP();
      };
      this.drawBattlerGauges();
      if (Lay.Param.ShowParam) this.drawParamPieDiagram();
      if (Lay.Param.ShowElementAffinity) this.drawBattlerResist_cursorVertiMode_YEP();
    };
};


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°° //

// BATTLER SPRITE

Window_BattleOverview_ShowInfo.prototype.drawBattlerSpriteYEP = function(){

    var winX = eval(Lay.Param.BattlerSpriteX)
    var winY = eval(Lay.Param.BattlerSpriteY)

    if (this._battler && this._battler.isEnemy()) {
      var animatedFile = this._battler._svBattlerName;
    } else if (this._battler && this._battler.isActor()) {
      var animatedFile = this._battler._battlerName;
    } else {
      return 0;
    };

    this.removeChild(this._battlerSprite);
    var sprite = new Sprite(ImageManager.loadSvActor(animatedFile));
    this._battlerSprite = sprite;
    var width = this._battlerSprite.width / 9;
    var height = this._battlerSprite.height / 6;
    var x = width;
    var y = 0;
    this._battlerSprite.setFrame(x,y,width,height);

    this._battlerSprite.x = winX;
    this._battlerSprite.y = winY;
    if ( this._battler.isEnemy() ){
      this._battlerSprite.scale.x = -1;
      this._battlerSprite.x += width * eval(Lay.Param.BattlerSpriteScaleY);
    };
    this._battlerSprite.scale.x *= eval(Lay.Param.BattlerSpriteScaleX);
    this._battlerSprite.scale.y *= eval(Lay.Param.BattlerSpriteScaleY);
    this.addChild(this._battlerSprite);
};

// BATTLER PARAM

Window_BattleOverview_ShowInfo.prototype.drawBattlerGauges = function(){

  if (this._battler.isEnemy()){
    var obj = this._battler.enemy();
  } else if (this._battler.isActor()){
    var obj = this._battler.currentClass();
  }

  if (Lay.Param.BattlerHPgaugeShow){

    var hpGaugeX = eval(Lay.Param.BattlerHPgaugeX);
    var hpGaugeY = eval(Lay.Param.BattlerHPgaugeY);
    var hpGaugeWd = eval(Lay.Param.BattlerHPgaugeWidth);
    if (obj.bov.HpGaugeX) hpGaugeX = eval(obj.bov.HpGaugeX);
    if (obj.bov.HpGaugeY) hpGaugeY = eval(obj.bov.HpGaugeY);
    if (obj.bov.HpGaugeWd) hpGaugeWd = eval(obj.bov.HpGaugeWd);

    switch (obj.bov.HpGauge){
    case 'hide' :
      break;
    case 'unk' :
      this.drawUnkGauge(TextManager.hpA,hpGaugeX,hpGaugeY,hpGaugeWd);
      break;
    default : this.drawActorHp(this._battler,hpGaugeX,hpGaugeY,hpGaugeWd);
    };
  };

  if (Lay.Param.BattlerMPgaugeShow){

    var mpGaugeX = eval(Lay.Param.BattlerMPgaugeX);
    var mpGaugeY = eval(Lay.Param.BattlerMPgaugeY);
    var mpGaugeWd = eval(Lay.Param.BattlerMPgaugeWidth);
    if (obj.bov.MpGaugeX) mpGaugeX = eval(obj.bov.MpGaugeX);
    if (obj.bov.MpGaugeY) mpGaugeY = eval(obj.bov.MpGaugeY);
    if (obj.bov.MpGaugeWd) mpGaugeWd = eval(obj.bov.MpGaugeWd);

    switch (obj.bov.MpGauge){
    case 'hide' :
      break;
    case 'unk' :
      this.drawUnkGauge(TextManager.mpA,mpGaugeX,mpGaugeY,mpGaugeWd);
      break;
    default : this.drawActorMp(this._battler,mpGaugeX,mpGaugeY,mpGaugeWd);
    };
  };


  if (Lay.Param.BattlerTPgaugeShow){

    var tpGaugeX = eval(Lay.Param.BattlerTPgaugeX);
    var tpGaugeY = eval(Lay.Param.BattlerTPgaugeY);
    var tpGaugeWd = eval(Lay.Param.BattlerTPgaugeWidth);
    if (obj.bov.TpGaugeX) tpGaugeX = eval(obj.bov.TpGaugeX);
    if (obj.bov.MpGaugeY) tpGaugeY = eval(obj.bov.TpGaugeY);
    if (obj.bov.MpGaugeWd) tpGaugeWd = eval(obj.bov.TpGaugeWd);

    switch (obj.bov.TpGauge){
    case 'hide' :
      break;
    case 'unk' :
      this.drawUnkGauge(TextManager.tpA,tpGaugeX,tpGaugeY,tpGaugeWd);
      break;
    default : this.drawActorTp(this._battler,tpGaugeX,tpGaugeY,tpGaugeWd);
    };
  };
};

Window_BattleOverview_ShowInfo.prototype.drawUnkGauge = function(txt,x,y,wd){

  var unkGaugeColor1 = Lay.Param.BattlerUnkGaugeColor[0];
  var unkGaugeColor2 = Lay.Param.BattlerUnkGaugeColor[Lay.Param.BattlerUnkGaugeColor.length-1];
  var text1 = Lay.Param.BattlerUnkGaugeTxt[0];
  var text2 = Lay.Param.BattlerUnkGaugeTxt[Lay.Param.BattlerUnkGaugeTxt.length-1];
  this.drawGauge(x, y, wd, 1, unkGaugeColor1, unkGaugeColor2);
  this.changeTextColor(this.systemColor());
  this.drawText(txt, x, y, 44);
  this.drawCurrentAndMax(text1, text2, x, y, wd,
                       this.normalColor(), this.normalColor());

};

Window_BattleOverview_ShowInfo.prototype.drawParamPieDiagram = function(){

  if (this._battler.isEnemy()){
    var obj = this._battler.enemy();
  } else if (this._battler.isActor()){
    var obj = this._battler.currentClass();
  };


  if (obj.bov.param === "hide") return;
  // SETUP VARIABLES
    // global
  var x = eval(Lay.Param.ParamX);
  var y = eval(Lay.Param.ParamY);
  var radius = eval(Lay.Param.ParamRadius);
  var phase = Lay.Param.PiePhase;

    // pies
      // usefull variable for eval
  var battler = this._battler
  var atk = battler.param(2);
  var def = battler.param(3);
  var mat = battler.param(4);
  var mdf = battler.param(5);
  var agi = battler.param(6);
  var luk = battler.param(7);

  var param2Draw = [];
  for (var i=0; i<Lay.Param.BattlerParam.length; i++) param2Draw.push( eval( Lay.Param.BattlerParam[i] ) );
  var numberOfParam = param2Draw.length;
  var pieFillColors = Lay.Param.ParamPieColor;
  var paramTxt = Lay.Param.ParamPieLegend;
  var pieSizeRatio = Lay.Param.PieRatio;

  var paramAngle = 2 * Math.PI / numberOfParam
  var pieAngle = paramAngle * pieSizeRatio;
  var maxAmplitude = Lay.Param.MaxAmplitude;
  var minAmplitude = "0";               // COULD BE CUSTOM
  var pieOpacity = Lay.Param.PieOpacity;
  var pieLwd = Lay.Param.PieBdWidth;
  var pieBdColor = Lay.Param.PieBdColor;
  for (var i=0; i<numberOfParam; i++){
    if (!pieBdColor[i]) pieBdColor[i] = pieBdColor[0];
  };

  var txtXBuffer = -20;
  var txtYBuffer = -20;
  var txtRadiusBuffer = 20;
  var txtBuffUpColor = Lay.Param.BuffColorUp;       // TODO
  var txtBuffDownColor = Lay.Param.BuffColorDown;   // TODO
  var txtBuffNoneColor = "#ffffff";                 // TODO
    // circles
  var numberOfCircles = Lay.Param.NumberOfConcentricCircles;
  var circlesColor = Lay.Param.ColorOfConcentricCircles;
  var circlesLwd = 1;
    // lines
  var linesColor = '#ffffff';
  var linesLwd = 1;


  // DrawCircles
  this.drawConcentricCircles(x,y,radius,numberOfCircles,circlesColor,circlesLwd);
  // DrawLines
  this.drawRegularPolygonIntersect(numberOfParam,x,y,radius,phase,linesColor,linesLwd)


  // Usefull variable for Eval
  var paramSum = this.ComputeParamSum(param2Draw);
  var paramMean = this.ComputeParamMean(param2Draw);
  var paramMax = this.ComputeParamMax(param2Draw);
  var paramMin = this.ComputeParamMin(param2Draw);
  var minAmplitude = eval(minAmplitude);
  var maxAmplitude = eval(maxAmplitude);

  if (obj.bov.param === "unk"){
    paramTxt = Array(paramTxt.length).fill("???");
    param2Draw = Array(param2Draw.length).fill(maxAmplitude);
  };

  var startAngle = phase - pieAngle/2;
  var endAngle = phase + pieAngle/2
  for (var i=0; i<numberOfParam; i++){

    var paramValue = param2Draw[i];

    var text = paramTxt[i];

    paramValue = Math.min(paramValue,maxAmplitude);
    paramValue = Math.max(paramValue,minAmplitude);

    var amplitude = radius * (paramValue - minAmplitude) / (maxAmplitude - minAmplitude);

    if (obj.bov.param != "no pie") {
      this.contents.fillPie(x,                // X coord
                            y,                // Y coord
                            amplitude,        // the pie radius
                            startAngle,       // the angle to start draw
                            endAngle,         // the angle to end draw
                            pieFillColors[i], // the color to fill the pie
                            pieBdColor[i],    // the border color
                            pieOpacity,       // the pie opacity
                            pieLwd);          // the line width
    };
    var txtRadius = radius + txtRadiusBuffer;
    var txtX = x + txtRadius * Math.cos( startAngle + pieAngle/2 );
    var txtY = y + txtRadius * Math.sin( startAngle + pieAngle/2 );
    txtX += txtXBuffer;
    txtY += txtYBuffer;

    this.changeTextColor("#ffffff")
    this.drawText(text,txtX,txtY);
    this.resetTextColor();

    startAngle += paramAngle;
    endAngle += paramAngle;

  };
};

Window_BattleOverview_ShowInfo.prototype.ComputeParamMin = function(parameters){
  var min = 999999999;
  for (var i=0; i<parameters.length; i++) max = Math.min( parameters[i] ,min);
  return min;
};

Window_BattleOverview_ShowInfo.prototype.ComputeParamMax = function(parameters){
  var max = 0;
  for (var i=0; i<parameters.length; i++) max = Math.max(parameters[i],max);
  return max;
};

Window_BattleOverview_ShowInfo.prototype.ComputeParamSum = function(parameters){
  var sum = 0;
  for (var i=0; i<parameters.length; i++) sum += parameters[i];
  return sum;
};

Window_BattleOverview_ShowInfo.prototype.ComputeParamMean = function(parameters){
  var mean = 0;
  for (var i=0; i<parameters.length; i++){
    mean += parameters[i];
  };
  mean = mean/parameters.length;
  return mean;
};

// BATTLER RESIST

Window_BattleOverview_ShowInfo.prototype.drawBattlerResist_cursorVertiMode_YEP  = function(){

  x = eval(Lay.Param.ElementDiagramX);
  y = eval(Lay.Param.ElementDiagramY);
  var width = eval(Lay.Param.ElementDiagramWidth);
  var height = eval(Lay.Param.ElementDiagramHeight);

  var colorList = Lay.Param.GradientColors;
  var IntervalColorRatio = Lay.Param.GradientIntervalsRatio;

  var maxResValue = Lay.Param.MaxElementRate;
  var minResValue = Lay.Param.MinElementRate;

  var legendNames = Lay.Param.LegendNames;
  var IntervalLegendRatio = Lay.Param.LegendRatio;

  var elemIcons = Lay.Param.ElemIcons;
  if (this._battler.isEnemy()){
    var enemyIndex = this._battler.enemyId();
    elemIcons = $gameParty._DiscoveredEnemiesWeakness[enemyIndex];
  };
  var drawIconCdt = Lay.Param.DrawElemIconCdt;
  var opacity = Lay.Param.GradientOpacity;
  var borderWd = Lay.Param.GradientBorderWidth;
  var borderColor = Lay.Param.GradientBorderColor;

  var legendFontSize = Lay.Param.ElemLegFontSize;

  // draw Borders
  this.drawEmptyPolygon([x,x+width,x+width,x],[y,y,y+height,y+height],borderColor,borderWd);

  // draw Gradients
  var dy = y;
  var dh = 0;
  for (var i=0; i<colorList.length-1; i++){
    var dx = x;
    dy += dh
    dh = height * (IntervalColorRatio[i+1]-IntervalColorRatio[i])
    dh = Math.floor(dh);
    var dw = width;
    this.contents.gradientFillRectOpac(dx,dy,dw,dh,colorList[i],colorList[i+1],true,opacity);
  };

  // Draw Legends
  this.contents.fontSize = legendFontSize;
  for (var i = 0; i<legendNames.length; i++){
    var txt = legendNames[i];
    var dy = y + height * this.ElemRateScalScript(IntervalLegendRatio[i],minResValue,maxResValue) - legendFontSize;
    var dw = this.textWidth(txt);
    var dx = x + width * 0.7 - dw;
    this.drawText(txt,dx,dy,dw,"right");
  };
  this.resetFontSettings();

  // Draw Icons
  var busy = [];
  for (var i=0; i<elemIcons.length; i++){
    var icon = elemIcons[i];
    var resi = this._battler.elementRate(i);

    resi = Math.max(resi, minResValue);
    resi = Math.min(resi, maxResValue);
    if ( !icon || icon === 0) continue;
    if ( !eval(drawIconCdt) ) continue;

    var dx = x + width;
    var dy = y - Window_Base._iconHeight/2 + height * this.ElemRateScalScript(resi,minResValue,maxResValue);

    dx = this.AdjustIconX(dx,dy,busy)

    this.drawIcon(icon,dx,dy);
    busy.push([dx,dy]);
  };
};

Window_BattleOverview_ShowInfo.prototype.AdjustIconX = function(x,y,coordList){
  if (coordList.length === 0) return x;
  var adjusting = true;

  var thresholdSquared = Math.pow( Window_Base._iconWidth - Lay.Param.IconOverlap , 2);
  var resolution = Window_Base._iconWidth - Lay.Param.IconOverlap;

  while (adjusting){
    adjusting = false;
    for (var i=0; i<coordList.length; i++) {
      busy_x = coordList[i][0];
      busy_y = coordList[i][1];
      msd_x = Math.pow(busy_x-x,2);
      msd_y = Math.pow(busy_y-y,2);
      if (msd_x < thresholdSquared && msd_y < thresholdSquared){
        x += resolution;
        adjusting = true;
      };
    };
  };
  return x;
};

Window_BattleOverview_ShowInfo.prototype.ElemRateScalScript = function(value,min,max){
  if (Lay.Param.ElemScalScript === 'linear' || Lay.Param.ElemScalScript === '') {
    return (value - min)/(max-min);
  }
  eval(Lay.Param.ElemScalScript);
  return value;
};

// STATES

Window_BattleOverview_ShowInfo.prototype.drawStateArea = function() {

  var dx = eval(Lay.Param.StateAreaX);
  var dy = eval(Lay.Param.StateAreaY);
  var dw = eval(Lay.Param.StateAreaWidth);
  var dh = eval(Lay.Param.StateAreaHeight);

  this.drawDarkRect(dx,dy,dw,dh);
  dx += 20;
  dy += 10;
  this.changeTextColor(this.systemColor());
  this.drawText(Lay.Param.StateAreaHeader,dx,dy)

};

Window_BattleOverview_ShowInfo.prototype.drawStateDescription = function(){
    var dx = eval(Lay.Param.StateDescriptionX );      // this.standardPadding();
    var dy = eval(Lay.Param.StateDescriptionY );      // Graphics.boxHeight - 294;
    var dw = eval(Lay.Param.StateDescriptionWidth);   // (Graphics.boxWidth - dx*2);
    var dh = eval(Lay.Param.StateDescriptionHeight);  // Graphics.boxHeight - dy;
    this.drawDarkRect(dx,dy,dw,dh);
    this.resetTextColor();
    dx = 25;
    this.changeTextColor(this.systemColor());
    this.drawText(Lay.Param.StateDescHeader,dx,dy);
    dy += 35
    this.resetTextColor();
    this.drawTextEx(this._stateDescription,dx,dy);
    this.resetTextColor();
    this.resetFontSettings();

};
