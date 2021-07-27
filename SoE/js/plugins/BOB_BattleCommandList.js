
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
803
804
805
806
807
808
809
810
811
812
813
814
815
816
817
818
819
820
821
822
823
824
825
826
827
828
829
830
831
832
833
834
835
836
837
838
839
840
841
842
843
844
845
846
847
848
849
850
851
852
853
854
855
856
857
858
859
860
861
862
863
864
865
866
867
868
869
870
871
872
873
874
875
876
877
878
879
880
881
882
883
884
885
886
887
888
889
890
891
892
893
894
895
896
897
898
899
900
901
902
903
904
905
906
907
908
909
910
911
912
913
914
915
916
917
918
919
920
921
922
923
924
925
926
927
928
929
930
931
932
933
934
935
936
937
938
939
940
941
942
943
944
945
946
947
948
949
950
951
952
953
954
955
956
957
958
959
960
961
962
963
964
965
966
967
968
969
970
971
972
973
974
975
976
977
978
979
980
981
982
983
984
985
986
987
988
989
990
991
992
993
994
995
996
997
998
999
1000
1001
1002
1003
1004
1005
1006
1007
1008
1009
1010
1011
1012
1013
1014
1015
1016
1017
1018
1019
1020
1021
1022
1023
1024
1025
1026
1027
1028
1029
1030
1031
1032
1033
1034
1035
1036
1037
1038
1039
1040
1041
1042
1043
1044
1045
1046
1047
1048
1049
1050
1051
1052
1053
1054
1055
1056
1057
1058
1059
1060
1061
1062
1063
1064
1065
1066
1067
1068
1069
1070
1071
1072
1073
1074
1075
1076
1077
1078
1079
1080
1081
1082
1083
1084
1085
1086
1087
1088
1089
1090
1091
1092
1093
1094
1095
1096
1097
1098
1099
1100
1101
1102
1103
1104
1105
1106
1107
1108
1109
1110
1111
1112
1113
1114
1115
1116
1117
1118
1119
1120
1121
1122
1123
1124
1125
1126
1127
1128
1129
1130
1131
1132
1133
1134
1135
1136
1137
1138
1139
1140
1141
1142
1143
1144
1145
1146
1147
1148
1149
1150
1151
1152
1153
1154
1155
1156
1157
1158
1159
1160
1161
1162
1163
1164
1165
1166
1167
1168
1169
1170
1171
1172
1173
1174
1175
1176
1177
1178
1179
1180
1181
1182
1183
1184
1185
1186
1187
1188
1189
1190
1191
1192
1193
1194
1195
1196
1197
1198
1199
1200
1201
1202
1203
1204
1205
1206
1207
1208
1209
1210
1211
1212
1213
1214
1215
1216
1217
1218
	
//=============================================================================
// Bobstah Plugins
// BOB_BattleCommandList.js
// Version: 2.2.0
//=============================================================================
 
var Imported = Imported || {};
Imported.BOB_BattleCommandList = true;
 
var Bobstah = Bobstah || {};
Bobstah.BattleCmds = Bobstah.BattleCmds || {};
 
