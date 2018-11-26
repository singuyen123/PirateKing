
//  Create the games grids and layout
$(document).ready(function() {
	for (var i = 1; i <= 100; i++) {
		// The number and letter designators
		if (i < 11) {
			$(".top").prepend("<span class='aTops'>" + Math.abs(i - 11) + "</span>");
			$(".bottom").prepend("<span class='aTops'>" + Math.abs(i - 11) + "</span>");
		//	$(".grid").append("<li class='points offset1 " + i + "'><span class='hole'></span></li>");
		} else {
		//	$(".grid").append("<li class='points offset2 " + i + "'><span class='hole'></span></li>");
		}
		if (i == 11) {
			$(".top").prepend("<span class='aTops hidezero'>" + Math.abs(i - 11) + "</span>");
			$(".bottom").prepend("<span class='aTops hidezero'>" + Math.abs(i - 11) + "</span>");
		}
		if (i > 90) {
			$(".top").append("<span class='aLeft'>" + 
								String.fromCharCode(97 + (i - 91)).toUpperCase() + "</span>");
			$(".bottom").append("<span class='aLeft'>" + 
								String.fromCharCode(97 + (i - 91)).toUpperCase() + "</span>");
		}
	}
})



