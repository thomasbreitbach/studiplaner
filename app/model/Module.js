/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.model.Module', {
    extend: 'Ext.data.Model',
    
    requires: [
    	'Ext.data.identifier.Uuid',
    	'Ext.data.Field'
    ],
    
    config: {
    	idProperty: 'id',
		identifier: 'uuid',
    	
        fields: [
        	{ name: 'id', type: 'auto' },
            { name: 'type', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'ects', type: 'int' },
            { name: 'sws', type: 'int' },
            { name: 'interest', type: 'int' },   
			{ name: 'severity', type: 'int' }
        ],
        
        validations: [{
	    		type: 'presence',
			    field: 'name',
			    message: "Bitte gib einen Modulnamen an."
		    }, {
			    type: 'presence',
			    field: 'ects',
			    message: "Bitte trage die ECTS-Punkte ein."
		    }
		],
		
		proxy: {
    		type: 'localstorage',
    		id: 'modules'
		}
    }
});