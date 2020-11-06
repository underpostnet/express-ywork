
var imageToSlices = require('image-to-slices');

var size = 800/16;
var lineXArray = [];
var lineYArray = [];

for(var y=1;y<16;y++){

	for(var x=1;x<16;x++){

		var xd = x*size;
		var yd = y*size;
		lineXArray.push(xd);
		lineYArray.push(yd);

	}

}

var source = './cyberia/assets/tiles/tile1.png';

imageToSlices(source, lineXArray, lineYArray, {
    saveToDir: './cyberia/assets/tiles/tile1/',
    clipperOptions: {
        canvas: require('canvas')
    }
}, function() {
    console.log('the source image has been sliced');
});
