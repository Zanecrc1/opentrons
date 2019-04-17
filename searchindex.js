Search.setIndex({envversion:50,filenames:["api","atomic commands","complex commands","examples","index","labware","modules","new_protocol_api","pipettes","robot","writing"],objects:{"":{opentrons:[0,0,0,"-"]},"opentrons.legacy_api":{instruments:[0,0,0,"-"]},"opentrons.legacy_api.instruments":{Pipette:[0,1,1,""]},"opentrons.legacy_api.instruments.Pipette":{aspirate:[0,2,1,""],blow_out:[0,2,1,""],consolidate:[0,2,1,""],delay:[0,2,1,""],dispense:[0,2,1,""],distribute:[0,2,1,""],drop_tip:[0,2,1,""],home:[0,2,1,""],mix:[0,2,1,""],move_to:[0,2,1,""],pick_up_tip:[0,2,1,""],return_tip:[0,2,1,""],set_flow_rate:[0,2,1,""],touch_tip:[0,2,1,""],transfer:[0,2,1,""]},"opentrons.legacy_api.robot":{Robot:[0,1,1,""]},"opentrons.legacy_api.robot.Robot":{add_instrument:[0,2,1,""],connect:[0,2,1,""],disconnect:[0,2,1,""],get_warnings:[0,2,1,""],head_speed:[0,2,1,""],home:[0,2,1,""],move_to:[0,2,1,""],pause:[0,2,1,""],reset:[0,2,1,""],resume:[0,2,1,""],stop:[0,2,1,""]},"opentrons.protocol_api":{contexts:[7,0,0,"-"],labware:[7,0,0,"-"]},"opentrons.protocol_api.contexts":{InstrumentContext:[7,1,1,""],MagneticModuleContext:[7,1,1,""],ProtocolContext:[7,1,1,""],TemperatureModuleContext:[7,1,1,""],ThermocyclerContext:[7,1,1,""]},"opentrons.protocol_api.contexts.InstrumentContext":{air_gap:[7,2,1,""],aspirate:[7,2,1,""],blow_out:[7,2,1,""],channels:[7,3,1,""],consolidate:[7,2,1,""],current_volume:[7,3,1,""],dispense:[7,2,1,""],distribute:[7,2,1,""],drop_tip:[7,2,1,""],flow_rate:[7,3,1,""],home:[7,2,1,""],home_plunger:[7,2,1,""],hw_pipette:[7,3,1,""],max_volume:[7,3,1,""],mix:[7,2,1,""],mount:[7,3,1,""],move_to:[7,2,1,""],name:[7,3,1,""],pick_up_current:[7,3,1,""],pick_up_tip:[7,2,1,""],return_tip:[7,2,1,""],speeds:[7,3,1,""],tip_racks:[7,3,1,""],touch_tip:[7,2,1,""],transfer:[7,2,1,""],trash_container:[7,3,1,""],type:[7,3,1,""],well_bottom_clearance:[7,3,1,""]},"opentrons.protocol_api.contexts.MagneticModuleContext":{calibrate:[7,2,1,""],disengage:[7,2,1,""],engage:[7,2,1,""],labware:[7,3,1,""],load_labware:[7,2,1,""],load_labware_by_name:[7,2,1,""],status:[7,3,1,""]},"opentrons.protocol_api.contexts.ProtocolContext":{comment:[7,2,1,""],config:[7,3,1,""],connect:[7,2,1,""],deck:[7,3,1,""],delay:[7,2,1,""],disconnect:[7,2,1,""],fixed_trash:[7,3,1,""],home:[7,2,1,""],load_instrument:[7,2,1,""],load_labware:[7,2,1,""],load_labware_by_name:[7,2,1,""],loaded_instruments:[7,3,1,""],loaded_labwares:[7,3,1,""],location_cache:[7,3,1,""],pause:[7,2,1,""],reset:[7,2,1,""],resume:[7,2,1,""],temp_connect:[7,2,1,""],update_config:[7,2,1,""]},"opentrons.protocol_api.contexts.TemperatureModuleContext":{deactivate:[7,2,1,""],labware:[7,3,1,""],load_labware:[7,2,1,""],load_labware_by_name:[7,2,1,""],set_temperature:[7,2,1,""],target:[7,3,1,""],temperature:[7,3,1,""],wait_for_temp:[7,2,1,""]},"opentrons.protocol_api.contexts.ThermocyclerContext":{close:[7,2,1,""],hold_time:[7,3,1,""],labware:[7,3,1,""],lid_status:[7,3,1,""],load_labware:[7,2,1,""],load_labware_by_name:[7,2,1,""],open:[7,2,1,""],ramp_rate:[7,3,1,""],set_temperature:[7,2,1,""],target:[7,3,1,""],temperature:[7,3,1,""],wait_for_temp:[7,2,1,""]},"opentrons.protocol_api.labware":{Labware:[7,1,1,""],ModuleGeometry:[7,1,1,""],Well:[7,1,1,""],WellShape:[7,1,1,""],clear_calibrations:[7,4,1,""],load:[7,4,1,""],load_calibration:[7,4,1,""],load_definition_by_name:[7,4,1,""],load_from_definition:[7,4,1,""],load_module:[7,4,1,""],load_module_from_definition:[7,4,1,""],quirks_from_any_parent:[7,4,1,""],save_calibration:[7,4,1,""],save_tip_length:[7,4,1,""]},"opentrons.protocol_api.labware.Labware":{columns:[7,2,1,""],columns_by_index:[7,2,1,""],highest_z:[7,3,1,""],name:[7,3,1,""],next_tip:[7,2,1,""],parameters:[7,3,1,""],parent:[7,3,1,""],quirks:[7,3,1,""],rows:[7,2,1,""],rows_by_index:[7,2,1,""],set_calibration:[7,2,1,""],use_tips:[7,2,1,""],well:[7,2,1,""],wells:[7,2,1,""],wells_by_index:[7,2,1,""]},"opentrons.protocol_api.labware.ModuleGeometry":{location:[7,3,1,""]},"opentrons.protocol_api.labware.Well":{bottom:[7,2,1,""],center:[7,2,1,""],top:[7,2,1,""]},"opentrons.simulate":{format_runlog:[0,4,1,""],simulate:[0,4,1,""]},"opentrons.types":{Location:[7,1,1,""],Mount:[7,1,1,""],PipetteNotAttachedError:[7,5,1,""],Point:[7,1,1,""],TransferTipPolicy:[7,1,1,""]},"opentrons.types.Location":{labware:[7,3,1,""],move:[7,2,1,""],point:[7,3,1,""]},"opentrons.types.Point":{x:[7,3,1,""],y:[7,3,1,""],z:[7,3,1,""]},opentrons:{simulate:[0,0,0,"-"],types:[7,0,0,"-"]}},objnames:{"0":["py","module","Python module"],"1":["py","class","Python class"],"2":["py","method","Python method"],"3":["py","attribute","Python attribute"],"4":["py","function","Python function"],"5":["py","exception","Python exception"]},objtypes:{"0":"py:module","1":"py:class","2":"py:method","3":"py:attribute","4":"py:function","5":"py:exception"},terms:{"100ul":[1,3,4,7],"10x10":5,"12row":3,"18mm":6,"1mm":[0,1],"1st":2,"200ul":[0,1,3,4],"20ul":[0,2,3],"2mm":1,"2nd":2,"300ul":[0,2,4],"30ul":3,"3x6_plate":5,"40ul":6,"4_ml":7,"4x6":5,"50ul":[0,1,2,5,8],"5_ml_eppendorf":7,"5ml":[5,7],"5mm":[0,7],"6_ml":7,"75ul":2,"80ul":0,"8_ml":7,"95c":7,"9_ml":7,"\u03bcl":8,"boolean":[0,7],"case":[5,6,7],"class":[0,7,8],"default":[0,1,2,5,6,7,8,9],"enum":7,"final":[0,1,2,3,4,7],"float":[0,3,6,7],"function":[0,1,6],"import":[0,1,2,3],"int":[0,2,7],"long":[4,5,7],"new":[0,1],"public":8,"return":0,"short":[4,7],"true":[0,2,6,7],"try":[1,5,6],"while":[0,3,4,5,7],a10:[2,5],a11:[2,5],a12:[2,3,5],a24:5,abil:[1,6],abl:[1,4,6,7,10],about:[4,6,7],abov:[1,4,5,7,8,10],above:6,absolut:[3,7],abstracteventloop:7,accept:7,access:[0,4],accessor:7,account:7,accumul:0,accur:[2,3],acquir:10,across:[3,4,7,9],act:[3,5,6,7],action:[0,3,6,7,10],actions:6,activ:7,actual:[4,7,10],actuat:0,adapt:6,adaptor:5,add:[0,1,2,4,5,6,7,9],add_instru:0,addit:[0,4,5,7],address:[4,7,10],after:[0,1],again:[1,6],aim:10,air_gap:[1,2,3,7],algorithm:0,alia:[0,7],all:[0,1,2,3,5,7,9],allow:[0,1,3,5,9],along:[5,7],alreadi:[1,5,6,7],also:[0,1,3,5,6,7,9,10],alter:7,altern:[1,3],alwai:0,among:[5,7],amount:[0,1,2,5,7],amp:7,amper:7,analyt:4,ani:[0,1,5,7,9,10],anonym:4,anoth:[1,3,6,10],another:5,ansi:7,any:[0,9],anyon:[4,7],anyth:7,anywher:7,app:[0,4,5,6,7,9,10],appear:7,append:3,appli:[2,7],applic:[0,1,4,6,7],arbitrari:7,arc:[0,7],aren:2,arg:[0,7],argument:[0,1,2,5,7,8],around:[1,2,3,7],arrang:5,arriv:0,aspect:9,aspir:[0,1,2,3,4,7,8],aspirat:0,aspirate_flow_r:[0,8],aspirate_spe:[0,7,8],assert:[0,7],associ:[0,1,7],assum:[3,5],asyncio:7,attach:0,attempt:2,attribut:7,author:[4,7],auto:6,autogener:0,autom:[4,7,10],automat:[0,1,2,3,5,6,7,9,10],autonom:1,avail:[0,1,5,7],avoid:[0,2,10],awai:7,axi:[0,7,9],b10:5,b11:5,b12:5,back:[0,1,5,7,9],back_compat:7,backward:7,base:[5,7,10],basi:7,becaus:[1,5,7,9],been:[0,1,5,6,7],befor:1,begin:[2,7],behavior:[0,7,8],below:[1,2,3,4,5,7,9],bench:[4,7],besid:1,best:[0,10],better:[4,7],between:[0,1,2,3,5,7],biologi:[4,7],biorad:[5,6],biorad_96_wellplate_pcr_200_ul:7,block:1,blow_out:[0,1,2,7],blown:2,bool:[0,7],both:[1,5,6,7],bottom:[0,1,6,7],bound:0,box:1,broker:[0,7],browser:10,build:10,built:[5,10],bundl:7,button:10,c10:5,c11:5,c12:5,cabl:7,cach:7,calcul:[0,7],calibr:[0,5,7,10],call:[0,1,2,4,5,6,7,8,9,10],can:[0,1,2,3,4,5,6,7,8,9,10],cancel:6,cannot:3,canon:[0,7],capabl:7,captur:0,care:[1,2],carryov:[0,7],caus:[0,1,5,10],celciu:[6,7],cell:1,celsiu:[6,7],center:[0,7],certain:7,chang:[0,1,5,6,7,8,10],channel:[0,4,5,7,8],check:5,choos:1,circl:3,circular:5,circumst:1,clean:0,clear:[0,7],clear_calibr:7,clear_command:9,click:6,client:[4,7],close:7,closer:7,code:[1,4,6,7,10],col:[0,2,5],collaps:7,collect:7,collid:1,column:3,columns_by_index:7,com:[2,4,7],combin:[0,2,3,5],combined_spe:[0,9],come:5,comma:3,command:[0,1,2,3],comment:7,common:[2,4,5,7,10],commonli:[4,5],compar:7,compat:[6,7],complet:7,compress:[4,7],comput:[3,4,7,10],condit:10,config:[0,7],config_kwarg:7,configur:7,connect:[0,6,7,10],consist:5,consolid:0,constant:1,constantli:1,construct:7,constructor:[0,1],contact:5,contain:[0,1,2,4,5,7],contamin:[1,2],context:[7,10],conveni:7,convert:0,convient:7,cool:[6,7],coordin:[0,5],copi:5,cord:7,core:7,corner:7,corning_12_wellplate_6:7,corning_24_wellplate_3:7,corning_384_wellplate_112_ul:7,corning_48_wellplate_1:7,corning_6_wellplate_16:7,correct:7,correspod:7,correspond:[7,8,9],cost:[0,7],could:[0,2,4,5,7],count:5,creat:[0,1,2,3,4],criteria:7,cross:[1,2],csv:3,csv_file:3,ctx:7,current:0,current_tip:1,current_volum:[0,3,7],curv:[0,7],custom:[0,2,5,6,7,9,10],custom_pl:5,cycl:[6,7],d10:5,data:[4,5,7,10],data_storag:5,databas:5,debug:[0,10],deck:[0,1,4],deem:6,def:7,default_max_speeds:9,defin:[0,4,6,7],definit:[5,6],defint:7,degc:7,degre:[3,6,7],delai:0,delet:[5,7],delete_contain:5,delta:7,demonstr:[1,4,5,7],depend:[1,3,4,7,8,10],deposit:3,deprec:7,deprecated:0,depth:[0,5,6],describ:[0,1,5,7,9],descript:[4,5,7,9],design:[0,4,7,9],desir:[0,4,7],dest:[0,7],destin:[0,2,3,5,7],detail:[0,10],determin:7,develop:[0,7,10],devic:[6,7],diagram:5,diamet:5,dict:[0,7],dictionari:[4,7,10],differ:[1,3,4,5,6,7,10],difficult:8,dimens:[5,7],direct:[0,1,3,5],directli:[0,4,7,8],directori:10,disc:7,disconnect:[0,7],discover_modul:6,dispens:0,dispense_flow_r:[0,8],dispense_spe:[0,7,8],displai:[4,7,10],display_nam:7,disposal_vol:[2,7],distanc:[0,5,7],distribut:0,divid:2,divis:2,doc:10,doctest:0,document:[5,6,7,10],doe:[5,7,10],doesn:[6,7],done:[1,6,7,10],down:[0,1,3,6,7],download:[4,10],downward:1,draw:1,drawn:7,drop:0,drop_tip:[0,1,2,3,4,7,9],drop_tip_curr:0,drop_tip_spe:0,droplet:[0,1,2,7],dry:[0,7],dure:[0,1,4,6,7],e10:5,each:[0,1,2,3,4,5,7],easi:[0,4,7],easier:[0,2,7],easili:5,echo:7,edg:[1,2,3,7],edit:2,editor:[5,10],eight:5,either:[0,1,6,7,8,9],element:[0,2,7],els:7,elsewher:2,elut:6,email:[4,7],empti:[1,2,7],encapsul:7,end:[2,3,5,6,7,10],engag:[6,7],enough:10,ensur:[0,5,7,10],enter:10,entir:[2,4,7],entrypoint:[0,10],enumer:7,environ:[9,10],ephemer:7,eppendorf_96_tiprack_1000_ul:7,eppendorf_96_tiprack_10_ul:7,equal:2,equival:7,eras:9,error:[0,1,2,5,6,7,10],establish:7,etc:[1,3,6,7],evalu:0,even:[2,4,5,7],evenli:2,event:7,everi:[1,2,5,7,8],everyth:9,exact:[7,10],exactli:[7,10],exampl:[0,1,2],exce:[0,7],except:[0,1,2,7],exchang:1,execut:[0,4,5,7,9,10],exist:[5,7],expect:[1,5,7],expel:1,experi:10,explan:0,expose:7,extend:7,extens:[7,10],extern:0,extra:[1,2,7],extract:7,f10:5,failur:0,fair:5,fallback_tip_length:0,fals:[0,2,7],fan:[6,7],farther:7,fast:0,featur:9,few:1,fewer:[4,7],field:[4,7],file:[0,3,4,7,10],filenam:7,fill:[0,1],find:7,finish:[1,2],first:[0,1,2,3,5,7,10],five:[3,4,7],fix:[0,1,7],fixed_trash:7,flag:7,flat:[0,1,2,3,4],flow:7,flow_rat:7,folder:10,follow:[0,1,2,3,4,5,6,7,8,9,10],forc:0,force_direct:7,format:[0,3],format_runlog:[0,10],formerli:7,found:[7,10],four:1,framework:[4,7],free:10,freez:0,frequent:[7,10],from:[0,1,2,3,4,5,6,7,8,9,10],from_cent:3,front:[5,7,9,10],full:[0,7],fulli:[0,6,7],fun:[1,4],futur:[6,7],g10:5,gantri:0,geb:0,gener:[0,4,7,10],generic_96_wellplate_380_ul:7,geometri:7,get:0,get_contain:9,get_nam:9,get_typ:9,get_virtual_devic:0,get_warn:0,github:[2,6,7],give:[1,5,7,8],given:[0,1,4,5,6,7,8,10],global:0,goal:[4,7],goe:[6,7],good:[0,7,10],goodby:9,govern:7,grace:7,gradient:0,great:10,grid:5,group:5,h10:5,h12:[1,5],habit:7,had:5,half:0,halt:0,hand:7,handl:0,handler:[0,3],hang:1,happen:[2,7,10],hardshel:[5,6],hardware_control:7,hardware_mgr:7,hardwaremanag:7,has_tip:7,have:[1,2,4,5,6,7,8,10],head:[0,1],head_spe:[0,9],heat:[6,7],height:[1,6,7],held:[7,9],hello:[9,10],help:[1,2,4,7,10],here:[0,2,5,6,7,10],high:10,higher:[0,6,7],highest_z:7,histori:9,hit:6,hold:[1,5,6,7],hold_tim:7,holder:5,home:[0,6,7],home_aft:0,home_plung:7,hope:[4,7],hopper:7,horizont:7,hover:[0,7],how:[0,1,3],howev:[0,1,2,4,5,7,10],http:2,human:[0,3,10],hw_modul:7,hw_pipett:7,icon:6,ideal:6,ident:[1,2],idl:6,idx:7,ignor:2,imag:5,immdedi:9,immedi:7,includ:[0,2,4,5,6,7],incomplet:5,incorpor:[0,7],increment:[0,7,8],indefinit:[6,7],independ:5,index:0,indicat:7,info:[0,1],inform:[6,7,9,10],infrastructur:0,inheritor:0,initi:[6,7],inner:1,input:6,insert:5,insid:[0,1,5,7,9],instac:7,instal:[2,10],instanc:[0,7,10],instanti:[0,7],instantiat:0,instead:[0,1,2,5,7],instr:7,instruct:[0,2,4,7],instrument:[0,1,2,3,4],instrument_nam:7,instrumentcontext:7,integ:7,integr:0,intent:[0,7],interact:10,interest:5,interfac:0,intern:[0,7,8,10],internal:7,interpret:[0,7],intervent:7,invalid:7,invok:10,involv:7,item:[0,7],iter:[1,5,7],itself:[0,10],json:[0,5,7],jupyt:9,just:[2,3,5,6,9],kei:[0,7],kept:7,kernel:10,keyword:[0,7],knock:1,knowledg:7,known:7,kwarg:[0,7],lab:[4,7],label:[5,7],labwar:[0,1,2,3],labware:5,labware_nam:7,labware_obj:7,lambda:[0,7],larger:[0,2],last:[0,5,7],lastmodifi:7,later:[6,7,9,10],lawbar:7,layout:7,learn:[4,7],learnpython:10,least:7,leav:2,left:[0,1,2,3,4,5,7,8,9],leftov:1,legaci:[5,7],legacy_api:0,len:[5,9],length:[0,1],less:7,letter:5,level:[0,7,10],librari:4,lid:7,lid_statu:7,lifetim:7,like:[0,1,3,4,5,6,7,10],line:[0,1,3,5,10],linear:[0,2,7],link:7,linux:10,liquid:0,list:[0,1],live:10,load:[0,1,2,3,4],load_calibr:7,load_definition_by_nam:7,load_from_definit:7,load_instru:7,load_labwar:7,load_labware_by_nam:7,load_modul:7,load_module_from_definit:7,loaded_instru:7,loaded_labwar:7,loc:7,loc_2:7,local:7,locat:[0,1,3,5,7,10],location_cach:7,log:[0,7,10],log_level:0,log_par:7,logger:7,logrecord:0,longer:7,look:[0,1,3],loop:[1,2],lot:2,lower:[0,6,7,9],lowercas:7,m300:0,made:[5,9],magbead:7,magdeck:[6,7],magneticmodulecontext:7,mai:[0,4,7,8,10],main:0,major:[0,8],make:[0,1,2,4,5,7,10],manag:[7,10],mandatori:7,mani:[0,1],manual:[0,7],map:0,margin:7,master:0,master_mix:7,match:[0,7],matter:[0,7],max:[0,1,5,7,9],max_speed_per_axi:9,max_volum:[0,2,7,8],maximum:[0,7],meant:5,meet:7,mention:[1,8],messag:[0,7,9,10],method:[0,1,5,6,7,10],micolit:1,microcentrifug:5,microlit:[0,1,2,7,8],microlitr:7,mid:7,might:1,millimet:9,millimit:7,min:[0,7],min_volum:[0,8],minim:7,minimum:2,minimum_z_height:7,minut:[0,1,7],mive:1,mix:0,mix_aft:[0,2,3,7],mix_befor:[0,2,7],mode:7,model:[0,5,7],model_offset:0,modifi:7,modulegeometri:7,modulespec:7,more:[0,1,2,3,4,7,10],most:[0,2,4,5,7,10],motion:[0,7,9],motor:[0,7,9],mount:[0,1,2,3,4,7],mount_obj:0,move:0,move_to:[0,1,3,7],movement:1,msg:[0,7],much:[1,4,7],multi:[5,7],multipl:[0,1],must:[0,1,2,3,4,5,6,7,8,10],my_contain:5,my_fil:3,my_labwar:5,my_protocol:10,name:[0,4],namedtupl:7,natur:2,navig:[6,7],nearli:[1,2],need:[0,1,4,5,6,7,10],neg:[6,7],neither:7,nest:[0,7],never:0,new_loc:7,new_tip:[0,2,7],next:[0,1,4,7,10],next_tip:7,nomin:0,non:[4,7],none:[0,7],nonetyp:7,nor:[0,7],normal:5,note:[0,1,5,6,7,10],notebook:[4,7],notipattachederror:7,now:[1,7,8,9,10],nozzl:7,num_channel:7,num_tip:7,number:[0,1,2,3,5,7,10],object:[0,1,7,8],obscur:7,obstacl:0,obstruct:7,occur:[0,7],off:[1,5,6,7],offer:8,offlin:0,offset:[0,1,6,7],often:7,old:[1,7],onc:[0,2,5,7],once:[1,5,6,10],onli:[0,1,5,6,7,8,9,10],only:[0,7,10],open:[3,6,7,10],opentron:[0,1,2,3],opentrons_15_tuberack_15_ml_falcon:7,opentrons_24_aluminum_tuberack_2_ml:7,opentrons_24_tuberack_1:7,opentrons_24_tuberack_2_ml_eppendorf:7,opentrons_24_tuberack_2_ml_screwcap:7,opentrons_6_tuberack_falcon_50_ml:7,opentrons_6x15_ml_4x50_ml_tuberack:7,opentrons_96_aluminum_biorad_plate_200_ul:7,opentrons_96_aluminum_tuberack_200_ul:7,opentrons_96_tiprack_1000_ul:7,opentrons_96_tiprack_10_ul:7,opentrons_96_tiprack_300_ul:7,opentrons_simul:[0,10],oper:[3,7],operat:10,opposit:1,opt:4,option:[0,1],order:[1,5,6,7,9],ordere:7,org:10,organ:5,origin:[0,1],osx:10,ot1:[5,7],ot2:[4,5,7],other:[0,2,4,5,6,7,10],otherwis:6,our:[1,2,5,6,8,10],output:[0,7,10],outsid:[6,7],over:[0,1,2,5,7],overallheight:7,overrid:7,own:[4,5,9],p10:7,p10_singl:7,p24:5,p300:[0,3],p300_multi:0,p300_mutli:8,p300_singl:[0,1,2,3,4,7],packag:10,page:[3,9,10],pair:[0,5],param:[0,7],paramet:[0,4,6,7,8,9],parent:[7,9],part:5,particular:[5,7],particularli:10,pass:[0,1,2,5,7,10],past:[5,7,9],path:[3,10],paus:[0,1,6,7],payload:0,per:[0,5,7,9],percentag:0,perform:[0,1,2,3,7],peripher:7,phase:6,physic:[0,7],pick:0,pick_up_curr:[0,7],pick_up_dist:0,pick_up_incr:0,pick_up_press:0,pick_up_spe:0,pick_up_tip:[0,1,2,3,4,7,9],piec:7,pip:10,pipettenotattachederror:7,place:[0,4],placeabl:[0,7],plai:7,plan:[0,1],plate:[0,1,2],plate_nam:5,pleas:[1,5,7],plug:6,plunger:[0,7],plunger_curr:0,plunger_posit:0,point:0,popular:10,port:0,posit:[0,1,5,6,7],possibl:7,power:[6,7],preced:7,preceed:0,predict:8,prefer:3,prefix:7,prepar:5,presenc:7,present:[4,7],preserv:7,press:[0,1,7,9],prevent:[1,7],previou:1,previous:[1,5,7,9],primarili:[7,8],print:[1,5,9,10],prior:7,probabl:0,problem:[0,10],proce:0,procedur:5,process:5,program:[5,6,10],project:7,prompt:10,propag:0,propagate_log:0,properli:[7,10],properti:7,proport:7,protcolcontext:7,protocol:[0,1,2,3,4,5,6],protocol_api:7,protocol_context:7,protocol_fil:[0,10],protocolcontext:7,protocolnam:[4,7],provid:[0,2,6,7,10],pull:[1,7],purpos:[0,1],push:1,put:[0,7],pyenv:10,python:[0,1,3,4,5,7,9],queue:0,quirk:[0,7],quirks_from_any_par:7,rack:0,rack_1:1,rack_2:1,radiu:[0,3,7],rais:[0,1,2,7],ramp:7,ramp_rat:7,randomli:3,rang:[1,3,5,6,7],rare:7,rate:[0,7],rather:7,reach:1,read:[0,2,3,4],readabl:[0,4,7,10],real:[0,6],realiti:7,realli:2,reason:7,recommend:[2,4,7,10],record:9,referenc:[5,7],refil:3,refresh:6,regardless:7,rel:[0,4,7],relat:[0,7],relative_vector:0,releas:0,relev:9,reliabl:5,remain:[0,1,7],rememb:7,remov:[0,1,7,8,9,10],render:[4,7],repeat:[0,10],repetit:[0,1,2,7],replac:7,repo:7,repres:[0,3,6,7],request:7,requir:[0,5,7,8,9,10],reservoir:5,reset:0,resolut:6,respect:7,rest:5,result:[0,3,7],resum:[0,7,9],retract:7,retriev:7,return_tip:[0,1,3,7],revers:5,review:0,revis:5,rewrit:[4,7],right:[0,1,4,5,7,8,9],rigor:7,rise:6,risk:1,robot_config:[7,9],role:7,root:0,rotat:3,roughli:6,routin:7,row:[1,2,3],rows_by_index:7,run:[0,1,3,4,5,6],runlog:[0,10],runtim:0,runtimeerror:7,safe:7,sai:[1,7],same:[2,3,4,5,6,7],sampl:3,samples_rack:5,save:[0,2,3,5,7,10],save_calibr:7,save_tip_length:7,scale:5,scenario:[2,5],scientist:[4,7],script:[0,10],seal:[0,1,7],sec:[0,7,9],second:[0,1,2,7,8,9],section:[1,4,5,7,8,9],see:[0,4,5,7,9,10],seem:[4,7],self:[0,7],send:[1,7],sensit:5,sent:[0,7],separ:[3,7],seper:0,sequenc:[1,7],sequenti:[0,7],seri:[1,2,5],serial:0,server:[0,4,7],set:[0,1,2,4,5],set_calibr:7,set_flow_r:[0,1],set_spe:0,set_temp:7,set_temperatur:[6,7],sever:7,shape:7,share:6,should:[0,4,5,6,7,10],shouldn:4,show:[1,3],side:[0,7],similar:10,similarli:5,simpl:[2,4,5,7,10],simpli:[0,1,6,7,10],simplifi:[4,7],sinc:[0,1,7],singl:[0,1,2,4,5,7,8],skill:[0,4,7],skip:0,slide:1,slightli:10,slot:[0,4,5,6,7],slot_numb:7,small:7,smaller:[0,2,7],smoothi:[0,9],snapcap:5,softwar:6,some:[1,2,3,5,7,10],sometim:10,sort:7,sourc:[0,1,2,3,4,5,7],space:[2,5,7],special:7,specialti:5,specif:[0,4,5,7,9,10],specifi:[0,1,5,6,7,8],speed:0,spend:5,split:[0,3,7],splitlin:3,spread:3,stack:0,stage:[6,7,10],standalon:5,standard:[4,5,7],start_at_tip:1,start_wel:7,state:[0,6,7],step:[0,1,2,7,9,10],still:[6,9],stop:[0,3,5,6,7,10],store:[0,7,10],str:[0,7],straight:[0,1,3],strategi:[0,1,3],string:[0,5,6,7,10],structur:[7,10],stuck:6,style:7,subject:[0,6,8],sublim:10,success:[0,7],successfulli:10,suggest:10,support:[0,5,6,7],sure:[1,7,10],system:[0,3,5,7],tab:6,tabl:7,take:[1,2,5,6,7],tallest:7,target:[0,1],target_temp:7,target_wel:7,task:7,technic:7,tell:[1,2,4,5,7,10],temp:7,temp_connect:7,temp_mod:7,temp_plat:7,tempdeck:[6,7],temperatur:5,temperaturemodulecontext:7,temporarili:7,tend:[4,7],term:7,termin:10,test:[6,10],text:[0,10],than:[2,6,7],thei:[2,5,6,7,8,9,10],them:0,therefor:5,thermocycl:7,thermocyclercontext:7,thermocyclergeometri:7,theta:3,thi:[0,1,2,3,4,5,6,7,8,9,10],thing:[1,3,7],third:[0,5,7],those:[0,1,2,3,6],though:[2,4,5,7],thought:9,three:[0,1,7],through:0,time:[0,1,2,3,5,6,7],tip:0,tip_rack:[0,1,2,3,4,7,9],tip_rack_1:1,tip_rack_2:1,tip_rack_300ul:0,tiplength:7,tiprack2:0,tiprack:[0,1,2,3,4],tiprack_1:3,tiprack_2:3,tips_left:1,tool:10,top:[0,1,7],touch:0,touch_tip:[0,1,2,7],track:0,tracker:7,trajectori:0,transfer:0,transfertippolici:7,trash:[0,1],trash_contain:[0,1,7],trash_container:1,travel:[0,7],treat:[5,7],tree:[2,7],trough:[3,4],tube:4,tupl:[0,2,3,7],turn:[6,7,10],tutori:[4,7,10],twice:[0,10],two:[0,1,5,6,7],type:[0,4,5],typic:[0,5,7],ul_per_mm:0,uncom:1,under:[1,5,7],understand:[4,7,10],union:7,uniqu:5,unit:[7,9],unless:[6,10],unlike:7,unload:7,unnam:5,unspecifi:7,until:[0,1],unusu:7,updat:[1,6,7],update:7,update_config:7,upload:[6,10],upon:[3,6,10],upward:1,usa_scientific_12_trough_22_ml:7,usag:[1,4],usb:7,use:[0,4,5],use_tip:7,user:[0,7],username:10,using:[0,10],usual:[4,7],usualli:[1,7],v_offset:[0,7],vacuum:1,valid:[0,6,7],valu:[0,1,2,3,5,6,7,8,9],vari:8,variabl:[3,7,10],variou:3,vector:[0,3],veri:[1,5],version:[0,6],vertic:9,via:[6,10],view:7,virtual:[0,10],visual:5,volum:[0,1],wai:[0,2,4,5,7,10],wait:1,wait_for_temp:[6,7],walk:7,wall:1,want:[1,5,6,9,10],warn:[0,8],water_volum:3,webpag:5,websit:8,well:[0,1],well_bottom_clear:7,well_edg:3,well_prop:7,wells_by_index:7,wellseri:5,wellshap:7,were:[3,4,7],wetlab:[4,7],what:[1,2,5,6,7,8,10],whch:10,when:[0,1,2,3,4,5,6,7,8,9,10],whenev:[1,7],where:[0,1,2,3,5,6,7],whether:[0,6,10],which:[0,1,2,5,6,7,8,9,10],whichev:[9,10],who:9,whose:7,window:[0,3,10],wish:[0,2,9],within:[0,1,2,3,4,5,6,7],without:[0,1,7,8,10],world:10,worst:7,would:[0,1,4,5,6,7],wrap:5,write:[0,1,4,5,7,10],x64:10,x86:10,yet:[6,7],you:[0,1,2,3,4,5,6,7,8,9,10],your:[0,1,2,3,4,5],zero:[0,5,7]},titles:["API Reference","Atomic Liquid Handling","Complex Liquid Handling","Examples","Opentrons API","Labware","Hardware Modules","Opentrons API Version 2","Creating a Pipette","Advanced Control","Design with Python"],titleterms:{"1000ul":5,"10ul":5,"12row":5,"15_50ml":5,"15ml":5,"200ul":5,"2ml":5,"300ul":5,"50ml":5,"75ml":5,"function":7,"import":4,"new":2,"return":[1,2],access:5,advanc:9,after:2,air:[1,2,3],aluminum:5,alwai:2,api:[0,4,7],aspirat:1,atomic:1,attach:1,basic:[2,3],befor:2,beginn:10,block:5,blow:[1,2],check:6,chem:5,clear:9,column:5,command:[4,9],comment:9,complex:2,configur:10,consolid:2,constructor:8,contain:9,control:[1,9],coordin:7,creat:[5,8],current:[1,6],deactiv:6,deck:[5,6,7],deep:5,definit:7,delai:1,design:10,detect:6,dilut:3,disengag:6,dispens:1,dispos:2,distribut:2,drop:1,engage:6,eppendorf:5,exampl:3,few:2,flat:5,flow:8,gap:[1,2,3],get:[1,2,9],gradient:2,handl:[1,2],hardwar:6,head:9,home:9,how:[4,7],index:5,individu:5,install:10,installat:10,instrument:7,iterat:1,jupyt:10,labwar:[4,5,7],larg:2,length:5,librari:5,liquid:[1,2],list:[2,5],load:[5,6],local:10,look:[4,7],loop:3,magnet:6,mani:2,map:3,maximum:8,metadata:[4,7],minimum:8,mix:[1,2],model:8,modul:[5,6,7],modular:5,mount:8,move:1,multipl:[2,3,5],name:5,never:2,non:10,notebook:10,old:8,one:2,onto:6,opentron:[4,5,7],option:2,organiz:[4,7],out:[1,2],p1000_singl:8,p10_multi:8,p10_singl:8,p300_multi:8,p300_singl:8,p50_multi:8,p50_singl:8,paus:9,pcr:5,pick:1,pipet:3,pipett:[0,1,4,7,8],place:5,plate:[3,5],plunger:8,point:5,precis:3,protocol:[7,10],python:10,rack:[1,5],rate:8,reach:6,read:6,refer:0,reset:[1,9],robot:[0,5,6,10],row:5,run:7,screwcap:5,select:1,set:6,setpoint:6,simul:[0,10],slice:5,specifi:9,speed:[1,9],start:1,statu:6,storag:10,strip:5,tall:5,target:6,temperatur:6,through:1,tip:[1,2],tiprack:5,touch:[1,2],track:1,transfer:[2,3],trash:2,trough:5,tube:5,tuberack:5,type:7,until:6,useful:7,user:9,version:7,volum:[2,8],wait:6,well:[2,5,7],work:10,your:6}})