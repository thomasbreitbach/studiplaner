/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.form.ExportForm', {
    extend: 'Ext.form.Panel',
    xtype: 'exportform',
    
    requires: [
    	"Ext.form.FieldSet",
    	"Ext.form.TextArea",
    	"Ext.field.Email"
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
		                xtype: 'emailfield',
		                label: 'Absender'
		            },{
		                name: 'recipient',
		                xtype: 'emailfield',
		                label: 'Empfänger'
		            },{
		                name: 'subject',
		                xtype: 'textfield',
		                label: 'Betreff'
		            },{
		                name: 'message',
		                xtype: 'textareafield',
		                maxRows: 5,
		                label: 'Nachricht'
		            },{
		                name: 'scheduling',
		                xtype: 'textareafield',
		                label: 'Planung',
		                maxRows: 4
		            }
				]
			}, {
				xtype: 'button',
				text: 'Senden',
                ui: 'confirm',
                margin: '30 6 15 6',
                itemId: "sendButton"
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
        	}
        ]        
    },
    
    initialize: function(){
		this.callParent(arguments);
	},
    
    //Listener functions
	onMenuButtonTap: function (){
		Ext.Viewport.fireEvent("toggleSlideMenuCommand", this);
	},
    onSendButtonTap: function(){
    	console.log('sendMailCommand');
    	this.fireEvent('sendMailCommand', this);
    }
});
