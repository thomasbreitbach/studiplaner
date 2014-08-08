/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.form.ExportForm', {
    extend: 'Ext.form.Panel',
    xtype: 'exportform',
    
    requires: [
    	"Ext.form.FieldSet",
    	"Ext.form.TextArea"
    ],
    config: {
        title: 'ExportForm',
        scrollable:'vertical',
        
        items: [
        	{
        		xtype: "toolbar",
        		docked: "top",
        		itemId: 'topToolbar',
        		cls: 'two-buttons',
        		title: "Export",
        		items: [
        			{
        				xtype: 'button',
        				iconCls: 'list',
						ui: 'action',
        				text: '',
        				itemId: "menuButton"
        			}
        		]
        	}, {
				xtype: "fieldset",
        		itemId: "type",
        		instructions: 'Sende deine Semesterplanung an deinen Mentor.',
        		items: [{
		                name: 'sender',
		                xtype: 'textfield',
		                label: 'Absender'
		            },{
		                name: 'recipient',
		                xtype: 'textfield',
		                label: 'Empfänger'
		            },{
		                name: 'message',
		                xtype: 'textareafield',
		                maxRows: 4,
		                label: 'Nachricht'
		            },{
		                name: 'scheduling',
		                xtype: 'textareafield',
		                label: 'Planung',
		                maxRows: 4,
		                disabled: true
		            }
				]
			}, {
				xtype: 'button',
				text: 'Senden',
                ui: 'confirm',
                margin: '40 6 15 6',
                itemId: "sendButton",
			}
        ],
        listeners: [
        	{
        		delegate: "#menuButton",
        		event: "tap",
        		fn: "onMenuButtonTap"
        	}, {
        		delegate: '#sendButton',
        		event: 'tap',
        		fn: 'onSendButtonTap'
        	}, 
        ]        
    },
    
    initialize: function(){
		this.callParent(arguments);
	},
    
    //Listener functions
	onMenuButtonTap: function (){
		this.fireEvent("toggleSlideMenuCommand", this);
	},
    onSendButtonTap: function(){
    	console.log('sendMailCommand');
    	this.fireEvent('sendMailCommand', this);
    }
});
