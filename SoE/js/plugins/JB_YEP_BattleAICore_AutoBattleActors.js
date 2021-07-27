//=============================================================================
// By Jorge Blanco (extending YEP_BattleAICore v1.07 by Yanfly Engine Plugins)
// Version 1.00
//=============================================================================
/*:  
 * @plugindesc v1.00 Extension for YEP_BattleAICore to support AI on Actors
 * with the Auto-Battle special flag.
 * @author Jorge Blanco (extending YEP_BattleAICore by Yanfly)
 * 
 * @help
 * Plug and Play. Place below YEP_BattleAICore.
 * Refer to the original doc of YEP_BattleAICore v1.07 and use the same notes on
 * the (Auto-Battle enabled) Actor's notes field.
 */

var JB = JB || {};
JB.CoreAIAutoBattleActors = JB.CoreAIAutoBattleActors || {};

//=============================================================================
// DataManager
//=============================================================================

JB.CoreAIAutoBattleActors.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!JB.CoreAIAutoBattleActors.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!JB._loaded_YEP_BattleAICoreAutoBattleActors) {
    this.processCoreAINotetags1($dataActors);
    JB._loaded_YEP_BattleAICoreAutoBattleActors = true;
  }
	return true;
};

//=============================================================================
// BattleManager
//=============================================================================
JB.CoreAIAutoBattleActors.BattleManager_updateAIPatterns =
      BattleManager.updateAIPatterns;
BattleManager.updateAIPatterns = function() {
    $gameParty.updateAIPatterns();
	return JB.CoreAIAutoBattleActors.BattleManager_updateAIPatterns(this);
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.updateAIPatterns = function() {
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (member && member.isAlive() && member.isAutoBattle()) member.setAIPattern();
    }
};

//=============================================================================
// Game_Actor
//=============================================================================
Game_Actor.prototype.hasSkill = function(skillId) {
	var skills = AIManager.getPatternSkills(this._skills, this.actor().aiPattern);
    return skills.contains($dataSkills[skillId]);
};

JB.CoreAIAutoBattleActors.Game_Actor_makeAutoBattleActions = Game_Actor.prototype.makeAutoBattleActions;
Game_Actor.prototype.makeAutoBattleActions = function() {
    if (this.actor().aiPattern.length > 0) {
      this.setAIPattern();
      this.setActionState('waiting');
    } else {
      JB.CoreAIAutoBattleActors.Game_Actor_makeAutoBattleActions.call(this);
    }
};

Game_Actor.prototype.setAIPattern = function() {
    Game_Battler.prototype.setAIPattern.call(this);
    if (this.numActions() <= 0) return;
    AIManager.setBattler(this);
    for (var i = 0; i < this.actor().aiPattern.length; ++i) {
	  var random = Math.random();
      if ((random > this.aiLevel()) && (i != this.actor().aiPattern.length - 1)) continue;
      var line = this.actor().aiPattern[i];
      if (AIManager.isDecidedActionAI(line)) return;
    }
    JB.CoreAIAutoBattleActors.Game_Actor_makeAutoBattleActions.call(this);
};

Game_Actor.prototype.aiLevel = function() {
    return this.actor().aiLevel;
};