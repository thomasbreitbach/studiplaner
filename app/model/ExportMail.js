/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.model.ExportMail', {
    extend: 'Ext.data.Model',
    
    requires: [
    	'Ext.data.Field'
    ],
    
    config: {    	
        fields: [
        	{ name: 'sender', type: 'string' },  
        	{ name: 'receiver', type: 'string' }, 
            { name: 'message', type: 'string' },
            { name: 'scheduling', type: 'string' },
        ],

        validations: [
			{
	    		type: 'email',
			    field: 'receiver',
			    message: "Deine Emfänger-Adresse ist keine gültige E-Mail-Adresse."
		    },
			{
	    		type: 'email',
			    field: 'sender',
			    message: "Deine Absender-Adresse ist keine gültige E-Mail-Adresse."
		    }	    
		]
    }
});
