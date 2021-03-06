/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
Ext.Loader.setConfig({
    enabled : true,
    paths   : {
        'Ext.ux': 'ux'
    }
});

//~ Ext.Loader.setPath('Ext.ux.field.TimePicker', 'ux/field/TimePicker.js');
//~ Ext.Loader.setPath('Ext.ux.picker.Time', 'ux/picker/Time.js');

Ext.application({
    name: 'studiplaner',

    requires: [
        'Ext.MessageBox',
        'Ext.data.Validations',
        'studiplaner.form.ExportForm'
    ],

    views: [
		'SlideMenu', 'LockableCarousel',
        'modules.ModulesListContainer', 'modules.ModulesList', 
        'work.WorkListContainer', 'work.WorkList',
        'workload.WorkloadContainer', 'workload.OverviewListContainer', "workload.WorkloadWorkList", "workload.WorkloadModulesList",
        'schedule.ScheduleContainer', 'schedule.ScheduleCarousel', 'schedule.ScheduleDayContainer', 'schedule.BlocksList', 'schedule.ScheduleBlock',
		'imprint.ImprintContainer'
    ],
    controllers: [
    	'App', 'Modules', 'Work', 'Workload', "Schedule", "Export"
    ],
    forms: ['ModuleForm', 'WorkForm', 'ExportForm'],
    models: ['BaseModel', 'Module', 'Work', 'WorkingTime', 'ScheduleBlock', 'ExportMail'],
    stores: ['Modules' , 'Works', 'WorkingTimes', 'ScheduleBlocks'],


    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        
        //add custom validations for forms
        Ext.applyIf(Ext.data.Validations, {
 
			checkEcts: function (config, value) {
				if(arguments.length === 1){
					 value = config;
				} 
				return value <= 50 && value > -1;
			},
			
			checkSws: function (config, value) {
				if(arguments.length === 1){
					 value = config;
				}
				return value <= 50 && value > -1;
			}
		});
	
		Ext.create('studiplaner.form.ModuleForm');
		Ext.create('studiplaner.form.WorkForm');
		Ext.create('studiplaner.view.workload.OverviewListContainer');
		
		var modulesListContainer = {
			xtype: "moduleslistcontainer"
		};
		var workListContainer = {
			xtype: "worklistcontainer"
		};	
		var workloadContainer = {
			xtype: "workloadcontainer"
		};
		var scheduleContainer = {
			xtype: "schedulecontainer"
		};
		var exportform = Ext.create("studiplaner.form.ExportForm");
		var imprintContainer = {
			xtype: "imprintcontainer"
		};
	
		studiplaner.view.SlideMenu.setMenu();
		//~ Ext.Viewport.getMenus().left.items.items[0].container.getItems().items[0].addCls('x-item-selected');
		
		
        // Initialize the main view
        Ext.Viewport.add([modulesListContainer, workListContainer, workloadContainer, scheduleContainer, exportform, imprintContainer]);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "App Update",
            "Die App wurde gerade auf die neuste Version aktualisiert. Möchtest du das Update jetzt anwenden?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
