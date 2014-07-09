/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.store.WorkingTimes", {
    extend: "Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",
    
    config: {
        model: "studiplaner.model.WorkingTime",
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'workingTimes-store'
        },
    }
});
