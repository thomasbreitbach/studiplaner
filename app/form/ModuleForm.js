Ext.define('studiplaner.form.ModuleForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.moduleform',
    requires: "Ext.form.FieldSet",
    config: {
        title: 'ModuleForm',
        scrollable:'vertical',
        
        items: [
        	{
        		xtype: "toolbar",
        		docked: "top",
        		title: "Neues Modul",
        		items: [
        			{
        				xtype: "button",
        				ui: "back",
        				text: "Zurück",
        				itemId: "backButton"
        			}
        		]
        	},
        	{
        		xtype: "fieldset",
        		items: [
        			{
		                name: 'name',
		                xtype: 'textfield',
		                label: 'Name'
		            },
		            {
		                name: 'ects',
		                xtype: 'textfield',
		                label: 'ECTS'
		            },
		            {
		                name: 'sws',
		                xtype: 'textfield',
		                label: 'SWS'
		            },
		            {
		                xtype: 'button',
		                text: 'Hinzufügen',
		                ui: 'confirm'
		            }
        		]
        	},
            
        ],
        listeners: [
        	{
        		delegate: "#backButton",
        		event: "tap",
        		fn: "onBackButtonTap"
        	}
        ]        
    },
    
    //Listener functions
    onBackButtonTap: function(){
    	console.log("backToHomeCommand");
		this.fireEvent("backToHomeCommand", this);
    }
});