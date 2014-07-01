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
        'Ext.MessageBox'
    ],

    views: [
		'SlideMenu',
        'modules.ModulesListContainer', 'modules.ModulesList', 
        'work.WorkListContainer', 'work.WorkList',
        'workload.WorkloadContainer', 'workload.OverviewList', 'workload.OverviewListContainer', "workload.WorkloadWorkList", "workload.WorkloadModulesList",
        'schedule.ScheduleContainer', 'schedule.ScheduleCarousel', 'schedule.ScheduleMenu'
    ],
    controllers: [
    	'App', 'Modules', 'Work', 'Workload', "Schedule"
    ],
    forms: [
    	'ModuleForm', 'WorkForm'
    ],
    models: ['Module', 'Work', 'WorkingTime'],
    stores: ['Modules' , 'Work', 'WorkingTime'],


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
	
		studiplaner.view.SlideMenu.setMenu();
		//~ Ext.Viewport.getMenus().left.items.items[0].container.getItems().items[0].addCls('x-item-selected');
		
		studiplaner.view.schedule.ScheduleMenu.setMenu();
		
        // Initialize the main view
        Ext.Viewport.add([modulesListContainer, workListContainer, workloadContainer, scheduleContainer]);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
});
