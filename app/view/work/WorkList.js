/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.work.WorkList", {
    extend: "Ext.List",
    alias: "widget.worklist",
    
    config: {
        loadingText: "Lade Arbeitszeiten...",
        emptyText: '</pre><div class="notes-list-empty-text">Aktuell liegen keine Arbeitszeiten vor.</div> <pre>',
        onItemDisclosure:true,
        grouped: true,
        itemTpl: 	'</pre><div><span class="list-item-name">{name}</span>'+
					'<span class="list-item-workload">{workload} Std./Woche</span><div><pre>'
    }
});
