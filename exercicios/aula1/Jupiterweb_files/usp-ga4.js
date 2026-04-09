
var __ambienteProd = window.location.href.indexOf("https://uspdigital") >= 0;
var __codigoGAsistema = "G-K1Y204Q919";

var _urlAjax = null;

if (__ambienteProd) {	
	window.dataLayer = window.dataLayer || [];
	function gtag(){
		dataLayer.push(arguments);
	}
	gtag('js', new Date());
	gtag('config', __codigoGAsistema);
	  
	//codigo abaixo faz o track de analytics para qualquer chamada ajax (inclusive dwr)
	//se o batch do dwr estiver habilitado, provavelmente a chamada abaixo vai parar de funcionar
	//inspirado em http://stackoverflow.com/questions/25335648/how-to-intercept-all-ajax-requests-made-by-different-js-libraries
	(function(open) {
		XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
			this._urlAjax = url;
			open.call(this, method, url, async, user, pass);
		};
	})(XMLHttpRequest.prototype.open);
	
	(function(send) {
		XMLHttpRequest.prototype.send = function(data) {
			if (this._urlAjax.indexOf("ControleAutorizadoDWR") > 0) this._urlAjax += data.split("\n")[5] ? "." + data.split("\n")[5].replace("c0-param0=string:","") : "";
			else if (this._urlAjax.indexOf("ControlePublicoDWR") > 0) this._urlAjax += data.split("\n")[5] ? "." + data.split("\n")[5].replace("c0-param0=string:","") : "";
			//ga('sistema.send', 'pageview', this._urlAjax);
			/*window.dataLayer.push({
	 			'event': 'virtualPageView',
		 		'pageUrl': this._urlAjax,
		 		'pageTitle': this._urlAjax
		 	});*/
		 	gtag('event', 'ajax', {'url': this._urlAjax});
			send.call(this, data);	   	
		};
	})(XMLHttpRequest.prototype.send);
}
