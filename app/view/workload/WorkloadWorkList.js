/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.workload.WorkloadWorkList", {
    extend: "Ext.List",
    alias: "widget.workloadworklist",
    
    config: {
        loadingText: "Lade Arbeitszeiten...",
        emptyText: '</pre><div class="notes-list-empty-text">Aktuell liegen keine Arbeitszeiten vor.</div> <pre>',
        onItemDisclosure:true,
        grouped: true,
        itemTpl: 	'</pre><div id="{id}"><span class="list-item-name">{name}</span>'+
					'<span class="list-item-workload list-item-workload-nopad">{workload} Std./Woche</span><div><pre>'
    }
});
