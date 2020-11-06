//joy

var circleContent = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: 'red',
  stroke: 'white',
  strokeWidth: 4
});

var circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 30,
  fill: 'blue',
  stroke: 'white',
  strokeWidth: 4,
  draggable: true,
  dragBoundFunc: function(pos) {
    var x = stage.width() / 2;
    var y = stage.height() / 2;
    var radius = 70;
    var scale =
    radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
    if (scale < 1)
    return {
      y: Math.round((pos.y - y) * scale + y),
      x: Math.round((pos.x - x) * scale + x)
    };
    else return pos;
  }
});

circle.on('dragend', function() {

  circle.x((stage.width() / 2));
  circle.y((stage.height() / 2));
  layer.draw();

});


layer.add(circleContent);

layer.add(circle);

//parabola

var xg = 0;
var yg = (xg*xg+5*xg+10)*0.005;

var circle = new Konva.Circle({
  x: (xg+24),
  y: (yg+10),
  radius: 20,
  fill: 'red',
  stroke: 'white',
  strokeWidth: 4
});

layer.add(circle);

var time=0;

for(var i=1; i<=1000; i++){

  setTimeout(function(e){

    xg = xg+1;
    yg = (xg*xg+5*xg+10)*0.005;

    circle.x(xg+24);
    circle.y(yg+10);
    layer.draw();

  }, time);

  time = time +20;

}