//=============================================================================
 /*:
 * @plugindesc Version 2.2.0 - Allows further customization of battle command menus by class
 * and actor.
 * @author Bobstah
 *
 * ============================================================================
 * Params
 * ============================================================================
 * @param Force Default Commands
 * @desc If 1, will use the Default Battle Commands if none set at class level. If 0, use Actor Commands instead.
 * @default 0
 * 
 * @param Show Help Window
 * @desc If 1, display a help window that shows Skill and Item descriptions when selected.
 * @default 1
 *
 * @param Help Window Position
 * @desc 0 = custom, 1 = global help window default, 2 = above battle status
 * @default 2
 *
 * @param Show Icons
 * @desc If 1, show battle command icons. If 0, do not show them.
 * @default 1
 *
 * @param Icon Padding
 * @desc Add this many pixels between the icon and the command text.
 * @default 0
 *
 * @param Show Costs
 * @desc If 1, show MP/TP costs next to the command if applicable. If 0, do not.
 * @default 1
 *
 * @param Cost Font Size
 * @desc The size of the font to draw costs in.
 * @default 12
 *
 * @param Cost Outline Strength
 * @desc The strength of outline surrounding the cost. Increase to make the cost easier to see.
 * @default 6
 *
 * @param Two Cost Position
 * @desc If a command has two costs, determines order. If 0, MP on top, TP on bottom. If 1, TP on top, MP on bottom.
 * @default 0
 *
 * @param Skill Menu STypes
 * @desc If 1, combine skill types in the main menu to match the Battle Commands format.
 * @default 1
 *
 * @param Help Window X
 * @desc The X coordinate of the help window. Used if Help Window Position is 2. If 0, use default.
 * @default -1
 *
 * @param Help Window Y
 * @desc The Y coordinate of the help window. Used if Help Window Position is 2. If 0, use default.
 * @default -1
 *
 * @param Help Window Height
 * @desc The height of the help window. Used if Help Window Position is 2. If 0, use default.
 * @default -1
 *
 * @param Help Window Width
 * @desc The width of the help window. Used if Help Window Position is 2. If 0, use default.
 * @default -1
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * Allows the modification of battle commands on an actor and/or class basis.
 * This also allows you to add skills and items directly onto the command list.
 * Some command options are restricted to class. See Command Definitions for
 * more information.
 *
 * If no battle commands are set at the class level, it will use the actor's
 * command list instead. If the actor or class has no battle commands set, the
 * default list will be used.
 *
 * You can also set an icon for commands that do not have one by default, such
 * as SType and STypes, and you can also override the icon for skills or items.
 * Use the iIconID- tag as a prefix to any command to do so. Additionally, you
 * can use shorthand options to select an icon based on equipment. For now, the
 * only option is Wep. It would be used like so: iWep-
 * See the examples section for more information.
 *
 * To add additional Custom Battle Commands from your (or another) plugin, 
 * scroll to the Additional Plugins Custom Battle Commands section. You 
 * shouldn't need to modify this plugin, I promise! 
 *
 * ============================================================================
 * Recommended Usage
 * ============================================================================
 * Set only actor-specific commands (maybe a skill or skilltype, etc) on each
 * actor. Set the general attack, skill, item, etc commands on each class,
 * then insert ActorCmd where you want the actor's commands to show up.
 *
 * ============================================================================
 * Notetags 
 * ============================================================================
 * Class, Weapon, Armor, State
 *   <Battle Commands>
 *   iX-Attack!
 *   iX-Skills!
 *   iX-STypes(CommandName):ID,ID,etc!
 *   iX-SType(CommandName):ID!
 *   iX-Skill:ID!
 *   iX-SkillFirst:ID,ID,etc!
 *   iX-SkillLast:ID,ID,etc!
 *   iX-SkillGroup(CommandName):GroupName!
 *   iX-Item:ID!
 *   iX-ItemFirst:ID,ID,etc!
 *   iX-ItemLast:ID,ID,etc!
 *   iX-ItemGroup(CommandName):GroupName!
 *   ActorCmd
 *   WeaponCmd
 *   ArmorCmd
 *   StateCmd
 *   iX-Items!
 *   iX-Guard!
 *   </Battle Commands>
 *
 * Actor (ActorCmd is not valid for an Actor! Do not use!)
 *   <Battle Commands>
 *   iX-Attack!
 *   iX-Skills(CommandName)!
 *   iX-STypes(CommandName):ID,ID,etc!
 *   iX-SType(CommandName):ID!
 *   iX-Skill(CommandName):ID!
 *   iX-SkillFirst(CommandName):ID,ID,etc!
 *   iX-SkillLast(CommandName):ID,ID,etc!
 *   iX-SkillGroup(CommandName):GroupName!
 *   iX-Item(CommandName):ID!
 *   iX-ItemFirst(CommandName):ID,ID,etc!
 *   iX-ItemLast(CommandName):ID,ID,etc!
 *   iX-ItemGroup(CommandName):GroupName!
 *   WeaponCmd
 *   ArmorCmd
 *   StateCmd
 *   iX-Items!
 *   iX-Guard!
 *   </Battle Commands>
 *
 * ============================================================================
 * Command Defintions
 * ============================================================================
 * Class & Actor
 *   iX- - **OPTIONAL. Set X to override the icon you wish to show for any option except
 *         ActorCmd.
 *   (CommandName) - **OPTIONAL. Override the name of the any command except Attack,
 *                   Guard, Items, and ActorCmd.
 *   Attack - Use the default attack command
 *   Skills - Show the default skill list
 *   STypes(CommandName):ID,ID,etc - Show a skill menu named CommandName using
 *                       the skill types ID,ID,etc.
 *   Skill:ID - Show a specific skill ID, if the actor knows it and can use it.
 *   SkillFirst:ID,ID,etc - Show the first learned skill in the provided list.
 *   SkillLast:ID,ID,etc - Show the last learned skill in the provided list.
 *   Item:ID - Show a specific item, if it is in the party inventory
 *   ItemFirst:ID,ID,etc - Show the first owned item in the provided list.
 *   ItemLast:ID,ID,etc - Show the last owned item in the provided list.
 *   WeaponCmd - Show Battle Commands from equipped weapons.
 *   ArmorCmd - Show Battle Commands from equipped armors.
 *   StateCmd - Show Battle Commands from active states.
 *   Items - Show the default item command
 *   Guard - Show the default Guard command.
 *   ! - **OPTIONAL. Hide the command if the actor cannot use it instead
 *                   of showing it grayed out.
 *   Mix - Requires Victor Engine Mix plugin.
 *   Equip - Requires Yanfly Battle Equip plugin.
 * 
 * Class
 *   ActorCmd - Show the list of actor commands.
 *
 * ============================================================================
 * Eval
 * ============================================================================
 * To eval a section of code for an option you wish to use, surround
 * it with $(). The below example is considered valid:
 * i$(76+2)-STypes($("M"+"a"+"g"+"i"+"c"):$([a.level, a.level+1])!
 *
 * The above eval translates to:
 * Show icon 76+2 (78) for STypes named Magic. Use the skill types equal to 
 * the actor's level and the actor's level plus one. If the actor 
 * cannot use any of those skill types, hide the option.
 *
 * Depending on the option you wish to adjust, your code needs to return
 * the following data types:
 * Icon = Number.
 * CommandName = String
 * IDs = Array of Numbers. Retrun 0 or null to hide the command.
 *
 * The following variables are available during eval:
 * a = Current Actor ($gameActor.actors(id))
 * s = $gameSwitches
 * v = $gameVariables
 *
 * ============================================================================
 * Examples
 * ============================================================================
 * Let's recreate the default battle commands:
 * <Battle Commands>
 * Attack
 * Skills
 * Guard
 * Items
 * </Battle Commands>
 *
 * By reordering the commands above, they are reordered in-game, too.
 * Let's add a skill with an ID of 1 to our list:
 * Skill:1
 *
 * Wait, if skill ID 1 is Steal, and skill ID 2 is Mug, we should only
 * show Mug:
 * SkillLast:1,2
 * Now, it will check to see if skill 1 is known, and if so, if skill 2 is
 * known. If we know skill 2, show that instead of skill 1!
 *
 * It would be really cool if our weapon skill used the icon of the currently
 * equipped weapon. Accomplish this like so:
 * iWep-Skill:1
 *
 * We can even do this for the attack command!
 * iWep-Attack
 *
 * What if we want to rename skill 1 to something else?
 * Skill(NewName):1
 *
 * Let's manually list our skill types of 1 and 2:
 * SType:1
 * Stype:2
 *
 * By default, skill types don't have icons. Let's add icon index 1 and 2:
 * i1-SType:1
 * i2-SType:2
 *
 * Let's combine the skill types above into a single menu called magic:
 * STypes(Magic):1,2
 *
 * Wait, that doesn't have an icon either! Let's give it icon index 100:
 * i100-STypes(Magic):1,2
 *
 * The actor lost their ability to cast magic for a short time, but the
 * command is still showing up. Let's hide it!
 * i100-STypes(Magic):1,2!
 * 
 * ============================================================================
 * Additional Plugins Custom Battle Commands
 * ============================================================================
 *
 * NOTE: This functionality may not be working properly. Use at your own risk!
 *
 * As this plugin overwrites the default Scene_Battle.createActorCommandWindow function,
 * it would be impossible for additional plugins to add new commands.
 * To facilitate this, you can add an object to the below array.
 * This array is looped through, and the object evaluated by 
 * Scene_Battle.createActorCommandWindow.
 *
 * You can also alias the Window_ActorCommand.prototype.processCommandEntry function
 * and add your own processing.
 *
 * Sample object:
 * myPlugin.myCustomBattleCommands = {
     createActorCommandWindow: 'myPluginCreateActorCommandWindow'  //String, function name inside Scene_Battle
 * }
 * 
 * Below is what Window_ActorCommand.prototype.myPluginMakeCommandList from the above example might resemble:
 * Window_Actor.prototype.myPluginMakeCommandList = function(cmd) { //cmd is the current Battle Command from the notetag
 *   if (cmd === "myPluginCustomCommand") {
 *      this.addMyPluginCustomCommand();
 *   }
 * }
 *
 * Below is what Scene_Battle.prototype.myPluginCreateActorCommandWindow from the above example might resemble:
 * Scene_Battle.prototype.myPluginCreateActorCommandWindow = function() {
 *   this._actorCommandWindow.setHandler('myCustomCommandHandler', this.myCustomCommand.bind(this));
 * }
 * 
 * Once you've done all that, you can pass the myCustomBattleCommands object from the above
 * example to Bobstah.BattleCmds.addCustom(myCustomBattleCommands) and watch it work!
 *
 * ============================================================================
 * Special Thanks
 * ============================================================================
 * Resi - Input
 * Villhelm - Victor Engine Mix Patch
 * waynee95 - Yanfly Engine Battle Equip patch
 */
