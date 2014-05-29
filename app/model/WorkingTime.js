/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.model.WorkingTime', {
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
            { name: 'day', type: 'int' },
            { name: 'begin', type: 'date' },
            { name: 'end', type: 'date' },
            { name: 'work_id', type: 'auto'}
        ],
        
		associations: { type: 'belongsTo', model: 'studiplaner.model.Work' },
		
		proxy: {
    		type: 'localstorage',
    		id: 'workingTime-store'
		}
    }
});
