/**
 * @author Thomas Breitbach
 */
Ext.define("studiplaner.view.schedule.ScheduleCarousel", {
    extend: "Ext.carousel.Carousel",
    alias: "widget.schedulecarousel",
    
    config: {
		fullscreen: true,
		direction: 'horizontal',
		itemLength: 250,
		defaults: {
			styleHtmlContent: true
		},
		items: [{
				html : 'Item 1',
				style: 'background-color: #759E60'
			},
			{
				html : 'Item 2',
				style: 'background-color: #5E99CC'
			},
			{
				html : 'Item 3',
				style: 'background-color: #00000F'
			}
		]
    }
});
