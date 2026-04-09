/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/messages-main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constantes.js":
/*!***************************!*\
  !*** ./src/constantes.js ***!
  \***************************/
/*! exports provided: MENSAGEM_CARREGADA, MENSAGEM_NAVEGACAO, MENSAGEM_SUBMISSAO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENSAGEM_CARREGADA", function() { return MENSAGEM_CARREGADA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENSAGEM_NAVEGACAO", function() { return MENSAGEM_NAVEGACAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENSAGEM_SUBMISSAO", function() { return MENSAGEM_SUBMISSAO; });
var MENSAGEM_CARREGADA = 'PAGINA_LEGADA_CARREGADA';
var MENSAGEM_NAVEGACAO = 'PAGINA_LEGADA_NAVEGACAO';
var MENSAGEM_SUBMISSAO = 'PAGINA_LEGADA_SUBMISSAO';

/***/ }),

/***/ "./src/funcoes.js":
/*!************************!*\
  !*** ./src/funcoes.js ***!
  \************************/
/*! exports provided: obterContexto, obterDestinoMensagem, otimizarCss, removerElementosDesnecessarios */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "obterContexto", function() { return obterContexto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "obterDestinoMensagem", function() { return obterDestinoMensagem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "otimizarCss", function() { return otimizarCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removerElementosDesnecessarios", function() { return removerElementosDesnecessarios; });
/**
 * Obtem o contexto do sistema baseado no endereço atual da janela
 */
var obterContexto = function obterContexto() {
  var pathname = window.location.pathname,
      indice = pathname.substring(1).indexOf('/'),
      contexto = pathname.substring(1, indice + 1);
  return contexto;
};
/**
 * Obtem a url de destino das mensagens do JS
 */


var obterDestinoMensagem = function obterDestinoMensagem() {
  var queryParams = new URLSearchParams(window.location.search),
      refPortal = queryParams.get('ref-portal') || sessionStorage.getItem('ref-portal');

  if (refPortal) {
    sessionStorage.setItem('ref-portal', refPortal);
  } else {
    refPortal = obterDestinoDeOrigem(document.referrer);
  }

  return refPortal;
};
/**
 * Obtem a URL de destino das mensagens baseado na URL de origem.
 *
 * @param {String} origem url de origem do iFrame
 * @returns {String} url de destino das mensagens
 */


var obterDestinoDeOrigem = function obterDestinoDeOrigem(origem) {
  var destino = '';
  if (origem.indexOf('dev.uspdigital.usp.br') !== -1) destino = 'https://dev.uspdigital.usp.br';else if (origem.indexOf('labs.uspdigital.usp.br') !== -1) destino = 'https://labs.uspdigital.usp.br';else if (origem.indexOf('uspdigital.usp.br') !== -1) destino = 'https://uspdigital.usp.br';else if (origem.indexOf('localhost') !== -1) destino = 'http://localhost:8080';
  return destino;
};
/**
 * Otimiza o CSS de alguns elementos encontrados do documento passado.
 *
 * @param {Document} documento DOM a otimizar o CSS
 */


var otimizarCss = function otimizarCss(documento) {
  // Retira o padding padrão do conteúdo
  var conteudo = documento.getElementById('layout_conteudo');

  if (conteudo) {
    conteudo.style.padding = '0';
  }
};
/**
 * Remove os elementos desnecessários para renderização no Portal (menus laterais, cabeçalhos, etc.)
 *
 * @param {Document} documento a ser otimizado
 */


var removerElementosDesnecessarios = function removerElementosDesnecessarios(documento) {
  // Tenta remover o Cabeçalho e menu padrão do sistema
  var cabecalho = documento.getElementById('layout_cabecalho'),
      menu = documento.getElementById('layout_menu');

  if (cabecalho) {
    cabecalho.remove();
  }

  if (menu) {
    menu.remove();
  }
};



/***/ }),

/***/ "./src/mensagens.js":
/*!**************************!*\
  !*** ./src/mensagens.js ***!
  \**************************/
/*! exports provided: enviarMensagemCarregado, enviarMensagemNavegacao, enviarMensagemSubmissao */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enviarMensagemCarregado", function() { return enviarMensagemCarregado; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enviarMensagemNavegacao", function() { return enviarMensagemNavegacao; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enviarMensagemSubmissao", function() { return enviarMensagemSubmissao; });
/* harmony import */ var _constantes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constantes */ "./src/constantes.js");

/**
 * Encia a mensagem de que existe uma navegação interna do sistema a ser considerada.
 *
 * @param {String} destino url de destino da mensagem.
 * @param {String} url url da navegação.
 * @param {String} contexto contexto do sistema atual.
 */

var enviarMensagemNavegacao = function enviarMensagemNavegacao(destino, url, contexto) {
  window.parent.postMessage({
    id: _constantes__WEBPACK_IMPORTED_MODULE_0__["MENSAGEM_NAVEGACAO"],
    url: url,
    contexto: contexto
  }, destino);
};
/**
 * Encia a mensagem de que existe um formulário sendo devidamente submetido.
 *
 * @param {String} destino url de destino da mensagem.
 * @param {String} url url da navegação.
 * @param {String} contexto contexto do sistema atual.
 */


var enviarMensagemSubmissao = function enviarMensagemSubmissao(destino, url, contexto) {
  window.parent.postMessage({
    id: _constantes__WEBPACK_IMPORTED_MODULE_0__["MENSAGEM_SUBMISSAO"],
    url: url,
    contexto: contexto
  }, destino);
};
/**
 * Envia a mensagem ao destino passado avisando que a otimização acabou com a URL atual passada.
 *
 * @param {String} destino url de destino da mensagem.
 * @param {String} url url atual de carregamento.
 */


var enviarMensagemCarregado = function enviarMensagemCarregado(destino, url, contexto) {
  window.parent.postMessage({
    id: _constantes__WEBPACK_IMPORTED_MODULE_0__["MENSAGEM_CARREGADA"],
    url: url,
    contexto: contexto
  }, destino);
};



/***/ }),

/***/ "./src/messages-main.js":
/*!******************************!*\
  !*** ./src/messages-main.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _funcoes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./funcoes */ "./src/funcoes.js");
/* harmony import */ var _mensagens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mensagens */ "./src/mensagens.js");


document.addEventListener('DOMContentLoaded', function () {
  if (window !== window.parent) {
    var urlAtual = window.location.pathname.substring(1).split('/')[1],
        query = window.location.search,
        destino = Object(_funcoes__WEBPACK_IMPORTED_MODULE_0__["obterDestinoMensagem"])();

    if (destino) {
      window.addEventListener('beforeunload', function (event) {
        Object(_mensagens__WEBPACK_IMPORTED_MODULE_1__["enviarMensagemNavegacao"])(destino, urlAtual + query, Object(_funcoes__WEBPACK_IMPORTED_MODULE_0__["obterContexto"])());
      }); // remove o que não precisa

      Object(_funcoes__WEBPACK_IMPORTED_MODULE_0__["removerElementosDesnecessarios"])(document); // otimiza o CSS do que for necessário

      Object(_funcoes__WEBPACK_IMPORTED_MODULE_0__["otimizarCss"])(document); // Avisa o fim da otimização

      Object(_mensagens__WEBPACK_IMPORTED_MODULE_1__["enviarMensagemCarregado"])(destino, urlAtual + query, Object(_funcoes__WEBPACK_IMPORTED_MODULE_0__["obterContexto"])());
    }
  }
});

/***/ })

/******/ });
//# sourceMappingURL=messages.min.js.map