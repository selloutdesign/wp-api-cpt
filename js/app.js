

var showProperty = function(property){
	var template = $('.templates .property').clone();

	var img = template.find(".card-image .activator");
	img.attr('src', property.ccw_thumbnail);

	var title = template.find(".card-content .card-title");
	console.log(property.title.rendered);
	title.text(property.title.rendered);

	var contentTitle = template.find(".card-reveal .card-title");
	contentTitle.text(property.title.rendered);

	var contentDesc = template.find(".card-reveal .desc");
	var desc = property.excerpt.rendered;
	desc = desc.replace(/(<([^>]+)>)/ig,"");
	contentDesc.text(desc);

	var price = template.find('.card-content .price');
	amount = property.REAL_HOMES_property_price;
	amount = amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");


	price.append(amount);

	var link = template.find('.card-content .link');
	link.attr('href', property.link);

	return template;
};



var getProperties = function(){
	// $.getJSON('http://continentalvillagemhc.com/wp-json/wp/v2/property')
 //        .success(function(response){
 //        	console.log(response);
 //        	$.each(response, function(index, val) {
 //        		 /* iterate through array or object */
 //        		 var property = showProperty(val);
 //        		 $(".results").append(property);
 //        	});

 //        });
 	$.ajax({
 		url: 'http://continentalvillagemhc.com/wp-json/wp/v2/property',
 		type: 'GET',
 		dataType: 'json',
 		
 	})
 	.done(function(response) {
 		console.log("success");
 		$.each(response, function(index, val) {
    		 /* iterate through array or object */
    		 var property = showProperty(val);
    		 $(".results").append(property);
    	});

 	})
 	.fail(function() {
 		console.log("error");
 	})
 	.always(function() {
 		console.log("complete");
 	});
 	


};






jQuery(document).ready(function($) {
	$("#show-properties").on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		$(".results").html('');
		getProperties();

	});
});