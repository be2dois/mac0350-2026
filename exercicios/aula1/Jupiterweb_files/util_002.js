/******************************************************************************
  Verifica se é número. Retorna true ou false
******************************************************************************/
function validarNumero(n){
  var x = /\D/;
  return !(x.test(n));
}


/******************************************************************************
  Valida o CPF. Retorna true ou false

	fonte: http://www.pcforum.com.br/cgi/yabb/YaBB.cgi?board=cgi;action=display;num=1090001360
******************************************************************************/
function validarCPF(cpf) {
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;

  if (cpf.length < 9) return false;

  // preenche com 0 a esquerda até completar 11 caracteres
  for (i = 1; i <= (11-cpf.length); i++){
    cpf = '0' + cpf;
  }

  for (i = 0; i < cpf.length - 1; i++)
    if (cpf.charAt(i) != cpf.charAt(i + 1)){
      digitos_iguais = 0;
      break;
    }
    if (!digitos_iguais){
      numeros = cpf.substring(0,9);
      digitos = cpf.substring(9);
      soma = 0;
      for (i = 10; i > 1; i--)
        soma += numeros.charAt(10 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
        return false;
      numeros = cpf.substring(0,10);
      soma = 0;
      for (i = 11; i > 1; i--)
        soma += numeros.charAt(11 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
        return false;
      return true;

    }
    else
      return false;
}


/******************************************************************************
  Valida o CNPJ. Retorna true ou false
******************************************************************************/
function validarCNPJ(cnpj){
  var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
  digitos_iguais = 1;

  if (cnpj.length < 11)
    return false;

  for (i = 0; i < cnpj.length - 1; i++)
    if (cnpj.charAt(i) != cnpj.charAt(i + 1)){
      digitos_iguais = 0;
      break;
    }
    if (!digitos_iguais){
      tamanho = cnpj.length - 2;
      numeros = cnpj.substring(0,tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--){
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
        return false;
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0,tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--){
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
        return false;
      return true;
    }
    else
      return false;
}


/******************************************************************************
  Formata um número seguindo um padrao.

  Utilização:
  onKeyUp="javascript:formatarNumero(this, '00000-000')"
******************************************************************************/
function formatarNumero(obtText, padrao){
	var tamanho = obtText.value.length;

	var saida = padrao.substring(0,1);

	var texto = padrao.substring(tamanho);

	if(texto.substring(0,1) != saida) {
		obtText.value += texto.substring(0,1);
	}
}


/******************************************************************************
  Mostra um erro

  Dependências: jquery, jquery-ui, jquery-block
******************************************************************************/
function mostrarErro(mensagem) {
  var x =
      '<p style="color:#cd0a0a">'+
          '<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>' +
          mensagem +
      '</p>'+
      '<div align="center"><input type="button" value=" Fechar " onclick="$.unblockUI();"></div>';

  $.blockUI.defaults.css = {};
  $.blockUI({theme:true, themedCSS:{width:"40%",top:"20%",left:'30%'}, title:'Erro', message:x, showOverlay:false});
}


/******************************************************************************
  Mostra uma mensagem

  Dependências: jquery, jquery-ui, jquery-block
******************************************************************************/
function mostrarMensagem(mensagem) {
  var x =
      '<p>'+
          '<span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>' +
          mensagem +
      '</p>'+
      '<div align="center"><input type="button" value=" Fechar " onclick="$.unblockUI();"></div>';

  $.blockUI.defaults.css = {};
  $.blockUI({theme:true, themedCSS:{width:"40%",top:"20%",left:'30%'}, title:'Mensagem', message:x, showOverlay:false});
}


/******************************************************************************
  Mostra uma mensagem e bloqueia a tela até executar o comando $.unblockUI();
  ou exibir outra mensagem

  Dependências: jquery, jquery-ui, jquery-block
******************************************************************************/
function mostrarMensagemAguardar() {
	$.blockUI({
		theme:true,
		title:'Aguarde...',
		message:'<div align="center"><div class="ajax"></div></div>',
		timeout: dwr.engine._timeout * 1.5, // espera no máximo 1.5x o timeout do dwr
		onUnblock: function(){mostrarErro('Ocorreu um erro inesperado!');}
	});
}


/******************************************************************************
  Mostra uma mensagem e bloqueia a tela até executar o comando $.unblockUI();
  ou exibir outra mensagem (modal)

  Dependências: jquery, jquery-ui, jquery-block, contextpath
******************************************************************************/
function mostrarMensagemAguardarModal() {
	$.blockUI({
		theme:true,
		title:'Aguarde...',
		message:'<div align="center"><div class="ajax"></div></div>',
		timeout: dwr.engine._timeout * 1.5, // espera no máximo 1.5x o timeout do dwr
		onUnblock: function(){mostrarErro('Ocorreu um erro inesperado!');}
	});
}



/******************************************************************************
	Mostra uma mensagem para aguardar sem overlay

	Dependências: jquery, jquery-ui, jquery-block
******************************************************************************/
function mostrarMensagemAguardarSemOverlay() {
	$.blockUI({
		theme:true,
		title:'Aguarde...',
		message:'<div align="center"><div class="ajax"></div></div>',
		timeout: dwr.engine._timeout * 1.5, // espera no máximo 1.5x o timeout do dwr
		onUnblock: function(){mostrarErro('Ocorreu um erro inesperado!');},
		showOverlay:false
	});
}

/******************************************************************************
	Mostra uma mensagem e bloqueia a tela até executar o comando $.unblockUI();
	ou exibir outra mensagem

	Dependências: jquery, jquery-ui, jquery-block
******************************************************************************/
function desbloquearTela() {
	$.unblockUI();
}

/******************************************************************************
	Funções de janela modal

	Dependências: jquery, fancybox
******************************************************************************/
var janelaModal = {
	abrir : function(my_href) {
		$.fancybox({
			padding:5,margin:20,
			speedIn:10, speedOut:10,
			width:"100%",
			height:"100%",
			type:'iframe',
			href:my_href
		});
	},

	fechar : function() {
		parent.$.fancybox.close();
	}
};

/*
	This script and many more are available free online at
	The JavaScript Source!! http://javascript.internet.com
	Created by: Justas | http://www.webtoolkit.info/

	Obs: Adicionado o método param
*/
var url = {
	param : function (nomeParametro) {
		var results = new RegExp('[\\?&]' + nomeParametro + '=([^&#]*)').exec(window.location.href);
		if (!results) {return '';}
		return url.decode(results[1]) || 0;
	},

 	// public method for URL encoding
 	encode : function (string) {
 		 return escape(this._utf8_encode(string));
 	},

 	// public method for URL decoding
	decode : function (string) {
 	 	return this._utf8_decode(unescape(string));
 	},

 	// private method for UTF-8 encoding
 	_utf8_encode : function (string) {
  		string = string.replace(/\r\n/g,"\n");
 	 	var utftext = "";

  		for (var n = 0; n < string.length; n++) {
   			var c = string.charCodeAt(n);
   			if (c < 128) {
    				utftext += String.fromCharCode(c);
 			} else if((c > 127) && (c < 2048)) {
  				utftext += String.fromCharCode((c >> 6) | 192);
  				utftext += String.fromCharCode((c & 63) | 128);
 			} else {
  				utftext += String.fromCharCode((c >> 12) | 224);
  				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
 	 			utftext += String.fromCharCode((c & 63) | 128);
 			}
 	}

		return utftext;
	},

 	// private method for UTF-8 decoding
 	_utf8_decode : function (utftext) {
 		 var string = "";
 		 var i = 0;
 		 var c = c1 = c2 = 0;

  		while ( i < utftext.length ) {
  			 c = utftext.charCodeAt(i);
   			if (c < 128) {
    				string += String.fromCharCode(c);
    				i++;
  			 } else if((c > 191) && (c < 224)) {
 				   c2 = utftext.charCodeAt(i+1);
    				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
    				i += 2;
  			 } else {
 				   c2 = utftext.charCodeAt(i+1);
    				c3 = utftext.charCodeAt(i+2);
    				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
   				 i += 3;
 			  }
		  }
		return string;
	 }
};

/*
	Script baseado em:
	http://www.trirand.com/blog/?page_id=393/help/export-jqgrid-data-to-excel-solution-that-worked-for-me/

	exemplo de uso: jqgridUtil.criarBotaoExportar(idTabela);
*/
var jqgridUtil = {
	// Cria o botão para exportar os dados do grid em excel
	criarBotaoExportar:function (idTabela) {
		jQuery("#"+idTabela).jqGrid('navButtonAdd',"#div_"+idTabela,{
			caption:"",
			title:"Exportar",
			buttonicon:"ui-icon-extlink",
			onClickButton:function(){
				// cria a div da tela
				$("#grid_modal_exportar").remove();
				$('<div id="grid_modal_exportar" title="Exportar..."><form name="grid_modal_exportar_form" id="grid_modal_exportar_form">Nome do Arquivo: <input type="text" name="exportFileName" id="exportFileName" value="gridExport.csv"><input type="hidden" name="exportBuffer"></form></div>').appendTo("body");

				// mostra o modal
				$("#grid_modal_exportar").dialog({
					height: 130,
					closeOnEscape: true,
					modal: true,
					resizable: false,
					buttons: {
						"Exportar": function() {
							if($("#exportFileName").val()==''){
								alert("Informe o nome do arquivo!");
								return;
							}

							// verifica se há a coluna de numeração (se tiver, ignorar a primeira coluna)
							var rownumbersAtivo = jQuery("#"+idTabela).jqGrid("getGridParam","rownumbers");
							var colunaInicial = (rownumbersAtivo?1:0);

							// obtemos os nomes fictícios das colunas
							var colNames = jQuery("#"+idTabela).jqGrid("getGridParam","colNames");

							// obtemos os nomes reais das colunas
							var colModel = jQuery("#"+idTabela).jqGrid("getGridParam","colModel");

							var dataOut = "";
							var delimitador = ";";

							// exportamos os nomes fictícios das colunas
							for(var i=colunaInicial;i < colNames.length;i++){
								dataOut = dataOut + "\"" + colNames[i] + "\"" + delimitador;
							}
							dataOut = dataOut + "\n";

							var rowID = jQuery("#"+idTabela).jqGrid('getDataIDs');

							// exportamos os dados exibidos no grid
							for(i=0;i < rowID.length;i++){
								rowData = jQuery("#"+idTabela).jqGrid('getRowData',rowID[i]);

								for(var j=colunaInicial;j<colModel.length;j++){
									dataOut = dataOut + "\"" + rowData[colModel[j].name] + "\"" + delimitador;
								}
								dataOut = dataOut + "\n";
							}

							if(rowID.length > 0){
								// criamos um form no body para submeter os dados
								//$('<form name="formExport" id="formExport"><input type="hidden" name="exportBuffer"></form>').appendTo("body");

								document.grid_modal_exportar_form.exportBuffer.value = dataOut;
								document.grid_modal_exportar_form.method='POST';
								document.grid_modal_exportar_form.action='webGridExport.jsp?print=s';
								document.grid_modal_exportar_form.target='_blank';
								document.grid_modal_exportar_form.submit();

								$('#grid_modal_exportar_form').remove();
								$(this).dialog("close");
							} else {
								mostrarMensagem('Não há dados a exportar!');
							}
						},
						"Fechar": function() {$(this).dialog("close");}
					}
				});
			}
		});
	},

	// Cria o botão para alterar o agrupamento
	criarBotaoAgrupar:function (idTabela) {
		jQuery("#"+idTabela).jqGrid('navButtonAdd',"#div_"+idTabela,{
			caption:"",
			title:"Agrupar",
			buttonicon:"ui-icon-carat-2-n-s",
			onClickButton:function(){
				// verifica se há a coluna de numeração (se tiver, ignorar a primeira coluna)
				var rownumbersAtivo = jQuery("#"+idTabela).jqGrid("getGridParam","rownumbers");

				if(rownumbersAtivo){
					alert('Função não disponível quando rownumbers: true!');
					return;
				}

				// obtemos os nomes fictícios das colunas
				var colNames = jQuery("#"+idTabela).jqGrid("getGridParam","colNames");

				// obtemos os nomes reais das colunas
				var colModel = jQuery("#"+idTabela).jqGrid("getGridParam","colModel");

				// cria a div da tela
				$("#grid_modal_agrupar").remove();
				$('<div id="grid_modal_agrupar" title="Agrupar...">Campo: <select id="grid_modal_agrupar_select"></select></div>').appendTo("body");

				// monta o combo
				$("#grid_modal_agrupar_select").empty();
				dwr.util.addOptions("grid_modal_agrupar_select", [{id:'', name:'- Nenhum -'}], "id", "name");

				for(var i=0;i < colNames.length;i++){
					if(!colModel[i].hidden){
						dwr.util.addOptions("grid_modal_agrupar_select", [{id:colModel[i].name, name:colNames[i]}], "id", "name");
					}
				}

				// seleciona
				var campoAgrupado = jQuery("#"+idTabela).jqGrid("getGridParam","groupingView").groupField;
				$("#grid_modal_agrupar_select").val(campoAgrupado);

				$("#grid_modal_agrupar_select").change(function(){
					var valorSelecionado = $(this).val();

					if(valorSelecionado == "") {
						jQuery("#"+idTabela).jqGrid('groupingRemove',true);
					} else {
						jQuery("#"+idTabela).jqGrid('groupingGroupBy',valorSelecionado);
					}
				});

				// a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
				$("#dialog:ui-dialog").dialog("destroy");

				// mostra o modal
				$("#grid_modal_agrupar").dialog({
					height: 110,
					closeOnEscape: true,
					modal: true,
					resizable: false,
					buttons: {
						"Resetar": function() {jQuery("#"+idTabela).jqGrid('groupingRemove',true);$("#grid_modal_agrupar_select").val("");},
						"Fechar": function() {$(this).dialog("close");}
					}
				});
			}
		});
	},

	// cria o botão de seleção de colunas
	criarBotaoSelecionarColunas: function (idTabela){
		jQuery("#"+idTabela).jqGrid('navButtonAdd',"#div_"+idTabela,{
			caption: "",
			title: "Selecionar Colunas...",
			onClickButton : function (){
				jQuery("#"+idTabela).jqGrid('columnChooser');
			}
		});
	}

};



/*
* @Copyright (c) 2010 Ricardo Andrietta Mendes - eng.rmendes@gmail.com
* https://sites.google.com/site/rmendescode/jquery/number_format
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*
* How to use it:
* var formated_value = util.formatarNumero(final_value);
*
* Advanced:
* var formated_value = util.formatarNumero(final_value,
* 													{
* 													numberOfDecimals:3,
* 													decimalSeparator: '.',
* 													thousandSeparator: ',',
* 													symbol: 'R$'
* 													});
*/
//indica que está sendo criado um plugin
var util = { //indica que está sendo criado um plugin

	formatarNumero: function(numero, params) //indica o nome do plugin que será criado com os parametros a serem informados
		{
		//parametros default
		var sDefaults =
			{
			numberOfDecimals: 2,
			decimalSeparator: ',',
			thousandSeparator: '.',
			symbol: ''
			};

		if(numero != null){

		//função do jquery que substitui os parametros que não foram informados pelos defaults
		var options = jQuery.extend(sDefaults, params);

		//CORPO DO PLUGIN
		var number = numero;
		var decimals = options.numberOfDecimals;
		var dec_point = options.decimalSeparator;
		var thousands_sep = options.thousandSeparator;
		var currencySymbol = options.symbol;

		var exponent = "";
		var numberstr = number.toString ();
		var eindex = numberstr.indexOf ("e");
		if (eindex > -1)
		{
		exponent = numberstr.substring (eindex);
		number = parseFloat (numberstr.substring (0, eindex));
		}

		if (decimals != null)
		{
		var temp = Math.pow (10, decimals);
		number = Math.round (number * temp) / temp;
		}
		var sign = number < 0 ? "-" : "";
		var integer = (number > 0 ?
		  Math.floor (number) : Math.abs (Math.ceil (number))).toString ();

		var fractional = number.toString ().substring (integer.length + sign.length);
		dec_point = dec_point != null ? dec_point : ".";
		fractional = decimals != null && decimals > 0 || fractional.length > 1 ?
				   (dec_point + fractional.substring (1)) : "";
		if (decimals != null && decimals > 0)
		{
		for (i = fractional.length - 1, z = decimals; i < z; ++i)
		  fractional += "0";
		}

		thousands_sep = (thousands_sep != dec_point || fractional.length == 0) ?
					  thousands_sep : null;
		if (thousands_sep != null && thousands_sep != "")
		{
		for (var i = integer.length - 3; i > 0; i -= 3)
		  integer = integer.substring (0 , i) + thousands_sep + integer.substring (i);
		}

		if (options.symbol == '')
		{
		return sign + integer + fractional + exponent;
		}
		else
		{
		return currencySymbol + ' ' + sign + integer + fractional + exponent;
		}
		}
		//FIM DO CORPO DO PLUGIN

	},

	// método adicionado
	desformatarNumero: function(numero){
		// verifica se tem ponto e vírgula
		if(numero.indexOf(".") > 0 && numero.indexOf(",") > 0){
			var groupSeparator = '.';

			// separador decimal é .
			if(numero.lastIndexOf(".") > numero.lastIndexOf(",")){
				groupSeparator = ',';
			}

			// retira o caracter agrupador
			while (numero.indexOf(groupSeparator) > 0) {
				numero = numero.replace(groupSeparator,'');
			}
		}

		numero = numero.replace(',', '.');

		return numero;
	}
};

// onBlur="javascript:validaFrequencia(this)"
function validaFrequencia(myinput){
	var n = myinput.value;
	var msg = "";

	if(n==''){
		// msg = "A freqüência deve ser informada!";
	}
	else if(n!='' && (!isDecimal(n) && !isNumber(n))){
		msg = "A freqüência informada '" + n + "' está incorreta";
	}
	else if(unformat(n)>100.0){
		msg = "A freqüência informada '" + n + "' não pode ser maior que 100%";
	}

	if(msg!=""){
		alert(msg);
		myinput.select();
		myinput.focus();
	} else if(n!='') {
		myinput.value = formataNumero(n, 2);
	}
}

// onBlur="javascript:formataURL(this)"
function formataURL(t){

	if(t.value.length > 0 && (t.value.toLowerCase().indexOf('http://') < 0)){
		t.value = 'http://' + t.value;
	}
}

// onKeyUp="javascript:checkTextSize(this, 'Especifique', 50)"
function checkTextSize(t, nome, tamanho){
	if(t.value.length > tamanho){
		alert("Você digitou " + t.value.length + " caracteres.\n\n" +
			"Digite no máximo " + tamanho + " caracteres no campo " + nome + ".");

		t.value = t.value.substring(0, tamanho);
		t.focus();
	}
}

// onBlur="javascript:validaHora(this)"
function validaHora(myinput){
	var hora = myinput.value;

	// retiramos numeros sobrando
	if(hora!='' && isNumber(hora) && hora.length > 4){
		myinput.value = hora.substring(0, 4);
		hora = myinput.value;
	}

	// vamos formatar
	if(hora!='' && isNumber(hora)){
		if(hora.length > 2){
			myinput.value = hora.substring(0, hora.length-2) + ":" + hora.substring(hora.length-2, hora.length);
			hora = myinput.value;
		}
	}

	var erro = false;

    // verifica se tem :
	if (hora.indexOf(":") < 1){
		erro = true;
	}
	else {
		var s = hora.split(":");

		// verifica se são números
		if(!isNumber(s[0]) || !isNumber(s[1])) erro = true;

		// verifica se as horas não ultrapassa 24
		if(s[0] > 24) erro = true;

		// verifica se os minutos não ultrapassa 59
		if(s[1] > 59) erro = true;
	}

	if(hora!='' && erro){
		alert("Formato de hora inválido!\n\nPor favor, utilize o formato hh:mm");
		myinput.select();
		myinput.focus();
	}
}

function validaCargaHoraria(myinput){
	var hora = myinput.value;

	// vamos formatar
	if(hora!='' && isNumber(hora)){
		if(hora.length > 2){
			myinput.value = hora.substring(0, hora.length-2) + ":" + hora.substring(hora.length-2, hora.length);
			hora = myinput.value;
		}
	}

	var erro = false;

    // verifica se tem :
	if (hora.indexOf(":") < 1){
		erro = true;
	}
	else {
		var s = hora.split(":");

		// verifica se são números
		if(!isNumber(s[0]) || !isNumber(s[1])) erro = true;

		// verifica se os minutos não ultrapassa 59
		if(s[1] > 59) erro = true;
	}

	if(hora!='' && erro){
		alert("Formato de hora inválido!\n\nPor favor, utilize o formato hh:mm");
		myinput.select();
		myinput.focus();
	}
}

// Formato: (99)9999-9999
function formataTelefone(myinput){
    tiraNaoNumero(myinput);

    if(myinput.value.length==1){myinput.value = '(' + myinput.value;}
    else if(myinput.value.length==3){myinput.value = myinput.value + ')';}
    else if(myinput.value.length==8){myinput.value = myinput.value + '-';}
}

// formato 00000-000
function formataCEP(myinput){
    tiraNaoNumero(myinput);

    if(myinput.value.length==5){myinput.value = myinput.value + '-';}
}

// formato 00.000.000/0000-00
function formataCNPJ(myinput){
    tiraNaoNumero(myinput);

    if(myinput.value.length==2 || myinput.value.length==6){myinput.value = myinput.value + '.';}
    else if(myinput.value.length==10){myinput.value = myinput.value + '/';}
    else if(myinput.value.length==15){myinput.value = myinput.value + '-';}
}

// formato 00/00/0000
function formataData(myinput){
    tiraNaoNumero(myinput);

    if(myinput.value.length==2 || myinput.value.length==5){myinput.value = myinput.value + '/';}
}

// formato 00.0.00000.00.0
function formataProcesso(myinput){
    tiraNaoNumero(myinput);

    if(myinput.value.length==2 || myinput.value.length==4 || myinput.value.length==10 || myinput.value.length==13){myinput.value = myinput.value + '.';}
}

// retira os caracteres de um input que não são numeros
function tiraNaoNumero(myinput){
    var n = myinput.value.substring(myinput.value.length-1, myinput.value.length);
    if(!isNumber(n)) myinput.value = myinput.value.substring(0, myinput.value.length-1);
}

function isNumber(n){
    var x = /\D/;
    return !(x.test(n));
}

function isDecimal(n){
    var x = unformat(n);
    x = x.split(".");

    if(x.size==0) return false;

    return (isNumber(x[0]) && isNumber(x[1]));
}

function unformat(expr){
	// se tem ponto e vírgula, retiramos os pontos de milhar
	// e mudamos a vírgula por ponto
	if((expr.indexOf(".") > 0) && (expr.indexOf(",") > 0)){
		expr = expr.replace(".","");
	}

	expr = expr.replace(",",".");

	if(isNaN(expr)){
		expr = "0";
	}

	return expr;
}

function formataNumero(expr, decplaces){
	expr = unformat(expr);

	var str = "" + Math.round(eval(expr) * Math.pow(10,decplaces));

	while(str.length <= decplaces){
		str = "0" + str;
	}

	var decpoint = str.length - decplaces;
	var inteiro = str.substring(0, decpoint);
	var decimal = str.substring(decpoint, str.length);

	return inteiro + "," + decimal;
}


$(function(){   
	$('.processo').mask('99.9.99999.99.9'); 	
	$('.apostila').mask('9999/9999'); 
	$('.ddd').mask('99'); 			//ddd
	$('.telefone').mask('9999-9999'); 	//telefone
	$('.hora').mask('99:99'); 		//hora
	$('.data').mask('99/99/9999'); 		//data
	$('.datahora').mask('99/99/9999 99:99'); 		//data
    	$('.data').datepicker({   
        	dateFormat: 'dd/mm/yy',   
        	buttonImage: 'https://uspdigital.usp.br/comumwebdev/imagens/icones/16/calendar.gif',    
        	buttonImageOnly: true,   
        	showOn: 'button',
		dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],   
		dayNamesMin: ['D','S','T','Q','Q','S','S','D'],   
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],   
		monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],   
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
		});   
	    $('.datahora').datepicker({   
        	dateFormat: 'dd/mm/yy 00:00', 
        	buttonImage: 'https://uspdigital.usp.br/comumwebdev/imagens/icones/16/calendar.gif',   
        	buttonImageOnly: true,   
        	showOn: 'button',
		dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],   
		dayNamesMin: ['D','S','T','Q','Q','S','S','D'],   
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],   
		monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],   
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
		}); 
		//$('.ui-datepicker-trigger').css('margin-left','3px').css('margin-top','8px').css('margin-bottom','-3px');			
	});