//=============================================================================
 
//=============================================================================
// Plugin Parameters and other Variables
//=============================================================================
 
Bobstah.Parameters = PluginManager.parameters('BOB_BattleCommandList');
Bobstah.Param = Bobstah.Param || {};
 
Bobstah.Param.BattleCommandList_ForceDefaultCommands = Number(Bobstah.Parameters['Force Default Commands']);
Bobstah.Param.BattleCommandList_ShowHelpWindow = Number(Bobstah.Parameters['Show Help Window']);
Bobstah.Param.BattleCommandList_HelpWindowPosition = Number(Bobstah.Parameters['Help Window Position']);
Bobstah.Param.BattleCommandList_ShowIcons = Number(Bobstah.Parameters['Show Icons']);
Bobstah.Param.BattleCommandList_SkillMenuSTypes = Number(Bobstah.Parameters['Skill Menu STypes']);
Bobstah.Param.BattleCommandList_IconPadding = Number(Bobstah.Parameters['Icon Padding']);
Bobstah.Param.BattleCommandList_HelpWindowX = Number(Bobstah.Parameters['Help Window X']);
Bobstah.Param.BattleCommandList_HelpWindowY = Number(Bobstah.Parameters['Help Window Y']);
Bobstah.Param.BattleCommandList_HelpWindowHeight = Number(Bobstah.Parameters['Help Window Height']);
Bobstah.Param.BattleCommandList_HelpWindowWidth = Number(Bobstah.Parameters['Help Window Width']);
Bobstah.Param.BattleCommandList_TwoCostPosition = Number(Bobstah.Parameters['Two Cost Position']);
Bobstah.Param.BattleCommandList_ShowCosts = Number(Bobstah.Parameters['Show Costs']);
Bobstah.Param.BattleCommandList_CostFontSize = Number(Bobstah.Parameters['Cost Font Size']);
Bobstah.Param.BattleCommandList_CostOutlineStrength = Number(Bobstah.Parameters['Cost Outline Strength']);
 
Bobstah.BattleCmds.ActorContext = null;
 
//=============================================================================
// Custom Plugin Battle Commands
//=============================================================================
//Initialize custom plugin array.
Bobstah.BattleCmds.Custom = [];
 
//Add a function to the custom plugin array to be called during Scene_Battle
Bobstah.BattleCmds.addCustom = function(customBattleCommand) {
    this.Custom.push(customBattleCommand);
};
 
//=============================================================================
// Custom Plugin Objects
//=============================================================================
function BattleCommand(cmd, ids, params, icon, hide) {
    this._cmd = cmd;
    this._ids = ids;
    this._params = params;
    this._icon = icon;
    this._hide = hide;
     
    //Set evals to false.
    this._evlIds = false;
    this._evlIcon = false;
    this._evlCmd = false;
    this._evlParam = false;
}
 
BattleCommand.prototype.evaluate = function(src) {
    var a = Bobstah.BattleCmds.ActorContext;
    var s = $gameSwitches;
    var v = $gameVariables;
    var res = eval(src);
    if (typeof(res) === "undefined" || res === false || res === 0) {
        res = null;
    }
    return res;
};
 
BattleCommand.prototype.enableIdEval = function() {
    this._evlIds = true;
};
 
BattleCommand.prototype.enableIconEval = function() {
    this._evlIcon = true;
};
 
BattleCommand.prototype.enableCmdEval = function() {
    this._evlCmd = true;
};
 
BattleCommand.prototype.enableParamEval = function() {
    this._evlParam = true;
}
 
Object.defineProperties(BattleCommand.prototype, {
    ids: {
        get: function() {
            if (this._evlIds) { 
                var res = this.evaluate(this._ids); 
                if (res === null || res === 0) { res = []; }
                return res;
            }
            return this._ids;
        },
        configurable: true
    },
    params: { 
        get: function() { 
            if (this._evlParam) { return String(this.evaluate(this._params)); }
            return this._params; 
        }, 
        configurable: true 
    },
    iconOverride: { 
        get: function() { 
            if (this._evlIcon) { return Number(this.evaluate(this._icon)); }
            if (this._icon === "wep") { 
                if (Bobstah.BattleCmds.ActorContext.weapons()[0]) {
                    return Bobstah.BattleCmds.ActorContext.weapons()[0].iconIndex;
                } else {
                    return null;
                }
            }
            if (this._icon === null)  { return null; }
            return Number(this._icon); 
        }, 
        configurable: true 
    },
    hide: { get: function() { return this._hide; }, configurable: true },
    command: { 
        get: function() { 
            if (this._evlCmd) { return String(this.evaluate(this._cmd)); }
            return this._cmd; 
        }, 
    configurable: true 
    },
});
 
