/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.workload.OverviewListContainer', {
	extend: 'Ext.Container',
	xtype: 'workloadoverviewlistcontainer',

	requires: [
		'Ext.Menu',
		'Ext.dataview.List'
	],
	  
  	config: {
		layout: {
        	type: 'vbox'
    	}
  	},

  	initialize: function(){
		this.callParent(arguments);
	
		var backButton = {
            xtype: "button",
        	iconCls: '',
        	text: 'Zurück',
        	ui: 'back',
        	handler: this.onBackButtonTap,
        	scope: this
		};
	
		var editButton = {
            xtype: "button",
        	iconCls: 'compose',
        	//~ text: 'Bearbeiten',
        	ui: 'action',
        	handler: this.onEditButtonTap,
        	scope: this
		};

		var topToolbar = {
		    xtype: "toolbar",
		    title: 'Übersicht',
		    docked: "top",
		    items: [
				backButton,
		        { xtype: 'spacer' },
		        editButton
		    ]
		};
		
		var moduleListHeader = {
            html: '<div class="workload-overview-list-header">Module</div>',
            height: 35
		};

		var moduleList = {
    		xtype: "moduleslist",
    		store: Ext.getStore("Modules"),
    		listeners: {
       		 	itemtap: { fn: this.onModulesListTap, scope: this }
        	},
        	onItemDisclosure:false,
        	grouped: false,
        	flex:1
    	};  
    	
    	var workListHeader = {
            html: '<div class="workload-overview-list-header">Arbeitszeiten</div>',
            height: 35
		};
    	
    	var workList = {
    		xtype: "worklist",
    		store: Ext.getStore("Work"),
    		listeners: {
       		 	itemtap: { fn: this.onModulesListTap, scope: this }
        	},
        	onItemDisclosure:false,
        	grouped: false,
        	flex:1
    	};   
    	this.add([topToolbar, moduleListHeader, moduleList, workListHeader, workList]);
	},
	
	onBackButtonTap: function (){
		this.fireEvent("backCommand", this);
	},	  
  	onEditButtonTap: function () {
    	this.fireEvent("editListCommand", this);
	},	
	onModulesListTap: function (list, index, target, record, evt, options) {
    	this.fireEvent('editModuleCommand', this, record);
	}
});

