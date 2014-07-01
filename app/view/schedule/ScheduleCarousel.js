/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.schedule.ScheduleCarousel", {
    extend: "Ext.carousel.Carousel",
    alias: "widget.schedulecarousel",
    weekdays: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
 
    config: {
		fullscreen: true,
		direction: 'horizontal',
		itemLength: (window.innerWidth*80)/100,
		defaults: {
			styleHtmlContent: true
		}
    },
    
    initialize: function(){
		this.callParent(arguments);
		var array = new Array();
		for(var i=0; i<this.weekdays.length; i++){
			array[i] = {
				xtype: 'scheduledaycontainer',
				name: this.weekdays[i]
			}
		}
		this.add(array);
	}
});
