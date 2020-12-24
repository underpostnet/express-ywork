//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


var mp3Duration = require('mp3-duration');


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


function getSizeMB(path, name_file){

  let g_path = (path+name_file);
  let stats = fs.statSync(g_path);
  let fileSizeInBytes = stats.size;
  let fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
  return (aprox(fileSizeInMegabytes, 2)+' [Mb]');

};

let path_file_radio = 'c:/xampp/htdocs/cloud/radio/';

let data_dir = [];

fs.readdir(path_file_radio, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach

    files.forEach(function (file) {

        // Do whatever you want to do with the file

        mp3Duration((path_file_radio+file), function (err, duration) {

          //--------------------------------------------------------------------
          //--------------------------------------------------------------------

          let file_dir = (path_file_radio+file);
          let file_name = file;
          let file_size = getSizeMB(path_file_radio, file);
          let file_ext = path.extname(file);
          if(file_ext==''){
            file_ext = 'folder';
          }else{
            file_ext = file_ext.split('.')[1];
          }

          //--------------------------------------------------------------------
          //--------------------------------------------------------------------

          let file_time;

          if (!err) {

            let hour = parseInt(duration/3600);

            let min = parseInt(((duration/3600)-hour)*60);

            let sec = aprox((duration - (min*60)) ,0);

            if(l((''+min))==1){

              min = '0'+min;

            }

            if(l((''+sec))==1){

              sec = '0'+sec;

            }



            app.get(('/'+file), function(req, res){

            	res.sendFile((path_file_radio+file));

            });


            file_time = (hour+':'+min+':'+sec);

          }else{

            file_time = '0:00:00';

          }

          let s_push = [file_dir,file_name,file_ext,file_time,file_size];
          var_dump(s_push);
          data_dir.push(s_push);

        });


        //---------------------------------
        //---------------------------------

    });

});




//--------------------------------------------------------------------
//--------------------------------------------------------------------



app.post(('/dir'), function(req, res){

  res.send(JSON.stringify(data_dir));

});













//--------------------------------------------------------------------
//--------------------------------------------------------------------