//=============================================================================
// Custom Plugin Functions
//=============================================================================
//Function to set the help window's position based off the status window.
Bobstah.BattleCmds.positionHelp = function(helpWindow, refWindow) {
    switch (Bobstah.Param.BattleCommandList_HelpWindowPosition) {
        case 2:
            var helpY = refWindow.y - helpWindow.height;
            helpWindow.move(0,helpY,helpWindow.width,helpWindow.height);
        break;
         
        case 0:
            var helpX = (Bobstah.Param.BattleCommandList_HelpWindowX !== 0 ? Bobstah.Param.BattleCommandList_HelpWindowX : helpWindow.x);
            var helpY = (Bobstah.Param.BattleCommandList_HelpWindowY !== 0 ? Bobstah.Param.BattleCommandList_HelpWindowY : helpWindow.y);
            var helpH = (Bobstah.Param.BattleCommandList_HelpWindowHeight !== 0 ? Bobstah.Param.BattleCommandList_HelpWindowHeight : helpWindow.height);
            var helpW = (Bobstah.Param.BattleCommandList_HelpWindowWidth !== 0 ? Bobstah.Param.BattleCommandList_HelpWindowWidth : helpWindow.width);
            helpWindow.move(helpX, helpY, helpW, helpH);
        break;
         
        default:
            return false;
        break;
    }
};
 
//=============================================================================
// DataManager
//=============================================================================
//Alias the isDatabaseLoaded function to load Battle Command data.
Bobstah.BattleCmds.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Bobstah.BattleCmds.DataManager_isDatabaseLoaded.call(this)) return false;
    DataManager.processBobstahBattleCmdNotes($dataActors); //Load Battle Command notes from actors.
    DataManager.processBobstahBattleCmdNotes($dataClasses); //Load Battle Command notes from classes.
    DataManager.processBobstahBattleCmdNotes($dataWeapons); //Load Battle Command notes from weapons.
    DataManager.processBobstahBattleCmdNotes($dataArmors); //Load Battle Command notes from armors.
    DataManager.processBobstahBattleCmdNotes($dataStates); //Load Battle Command notes from states.
    return true;
};
 
//Load the <Battle Commands> notetags from the parent object.
DataManager.processBobstahBattleCmdNotes = function(group) {
    //Battle Command global regex. Grab everything between <Battle Commands> and </Battle Commands>
    var cmdlist = /<Battle Commands>[\s+]+([\s\S]*?)<\/Battle Commands>/i;
    //Command regex. Checks for icon, command, (CommandName), CommandID, and Hide(!)
    var cmdregex = /(i\S+-)*([0-9A-z]+)(\([\S][^:\r\n]*\))*[ ]*:?[ ]*(.*)/ig;
    //ID list regex. Used to grab a list of IDs returned by the cmdregex above.
    var idsregex = /(\d+)/ig;
    //Eval Regex. Used to grab code inside supplied by cmdregex.
    var evalregex = /^\$\((.+)\)$/i;
    //Hide Regex. Used to grab ! out of a list of IDs supplied by cmdregex.
    var hideregex = /(!$)/i;
    //Param Regex. Used to grab the command name out from between () if specified.
    var paramregex = /^\((.+)\)$/i;
     
    //Loop through our parent group ($dataActors, $dataClasses, etc)
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
 
        obj.battleCommands = [];
        //Match the regex against the object's note field, then set the data to local variables.
        if (obj.note.match(cmdlist)) {
            var notedata = RegExp.$1
            var cmdInfo = null;
            //Match each command entry inside of <Battle Commands>, then loop through them.
            while (cmdInfo = cmdregex.exec(notedata)) {
                //Set Evals to false by default.
                var evlIds = false;
                var evlIcon= false;
                var evlCmd = false;
                var evlParams = false;
                 
                //Set icon var to be the first result unless it is null, then set null.
                if (cmdInfo[1]) {
                    var icon = cmdInfo[1].substring(1,cmdInfo[1].length-1);
                    //Check for Icon Eval
                    if (icon.match(evalregex)) {
                        evlIcon = true;
                        icon = RegExp.$1;
                    } else {
                        icon = icon.toLowerCase();
                    }
                } else {
                    var icon = null;
                }
                 
                 
                //Take the command and lowercase it for easier matching.
                var cmd = cmdInfo[2].toLowerCase();
                 
                //If we have a name, match it to our paramregex. If not, set params to null.
                if (cmdInfo[3]) {
                    cmdInfo[3].match(paramregex);
                    var params = RegExp.$1;
                    //Check for Eval
                    if (params.match(evalregex)) { 
                        params = RegExp.$1;
                        evlParams = true;
                    }
                } else {
                    var params = null
                }
                 
                //Split by commands to grab all of our IDs.
                if (cmdInfo[4].indexOf('$(') !== -1) {
                    cmdInfo[4].match(evalregex);
                    var ids = RegExp.$1;
                    var evlIds = true;
                } else if (cmdInfo[4].indexOf(',') !== -1) {
                    var ids = [];
                    while (id = idsregex.exec(cmdInfo[4])) {
                        ids.push(Number(id[1]));
                    }
                } else {
                    cmdInfo[4].match(idsregex);
                    var ids = [Number(RegExp.$1)];
                }
                if (cmdInfo[4].match(hideregex)) {
                    var hide = true;
                } else {
                    var hide = false;
                }
                 
                //Add this command onto the end of the current Battle Commands array.
                var bCmd = new BattleCommand(cmd, ids, params, icon, hide);
                if (evlIds) { bCmd.enableIdEval(); }
                if (evlIcon) { bCmd.enableIconEval(); }
                if (evlCmd) { bCmd.enableCmdEval(); }
                if (evlParams) { bCmd.enableParamEval(); }
                obj.battleCommands.push(bCmd);
            }
        }
    }
};
 
