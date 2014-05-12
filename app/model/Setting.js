Ext.define('studiplaner.model.Setting', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'id', type: 'auto' },
            { name: 'city', type: 'string' },
            { name: 'country', type: 'auto' },
            { name: 'units', type: 'auto' },
            { name: 'geo', type: 'boolean' }

        ]
    }
});
