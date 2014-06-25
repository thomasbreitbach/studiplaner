/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.view.workload.OverviewListContainer', {
	extend: 'Ext.Container',
	xtype: 'workloadoverviewlistcontainer',
	inEditMode: false,

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
        	iconCls: 'edit',
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
    		itemId: 'modulesList',
    		cls: ['overview-list-disclosure', 'overview-list-hidden-disclosure'],
    		store: Ext.getStore("Modules"),
    		itemHeight: 47,
    		listeners: {
       		 	itemtap: { fn: this.onModulesListTap, scope: this }
        	},
        	onItemDisclosure:true,
        	grouped: false,
        	flex:1
    	};  
    	
    	var workListHeader = {
            html: '<div class="workload-overview-list-header">Arbeitszeiten</div>',
            height: 35
		};
    	
    	var workList = {
    		xtype: "worklist",
    		itemId: 'workList',
    		cls: ['overview-list-disclosure', 'overview-list-hidden-disclosure'],
    		store: Ext.getStore("Work"),
    		itemHeight: 47,
    		listeners: {
       		 	itemtap: { fn: this.onWorkListTap, scope: this }
        	},
        	onItemDisclosure:true,
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
    	this.fireEvent('deleteModuleCommand', this, record);
	},
	onWorkListTap: function (list, index, target, record, evt, options) {
    	this.fireEvent('deleteWorkCommand', this, record);
	}
});

