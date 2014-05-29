/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.model.Work', {
    extend: 'Ext.data.Model',
    
    requires: [
    	'Ext.data.identifier.Uuid',
    	'Ext.data.Field',
    ],
    
    config: {
    	idProperty: 'id',
		identifier: 'uuid',
    	
        fields: [
        	{ name: 'id', type: 'auto' },
            { name: 'name', type: 'string' },
            { name: 'location', type: 'string' }
        ],
        
        hasMany: {
				model: 'studiplaner.model.WorkingTime',
				name: 'workingTimes'
		},
        
        validations: [{
	    		type: 'presence',
			    field: 'name',
			    message: "Bitte gib einen Namen an."
		    }
		]
    }
});
