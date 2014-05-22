/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.form.WorkForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.workform',
    
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
		            }, {
						title: 'times',
						html: ['Arbeitszeiten'],
						styleHtmlContent: true
					}, {
						xtype: 'selectfield',
						label: 'Tag',
						usePicker: 'true',
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
					
					}, {
						xtype: 'timepickerfield',
						label: 'Beginn',
						itemId: 'beginTime',
						value: new Date(),
						dateFormat: 'H:i',
						picker: {
							useMeridiem: false,
							startHour: 1,
							endHour: 24,
							startMinute: 0,
							endMinute: 59,
							hourText: 'Stunde',
							minuteText: 'Minute',
							slotOrder: [
								'hour',
								'minute'
							]
						}
					}, {
						xtype: 'timepickerfield',
						label: 'Ende',
						itemId: 'endTime',
						dateFormat: 'H:i',
						value: new Date(),
						picker: {
							useMeridiem: false,
							startHour: 1,
							endHour: 24,
							startMinute: 0,
							endMinute: 59,
							hourText: 'Stunde',
							minuteText: 'Minute',
							slotOrder: [
								'hour',
								'minute'
							]
						}
					}
        		]
        	}, {
                xtype: 'button',
                text: 'Hinzufügen',
                ui: 'confirm',
                itemId: "addButton",
                margin: '50 5 15 5',
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
