/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.ModulesList", {
    extend: "Ext.List",
    alias: "widget.moduleslist",
    
    config: {
        loadingText: "Lade Module...",
        emptyText: '</pre> <div class="notes-list-empty-text">Aktuell liegen keine Module vor.</div> <pre>',
        onItemDisclosure: true,
        grouped: true,
        itemTpl: '</pre><div class="list-item-title">{type}</div><div class="list-item-narrative">{name}</div><pre>',
    }
});