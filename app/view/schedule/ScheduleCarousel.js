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
		itemLength: (window.innerWidth*80)/100, //80% of the screen
		defaults: {
			styleHtmlContent: true
		}
    },
    
    initialize: function(){
		this.callParent(arguments);
		var array = new Array();
		for(var i=0; i<this.weekdays.length; i++){
			var backgroundColor;
			var blockCls;
			if(i%2==0){
				backgroundColor = 'background-color: #E5E5E5';
				blockCls = 'schedule-weekday-block';
			}else{
				backgroundColor = 'background-color: white';
				blockCls = ['schedule-weekday-block', 'schedule-weekday-block-dark'];
			}
				
			array[i] = {
				xtype: 'scheduledaycontainer',
				name: this.weekdays[i],
				style: backgroundColor,
				itemId: this.weekdays[i],
				id: this.weekdays[i],
				blockCls: blockCls
			}
		}
		this.add(array);
	}
});