//=============================================================================
// Game_Actor
//=============================================================================
Bobstah.BattleCmds.GameActor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Bobstah.BattleCmds.GameActor_setup.call(this, actorId);
    var actor = $dataActors[actorId];
    this.battleCommands = actor.battleCommands;
}
 
//Return a list of the actor's battle commands, starting with Class Commands and working through Actor, Weapon, and Armor commands.
Game_Actor.prototype.battleCommandList = function(currentCommands) {
    var classCommands = currentCommands || $dataClasses[this._classId].battleCommands.slice(0);
    var res = [];
    for(var i = 0; i < classCommands.length; i++) {
        cmd = classCommands[i];
        switch (cmd.command) {
            case "actorcmd":
                res = res.concat(this.battleCommandList(this.battleCommands));;
            break;
             
            case "weaponcmd":
                res = res.concat(this.processBattleCommands(this.weapons()));
            break;
             
            case "armorcmd":
                res = res.concat(this.processBattleCommands(this.armors()));
            break;
             
            case "statecmd":
                res = res.concat(this.processBattleCommands(this.states()));
            break;
             
            default:
                res.push(cmd);
            break;
        }
    }
     
    if (res.length === 0) {
        if (Bobstah.Param.BattleCommandList_ForceDefaultCommands === 0) {
            res = this.battleCommandList($dataActors[this._actorId].battleCommands);
        }
    }
    return res;
};
 
Game_Actor.prototype.processBattleCommands = function(objList) {
    var commands = [];
    for (var n = 0; n < objList.length; n++) {
        var battleCommands = objList[n].battleCommands;
        for (var i = 0; i < battleCommands.length; i++) {
            commands.push(battleCommands[i]);
        }
    }
    return commands;
};
 
//=============================================================================
// Window_SkillType
// Only change if Bobstah.Param.BattleCommandList_SkillMenuSTypes is 1.
//=============================================================================
if (Bobstah.Param.BattleCommandList_SkillMenuSTypes === 1)
{
    Bobstah.BattleCmds.WindowSkillType_makeCommandList = Window_SkillType.prototype.makeCommandList;
    Window_SkillType.prototype.makeCommandList = function() {
        if (this._actor) {
            var commands = this._actor.battleCommandList();
            this._added = [];
            if (!commands) return Bobstah.BattleCmds.WindowSkillType_makeCommandList.call(this);
            for (var i = 0; i < commands.length; i++) {
                var option = commands[i];
                if (option.command === "stypes") {
                    var stypes = [];
                    for (var t = 0; t < option.ids.length; t++) {
                        stype = option.ids[t];
                        this._added.push(stype);
                        if (!this._actor.isSkillTypeSealed(stype)) {
                            stypes.push(stype);
                        }
                    }
                    this.addCommand(option.params, 'skill', true, stypes);
                }
            }
            var skillTypes = this._actor.addedSkillTypes();
            skillTypes.sort(function(a, b) {
                return a - b;
            });
            skillTypes.forEach(function(stypeId) {
                if (this._added.indexOf(stypeId) !== -1) return;
                var name = $dataSystem.skillTypes[stypeId];
                this.addCommand(name, 'skill', true, stypeId);
            }, this);
        }
    };
};
 
//=============================================================================
// Window_SkillList
//=============================================================================
Bobstah.BattleCmds.WindowSkillList_setStypeId = Window_SkillList.prototype.setStypeId;
Window_SkillList.prototype.setStypeId = function(stypeId) {
    if (this.multipleSkills(stypeId) && stypeId !== this._stypeId) {
        this._stypeId = stypeId;
        this.refresh();
        this.resetScroll();
    } else {
        Bobstah.BattleCmds.WindowSkillList_setStypeId.call(this, stypeId);
    }
};
 
Bobstah.BattleCmds.WindowSkillList_includes = Window_SkillList.prototype.includes;
Window_SkillList.prototype.includes = function(item) {
    if (!item) return false;
    if (!this.multipleSkills()) return Bobstah.BattleCmds.WindowSkillList_includes.call(this, item);
    if (this._stypeId.indexOf(item.stypeId) > -1) {
        return true;
    } else {
        return false;
    }
    //return item.stypeId === this._stypeId; Not needed? What was I thinking?
};
 
Window_SkillList.prototype.multipleSkills = function(stypeId) {
    stypeId = stypeId || this._stypeId;
    if (stypeId === null) { return false; }
    if (typeof(stypeId) === "number") { return false; }
    if (typeof(stypeId) === "undefined") { return false; }
    if (stypeId.length > 0) { return true; }
    return false;
};
 
//=============================================================================
// Window_BattleSkill
//=============================================================================
Bobstah.BattleCmds.WindowBattleSkill_includes = Window_BattleSkill.prototype.includes;
Window_BattleSkill.prototype.includes = function(item) {
    if (!item) return false;
    if (!this.multipleSkills()) return Bobstah.BattleCmds.WindowBattleSkill_includes.call(this, item);
    if (this._stypeId.indexOf(item.stypeId) > -1) {
        return true;
    } else {
        return false;
    }
};
 
 
//=============================================================================
// Window_ActorCommand
//=============================================================================
Bobstah.BattleCmds.WindowActorCommand_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function() {
    this._commandCostShow = Bobstah.Param.BattleCommandList_ShowCosts;
    this._commandCostOrder = Bobstah.Param.BattleCommandList_TwoCostPosition;
    this._commandCostFontSize = Bobstah.Param.BattleCommandList_CostFontSize;
    this._cmdContext = null;
    this._commandCostOutline = Bobstah.Param.BattleCommandList_CostOutlineStrength;
    return Bobstah.BattleCmds.WindowActorCommand_initialize.call(this);
};
 
Window_ActorCommand.prototype.commandCostFontSize = function() {
    return this._commandCostFontSize;
};
 
Window_ActorCommand.prototype.commandCostOrder = function() {
    return this._costPositionOrder;
};
 
Window_ActorCommand.prototype.commandCostShow = function() {
    return this._commandCostShow;
};
 
