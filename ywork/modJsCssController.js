


function modJsCssController(req, mod_js, mod_css, dataPathModule){

  if(req.session.token==serverToken){

    log('info', '-> set backModules');

    for(let name_mod of dataPathModule.backModules){

      mod_js = mod_js + fs.readFileSync(

        (data.path_file+'backModules/'+name_mod+'/main.js')

      );

      mod_css = mod_css + fs.readFileSync(

        (data.path_file+'backModules/'+name_mod+'/style.css')

      );

    }

  }

  for(let name_mod of dataPathModule.mainModules){

    mod_js = mod_js + fs.readFileSync(

      (data.path_file+'mainModules/'+name_mod+'/main.js')

    );

    mod_css = mod_css + fs.readFileSync(

      (data.path_file+'mainModules/'+name_mod+'/style.css')

    );

  }

  return {js: mod_js, css: mod_css};

}

/*



data.ws.ch.onclose = function (event) {

  let time_reload = random(2000, 5000);

  if(data.bots.activeServer){

    time_reload = 1000;

  }



let time_bot_test = ( 3 + ((1/1000) * random(1,1000)) );
console.log('time bots test -> '+time_bot_test);

setTimeout(function(){

  data.bots.testBots();

}, data.loader.sec(time_bot_test));


*/
