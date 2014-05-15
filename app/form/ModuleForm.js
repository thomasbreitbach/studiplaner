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
						id: 'normal'
					},
					{
						text: 'Block',
						width: '33%',
						id: 'block'
					},
					{
						text: 'ohne Vorlesung',
						width: '33%',
						id: 'ov'
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
				margin: '10px',
				layout:{
					type:'hbox',
					align:'center',
					pack:'center',
				},
				items: [
					{
						text: 'Gut',
						id: 'interest_good',
						width: '33%',
					},
					{
						text: 'Mittel',
						id: 'interest_medium',
						width: '33%'
					},
					{
						text: 'Schlecht',
						id: 'interest_bad',
						width: '33%'
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
				margin: '10px',
				layout:{
					type:'hbox',
					align:'center',
					pack:'center',
				},
				items: [
					{
						text: 'Gut',
						id: 'severity_good',
						width: '33%',
					},
					{
						text: 'Mittel',
						id: 'severity_medium',
						width: '33%'
					},
					{
						text: 'Schlecht',
						id: 'severity_bad',
						width: '33%'
					}
				]
            
			}, {
                xtype: 'button',
                text: 'Hinzufügen',
                ui: 'confirm',
                itemId: "addButton"
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
				delegate: "#typeButton",
        		event: "toggle",
        		fn: "onTypeButtonToggle"
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
    onTypeButtonToggle: function (container, button, isPressed, eOpts){
		console.log("typeButtonCommand");
		console.log(isPressed);
		if(isPressed){
			this.fireEvent('typeButtonCommand', this, button);
		}
	}
});
