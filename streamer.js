var Streamer = require('./streamer-server');

var torrent;
var ready = false;
var boundURL = "not ready";
var ID;
var ip;
function startStreamer(url, torrentID, localIp) {
	ID = torrentID;
	ip = localIp;
	var streamBuffer = 10 * 1024 * 1024;
	if (url.indexOf("youtube") >= 0){
		streamBuffer = 3 * 1024 * 1024;
	}
	torrent = new Streamer(url, 
	{
		youtube: {
			hd: true
		},
		hostname: ip,
		progressInterval: 200,
		buffer: streamBuffer,
		port: 9999,
		writeDir: '',
		index: torrentID + '.mp4'
	});
	torrent.on('ready', function (data) {
		console.log('Streamer: Ready to Stream, binding to ' + data.streamUrl);
		boundURL = data.streamUrl;
		ready = true;
	});
	torrent.on('close', function () {
		//console.log('Streamer: Stream Closed');
	});
	torrent.on('progress', function (progress) {
		console.log(progress);
	});
	torrent.on('error', function (e) {
		console.log(e);
	});
}

function getURL(){
	return "http://" + ip + ":9999/" + ID + '.mp4';
}

function getStreamer(){
	return torrent;
}

exports.startStreamer = startStreamer;
exports.getURL = getURL;
exports.getStreamer = getStreamer;