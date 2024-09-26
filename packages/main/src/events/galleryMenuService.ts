const { ipcMain } = require('electron');
// const buffer = require('buffer');
const udp = require('dgram');
const app = require('electron');
const fs = require('fs/promises');


export function galleryMenuService(_browserWindow: Electron.CrossProcessExports.BrowserWindow) {
	
	console.log('gallery menu service started');
	
  ipcMain.on('start-gallery', async (_event: Electron.IpcMainEvent) => {
		
		console.log('gallery service playing');
		console.log('listening to ');
		

		startConnection(_browserWindow);
  });
  ipcMain.on('load-image-list', async (_event: Electron.IpcMainEvent) => {
		
		console.log('start load json images');

		loadJsonFile(_browserWindow);
  });
}

function loadJsonFile (browserWindow: Electron.CrossProcessExports.BrowserWindow) {
	// Blocks the event loop
	fs.readFile(app.app.getAppPath() + '/assets/images.json',  'utf8')
		.then((data: unknown) => {
			// Do something with the data
			if(typeof data != 'undefined'){
				// console.log(JSON.parse(data.toString()));
				console.log('berhasil memuat berkas');
				if(data){
					browserWindow.webContents.send(
						'load-image-labels-complete', 
						JSON.parse(data.toString()),
					);
				}
			}
		})
		.catch((error: unknown) => {
			// Do something if error 
			console.log('gagal memuat berkas', error);
			
		});
}
function startConnection (browserWindow: Electron.CrossProcessExports.BrowserWindow) {
		// creating a client socket
		const client = udp.createSocket('udp4');

		//buffer msg
		const data = Buffer.from('siddheshrane');

		client.on('message',function(msg: unknown, _info: unknown){
			if(typeof msg === 'string'){
				console.log('Data received from server : ' + msg.toString());
				browserWindow.webContents.send('show-image-label', msg.toString());
				if(typeof msg === 'string'){
					console.log('Data received from server : ' + msg.toString());
					// send message to renderer

					browserWindow.webContents.send('show-image-label', msg.toString());
				}
			}
		});

		client.on('connect', function(){
			console.log('tersambung!');
			
		});
		client.on('close', function(){
			console.log('ditutup!');
		});
		client.on('error', function(){
			// try to reconnection
			// send message to renderer
			// reconnecting
			// recursive connection
			console.log('Terputus!');
			console.log('Mencoba menghubungkan kembali..');
			client.close();
			setTimeout(()=>{
				startConnection(browserWindow);
			}, 5000);
		});
		
		//sending msg
		client.send(data,12000,'localhost',function(error: unknown){
			if(error){

				client.close();
				console.log('Terputus!');
				console.log('Mencoba menghubungkan kembali..');
				
				setTimeout(()=>{
					startConnection(browserWindow);
				}, 5000);
			}else{
				console.log('Data sent !!!');
			}
		});
}