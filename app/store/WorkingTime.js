/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.store.WorkingTime", {
    extend: "Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",
    
    config: {
        model: "studiplaner.model.WorkingTime",
        proxy: {
            type: 'localstorage',
            id: 'workingTime-store'
        },
    }
});
