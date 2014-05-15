Ext.define('studiplaner.form.ModuleForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.moduleform',
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
        		title: "Neues Modul",
        		items: [
        			{
        				xtype: "button",
        				ui: "back",
        				text: '',
        				iconCls: 'arrow_left',
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
				xtype: 'segmentedbutton',
				itemId: 'typeButton',
				allowMultiple: false,
				margin: '10px',
				layout:{
					type:'hbox',
					align:'center',
					pack:'center',
				},
				items: [
					{
						text: 'Normal',
						pressed: true,
						width: '33%',
						id: 'normal',
						value: 0
					},
					{
						text: 'Block',
						width: '33%',
						id: 'block',
						value: 1
					},
					{
						text: 'ohne Vorlesung',
						width: '33%',
						id: 'ov',
						value: 2
					}
				]
            
			}, {
        		xtype: "fieldset",
        		items: [
        			{
		                name: 'name',
		                xtype: 'textfield',
		                label: 'Name'
		            },
		            {
		                name: 'ects',
		                xtype: 'numberfield',
		                label: 'ECTS'
		            },
		            {
		                name: 'sws',
		                xtype: 'numberfield',
		                label: 'SWS',
		            }
        		]
        	}, {
				title: 'yourInterest',
				html: ['Persönliches Interesse'],
				styleHtmlContent: true
			}, {
				xtype: 'segmentedbutton',
				itemId: 'interestButton',
				allowMultiple: false,
				margin: '0 10 0 10',
				layout:{
					type:'hbox',
					align:'center',
					pack:'center',
				},
				items: [
					{
						text: 'Hoch',
						id: 'interest_good',
						width: '33%',
						value: 0
					},
					{
						text: 'Mittel',
						id: 'interest_medium',
						width: '33%',
						value: 1
					},
					{
						text: 'Niedrig',
						id: 'interest_bad',
						width: '33%',
						value: 2
					}
				]
            
			}, {
				title: 'yourServerity',
				html: ['Eingeschätzter Schwierigkeitsgrad'],
				styleHtmlContent: true
			},{
				xtype: 'segmentedbutton',
				itemId: 'severityButton',
				allowMultiple: false,
				margin: '0 10 0 10',
				layout:{
					type:'hbox',
					align:'center',
					pack:'center',
				},
				items: [
					{
						text: 'Hoch',
						id: 'severity_good',
						width: '33%',
						value: 0
					},
					{
						text: 'Mittel',
						id: 'severity_medium',
						width: '33%',
						value: 1
					},
					{
						text: 'Niedrig',
						id: 'severity_bad',
						width: '33%',
						value: 2
					}
				]
            
			}, {
                xtype: 'button',
                text: 'Hinzufügen',
                ui: 'confirm',
                itemId: "addButton",
                margin: '20 5 15 5'
            }, {
        		xtype: "toolbar",
        		docked: "bottom",
        		title: "",
        		items: [
        			{
        				xtype: "button",
        				ui: "action",
        				text: '',
        				iconCls: 'trash',
        				itemId: "deleteButton"
        			},
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
			}
        ]        
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
	}
});
