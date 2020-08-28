//<input type='text' class='subInputChat' spellcheck='false' autocomplete='new-password' placeholder=' . . .' value='' />
//.split() .join()
// replace(/reemplazar todos los lugares en que este esto/g, 'por esto');
// location.reload();
// location.href = "https://www.w3schools.com";
//obtener contenido  .value
//incitar focus  .focus()
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

function random(min, max){

	return Math.floor(Math.random() * (max - min + 1) ) + min;

}

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

function l(size){

	return size.length;

}

function getHash(){
	function chr4(){
		return Math.random().toString(16).slice(-4);
	}
	return chr4() + chr4() +
	'-' + chr4() +
	'-' + chr4() +
	'-' + chr4() +
	'-' + chr4() + chr4() + chr4();
}

function isJSON(str) {
	try {

		//if(x < 5) throw "is too low"; crear errores

		JSON.parse(str);

	} catch (e) {

		console.log(e);

		return false;

	}
	return true;
}

function lang(){

	return navigator.language.split('-')[0];

}

function YoutubeUrl(url) {
	 var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	 if(url.match(p)){
			 return url.match(p)[1];
	 }
	 return false;
}

function getFecha(){

	var f = new Date();

	var hour = f.getHours();
	var mins = f.getMinutes();

	if(hour<10){

		hour = '0'+hour;

	}

	if(mins<10){

		mins = '0'+mins;

	}

	var date = f.getDate();
	var month = (f.getMonth() +1);
	var year = f.getFullYear();

	if(date<10){

	date = '0'+date

	}

	if(month<10){

		month = '0'+month;

	}

	return [ date , month , year , hour , mins];

}
