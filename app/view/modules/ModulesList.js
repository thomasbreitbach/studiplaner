/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.modules.ModulesList", {
    extend: "Ext.List",
    alias: "widget.moduleslist",
    
    config: {
        loadingText: "Lade Module...",
        emptyText: '</pre> <div class="list-empty-text">Aktuell liegen keine Module vor.<br/>+ benutzen um ein Modul anzulegen.</div> <pre>',
        onItemDisclosure:true,
        grouped: false,
        itemTpl: 	'</pre><div id="{id}"><span class="list-item-name">{name}</span>'+
					'<span class="list-item-workload">{workload} Std./Woche</span><div><pre>'
    }
});
