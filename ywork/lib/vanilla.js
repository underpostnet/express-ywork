//<input type='text' class='subInputChat' spellcheck='false' autocomplete='new-password' placeholder=' . . .' value='' />
//.split() .join()
// replace(/reemplazar todos los lugares en que este esto/g, 'por esto');
// location.reload();
// location.href = "https://www.w3schools.com";
//obtener contenido  .value
//incitar focus  .focus()
// .attr = ''

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

document.oncontextmenu = function(){ return false; }

document.ondragstart = function(){ return false; }

document.onselectstart = function(){ return false; }
