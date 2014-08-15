/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.model.Work', {
    extend: 'studiplaner.model.BaseModel',
    
    requires: [
    	'Ext.data.identifier.Uuid',
    	'Ext.data.Field'
    ],
    
    config: {
    	idProperty: 'id',
		identifier: 'uuid',
    	
        fields: [
        	{ name: 'id', type: 'auto' },
            { name: 'name', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'timeMode', type: 'int' },
            { name: 'workload', type: 'int' }
        ],
		
		hasMany: {
				model: 'studiplaner.model.WorkingTime',
				name: 'workingTimes',
				primaryKey: 'id',
				foreignKey: 'work_id',
				foreignStore: 'Works'
		},
        
        validations: [{
	    		type: 'presence',
			    field: 'name',
			    message: "Bitte gib einen Namen an."
		    }
		]
    }
});
