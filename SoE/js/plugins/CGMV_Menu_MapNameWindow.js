/*:
 * @plugindesc CGMV Plugin modifying the Menu gold window
 * @author Casper Gaming
 * @help
 * ==============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ==============================================================================
 * Become a Patron to get access to a demo for this plugin as well as beta plugins
 * https://www.patreon.com/CasperGamingRPGM
 * ==============================================================================
 * Version: 1.0
 * ------------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMV plugins.
 * Made for RPG Maker MV 1.6.0
 * ------------------------------------------------------------------------------
 * Description: This plugin replaces the menu scene's gold
 * window with a window that displays more information.
 * ------------------------------------------------------------------------------
 * Documentation:
 * It displays gold (if show gold option is set to true)
 * it displays playtime (if show playtime option is set to true)
 * It displays map name (if show map name option is set to true)
 *
 * To name a map, place the following in the map's note box:
 * <cgmvname:name_of_map_here>
 * 
 * @param Show Gold
 * @type boolean
 * @desc Show currency in the map name window?
 * @default true
 *
 * @param Show Playtime
 * @type boolean
 * @desc Show playtime in the map name window?
 * @default true
 *
 * @param Show Map Name
 * @type boolean
 * @desc Show map name in the map name window?
 * @default true
*/
var Imported = Imported || {};
Imported.CGMV_Menu_MapNameWindow = true;
var CGMV = CGMV || {};
CGMV.Menu_MapNameWindow = CGMV.Menu_MapNameWindow || {};
CGMV.Menu_MapNameWindow.version = 1.0;
CGMV.Menu_MapNameWindow.parameters = PluginManager.parameters('CGMV_Menu_MapNameWindow');
CGMV.Menu_MapNameWindow.ShowGold = (CGMV.Menu_MapNameWindow.parameters["Show Gold"] === "true") ? true : false;
CGMV.Menu_MapNameWindow.ShowPlaytime = (CGMV.Menu_MapNameWindow.parameters["Show Playtime"] === "true") ? true : false;
CGMV.Menu_MapNameWindow.ShowMapName = (CGMV.Menu_MapNameWindow.parameters["Show Map Name"] === "true") ? true : false;
//=============================================================================
// Scene_Menu
//-----------------------------------------------------------------------------
// Replace Gold Window with new MapNameWindow
// Overwrite functions: createGoldWindow
//=============================================================================
//-----------------------------------------------------------------------------
// Use CGMV_Window_MenuMapName instead of Window_Gold
//-----------------------------------------------------------------------------
Scene_Menu.prototype.createGoldWindow = function() {
	this._goldWindow = new CGMV_Window_MenuMapName(0, 0);
    this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
    this.addWindow(this._goldWindow);
};
//=============================================================================
// CGMV Window MenuMapName
//-----------------------------------------------------------------------------
// Window which displays gold (optional), playtime (optional), map name (optional)
//=============================================================================
function CGMV_Window_MenuMapName() {
    this.initialize.apply(this, arguments);
}
CGMV_Window_MenuMapName.prototype = Object.create(Window_Base.prototype);
CGMV_Window_MenuMapName.prototype.constructor = CGMV_Window_MenuMapName;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMV_Window_MenuMapName.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};
//-----------------------------------------------------------------------------
// Width of window
//-----------------------------------------------------------------------------
CGMV_Window_MenuMapName.prototype.windowWidth = function() {
    return 240;
};
//-----------------------------------------------------------------------------
// Height of window
//-----------------------------------------------------------------------------
CGMV_Window_MenuMapName.prototype.windowHeight = function() {
	var numLines = 0;
	if(CGMV.Menu_MapNameWindow.ShowGold) {
		numLines++;
	}
	if(CGMV.Menu_MapNameWindow.ShowPlaytime) {
		numLines++;
	}
	if(CGMV.Menu_MapNameWindow.ShowMapName) {
		numLines++;
	}
    return this.fittingHeight(numLines);
};
//-----------------------------------------------------------------------------
// Additional update for playtime
//-----------------------------------------------------------------------------
CGMV_Window_MenuMapName.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if(CGMV.Menu_MapNameWindow.ShowPlaytime) {
		this.refresh();
    }
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMV_Window_MenuMapName.prototype.refresh = function() {
	var numLines = 0;
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
	if(CGMV.Menu_MapNameWindow.ShowGold) {
		this.drawCurrencyValue(this.value(), this.currencyUnit(), x, numLines, width);
		this.changeTextColor(this.normalColor());
		numLines++;
	}
	if(CGMV.Menu_MapNameWindow.ShowMapName) {
		this.drawMapName(x, this.lineHeight()*numLines, width);
		numLines++;
	}
	if(CGMV.Menu_MapNameWindow.ShowPlaytime) {
		this.drawPlaytime(x, this.lineHeight()*numLines, width);
	}
};
//-----------------------------------------------------------------------------
// Draw playtime text
//-----------------------------------------------------------------------------
CGMV_Window_MenuMapName.prototype.drawPlaytime = function(x, y, width) {
	this.drawText("Playtime: " + $gameSystem.playtimeText(), x, y, width, 'right');
};
//-----------------------------------------------------------------------------
// Draw mapname text
//-----------------------------------------------------------------------------
CGMV_Window_MenuMapName.prototype.drawMapName = function(x, y, width) {
	this.drawText($gameMap.CGMVgetMapName(), x, y, width-x, 'right');
};
//-----------------------------------------------------------------------------
// Current gold
//-----------------------------------------------------------------------------
CGMV_Window_MenuMapName.prototype.value = function() {
    return $gameParty.gold();
};
//-----------------------------------------------------------------------------
// Currency unit
//-----------------------------------------------------------------------------
CGMV_Window_MenuMapName.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};