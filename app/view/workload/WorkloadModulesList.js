/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.workload.WorkloadModulesList", {
    extend: "Ext.List",
    alias: "widget.workloadmoduleslist",
    
    config: {
        loadingText: "Lade Module...",
        emptyText: '</pre> <div class="list-empty-text">Aktuell liegen keine Module vor.</div> <pre>',
        onItemDisclosure:true,
        grouped: false,
        itemTpl: 	'</pre><div id="{id}"><span class="list-item-name">{name}</span>'+
					'<span class="list-item-workload list-item-workload-nopad">{workload} Std./Woche</span><div><pre>'
    }
});
