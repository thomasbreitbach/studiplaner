/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.form.WorkForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.workform',
    
    requires: [
    	"Ext.form.FieldSet",
    	'Ext.field.Number'
    ],
    
    config: {
        title: 'WorkForm',
        scrollable:'vertical',
              
        items: [
			{
        		xtype: "toolbar",
        		docked: "top",
        		itemId: 'topToolbar',
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
        		items: [
        			{
		                name: 'name',
		                xtype: 'textfield',
		                label: 'Name'
		            }, {
		                name: 'location',
		                xtype: 'textfield',
		                label: 'Ort'
		            }
        		]
        	}, {
				title: 'times',
				html: ['Arbeitszeiten'],
				styleHtmlContent: true
			}, {
				xtype: 'fieldset',
                items: [{
                    xtype: 'selectfield',
                    label: 'Tag',
                    usePicker: 'auto',
                    options: [{
						text: 'Montag',
						value: 0
					}, {
						text: 'Dienstag',
						value: 1
					}, {
						text: 'Mittwoch',
						value: 2
					}, {
						text: 'Donnerstag',
						value: 3
					}, {
						text: 'Freitag',
						value: 4
					}, {
						text: 'Samstag',
						value: 5
					}, {
						text: 'Sonntag',
						value: 6
					}]
                }]
			}, {
				xtype: 'timepicker',
				useTitles: true,
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
			}
        ]     
    },
    
    //Listener functions
    onBackButtonTap: function(){
    	console.log("backToHomeCommand");
		this.fireEvent("backToHomeCommand", this);
    }
});
