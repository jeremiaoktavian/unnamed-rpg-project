/*:
-------------------------------------------------------------------------------
@title Custom Weapon Animations
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Jan 15, 2016
@filename HIME_CustomWeaponAnimations.js
@url 

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.0 - Allows you to define custom weapon animation data for each
weapon.
@help 
-------------------------------------------------------------------------------
== Description ==

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Jan 15, 2016
 - initial release

== Usage ==

To create custom weapon animation data, note-tag your weapons with

  <weapon animation data>
    id: IMAGE_ID
  </weapon animation data>
  
The IMAGE_ID will require some math at this point, but basically each weapon
sheet supports 12 images, with 6 rows and 2 columns each.

So for example, if you go to your img/system folder, you'll see images with
the following naming pattern. The number represents the page number.

  Weapons1 - images 1 to 12
  Weapons2 - images 13 to 24
  Weapons3 - images 25 to 36
  
You will also notice that Weapons3 is half the size of the other sheets. This
is why the editor only supports 6 custom images. You can change the size of
this sheet if you want.

You can also create your own sheets. For now, just make sure they follow the
same naming scheme:

  Weapons4 - images 37 to 48
  Weapons5 - images 49 to 60
  
And so on. The order of the ID's are top to bottom, left to right. So like
this

   1       7        13 
   2       8        14 
   3       9        15
   4       10       16
   5       11       17
   6       12       18
   
A fast way to do the math is to just take your page number and multiply by 12,
then add 1 to 12 depending on the position.

So for example, if your image is in the second position on page 6, then the
ID is equal to 6 x 12 + 2 = 74.
 

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_CustomWeaponAnimations = 1;
TH.CustomWeaponAnimations = TH.CustomWeaponAnimations || {};

(function ($) {

  $.Regex = /<weapon[-_ ]animation[-_ ]data>([\s\S]*?)<\/weapon[-_ ]animation[-_ ]data>/im
  
  $.hasCustomWeaponAnimations = function(object) {
    if (object.CustomWeaponAnimations === undefined) {
      $.loadNotetag(object);
    };
    return object.CustomWeaponAnimations.hasImage;
  };
  
  $.loadNotetag = function(object) {
    object.CustomWeaponAnimations = {hasImage: false};
    var res = $.Regex.exec(object.note);
    if (res) {
      var data = eval('({' + res[1] + '})');
      object.CustomWeaponAnimations = data;
      object.CustomWeaponAnimations.hasImage = true;
    }
  };
  
  /* Returns the weapon animation data, if any */
  $.CustomWeaponAnimations = function(object) {
    if (object.CustomWeaponAnimations === undefined) {
      $.loadNotetag(object);
    };
    return object.CustomWeaponAnimations;
  };
  
  var TH_GameActor_performAttack = Game_Actor.prototype.performAttack;
  Game_Actor.prototype.performAttack = function() {
    TH_GameActor_performAttack.call(this);
    var weapons = this.weapons();
    
    /* Overwrite previously set weapon image ID. */
    if (weapons[0] && $.hasCustomWeaponAnimations(weapons[0])) {
      var data = $.CustomWeaponAnimations(weapons[0]);
      this.startWeaponAnimation(data.id);
    }
  };
})(TH.CustomWeaponAnimations);