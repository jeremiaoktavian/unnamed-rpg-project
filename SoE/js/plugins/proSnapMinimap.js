/** /*:
 * @author William Ramsey
 * @plugindesc Minimap
 * 
 * @param General
 * 
 * @param Background
 * @default rgba(50,120,120,1)
 * @parent General
 * 
 * @param PlayerColor
 * @default rgba(255,240,200,1)
 * @parent General
 * 
 * @param EventColor
 * @default rgba(255,255,255,1)
 * @parent General
 * @desc Color for events that draw but don't have a defined color.
 * 
 * @param Outline Color
 * @default rgba(0,0,0,1)
 * @parent General
 * 
 * @param Fog of War Blur
 * @default 8
 * @parent General
 * @desc Amount of blur applied to fog of war.
 * @type Number
 * 
 * @param Disable Outline
 * @default false
 * @type Boolean
 * @parent General
 * 
 * @param Show Compas
 * @default false
 * @type Boolean
 * @desc Displays N,S,W,E on the map
 * @parent General
 * 
 * @param Location
 * @default TOPLEFT
 * @type Text
 * @parent General
 * @desc TOPRIGHT, TOPLEFT, BOTTOMRIGHT, BOTTOMLEFT
 * 
 * @param Impassable Color
 * @default rgba(20,35,120,1)
 * @parent General
 * 
 * @param Enable Automatic Drawing
 * @default true
 * @type boolean
 * @parent General
 * 
 * @param Enable Region Drawing
 * @default true
 * @type boolean
 * @parent General
 * 
 * @param Use Terrain Tag
 * @default true
 * @desc Uses terrain tags instead of Regions
 * @type boolean
 * @parent General
 * 
 * @param Region Colors
 * 
 * @param Region1
 * @default rgba(0,0,0,1)
 * @parent Region Colors
 * 
 * @param Region2
 * @default rgba(50,120,120,1)
 * @parent Region Colors
 * 
 * @param Region3
 * @default rgba(100,150,150,1)
 * @parent Region Colors
 * 
 * @param Region4
 * @default rgba(150,200,200,1)
 * @parent Region Colors
 * 
 * @param Region5
 * @default rgba(200,220,220,1)
 * @parent Region Colors
 * 
 * @param Icons
 * 
 * @param Item Shop
 * @default 176
 * @type Number
 * @parent Icons
 * 
 * @param Weapon Shop
 * @default 97
 * @type Number
 * @parent Icons
 * 
 * @param Armor Shop
 * @default 137
 * @type Number
 * @parent Icons
 * 
 * @param Magic Shop
 * @default 189
 * @type Number
 * @parent Icons
 * 
 * @param Inn
 * @default 8
 * @type Number
 * @parent Icons
 * 
 * @param Bar
 * @default 4
 * @type Number
 * @parent Icons
 * 
 * @param Church
 * @default 221
 * @type Number
 * @parent Icons
 * 
 * @param Dungeon
 * @default 5
 * @type Number
 * @parent Icons
 * 
 * @param Bank
 * @default 314
 * @type Number
 * @parent Icons
 *  
 * @help
 * 
 * Thank you for downloading the proSnap Minimap Plugin!
 * 
 * --[DRAWING YOUR MINIMAP]--
 * You can use regions, as displayed from the options
 * on the right, but if you're using a plugin that already
 * takes advantage of regions, you can use Terrain Tags instead.
 * 
 * Terrain Tags can be set inside your Database -> Tileset section.
 * Tags 1-5 will define the colors drawn on the minimap
 * according to the colors you set in the colors section
 * of the parameter settings on the right.
 * 
 * Region1 = Terrain Tag 1, for example.
 * 
 * Alternatively you can allow it to auto-draw the map by placing blocks
 * where you can't move.
 * 
 * --[PLUGIN COMMANDS]--:
 * Trigger the switch that hides the map using
 * 
 *   snapMap hide
 * 
 * Re show it with
 * 
 *  snapMap show
 * 
 * Create a beacon:
 * 
 *  mapBeacon set event_id r, g, b
 *     (r g and b values range from 0-255)
 *     example: mapBeacon set 14 255,50,0
 * 
 * Remove a beacon:
 * 
 *  mapBeacon remove event_id
 * 
 * --[EVENT TAGS]--
 * 
 * Events have 3 tags.
 * <showup>
 * <mmIcon:#>
 * <mmcolor:#ff2200>
 * 
 * The <showup> command will allow the event to display as a tiny
 * dot on the minimap.
 * 
 * <mmIcon:#> draws an icon above the events head on the
 * minimap. # is a number, don't actually use the #
 * symbol since it wont work.
 * 
 * <mmcolor:#ff2200> sets the color of the dot
 * used to represent where the event is.
 * 
 * --[MAP TAGS]--
 * Maps can have tags, too!
 * <fow>
 * <bankIcon:x,y>
 * <weaponIcon:x,y>
 * <armorIcon:x,y2>
 * <itemIcon:x,y>
 * 
 * <barIcon:x,y>
 * <innIcon:x,y>
 * <dungeonIcon:x,y>
 * <magicIcon:x,y>
 * 
 * 
 * <fow> creates a fog-of-war effect for the minimap.
 * <[x]Icon:x,y> (where [x] is one of the above listed)
 * 
 * You can get the x/y coords by clicking on the "Event" layer,
 * selecting an area then looking at the bottom-right corner of the
 * editor. You'll see 2 numbers (e.g 2,4). Those are the locations
 * you want to use.
 */

