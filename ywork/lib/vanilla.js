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

function ajax(type, url, obj, end){

	let xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.send(JSON.stringify(obj));

	//----------------------------------
	//----------------------------------

	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			end(JSON.parse(this.responseText));
		}
	};

}
