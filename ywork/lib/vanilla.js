//<input type='text' class='subInputChat' spellcheck='false' autocomplete='new-password' onfocusout="mod_session.outUserNameInput();" placeholder=' . . .' value='' />
//.split() .join()
// replace(/reemplazar todos los lugares en que este esto/g, 'por esto');
// location.reload();
// location.href = "https://www.w3schools.com";
//obtener contenido  .value
//incitar focus  .focus() fuera focus .blur()
// .attr = ''
//.includes('php') detectar string en string
//async function load_foro_sietechakras() {
//	const foro_sietechakras = await import('https://www.somosindia.cl/sv/gestor/foro_sietechakras.js');
//}
//load_foro_sietechakras(data);
//JSON.parse() JSON.stringify()
//str.trim() limpiar string
//this.className.split('_')
//s().onevent = function(){}; sobree escritura de evento
//parseFloat(Math.round( num * 100) / 100).toFixed(2);
//&nbsp; &nbsp;
//s('.chat-history').scrollTop = s('.chat-history').scrollHeight;
//s('.'+name+'-input-focus').onmouseout 

function s(div){

	return document.querySelector(div);

}

function append(div, html){

	s(div).insertAdjacentHTML('beforeend', html);

}

function prepend(div, html){

	s(div).insertAdjacentHTML('afterbegin', html);

}

function htmls(div, html){

	s(div).innerHTML = html;

}

function sremove(div){

	s(div).parentNode.removeChild(s(div));

}

function fadeOut(el){
	el.style.opacity = 1;

	(function fade() {
		if ((el.style.opacity -= .1) < 0) {
			el.style.display = "none";
		} else {
			requestAnimationFrame(fade);
		}
	})();
};

function fadeIn(el, display){
	el.style.opacity = 0;
	el.style.display = display || "block";

	(function fade() {
		var val = parseFloat(el.style.opacity);
		if (!((val += .1) > 1)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
};

function setScrollTouchX(el){

	const slider = s(el);
	let isDown = false;
	let startX;
	let scrollLeft;

	slider.onmousedown = function (e) {

	  isDown = true;
	  slider.classList.add("active");
	  startX = e.pageX - slider.offsetLeft;
	  scrollLeft = slider.scrollLeft;

	};

	slider.onmouseleave = function (e) {

	  isDown = false;
	  slider.classList.remove("active");

	};

	slider.onmouseup = function (e) {

	  isDown = false;
	  slider.classList.remove("active");

	};

	slider.onmousemove = function (e) {

	  if (!isDown) return;
	  e.preventDefault();
	  const x = e.pageX - slider.offsetLeft;
	  const walk = x - startX;
	  slider.scrollLeft = scrollLeft - walk;

	};

}

function lang(){

	return navigator.language.split('-')[0];

}

function fullScreenIn(){

	let el = document.documentElement;
	let rfs = // for newer Webkit and Firefox
	el.requestFullScreen
	|| el.webkitRequestFullScreen
	|| el.mozRequestFullScreen
	|| el.msRequestFullScreen
	;
	if(typeof rfs!="undefined" && rfs){
		rfs.call(el);
	} else if(typeof window.ActiveXObject!="undefined"){
		// for Internet Explorer
		let wscript = new ActiveXObject("WScript.Shell");
		if (wscript!=null) {
			wscript.SendKeys("{F11}");
		}
	}

}

function fullScreenOut(){

	document.exitFullscreen();

}

//----------------------------------
//----------------------------------

async function ajax(type, url, obj, end){

	let xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.send(JSON.stringify(obj));

	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			end(JSON.parse(this.responseText));
		}
	};

}

/*ajax('POST', '/check_input', {

	name: name,
	value: val

}, function(res){

	//console.log('ajax response');
	//console.log(res);

	if(res.adv!=''){

		htmls(('.error-input-txt-'+name), res.adv[it]);
		fadeIn(s('.error-input-'+name), 'block');

	}

});*/

//----------------------------------
//----------------------------------

// Ejemplo implementando el metodo POST:
async function postData(url = '', data = {}) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

/*

postData('https://example.com/answer', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
});

*/

function notclick(div, id, state){

	if(id==0){
		s(div).oncontextmenu = function(){ return state; }
	}

	if(id==1){
		s(div).ondragstart = function(){ return state; }
	}

	if(id==2){
		s(div).onselectstart = function(){ return state; }
	}

}
