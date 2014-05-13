Ext.define('studiplaner.form.ModuleForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.moduleform',
    requires: [
    	"Ext.form.FieldSet",
    	'Ext.SegmentedButton'
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
        				text: "",
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
        	},{
				xtype: 'segmentedbutton',
				id: 'typeButton',
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
						id: 'normal'
					},
					{
						text: 'Block',
						id: 'block'
					},
					{
						text: 'ohne Vorlesung',
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
        	},{
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
    }
});
