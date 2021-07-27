// MenuLocation.js
 
/*:
 * @plugindesc Provides a location window for your menu. Works with Yanfly Engine Plugins.
 * @author JGreene
 *
 * @help Place this plugin below all of Yanfly's Plugins in your load order.
 *
 * Version: 1.2
 *
 * Changelog:
 *
 * Aug 10, 2018 - Added text code functionality for all map windows. Optional new
 * gradient style (see plugin JS file for info).
 */
 
(function() {
 
    var _Scene_Menu_new = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_new.call(this);
        this._statusWindow.x = this._commandWindow.width;
        this._statusWindow.y = 0;
        this.createLocationWindow();
        this._goldWindow.x = 0;
        this._goldWindow.width = this._commandWindow.width;
        this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
    };
   
 // Location window
   
    Scene_Menu.prototype.createLocationWindow = function() {
    this._locationWindow = new Window_Location(0, 0);
    this._locationWindow.width = this._commandWindow.width;
    this._locationWindow.x = 0;
    this._locationWindow.y = Graphics.boxHeight - (this._locationWindow.height*2);
    this.addWindow(this._locationWindow);
    };
   
    function Window_Location() {
        this.initialize.apply(this, arguments);
    }
   
    Window_Location.prototype = Object.create(Window_Base.prototype);
    Window_Location.prototype.constructor = Window_Location;
   
    Window_Location.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };
   
    Window_Location.prototype.windowWidth = function() {
        return 240;
    };
   
    Window_Location.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };
   
    Window_Location.prototype.refresh = function() {
        var x = this.textPadding();
        var width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        this.drawTextEx(this.value(), x, 0, width);
    };
   
    Window_Location.prototype.value = function() {
        if ($gameMap.displayName())
            return $gameMap.displayName();
        else
            return '???';
    };
   
   
    Window_Location.prototype.open = function() {
        this.refresh();
        Window_Base.prototype.open.call(this);
    };
   
Window_MapName.prototype.refresh = function() {
    this.contents.clear();
    if ($gameMap.displayName()) {
        var width = this.contentsWidth();
        this.drawBackground(0, 0, width, this.lineHeight());
        this.drawTextEx($gameMap.displayName(), 0, 0, width, 'center');
    }
};
// Uncomment lines 92-96 if you want a different gradient. It goes left to right, lining up with the new text format.
 
/*  Window_MapName.prototype.drawBackground = function(x, y, width, height) {
    var color1 = this.dimColor1();
    var color2 = this.dimColor2();
    this.contents.gradientFillRect(x, y, width, height, color1, color2);
}; */
 
})();