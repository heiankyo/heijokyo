$(function () {

	// 
    var show_message = function (text) {
        $("#result").prepend('<p>' + text + '</p>');
    };

	var positionLoop = function () {
		requestAnimationFrame(positionLoop);
		var positions = ctracker.getCurrentPosition();
		// positions = [[x_0, y_0], [x_1,y_1], ... ]
		// do something with the positions ...
		for (var item in positions)
			show_message('x=' + String(item[0]) + ', y=' +  String(item[1]));
		show_message('');
	};
	positionLoop();

	
	
  var canvasInput = document.getElementById('canvas');
  var cc = canvasInput.getContext('2d');
  function drawLoop() {
    requestAnimationFrame(drawLoop);
    cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
    ctracker.draw(canvasInput);
  }
  drawLoop();

});