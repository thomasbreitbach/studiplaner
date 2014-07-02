/**
 * @author Thomas Breitbach
 */
Ext.define('studiplaner.model.ScheduleBlock', {
    extend: 'Ext.data.Model',
    
    requires: [
    	'Ext.data.identifier.Uuid'
    ],
    
    config: {
    	idProperty: 'id',
		identifier: 'uuid',
    	
        fields: [
        	{ name: 'id', type: 'auto' },       	
            { name: 'type', type: 'string' },
            { name: 'assigned', type: 'boolean' },
            { name: 'day', type: 'int' },
            { name: 'block', type: 'int' },
            { name: 'phase', type: 'int'}
        ],
        
		associations: { type: 'belongsTo', model: 'studiplaner.model.Module' },
		
		proxy: {
    		type: 'localstorage',
    		id: 'scheduleBlock-store'
		}
    }
});
