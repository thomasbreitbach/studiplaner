/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.work.WorkList", {
    extend: "Ext.List",
    alias: "widget.worklist",
    
    config: {
        loadingText: "Lade Arbeitszeiten...",
        emptyText: '</pre><div class="list-empty-text">Aktuell liegen keine Arbeitsstellen vor.<br/>+ benutzen um eine neue Arbeitsstelle anzulegen.</div> <pre>',
        onItemDisclosure:true,
        grouped: false,
        itemTpl: 	'</pre><div id="{id}"><span class="list-item-name">{name}</span>'+
					'<span class="list-item-workload">{workload} Std./Woche</span><div><pre>'
    }
});
