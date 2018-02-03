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
var HI = 260;// = 110;
var FLUX = 1;// = 1;

var armUp = true;
var prevPitch = 0;// = LO;
var prevYaw = -160;// = -100;

Myo.on('orientation', function(data) {
	var roll = Math.atan2(2.0 * (data.w * data.x + data.y * data.z), 1.0 - 2.0 * (data.x * data.x + data.y * data.y)) * 100;
	
	var pitch = Math.asin(Math.max(-1.0, Math.min(1.0, 2.0 * (data.w * data.y - data.z * data.x)))) * 100;
	
	var yaw = Math.atan2(2.0 * (data.w * data.z + data.x * data.y), 1.0 - 2.0 * (data.y * data.y + data.z * data.z)) * 100;

	console.log("roll = " + roll);
	console.log("pitch = " + pitch);
	console.log("yaw = " + yaw);
	
	/*if (Math.abs(yaw - prevYaw) >= 50) {
		console.log("incorrect yaw");
	} else {
		if (armUp) {
			if (prevPitch <= pitch + FLUX){
				console.log("correct pitch");
			} else if (pitch <= LO) {
				console.log("correct pitch");
			} else {
				console.log("incorrect pitch");
			}
		} else {
			if (prevPitch >= pitch + FLUX) {
				console.log("correct pitch");
			} else if (pitch >= HI) {
				console.log("correct pitch");
			} else {
				console.log("incorrect pitch");
			}
		}	
		console.log("correct yaw");
	}
	
	if (prevPitch >= HI) {
		armUp = false;
	} else if (prevPitch <= LO) {
		armUp = true;
	}
	
	prevPitch = pitch;*/
});

function calibrate() {
	Myo.myos[0].zeroOrientation();
}