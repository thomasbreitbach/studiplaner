/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.form.WorkForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.workform',
    counter: 0,
    
    requires: [
    	"Ext.form.FieldSet",
    	'Ext.field.Select',
    	'Ext.ux.field.TimePicker',
    	'Ext.ux.picker.Time'
    ],
    
    config: {
        title: 'WorkForm',
        scrollable:'vertical',
              
        items: [
			{
        		xtype: "toolbar",
        		docked: "top",
        		itemId: 'topToolbar',
        		cls: 'two-buttons',
        		title: "Neue Arbeitsstelle",
        		items: [
        			{
        				xtype: "button",
        				ui: "back",
        				text: 'Zurück',
        				iconCls: '',
        				itemId: "backButton"
        			}
        		]
        	}, {
        		xtype: "fieldset",
        		itemId: "coreData",
        		items: [
        			{
		                name: 'name',
		                xtype: 'textfield',
		                label: 'Name*'
		            }, {
		                name: 'location',
		                xtype: 'textfield',
		                label: 'Ort'
		            }
        		]
        	}, {
				xtype: 'container',
				itemId: 'timeContainer'
			}, {
                xtype: 'button',
                text: 'Hinzufügen',
                ui: 'confirm',
                itemId: "addButton",
                margin: '15 5 15 5',
            }, {
        		xtype: "toolbar",
        		docked: "bottom",
        		itemId: "bottomToolbar",
        		title: "",
        		items: [
					{
        				xtype: "button",
        				ui: "action",
        				text: '',
        				iconCls: 'trash',
        				itemId: "deleteButton",
        			}, {
        				xtype: "button",
        				ui: "action",
        				text: 'Arbeitszeit',
        				iconCls: 'add',
        				itemId: "addWorkingTimeButton",
        			}
        		]
        	}
        ],
        listeners: [
        	{
        		delegate: "#backButton",
        		event: "tap",
        		fn: "onBackButtonTap"
        	}, {
        		delegate: '#addButton',
        		event: 'tap',
        		fn: 'onAddButtonTap'
        	}, {
				delegate: "#deleteButton",
        		event: "tap",
        		fn: "onDeleteButtonTap"
			}, {
				delegate: "#addWorkingTimeButton",
        		event: "tap",
        		fn: "onAddWorkingTimeButtonTap"
        	}
        ]     
    },
    
    //Listener functions
    onBackButtonTap: function(){
    	console.log("backToHomeCommand");
		this.fireEvent("backToHomeCommand", this);
    },
    onAddButtonTap: function(){
    	console.log('saveWorkCommand');
    	this.fireEvent('saveWorkCommand', this);
    },
    onDeleteButtonTap: function(){
		console.log('deleteButtonCommand');
		this.fireEvent('deleteWorkCommand', this);
	},
    onAddWorkingTimeButtonTap: function(){
		console.log('addWorkingTimeCommand');
    	this.fireEvent('addWorkingTimeCommand', this);
	},
	onDeleteWorkingTimeButtonTap: function(button, e, eOpts){
		console.log('delWorkingTimeCommand');
		this.fireEvent('delWorkingTimeCommand', this, button);
	}
});