Window_ActorCommand.prototype.commandCostOutline = function() {
    return this._commandCostOutline;
};
 
Window_ActorCommand.prototype.commandIcon = function(index) {
    if (index === undefined) return null;
    return this._list[index].icon;
};
 
Window_ActorCommand.prototype.commandExt = function(index) {
    return this._list[index].ext;
};
 
Window_ActorCommand.prototype.drawTpCost = function(cost, x, y, width, align) {
    this.changeTextColor(this.tpCostColor());
    this.drawText(cost + TextManager.tpA, x, y, width, align);
    this.changeTextColor(this.normalColor());
};
 
Window_ActorCommand.prototype.drawMpCost = function(cost, x, y, width, align) {
    this.changeTextColor(this.mpCostColor());
    this.drawText(cost + TextManager.mpA, x, y, width, align);
    this.changeTextColor(this.normalColor());
};
 
Window_ActorCommand.prototype.drawCommandCost = function(skill, x, y, width) {
    this.resetFontSettings();
    this.changePaintOpacity(true);
    var outlineWidth = this.contents.outlineWidth;
    this.contents.outlineWidth = this.commandCostOutline();
    if (skill === null) { return; }
    this.contents.fontSize = this.commandCostFontSize();
    var ty = y - (this.textPadding() * 2);
    var by = y + (this.lineHeight() - this.commandCostFontSize()) - (this.textPadding() * 2);
    if (this.commandCostOrder()) {
        if (this._actor.skillTpCost(skill) === 0) {
            this.drawMpCost(this._actor.skillMpCost(skill), x, by, width, 'left');
        } else {
            this.drawMpCost(this._actor.skillMpCost(skill), x, ty, width, 'left');
            this.drawTpCost(this._actor.skillTpCost(skill), x, by, width, 'left');
        }
    } else {
        if (this._actor.skillMpCost(skill) === 0) {
            this.drawTpCost(this._actor.skillTpCost(skill), x, by, width, 'left');
        } else {
            this.drawMpCost(this._actor.skillMpCost(skill), x, by, width, 'left');
            this.drawTpCost(this._actor.skillTpCost(skill), x, ty, width, 'left');
        }
    }
    this.resetFontSettings();
    this.contents.outlineWidth = outlineWidth;
};
 
Bobstah.BattleCmds.WindowActorCommand_itemTextAlign = Window_ActorCommand.prototype.itemTextAlign;
Window_ActorCommand.prototype.itemTextAlign = function() {
    if (Bobstah.Param.BattleCommandList_ShowIcons === 1) {
        return 'left';
    } else {
        return Bobstah.BattleCmds.WindowActorCommand_itemTextAlign.call(this);
    }
};
 
Bobstah.BattleCmds.WindowActorCommand_drawItem = Window_ActorCommand.prototype.drawItem;
Window_ActorCommand.prototype.drawItem = function(index) {
    if (Bobstah.Param.BattleCommandList_ShowIcons === 0) {
        icon = null;
    } else {
        icon = this.commandIcon(index);
    }
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
     
    if (Bobstah.Param.BattleCommandList_ShowIcons === 1) {
        var iconPadding = Bobstah.Param.BattleCommandList_IconPadding;
    } else {
        var iconPadding = 0;
    }
     
    if (icon !== null) {
        this.drawIcon(icon, rect.x, rect.y);
    }
    this.changePaintOpacity(this.isCommandEnabled(index));
    var nx = rect.x + iconPadding + Window_Base._iconWidth;
    var nw = rect.width - iconPadding - Window_Base._iconWidth;
    this.drawText(this.commandName(index), nx, rect.y, nw, align);
    if (this.commandCostShow() && this._list[index].symbol === "customSkill") {
        this.drawCommandCost(this.commandExt(index), rect.x, rect.y, rect.width);
    }
    return;
};
 
Bobstah.BattleCmds.WindowActorCommand_addCommand = Window_ActorCommand.prototype.addCommand;
Window_ActorCommand.prototype.addCommand = function(name, symbol, enabled, ext, icon) {
    if (Bobstah.Param.BattleCommandList_ShowIcons === 0) {
        icon = null;
    } else {
        icon = icon || null;
    }
    if (enabled === undefined) {
        enabled = true;
    }
    if (ext === undefined) {
        ext = null;
    }
    this._list.push({ name: name, symbol: symbol, enabled: enabled, ext: ext, icon: icon});
};
 
Bobstah.BattleCmds.WindowActor_select = Window_ActorCommand.prototype.select;
Window_ActorCommand.prototype.select = function(index) {
    res = Bobstah.BattleCmds.WindowActor_select.call(this, index);
    if (Bobstah.Param.BattleCommandList_ShowHelpWindow === 0 || index === -1) { return res; }
    var cmd = this.currentData(index);
    if (typeof(cmd) === "undefined") { return res; }
    if (cmd.symbol === "customSkill" || cmd.symbol === "customItem") {
        this.setHelpWindowItem(cmd.ext);
        this.showHelpWindow();
    } else {
        this.hideHelpWindow();
    }
    return res;
};
 
Bobstah.BattleCmds.WindowActor_processOk = Window_ActorCommand.prototype.processOk;
Window_ActorCommand.prototype.processOk = function() {
    Bobstah.BattleCmds.WindowActor_processOk.call(this);
    if (Bobstah.Param.BattleCommandList_ShowHelpWindow === 1) {
        this.hideHelpWindow();
    }
};
 
Bobstah.BattleCmds.WindowActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
    if (this._actor) {
        Bobstah.BattleCmds.ActorContext = this._actor;
        this._cmdContext = null;
        var battleCommands = this._actor.battleCommandList();
        if (battleCommands.length != 0) {
            for(var i = 0; i < battleCommands.length; i++) {
                var cmd = battleCommands[i];
                this._cmdContext = cmd;
                this.processCommandEntry(cmd);
                this._cmdContext = null;
            }
        } else {
            Bobstah.BattleCmds.WindowActorCommand_makeCommandList.call(this);
        }
    }
};
 
