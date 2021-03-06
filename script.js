Myo.connect('com.example.appId');
	
Myo.on('connected', function() {
	console.log('connected');
});

Myo.on('disconnected', function() {
	console.log('disconnected');
});

Myo.on('emg', function(data) {
	console.log(data);
});

Myo.on('pose', function(pose_name) {
	console.log('pose');
	console.log(pose_name);
});

Myo.on('rest', function() {
	console.log('rest');
});

var LO = -60;// = -110;
var HI = 60// = 110;
var FLUX = 1;// = 1;

var armUp = true;
var prevPitch = 0;// = LO;
var prevYaw = 0;// = -100;

var image1 = document.getElementById("img1");
var image2 = document.getElementById("img2");
/*var c = confirm("Display Image?");
if (c) {
  image.style.display = 'block';
}*/

Myo.on('orientation', function(data) {
	var roll = Math.atan2(2.0 * (data.w * data.x + data.y * data.z), 1.0 - 2.0 * (data.x * data.x + data.y * data.y)) * 100;
	
	var pitch = Math.asin(Math.max(-1.0, Math.min(1.0, 2.0 * (data.w * data.y - data.z * data.x)))) * 100;
	
	var yaw = Math.atan2(2.0 * (data.w * data.z + data.x * data.y), 1.0 - 2.0 * (data.y * data.y + data.z * data.z)) * 100;

	console.log("roll = " + roll);
	console.log("pitch = " + pitch);
	console.log("yaw = " + yaw);
	
	if (Math.abs(yaw - prevYaw) >= 50) {
		console.log("incorrect yaw");
	} else {
		if (armUp) {
			if (prevPitch <= pitch + FLUX){
				console.log("correct pitch");
				image2.style.display = 'none';
				image1.style.display = 'block';
			} /*else if (pitch <= LO) {
				console.log("correct pitch");
					image2.style.display = 'none';
					image1.style.display = 'block';

			} */else {
				console.log("incorrect pitch");
				image2.style.display = 'block';
				image1.style.display = 'none';
			}
		} else {
			if (prevPitch >= pitch + FLUX) {
				console.log("correct pitch");
				image2.style.display = 'none';
				image1.style.display = 'block';
			} /*else if (pitch >= HI) {
				console.log("incorrect pitch");
				image2.style.display = 'none';
				image1.style.display = 'block';
			} */else {
				console.log("incorrect pitch");
				image2.style.display = 'block';
				image1.style.display = 'none';
			}
		}	
		console.log("correct yaw");
	}
	
	if (prevPitch >= HI) {
		armUp = false;
	} else if (prevPitch <= LO) {
		armUp = true;
	}
	
	prevPitch = pitch;
});

function calibrate() {
	Myo.myos[0].zeroOrientation();
}