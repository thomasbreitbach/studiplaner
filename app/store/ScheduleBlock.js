/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.store.ScheduleBlock", {
    extend: "Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",
    
    config: {
        model: "studiplaner.model.ScheduleBlock",
        proxy: {
            type: 'localstorage',
            id: 'scheduleBlock-store'
        },
    }
});