Window_ActorCommand.prototype.processCommandEntry = function(cmd) {
    switch (cmd.command.toLowerCase())
    {
        case "attack":
            return this.addAttackCommand();
        break;
         
        case "skills":
            return this.addSkillCommands();
        break;
         
        case "guard":
            return this.addGuardCommand();
        break;
         
        case "items":
            return this.addItemCommand();
        break;
         
        case "skill":
            return this.addCustomSkillCommand();
        break;
         
        case "stype":
            return this.addSkillCommand();
        break;
         
        case "stypes":
            return this.addMultiSkillCommand();
        break;
         
        case "skillfirst":
            return this.addFirstSkillCommand();
        break;
         
        case "skilllast":
            return this.addLastSkillCommand();
        break;
         
        case "itemfirst":
            return this.addFirstItemCommand();
        break;
         
        case "itemlast":
            return this.addLastItemCommand();
        break;
         
        default:
            return false;
        break;
    }
    return false;
};
 
Bobstah.BattleCmds.WindowActorCommand_addAttackCommand = Window_ActorCommand.prototype.addAttackCommand;
Window_ActorCommand.prototype.addAttackCommand = function() {
    if (this._cmdContext === null) { return Bobstah.BattleCmds.WindowActorCommand_addAttackCommand.call(this); }
    if (this._cmdContext.hide === true) {
        if (!this._actor.canAttack()) {
            return false;
        }
    }
    var icon = this._cmdContext.iconOverride || $dataSkills[this._actor.attackSkillId()].iconIndex || null;
    var name = this._cmdContext.params || TextManager.attack;
    this.addCommand(name, 'attack', this._actor.canAttack(), null, icon);
    return true;
};
 
Bobstah.BattleCmds.WindowActorCommand_addSkillCommands = Window_ActorCommand.prototype.addSkillCommands;
Window_ActorCommand.prototype.addSkillCommands = function() {
    if (this._cmdContext === null) { return Bobstah.BattleCmds.WindowActorCommand_addSkillCommands.call(this); }
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b) {
        return a - b;
    });
    skillTypes.forEach(function(stypeId) {
        var name = this._cmdContext.params || $dataSystem.skillTypes[stypeId];
        var res = this._actor.isSkillTypeSealed(stypeId);
        if (this._cmdContext.hide === true) {
            if (res === true) { return false; }
        }
        var icon = this._cmdContext.iconOverride || null;
        this.addCommand(name, 'skill', !res, stypeId, icon);
    }, this);
    return true;
};
 
Bobstah.BattleCmds.WindowActorCommand_addGuardCommand = Window_ActorCommand.prototype.addGuardCommand;
Window_ActorCommand.prototype.addGuardCommand = function() {
    if (this._cmdContext === null) { return Bobstah.BattleCmds.WindowActorCommand_addGuardCommand.call(this); }
    if (this._cmdContext.hide === true) {
        if (!this._actor.canGuard()) {
            return false;
        }
    }
    var icon = this._cmdContext.iconOverride || $dataSkills[this._actor.guardSkillId()].iconIndex || null;
    var name = this._cmdContext.params || TextManager.guard;
    this.addCommand(name, 'guard', this._actor.canGuard(), null, icon);
    return true;
};
 
Bobstah.BattleCmds.WindowActorCommand_addItemCommand = Window_ActorCommand.prototype.addItemCommand;
Window_ActorCommand.prototype.addItemCommand = function() {
    if (this._cmdContext === null) { return Bobstah.BattleCmds.WindowActorCommand_addItemCommand.call(this); }
    var icon = this._cmdContext.iconOverride || null;
    var name = this._cmdContext.params || TextManager.item;
    this.addCommand(name, 'item', true, null, icon);
    return true;
};
 
Window_ActorCommand.prototype.addSkillCommand = function() {
    var stypeIds = this._cmdContext.ids;
    for (var i = 0; i < stypeIds.length; i++) {
        var stypeId = Number(stypeIds[i]);
        var stypeName = this._cmdContext.params || $dataSystem.skillTypes[stypeId] || "???";
        var res = this._actor.isSkillTypeSealed(stypeId);
        if (this._cmdContext.hide === true) {
            if (res === true) {
                return false;
            }
        }
        var icon = this._cmdContext.iconOverride || null;
        this.addCommand(stypeName, 'skill', !res, stypeId, icon);
    }
    return true;
};
 
Window_ActorCommand.prototype.addMultiSkillCommand = function() {
    var stypes = [];
    var skillName = this._cmdContext.params || "???";
    var stypeIds = this._cmdContext.ids;
    var validSkills = this._actor.addedSkillTypes();
 
    for (var i = 0; i < stypeIds.length; i++) {
        var stype = Number(stypeIds[i]);
        if (validSkills.indexOf(stype) > -1) {
            if (this._cmdContext.hide === true) {
                if (this._actor.isSkillTypeSealed(stype)) {
                    continue;
                }
            }
            stypes = stypes || [];
            stypes.push(stype);
        }
    }
    if (stypes.length === 0) { return false; }
    var icon = this._cmdContext.iconOverride || null;
    this.addCommand(skillName, 'skill', true, stypes, icon);
    return true;
};
 
Window_ActorCommand.prototype.addCustomSkillCommand = function() {
    var skillIds = this._cmdContext.ids;
    for (var i = 0; i < skillIds.length; i++) {
        var skillId = Number(skillIds[i]);
        var skill = $dataSkills[skillId];
        var skillName = this._cmdContext.params || $dataSkills[skillId].name || "???";
        if (this._actor.isLearnedSkill(skillId) || this._actor.addedSkills().contains(skillId)) {
            var res = this._actor.meetsSkillConditions(skill);
            if (this._cmdContext.hide === true && res === false) {
                return false;
            }
            var icon = this._cmdContext.iconOverride || skill.iconIndex || null;
            this.addCommand(skillName, 'customSkill', res, skill, icon);
        }
    }
    return true;
};
 