(() => {
    const params = PluginManager.parameters('proSnapMinimap');


    const pCommands = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        pCommands.call(this, command, args);

        if (command === 'snapMap') {
            let action = args[0];
            switch (action) {
                case 'show':
                    $gameVariables.snapMapShow = true;
                    break;
                case 'hide':
                    $gameVariables.snapMapShow = false;
                    break;
            }
        }
        if (command == 'mapBeacon') {
            let action = args[0];
            let val = (args[1]);
            let _cstr = '';
            for (let i = 2; i < args.length; i++) {
                _cstr += args[i];
            }
            let color = _cstr || `255,150,50`

            switch (action) {
                case 'set':
                    SceneManager._scene.mapBeacons[String(val)] = {
                        x: $dataMap.events[val].x,
                        y: $dataMap.events[val].y,
                        evt: $dataMap.events[val],
                        color,
                        blinker: 0,
                        msg: '!'
                    };

                    $gameVariables.snapMapBeacons[$gameMap._mapId] = SceneManager._scene.mapBeacons;
                    break;
                case 'remove':
                    SceneManager._scene.mapBeacons[String(val)] = false;
                    $gameVariables.snapMapBeacons[$gameMap._mapId] = SceneManager._scene.mapBeacons;
                    break;
            }
        }
    };


    const sms = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        sms.apply(this, arguments);
        //Create minimap bitmap and overlay

        this._ICONS = {
            shop: null,
            bank: null,
            weapons: null,
            armor: null,
            inn: null,
            bar: null,
            church: null,
            dungeon: null,
            magic: null
        };

        if (!$gameVariables.snapMapShow) { $gameVariables.snapMapShow = $dataMap.meta.mapShow || true; }

        let xPdata
        if ($dataMap.meta.shopIcon) {
            xPdata = $dataMap.meta.shopIcon.split(',');
            this._ICONS.shop = { x: xPdata[0], y: xPdata[1], icon: params['Item Shop'] }
        }
        if ($dataMap.meta.bankIcon) {
            xPdata = $dataMap.meta.bankIcon.split(',');
            this._ICONS.bank = { x: xPdata[0], y: xPdata[1], icon: params['Bank'] }
        }

        if ($dataMap.meta.weaponIcon) {
            xPdata = $dataMap.meta.weaponIcon.split(',');
            this._ICONS.weapons = { x: xPdata[0], y: xPdata[1], icon: params['Weapon Shop'] }
        }
        if ($dataMap.meta.armorIcon) {
            xPdata = $dataMap.meta.armorIcon.split(',');
            this._ICONS.armor = { x: xPdata[0], y: xPdata[1], icon: params['Armor Shop'] }
        }

        if ($dataMap.meta.innIcon) {
            xPdata = $dataMap.meta.innIcon.split(',');
            this._ICONS.inn = { x: xPdata[0], y: xPdata[1], icon: params['Inn'] }
        }
        if ($dataMap.meta.barIcon) {
            xPdata = $dataMap.meta.barIcon.split(',');
            this._ICONS.bar = { x: xPdata[0], y: xPdata[1], icon: params['Bar'] }
        }

        if ($dataMap.meta.churchIcon) {
            xPdata = $dataMap.meta.churchIcon.split(',');
            this._ICONS.church = { x: xPdata[0], y: xPdata[1], icon: params['Church'] }
        }
        if ($dataMap.meta.dungeonIcon) {
            xPdata = $dataMap.meta.dungeonIcon.split(',');
            this._ICONS.dungeon = { x: xPdata[0], y: xPdata[1], icon: params['Dungeon'] }
        }
        if ($dataMap.meta.magicIcon) {
            xPdata = $dataMap.meta.magicIcon.split(',');
            this._ICONS.magic = { x: xPdata[0], y: xPdata[1], icon: params['Magic Shop'] }
        }

        this.snapMinimapBitmap = new Bitmap($dataMap.width * 6, $dataMap.height * 6);
        this.snapMinimapOverlay = new Bitmap($dataMap.width * 6, $dataMap.height * 6);
        this.snapMinimapOverlay2 = new Bitmap(24 + $dataMap.width * 6, 24 + $dataMap.height * 6);



        this.snapMinimapBitmap.fillAll(params['Background']);

        //Create shadow array
        if (!$gameVariables.FOG_MAPS) {
            $gameVariables.FOG_MAPS = {};
            $gameVariables.snapMapBeacons = {};
        }

        this.mapBeacons = $gameVariables.snapMapBeacons[$gameMap._mapId] || {};
        if (!$gameVariables.FOG_MAPS[$gameMap._mapId]) {
            $gameVariables.FOG_MAPS[$gameMap._mapId] = {};
            for (let i = 0; i < $dataMap.width; i += 6) {
                for (let j = 0; j < $dataMap.height; j += 6) {
                    $gameVariables.FOG_MAPS[$gameMap._mapId][String(i) + 'x' + String(j)] = false;
                }
            }
        }

        this.snapMinimapFow = new Bitmap($dataMap.width * 6, $dataMap.height * 6);
        this.snapMinimapFow.__canvas.style.filter = `blur(${params['Fog of War Blur']}px)`;
        this.snapMinimapFow.__canvas.style.webkitFilter = `blur(${params['Fog of War Blur']}px)`;
        this.snapMinimapFow.context.filter = `blur(${params['Fog of War Blur']}px)`;
        if ($dataMap.meta.fow) this.snapMinimapFow.fillAll('#000');
        this.snapMinimapFow._DATA = $gameVariables.FOG_MAPS[$gameMap._mapId];

        for (let i = 0; i < $dataMap.width; i += 6) {
            for (let j = 0; j < $dataMap.height; j += 6) {
                let target = $gameVariables.FOG_MAPS[$gameMap._mapId][String(i) + 'x' + String(j)];
                if (target === true) {
                    this.snapMinimapFow.fillRect(i * 6 - 48, j * 6 - 48, 48, 48, '#fff');
                }

            }
        }

        let counter = 0;
        for (let i = 0; i < $dataMap.width; i++) {
            for (let j = 0; j < $dataMap.height; j++) {

                if (params['Enable Automatic Drawing'] === 'true') {

                    if (!$gameMap.checkPassage(i, j, 0x0f)) {
                        if (params['Disable Outline'] !== 'true') {
                            this.snapMinimapBitmap.fillRect(i * 6, 1 + j * 6, 6, 6, params['Outline Color']);
                            this.snapMinimapBitmap.clearRect(i * 6, j * 6, 6, 5);
                        }
                        this.snapMinimapBitmap.fillRect(i * 6, j * 6, 6, 6, params['Impassable Color']);
                    }
                }
                if (params['Enable Region Drawing'] === 'true') {
                    let id = $gameMap.regionId(i, j);

                    if (id > 0 && id <= 5) {
                        if (params['Disable Outline'] !== 'true') {
                            this.snapMinimapBitmap.fillRect(i * 6, 1 + j * 6, 6, 6, params['Outline Color']);
                            this.snapMinimapBitmap.clearRect(i * 6, j * 6, 6, 5);
                        }
                        this.snapMinimapBitmap.fillRect(i * 6, j * 6, 6, 6, params[`Region${id}`]);
                    }
                }

                if (params['Use Terrain Tag'] === 'true') {
                    let id = $gameMap.terrainTag(i, j);

                    if (id > 0 && id <= 5) {
                        if (params['Disable Outline'] !== 'true') {
                            this.snapMinimapBitmap.fillRect(i * 6, 1 + j * 6, 6, 6, params['Outline Color']);
                            this.snapMinimapBitmap.clearRect(i * 6, j * 6, 6, 5);
                        }
                        this.snapMinimapBitmap.fillRect(i * 6, j * 6, 6, 6, params[`Region${id}`]);
                    }
                }
            }
        }
        let widthMax = Math.min($dataMap.width * 6, 128);
        let heightMax = Math.min($dataMap.height * 6, 128)

        this.snapMinimapRender = new TilingSprite(this.snapMinimapBitmap);
        this.snapMinimapAct = new TilingSprite(this.snapMinimapOverlay);
        this.snapMinimapAct2 = new TilingSprite(this.snapMinimapOverlay2);
        this.snapMinimapFowS = new TilingSprite(this.snapMinimapFow);

        this.snapMinimapRender.z = 2;
        this.snapMinimapAct.z = 3;


        let locx = 8;
        let locy = 8;

        switch (params['Location']) {
            /*case 'TOPRIGHT':
                locx = Graphics.boxWidth - widthMax - 8;

                break;*/
            case 'TOPRIGHT':
                locx = 630;
                locy = 350;
                break;
/*
            case 'BOTTOMRIGHT':
                locx = Graphics.boxWidth - widthMax - 8;
                locy = Graphics.boxHeight - heightMax;
                break;*/
            case 'BOTTOMRIGHT':
                locx = 630;
                locy = 350;
                break;
/*
            case 'BOTTOMLEFT':
                locy = Graphics.boxHeight - heightMax;
                break;*/
            case 'BOTTOMLEFT':
                locx = 630;
                locy = 350;
                break;
        }

        this.mapViewToggle = false;

        this.snapMinimapRender.move(locx, locy, widthMax, heightMax);
        this.snapMinimapAct.move(locx, locy, widthMax, heightMax);
        this.snapMinimapAct2.move(locx - 8, locy - 8, 24 + widthMax, 24 + heightMax);
        this.snapMinimapFowS.move(0, 0, widthMax, heightMax);

        this.snapMinimapFowS.blendMode = PIXI.BLEND_MODES.MULTIPLY;

        this._spriteset.addChild(this.snapMinimapRender);
        this.snapMinimapRender.addChild(this.snapMinimapFowS);
        this._spriteset.addChild(this.snapMinimapAct);
        this._spriteset.addChild(this.snapMinimapAct2);

        this.spriteFloatyMM = 0;
        let w;
        if (params['Show Compas'] === 'true') {
            this.snapMinimapOverlay2.fontSize /= 1.5;
            w = this.snapMinimapOverlay2.measureTextWidth('N');
            this.snapMinimapOverlay2.drawText('N', w / 2, -12, 132, 48, 'center');
            w = this.snapMinimapOverlay2.measureTextWidth('S');
            this.snapMinimapOverlay2.drawText('S', w / 2, 0 - Window_Base.prototype.lineHeight() / 2, 132, 48, 'center');
            w = this.snapMinimapOverlay2.measureTextWidth('E');
            this.snapMinimapOverlay2.drawText('E', w, 60 - Window_Base.prototype.lineHeight() / 2, 132, 48, 'right');
            w = this.snapMinimapOverlay2.measureTextWidth('W');
            this.snapMinimapOverlay2.drawText('W', w / 2, 60 - Window_Base.prototype.lineHeight() / 2, 132, 48, 'left');
            this.snapMinimapOverlay2.fontSize *= 1.5;
        }
    }

    const smu = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        smu.apply(this, arguments);
        if (!$gameVariables.snapMapShow) {
            this.snapMinimapBitmap.clear();
            this.snapMinimapOverlay.clear();
            this.snapMinimapOverlay2.clear();
            this.snapMinimapFow.clear();
        } else {
            this.snapMinimapOverlay.clear();
            this.snapMinimapOverlay2.clear();
            if (params['Show Compas'] === 'true') {
                this.snapMinimapOverlay2.fontSize /= 1.5;
                w = this.snapMinimapOverlay2.measureTextWidth('N');
                this.snapMinimapOverlay2.drawText('N', w / 2, -12, 132, 48, 'center');
                w = this.snapMinimapOverlay2.measureTextWidth('S');
                this.snapMinimapOverlay2.drawText('S', w / 2, 128 - Window_Base.prototype.lineHeight() / 2, 132, 48, 'center');
                w = this.snapMinimapOverlay2.measureTextWidth('E');
                this.snapMinimapOverlay2.drawText('E', w, 60 - Window_Base.prototype.lineHeight() / 2, 132, 48, 'right');
                w = this.snapMinimapOverlay2.measureTextWidth('W');
                this.snapMinimapOverlay2.drawText('W', w / 2, 60 - Window_Base.prototype.lineHeight() / 2, 132, 48, 'left');
                this.snapMinimapOverlay2.fontSize *= 1.5;
            }
            let mainActor = $gameActors._data[$gameParty._actors[0]];
            let y = ($gamePlayer._realY * 6 + (Math.sin(this.spriteFloatyMM)));

            for (let i = 1; i < $dataMap.events.length; i++) {
                if ($dataMap.events[i]) {
                    if ($dataMap.events[i].meta.showup) {
                        this.snapMinimapOverlay.drawCircle(3 + $dataMap.events[i].x * 6, 3 + $dataMap.events[i].y * 6, 2, $dataMap.events[i].meta.mmcolor || params['EventColor'])
                        if ($dataMap.events[i].meta.mmIcon) {
                            drawIcon(this.snapMinimapOverlay, Number($dataMap.events[i].meta.mmIcon), 3 + $dataMap.events[i].x * 6, 3 + $dataMap.events[i].y * 6);
                        }
                    }
                }
            }
            drawCharacter(this.snapMinimapOverlay, mainActor._characterName, mainActor._characterIndex, $gamePlayer._realX * 6, y);
            this.spriteFloatyMM += 0.1;
            this.snapMinimapOverlay.drawCircle(3 + $gamePlayer._realX * 6, 4 + $gamePlayer._realY * 6, 2, params['PlayerColor'])
            this.snapMinimapRender.origin.x = Math.min(Math.max(-64 + $gamePlayer._realX * 6, 0), ($dataMap.width * 6) - 128);
            this.snapMinimapRender.origin.y = Math.min(Math.max(-64 + $gamePlayer._realY * 6, 0), ($dataMap.height * 6) - 128);

            this.snapMinimapAct.origin.x = this.snapMinimapRender.origin.x;
            this.snapMinimapAct.origin.y = this.snapMinimapRender.origin.y;

            this.snapMinimapFowS.origin.x = this.snapMinimapRender.origin.x;
            this.snapMinimapFowS.origin.y = this.snapMinimapRender.origin.y;


            let _x = Math.round(($gamePlayer._x + 3) / 6) * 6;
            let _y = Math.round(($gamePlayer._y + 3) / 6) * 6;


            let targ = $gameVariables.FOG_MAPS[$gameMap._mapId][String(_x) + 'x' + String(_y)];
            if ($gameVariables.FOG_MAPS[$gameMap._mapId][String(_x) + 'x' + String(_y)] !== true) {
                this.snapMinimapFow.fillRect(_x * 6 - 48, _y * 6 - 48, 48, 48, '#fff');
                $gameVariables.FOG_MAPS[$gameMap._mapId][String(_x) + 'x' + String(_y)] = true;
            }

            for (let i in this.mapBeacons) {
                if (this.mapBeacons[i]) {
                    let targx = this.mapBeacons[i];
                    this.snapMinimapOverlay.drawCircle(targx.evt.x * 6, targx.evt.y * 6, 2, `rgb(${targx.color}`);

                    targx.blinker++;
                    if (targx.blinker > 60) {
                        targx.blinker = 0;
                    }

                    this.snapMinimapOverlay.fontSize = 8;
                    let _txm = this.snapMinimapOverlay.measureTextWidth(targx.msg);
                    this.snapMinimapOverlay.drawCircle(targx.x * 6, targx.y * 6, 2 + Math.sin(targx.blinker / 45) * 4, `rgba(${targx.color},${0.74-targx.blinker/60})`);
                    this.snapMinimapOverlay.drawText(targx.msg, -_txm / 2 + targx.x * 6, targx.y * 6 - Window_Base.prototype.lineHeight() + _txm / 2 + (Math.cos(this.spriteFloatyMM)), 132, 48, 'left');
                }
            }
            for (let i in this._ICONS) {
                if (this._ICONS[i] !== null) {
                    drawIcon(this.snapMinimapOverlay, Number(this._ICONS[i].icon), Number(this._ICONS[i].x * 6), Number(this._ICONS[i].y * 6));
                }
            }
            //drawIcon(this.snapMinimapOverlay, 8, 0, 0);
        }

        let widthMax = Math.min($dataMap.width * 6, 128);
        let heightMax = Math.min($dataMap.height * 6, 128)
        let locx = 8;
        let locy = 8;
        
        switch (params['Location']) {
            /*case 'TOPRIGHT':
                locx = Graphics.boxWidth - widthMax - 8;

                break;

            case 'BOTTOMRIGHT':
                locx = Graphics.boxWidth - widthMax - 8;
                locy = Graphics.boxHeight - heightMax;
                break;

            case 'BOTTOMLEFT':
                locy = Graphics.boxHeight - heightMax;
                break;*/
            case 'TOPRIGHT':
                locx = 860;
                locy = 170;
                break;

            case 'BOTTOMRIGHT':
                locx = 630;
                locy = 350;
                break;

            case 'BOTTOMLEFT':
                locx = 630;
                locy = 350;
                break;
        }

        switch (this.mapViewToggle) {
            case false:
                this.snapMinimapRender.move(locx, locy, widthMax, heightMax);
                this.snapMinimapAct.move(locx, locy, widthMax, heightMax);
                this.snapMinimapAct2.move(locx - 8, locy - 8, 24 + widthMax, 24 + heightMax);
                this.snapMinimapFowS.move(0, 0, widthMax, heightMax);

                this.snapMinimapRender.transform.scale.x = 1;
                this.snapMinimapRender.transform.scale.y = 1;
                this.snapMinimapAct.transform.scale.x = 1;
                this.snapMinimapAct.transform.scale.y = 1;
                this.snapMinimapAct2.transform.scale.x = 1;
                this.snapMinimapAct2.transform.scale.y = 1;
                this.snapMinimapFowS.transform.scale.x = 1;
                this.snapMinimapFowS.transform.scale.y = 1;
                break;
            case true:
                this.snapMinimapRender.x = 440;
                this.snapMinimapRender.y = 170;
                this.snapMinimapRender.transform.scale.x = 3;
                this.snapMinimapRender.transform.scale.y = 3;
                this.snapMinimapAct.x = 440;
                this.snapMinimapAct.y = 170;
                this.snapMinimapAct.transform.scale.x = 3;
                this.snapMinimapAct.transform.scale.y = 3;
                this.snapMinimapAct2.x = 440;
                this.snapMinimapAct2.y = 170;
                this.snapMinimapAct2.transform.scale.x = 3;
                this.snapMinimapAct2.transform.scale.y = 3;
                this.snapMinimapFowS.x = 440;
                this.snapMinimapFowS.y = 170;
                this.snapMinimapFowS.transform.scale.x = 1;
                this.snapMinimapFowS.transform.scale.y = 1;
                this.snapMinimapFowS.move(0, 0, widthMax, heightMax);
        }

        if (Input.isTriggered('pageup')) {
            this.mapViewToggle = !this.mapViewToggle;
        }
    }


    function drawCharacter(bm, characterName, characterIndex, x, y) {
        var bitmap = ImageManager.loadCharacter(characterName);
        var big = ImageManager.isBigCharacter(characterName);
        var pw = bitmap.width / (big ? 3 : 12);
        var ph = bitmap.height / (big ? 4 : 8);
        var n = characterIndex;
        var sx = (n % 4 * 3 + 1) * pw;
        var sy = (Math.floor(n / 4) * 4) * ph;
        bm.blt(bitmap, sx, sy, pw, ph, x - 3, y - 12, 12, 12);
    };

    function drawIcon(bm, iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        bm.__context.globalAlpha = 0.74;
        bm.blt(bitmap, sx, sy, pw, ph, x - 12, y - 24, 24, 24);
        bm.__context.globalAlpha = 1;
    };
})();
/*        switch (this.mapViewToggle) {
            case false:
                this.snapMinimapRender.move(locx, locy, widthMax, heightMax);
                this.snapMinimapAct.move(locx, locy, widthMax, heightMax);
                this.snapMinimapAct2.move(locx - 8, locy - 8, 24 + widthMax, 24 + heightMax);
                this.snapMinimapFowS.move(0, 0, widthMax, heightMax);

                this.snapMinimapRender.transform.scale.x = 1;
                this.snapMinimapRender.transform.scale.y = 1;
                this.snapMinimapAct.transform.scale.x = 1;
                this.snapMinimapAct.transform.scale.y = 1;
                this.snapMinimapAct2.transform.scale.x = 1;
                this.snapMinimapAct2.transform.scale.y = 1;
                this.snapMinimapFowS.transform.scale.x = 1;
                this.snapMinimapFowS.transform.scale.y = 1;
                break;
            case true:
                this.snapMinimapRender.x = 8;
                this.snapMinimapRender.y = 8;
                this.snapMinimapRender.transform.scale.x = 3;
                this.snapMinimapRender.transform.scale.y = 3;
                this.snapMinimapAct.x = 8;
                this.snapMinimapAct.y = 8;
                this.snapMinimapAct.transform.scale.x = 3;
                this.snapMinimapAct.transform.scale.y = 3;
                this.snapMinimapAct2.x = 0;
                this.snapMinimapAct2.y = 0;
                this.snapMinimapAct2.transform.scale.x = 3;
                this.snapMinimapAct2.transform.scale.y = 3;
                this.snapMinimapFowS.x = 8;
                this.snapMinimapFowS.y = 8;
                this.snapMinimapFowS.transform.scale.x = 1;
                this.snapMinimapFowS.transform.scale.y = 1;
                this.snapMinimapFowS.move(0, 0, widthMax, heightMax);
        }*/