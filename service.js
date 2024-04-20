
//const fs=require('fs')
const __up = require("path");
let _uppath = document.currentScript.src.substring(
	7,
	document.currentScript.src.lastIndexOf(__up.sep)
);
if( typeof os === 'undefined' ){
	var os = require("os");
	console.log("loaded os lib")
}
const QRCode = require( __up.resolve( _uppath, "node_modules", "qrcode",));
//const getPort =require("get-port");

angular.module("SmartMirror")
	.factory("UploadPicsService",
		function ($interval) {
			var service= {}
			let 	first=true,
				files=[];
		  let hostname ="";
		  let imageurl="";
		const { spawn , exec } = require('child_process');
		function startServer(){
			return new Promise((resolve,reject)=>{
				var self = this
				// get the absolute path to the image storage folder
				const p = __up.resolve( _uppath, "..", config.uploadPics.dest)
				const qrcp_config = __up.resolve( _uppath, "qrcp.json")
				if(config.uploadPics.debug) console.log("p="+p)
				//		const qrcp = spawn('qrcp', ['-k', '--output', p, 'receive']);
				const qrcp = spawn('qrcp', ['-k', "-c",  qrcp_config ,  '--output', p, 'receive']);

		    hostname = os.hostname();

				qrcp.stdout.on('data', (data) => {
					if(first) {
						first=false;
						//if(config.uploadPics.debug) console.log("d="+JSON.stringify(data))
						let v = data.toString().split('\n')[1]
						if(config.uploadPics.debug) console.log('data='+data.toString())
						if(config.uploadPics.debug) console.log('v='+v)
						//v=v.split('\n').slice(1,-2).join('\n')
						if(config.uploadPics.debug) console.log("new line")
				  		if(config.uploadPics.debug) console.log(`stdout: ${v}`);
				  	  //let t=_uppath.split(__up.sep)
				  	  // get the relative URL to the qr image file
			        imageurl ="." +__up.sep+ _uppath.split(__up.sep).slice(-2).join(__up.sep)  + __up.sep+ "qrfile.png";
			        QRCode.toFile(_uppath+ __up.sep+ "qrfile.png", v, (err) => {
			          if (!err) {
			            if (config.uploadPics.debug) console.log("QRCode build done");
			            resolve(imageurl)
			          } else {
			            console.log("QR image create failed =" + JSON.stringif(err));
			            reject("QR image create failed =" + JSON.stringif(err))
			          }
			        });
					}
					else{
							if(config.uploadPics.debug) console.log(data.toString())

							if(data.toString().includes('File transfer completed')){
								if(config.uploadPics.debug)
									console.log("process list of files =  "+ JSON.stringify(files))
								files.forEach(fn =>{
									if(config.uploadPics.debug)
										console.log("processing for "+fn)
									// force correct rotation
									exec((config.uploadPics.needSudo?'sudo ':'')+'exiftran -ai '+"'"+fn+"'")
								})
								files=[]
							}
							if(data.toString().includes('Transferring file:')){
								let x =  data.toString().split(':')[1].split('\n')
								if(config.uploadPics.debug)
									console.log(" fn list ="+ JSON.stringify(x,' ',2)+" fn="+x[0].toString().trim())
								files.push(x[0].toString().trim())
							}
						}
				});
				qrcp.stderr.on('data', (data)=>{
					console.log("error="+data)
				})
			})
		}
		service.init= async function(){

			//let port=await getPort({ port: getPort.makeRange(9000, 9500) })
			let iamegURL=await startServer()
			return iamegURL
		}
		return service
}
);
