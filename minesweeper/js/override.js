Handlebars.registerHelper("repeat", function (times, opts) {
    var out = "";
    var i;
    var data = {};

    if ( times ) {
        for ( i = 0; i < times; i += 1 ) {
            data.index = i;
            out += opts.fn(this, {
                data: data
            });
        }
    } else {

        out = opts.inverse(this);
    }

    return out;
});
$.urlParam = function(name){
	var result;
	try{
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		result = results[1] || 0;
	}
	catch(e){

	}
	return result;
}