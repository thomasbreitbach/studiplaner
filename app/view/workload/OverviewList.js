/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.workload.OverviewList", {
    extend: "Ext.List",
    alias: "widget.workloadoverviewlist",
    
    config: {
        loadingText: "Lade Workload-Einheiten...",
        emptyText: '</pre> <div class="notes-list-empty-text">Aktuell liegen keine Workload-Einheiten vor.</div> <pre>',
        onItemDisclosure:false,
        grouped: false,
        itemTpl: 	'</pre><div><span class="list-item-name">{name}</span>'+
					'<span class="list-item-workload">{workload} Std./Woche</span><div><pre>'
    }
});
