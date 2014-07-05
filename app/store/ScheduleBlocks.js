/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.store.ScheduleBlocks", {
    extend: "Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",
    
    config: {
        model: "studiplaner.model.ScheduleBlock",
        proxy: {
            type: 'localstorage',
            id: 'scheduleBlock-store'
        },
        sorters: [{
            property: 'assigned',
            direction: 'ASC'
        }],
    }
});
