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
        	{ name: 'recipient', type: 'string' }, 
        	{ name: 'subject', type: 'string' }, 
            { name: 'message', type: 'string' },
            { name: 'scheduling', type: 'string' }
        ],

        validations: [
			{
				type: 'presence',
				field: 'subject',
				message: 'Bitte gib einen Betreff an.'
			},
			{
	    		type: 'email',
			    field: 'recipient',
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
