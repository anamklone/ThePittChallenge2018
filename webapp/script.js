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

const HI = 110;
const LO = -110;
const FLUX = 1;

var armUp = true;
var prevPitch = LO;

Myo.on('orientation', function(data) {
	//console.log(data);
	
	var roll = Math.atan2(2.0 * (data.w * data.x + data.y * data.z), 1.0 - 2.0 * (data.x * data.x + data.y * data.y)) * 100;
	
	var pitch = Math.asin(Math.max(-1.0, Math.min(1.0, 2.0 * (data.w * data.y - data.z * data.x)))) * 100;
	
	var yaw = Math.atan2(2.0 * (data.w * data.z + data.x * data.y), 1.0 - 2.0 * (data.y * data.y + data.z * data.z)) * 100;

	//console.log("roll = " + roll);
	console.log("pitch = " + pitch);
	//console.log("yaw = " + yaw);
	
	if (prevPitch >= HI) {
		armUp = false;
	} else if (prevPitch <= LO) {
		armUp = true;
	}
		
	if (armUp) {
		if (prevPitch <= pitch || prevPitch <= pitch + FLUX) {
			console.log("correct");
		} else {
			console.log("incorrect");
		}
	} else {
		if (prevPitch >= pitch || prevPitch >= pitch - FLUX) {
			console.log("correct");
		} else {
			console.log("incorrect");
		}
	}
	
	prevPitch = pitch;
});