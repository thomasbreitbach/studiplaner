/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.schedule.BlocksList", {
    extend: "Ext.List",
    alias: "widget.blockslist",
    //http://appointsolutions.com/2012/07/using-model-associations-in-sencha-touch-2-and-ext-js-4/
    config: {
        loadingText: "Lade Blöcke...",
        emptyText: '</pre> <div class="notes-list-empty-text">Bevor der Wocheplan angelegt werden kann, musst du zuerst in der Modulverwaltung deine Module eintragen.</div> <pre>',
        onItemDisclosure:false,
        grouped: false,
        itemTpl: 	'</pre><div id="{id}"><span class="list-item-name">{type}</span>'+
					'<span class="list-item-workload">{assigned} Std./Woche</span><div><pre>'
    }
});
