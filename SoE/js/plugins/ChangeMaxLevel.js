//=============================================================================
// ChangeMaxLevel.js
//=============================================================================
//
//Copyright (c) 2015 Alec
//This software is released under the MIT License.
//http://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc Change maximum level
 * @author Alec
 *
 * @param newMaxLevel
 * @desc Set max level
 * @default 99
 */
/*:ja
 * @plugindesc 最大レベルを変更します
 * @author Alec
 *
 * @param newMaxLevel
 * @desc 最大レベル
 * @default 99
 */


(function() {
	Game_Actor.prototype.maxLevel = function() {
		var parameters = PluginManager.parameters('ChangeMaxLevel');
		var newMaxLevel  = Number(parameters['newMaxLevel'] || 0);
		console.log(parameters);
		console.log(newMaxLevel);
		return newMaxLevel;
	};

	Game_Actor.prototype.paramBase = function(paramId) {
		if (this._level < this.currentClass().params[paramId].length) {
		   	return this.currentClass().params[paramId][this._level];
		}
		else {
			var maxLevel = this.currentClass().params[paramId].length - 1;
			var sub = this.currentClass().params[paramId][maxLevel] - this.currentClass().params[paramId][0];
		   	return this.currentClass().params[paramId][maxLevel] + sub / maxLevel * (this._level - maxLevel);
		}
 	};

})();