/**
 * @author Thomas Breitbach
 */
Highcharts.setOptions({
	colors: ['#80ba24', ' #4a5c66']
});

Ext.define('studiplaner.form.ModuleForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.moduleform',
    chart: null,
    workloadPerWeek: 0,
    presencePerWeek: 0,
    selfStudyPerWeek: 0,
    
    requires: [
    	"Ext.form.FieldSet",
    	'Ext.SegmentedButton',
    	'Ext.field.Number'
    ],
    config: {
        title: 'ModuleForm',
        scrollable:'vertical',
        
        items: [
        	{
        		xtype: "toolbar",
        		docked: "top",
        		itemId: 'topToolbar',
        		cls: 'two-buttons',
        		title: "Neues Modul",
        		items: [
        			{
        				xtype: "button",
        				ui: "back",
        				text: 'Zurück',
        				iconCls: '',
        				itemId: "backButton"
        			}, {
        				xtype: "spacer"
        			}, {
        				xtype: "button",
        				ui: "action",
        				text: "",
        				iconCls: 'search',
        				itemId: "searchButton"
        			}
        		]
        	}, {
				xtype: "fieldset",
        		itemId: "type",
        		instructions: '"Normal": Normales Modul - "Block": Blockmodul - "ohne Vorl.": ohne Vorlesung/Nachschreibeklausur',
        		items: [{
					title: 'typeLabel',
					html: ['Moduleart'],
					styleHtmlContent: true,
					margin: '0 0 0 -8px'
				}, {
					xtype: 'segmentedbutton',
					itemId: 'typeButton',
					margin: '0 4 10px 4',
					allowMultiple: false,
					layout:{
						type:'hbox',
						align:'center',
						pack:'center'
					},
					items: [
						{
							text: 'Normal',
							width: '32%',
							id: 'normal',
							value: 0
						},
						{
							text: 'Block',
							width: '32%',
							id: 'block',
							value: 1
						},
						{
							text: 'ohne Vorl.',
							width: '32%',
							id: 'ov',
							value: 2
						}
					]
				}]
			}, {
        		xtype: "fieldset",
        		itemId: "fields",
        		items: [
					 {
		                name: 'name',
		                xtype: 'textfield',
		                label: 'Name*'
		            }, {
		                name: 'ects',
		                xtype: 'numberfield',
		                itemId: 'numberfield_ects',
		                label: 'ECTS'
		            }, {
		                name: 'sws',
		                xtype: 'numberfield',
		                label: 'SWS',
		                itemId: 'numberfield_sws'
		            },{
						xtype: 'panel',
						title: '',
						itemId: 'chart',
						width: '95%',
						height: '250px'
					}
        		]
        	},{
				xtype: "fieldset",
        		itemId: "bla",
        		instructions: 'Durch die Wahl des persönlichen Interesses und des eingeschätzen Schwierigkeitsgrades kannst du den zu leistenden Workload für das Modul beeinflussen.',
        		items: [
				{
					title: 'yourInterest',
					html: ['Persönliches Interesse'],
					styleHtmlContent: true,
					margin: '0 0 0 -8px'
				}, {
					xtype: 'segmentedbutton',
					itemId: 'interestButton',
					margin: '0 0 15px 0',
					allowMultiple: false,
					layout:{
						type:'hbox',
						align:'center',
						pack:'center'
					},
					items: [
						{
							//~ text: 'Hoch',
							id: 'interest_good',
							width: '32%',
							value: 0,
							iconCls: 'happy',
							iconMask: true							
						},
						{
							//~ text: 'Mittel',
							id: 'interest_medium',
							width: '32%',
							value: 1,
							pressed: true,
							iconCls: 'smiley',
							iconMask: true
						},
						{
							//~ text: 'Niedrig',
							id: 'interest_bad',
							width: '32%',
							value: 2,
							iconCls: 'sad',
							iconMask: true
						}
					]
				
				}, {
					title: 'yourServerity',
					html: ['Eingeschätzter Schwierigkeitsgrad'],
					styleHtmlContent: true,
					margin: '0 0 0 -8px'
				},  {
					xtype: 'segmentedbutton',
					itemId: 'severityButton',
					allowMultiple: false,
					margin: '0 0 10px 0',
					layout:{
						type:'hbox',
						align:'center',
						pack:'center'
					},
					items: [
						{
							//~ text: 'Hoch',
							id: 'severity_good',
							width: '32%',
							value: 0,
							iconCls: 'happy'
						},
						{
							//~ text: 'Mittel',
							id: 'severity_medium',
							width: '32%',
							value: 1,
							pressed: true,
							iconCls: 'smiley'
						},
						{
							//~ text: 'Niedrig',
							id: 'severity_bad',
							width: '32%',
							value: 2,
							iconCls: 'sad'
						}
					]
				
				}]
			}, {
                xtype: 'button',
                text: 'Hinzufügen',
                ui: 'confirm',
                margin: '40 6 15 6',
                itemId: "addButton"
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
        				itemId: "deleteButton"
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
				delegate: "#typeButton",
        		event: "toggle",
        		fn: "onSegmentedButtonToggle"
			}, {
				delegate: "#interestButton",
        		event: "toggle",
        		fn: "onSegmentedButtonToggle"
			}, {
				delegate: "#severityButton",
        		event: "toggle",
        		fn: "onSegmentedButtonToggle"
			}, {
				delegate: '#numberfield_ects',
				event: 'change',
				fn: 'onNumberFieldChange'
			}, {
				delegate: '#numberfield_sws',
				event: 'change',
				fn: 'onNumberFieldChange'
			}
        ]        
    },
    
    initialize: function(){
		this.callParent(arguments);
	},
    
    //Listener functions
    onBackButtonTap: function(){
    	console.log("backToHomeCommand");
		this.fireEvent("backToHomeCommand", this);
    },
    onAddButtonTap: function(){
    	console.log('saveModuleCommand');
    	this.fireEvent('saveModuleCommand', this);
    }, 
    onDeleteButtonTap: function () {
	    console.log("deleteNoteCommand");
	    this.fireEvent("deleteModuleCommand", this);
	},
    onSegmentedButtonToggle: function (container, button, isPressed, eOpts){
		console.log("segmentedButtonCommand");
		if(isPressed){
			this.fireEvent('segmentedButtonCommand', this, container, button);
		}
	},
	onNumberFieldChange: function (field, newValue, oldValue, eOpts){
		console.log("numberFieldChange");
		this.fireEvent('numberFieldChangedCommand', this, field, newValue, oldValue, eOpts);
	}
});