Window_ActorCommand.prototype.addCustomItemCommand = function() {
    var itemIds = this._cmdContext.ids;
    for (var i = 0; i < itemIds.length; i++) {
        var itemId = Number(itemIds[i]);
        var item = $dataItems[itemId];
        var itemName = this._cmdContext.params || item.name || "???";
        if ($gameParty.hasItem(item,true)) {
            var res = this._actor.canUse(item);
            if (this._cmdContext.hide === true && res === false) {
                return false;
            }
            var icon = this._cmdContext.iconOverride || item.iconIndex || null;
            this.addCommand(itemName, 'customItem', res, item, icon);
        }
    }
    return true;
};
 
Window_ActorCommand.prototype.addFirstSkillCommand = function(input)
{
    var skillId = 0;
    var skillIds = input || this._cmdContext.ids;
    for (var i = 0; i < skillIds.length; i++) {
        var skillId = Number(skillIds[i]);
        if (this._actor.isLearnedSkill(skillId) || this._actor.addedSkills().contains(skillId)) {
            var skill = $dataSkills[skillId];
            var skillName = this._cmdContext.params || skill.name || "???";
            var res = this._actor.canUse(skill);
            if (this._cmdContext.hide === true && res === false) {
                return false;
            }
            var icon = this._cmdContext.iconOverride || skill.iconIndex || null;
            this.addCommand(skillName, 'customSkill', res, skill, icon);
            return true;
        }
    }
    return false;
};
 
Window_ActorCommand.prototype.addLastSkillCommand = function()
{
    return this.addFirstSkillCommand(Array.prototype.slice.call(this._cmdContext.ids).reverse());
};
 
Window_ActorCommand.prototype.addFirstItemCommand = function(input)
{
    var itemIds = input || this._cmdContext.ids;
    for (var i = 0; i < itemIds.length; i++) {
        var itemId = Number(itemIds[i]);
        var item = $dataItems[itemId];
        var itemName = this._cmdContext.params || item.name || "???";
        if ($gameParty.hasItem(item,true)) {
            var res = this._actor.canUse(item);
            if (this._cmdContext.hide === true && res === false) {
                return false;
            }
            var icon = this._cmdContext.iconOverride || item.iconIndex || null;
            this.addCommand(itemName, 'customItem', res, item, icon);
            return true;
        }
    }
    return false;
};
 
Window_ActorCommand.prototype.addLastItemCommand = function()
{
    return this.addFirstItemCommand(Array.prototype.slice.call(this._cmdContext.ids).reverse());
};
 
//=============================================================================
// Scene_Battle
//=============================================================================
Bobstah.BattleCmds.SceneBattle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    this._actorCommandWindow = new Window_ActorCommand();
    this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
    this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
    this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
    this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
    this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
    this._actorCommandWindow.setHandler('customSkill', this.onCustomSkillOk.bind(this));
    this._actorCommandWindow.setHandler('customItem', this.onCustomItemOk.bind(this));
    if (Bobstah.BattleCmds.Custom.length > 0) {
        for (var customId = 0; customId < Bobstah.BattleCmds.Custom.length; customId++) {
            var custom = Bobstah.BattleCmds.Custom[customId].createActorCommandWindow;
            this[custom]();
        }
    }
    this.createHelpWindow();
    Bobstah.BattleCmds.positionHelp(this._helpWindow, this._statusWindow);
    this._actorCommandWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._actorCommandWindow);
};
 
Scene_Battle.prototype.onCustomSkillOk = function() {
    var skill = this._actorCommandWindow.currentExt();
    var action = BattleManager.inputtingAction();
    action.setSkill(skill.id);
    BattleManager.actor().setLastBattleSkill(skill);
    this.onSelectAction();
};
 
Scene_Battle.prototype.onCustomItemOk = function() {
    var item = this._actorCommandWindow.currentExt();
    var action = BattleManager.inputtingAction();
    action.setItem(item.id);
    this.onSelectAction();
};
 
//External plugin support below
 
//=============================================================================
// Victor Engine - Mix by Villhelm. Thanks!
//=============================================================================
if (Imported['VE - Mix Actions']) {
    Window_ActorCommand.prototype.addMixCommand = function() {
        this._actor.mixActions().forEach(function(mix) {
            this.addCommand(mix.name, 'mix action', true, mix);
        }, this);    
        return true;
    };
     
    Bobstah.BattleCmds.VEMixWindowActorCommand_processCommandEntry = Window_ActorCommand.prototype.processCommandEntry;
    Window_ActorCommand.prototype.processCommandEntry = function(cmd) {
        if (cmd === "mix") {
            return this.addMixCommand();
        } else {
            Bobstah.BattleCmds.VEMixWindowActorCommand_processCommandEntry.call(this, cmd);
        }
    }
}
 
//=============================================================================
// YEP_X_ChangeBattleEquip by waynee95. Thanks!
//=============================================================================
if (Imported.YEP_X_ChangeBattleEquip) {
    Bobstah.BattleCmds.YEPChangeWindowActorCommand_processCommandEntry = Window_ActorCommand.prototype.processCommandEntry;
    Window_ActorCommand.prototype.processCommandEntry = function(cmd) {
        if (cmd.command === "equip") {
            return this.addEquipChangeCommand();
        } else {
            Bobstah.BattleCmds.YEPChangeWindowActorCommand_processCommandEntry.call(this, cmd);
        }
    }
 
    Bobstah.BattleCmds.YEPChangeWindowActorCommand_addEquipChangeCommand = Window_ActorCommand.prototype.addEquipChangeCommand;
    Window_ActorCommand.prototype.addEquipChangeCommand = function() {
        if (this._cmdContext === null) {
            return Bobstah.BattleCmds.YEPChangeWindowActorCommand_addEquipChangeCommand.call(this);
        }
        if (this._cmdContext.hide === true) {
            if (!this._actor.canBattleEquipChange()) {
                return false;
            }
        }
        var icon = this._cmdContext.iconOverride || null;
        var name = Yanfly.Param.CBECmd;
        this.addCommand(name, 'equip change', this._actor.canBattleEquipChange(), null, icon);
        return true;
    };
 
    Bobstah.BattleCmds.Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        Bobstah.BattleCmds.Scene_Battle_createActorCommandWindow.call(this);
        var win = this._actorCommandWindow;
        win.setHandler('equip change', this.commandChangeBattleEquip.bind(this));
    };
}
