/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.ModulesList", {
    extend: "Ext.List",
    alias: "widget.moduleslist",
    
    config: {
        loadingText: "Lade Module...",
        emptyText: '</pre> <div class="notes-list-empty-text">Aktuell liegen keine Module vor.</div> <pre>',
        onItemDisclosure:true,
        grouped: true,
        itemTpl: 	'</pre><div><span class="list-item-name">{name}</span>'+
					'<span class="list-item-workload">{ects} ECTS, {sws} SWS</span><div><pre>',
    }
});
