



# Installation Instructions
   
	cd ~/smart-mirror/plugins
	git clone https://github.com/sdetweil/sm-uploadPics
  
	cd ~/smart-mirror/plugins/sm-uploadPics
 	npm install

    restart smart-mirror if running


# CONFIG

    open the smart-mirror config panel
        http://machine_IP_address:8080
        selct the gear on the top bar to get to the config screen
        scroll down to find UploadPics

    the config panel for sm-uploadPics displays two options


    1.  the path to the plugin that displays the images
        for example
            backgroundImage/images
    2. the enable debug for additional messages during startup


 # LOCAL CSS OPTIONS
   
Don't like the QR colors or size? Change them!!  Here are some things you can change by putting them in your app/css/local.css file!


      .sm-uploadPics qr {
	    color: #c9e4f5;
        height: 200px;
       }
      

