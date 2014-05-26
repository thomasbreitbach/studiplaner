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
		                label: 'Name'
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
    
    initialize: function(){	
		this.addWorkingTimeToFieldset(this.counter);
	},
	
	addWorkingTimeToFieldset: function(id){
		var label = {
			title: 'times',
			html: ['Arbeitszeit ' + (id+1)],
			styleHtmlContent: true,
		};	
		var delButton = {
			xtype: 'button',
			iconCls: 'delete',
            iconMask: true,
            itemId: ''+id,
            handler: this.onDeleteWorkingTimeButtonTap,
        	scope: this,
            ui: 'plain',
            width: '40px',
            height: '40px'
		};
		var hbox = Ext.create('Ext.Container', {
			height: '60px',
			layout:{
				type:'hbox',
				align:'center',
				pack:'center'
			}	
		});
		hbox.add([label, { xtype: 'spacer' }, delButton]);
		var weekday = {
			xtype: 'selectfield',
			label: 'Tag',
			itemId: 'day' + id,
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
		
		};
		var begin = {
			xtype: 'timepickerfield',
			label: 'Beginn',
			itemId: 'beginTime' + id,
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
		};
		var end = {
			xtype: 'timepickerfield',
			label: 'Ende',
			itemId: 'endTime' + id,
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
		};
		
		var fieldset = Ext.create('Ext.form.FieldSet', {
        		itemId: "coreData"+id,
        });
		fieldset.add([hbox, weekday, begin, end]);		
		this.down('#timeContainer').add(fieldset);	
		this.counter++;
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
    onAddWorkingTimeButtonTap: function(){
		console.log('addWorkingTimeCommand');
    	this.fireEvent('addWorkingTimeCommand', this);
	},
	onDeleteWorkingTimeButtonTap: function(button, e, eOpts){
		console.log('delWorkingTimeCommand');
		this.fireEvent('delWorkingTimeCommand', this, button);
	}
});
