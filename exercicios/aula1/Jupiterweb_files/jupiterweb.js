function uppercase(letra){
	letra.value = letra.value.toUpperCase();
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
  Mostra uma mensagem e bloqueia a tela até executar o comando $.unblockUI();
  ou exibir outra mensagem

  Dependências: jquery, jquery-ui, jquery-block
 ******************************************************************************/
function mostrarMensagemAguardar() {
	$.blockUI({
		theme:true,
		title:'Aguarde...',
		message:'<div align="center"><img src="images/ajaxLoaderPeq.gif" border="0"/></div>',
		timeout: dwr.engine._timeout * 1.5, // espera no máximo 1.5x o timeout do dwr
//		onUnblock: function(){mostrarErro('Ocorreu um erro inesperado 1!');}
	});
}

function mostrarMensagemAguardarModal(){
	if($("#holdy").length != 0) return;
	var $div = $('<div/>').appendTo('body');
	$div.attr('id', 'holdy');
	$div.append('<div align="center"  style="height: 18px;"><img src="images/ajaxLoaderPeq.gif" border="0"/></div>');
	$div.dialog({
		resizable: false,
		title: "Aguarde...",
		modal: true,
		height:'auto',
		minHeight: 20,
		stack: true
	});
}

function desbloquearTelaModal() {
	$("#holdy").remove();
}

function mostrarErroModal(mensagem){
	var $div = $('<div/>').appendTo('body');
	$div.attr('id', 'err');
	$div.append('<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>' +
	mensagem +'</p>');
	$div.dialog({
		resizable: false,
		title: "Erro",
		modal: true,
		height:'auto',
		minHeight: 20,
		stack: true,
		buttons: {"Fechar" : function(){
					$(this).dialog("close");
					$("#err").remove();
				}
		}
	});
}

function mostrarMensagemModal(mensagem){
	var $div = $('<div/>').appendTo('body');
	$div.attr('id', 'msg');
	$div.append('<p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>' +
	mensagem +'</p>');
	$div.dialog({
		resizable: false,
		title: "Aviso",
		modal: true,
		height:'auto',
		minHeight: 20,
		stack: true,
		buttons: {"Fechar" : function(){
					$(this).dialog("close");
					$("#msg").remove();
				}
		}
	});
}

function mostrarConfirmacaoModal(mensagem, simFunc, naoFunc){
	var $div = $('<div/>').appendTo('body');
	$div.attr('id', 'conf');
	$div.append('<p>'+mensagem +'</p>');
	$div.dialog({
		resizable: false,
		title: "Confirme",
		modal: true,
		height:'auto',
		minHeight: 20,
		stack: true,
		buttons:
			[ {
				html : "Sim",
				click : function(){
					simFunc();
					$(this).dialog("close");
				}
			}, {
				id : "button-close",
				html : "N&atilde;o",
				click : function() {
					$(this).dialog("close");
				}
			} ],
		close:function(){
			$("#conf").remove();
		}
	});
}

/******************************************************************************
	Mostra uma mensagem de erro modal sempre superior a outras modais.

	 @param mensagem mensagem de erro para mostrar
 ******************************************************************************/
/*  var mostrarErroModal = function(mensagem) {
	$("#div_error_text").text(mensagem);
	$("#div_error").dialog({
		resizable: false,
		height:140,
		title: "Erro",
		modal: true,
		buttons: {"Fechar": function (){$( this ).dialog( "close" );}}
	});
	$("#div_error").dialog( "moveToTop" );
}; */

/******************************************************************************
Limpa o formulário do elemento passado

	 @param ele formulário para limpar
 ******************************************************************************/
function clearFormElements(ele) {
	ele.find(':input').each(function() {
		switch(this.type) {
		case 'password':
		case 'select-multiple':
		case 'select-one':
		case 'text':
		case 'hidden':
		case 'textarea':
			$(this).val('');
			break;
		case 'checkbox':
		case 'radio':
			this.checked = false;
		}
	});
}

/******************************************************************************
	Preenche o formulário com o bean passada

	 @param bean bean a preencher o formulário
	 @param form elemento do formulário a preencher
 ******************************************************************************/
function preencheForm(bean, form) {
	if(bean != null){
		form.find(':input,span[data-name]').each(function() {
			if(($(this).attr("type")=="radio" || $(this).attr("type")=="checkbox") && (bean[this.name] != "" && $(this).val() === bean[this.name])){
					$(this).prop('checked', true);
			} else if($(this).attr("type")!="radio" && $(this).attr("type")!="checkbox" && $(this).attr("type") != "button" && !$(this).is("span")){
				$(this).val(bean[this.name]);
			} else if($(this).is("span")){
				$(this).html(bean[$(this).data("name")]);
			}
		});
	}
}

/******************************************************************************
Preenche a bean com informações da form

 @param form elementeo do formulário a retirar informações
 @return bean com infromações preenchidas pelos nomes dos inputs do formulário
 ******************************************************************************/
var preencheBean = function(form){
	var bean = {};
	form.find(':input[type!="button"][name],span[data-name]').each(function() {
		if($(this).is("span:visible")){
			bean[$(this).data("name")] = $(this).text();
		} else if(($(this).attr("type")=="radio" || $(this).attr("type")=="checkbox") && $(this).prop("checked") === true){
			bean[this.name] = $(this).val();
		} else if($(this).attr("type")!="radio"){
			bean[this.name] = $(this).val();
		}
	});
	return bean;
};



/******************************************************************************
  Mostra uma mensagem e bloqueia a tela até executar o comando $.unblockUI();
  ou exibir outra mensagem

  Dependências: jquery, jquery-ui, jquery-block
 ******************************************************************************/
function mostrarMensagemBloqueada(mensagem) {
	var x =
		'<p>'+
		'<span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>' +
		mensagem +
		'</p>'+
		'<div align="center"><input type="button" value=" Fechar " onclick="$.unblockUI();"></div>';
	$.blockUI({
		theme:true,
		title:'Mensagem',
		message:x,
		timeout: dwr.engine._timeout * 1.5, // espera no máximo 1.5x o timeout do dwr
		onUnblock: function(){mostrarErro('Ocorreu um erro inesperado!');}
	});
}

//FUNÇÕES SEPARADAS

function criarDelimitadoresTamanho (){
	$(".maxlength").each(function(){
		$(this).maxlength({
			max: $(this).attr("maxlength"),
			feedbackText: 'Utilizados {c} de {m} caracteres.'
		});
	});
};

function preencheCombo(combo,lista,valor,texto,valorPadrao){
	if(combo && combo instanceof jQuery){
		combo.empty().append("<option value=''> - Selecione - </option>");
		for(var i = 0; i < lista.length; i++){
			combo.append("<option value=\""+($.isFunction(valor) ? valor(lista[i]) : lista[i][valor])+"\">"+($.isFunction(texto) ? texto(lista[i]) :  lista[i][texto]) +"</option>");
		}
		if(valorPadrao != null && valorPadrao != ''){
			combo.val(valorPadrao);
		}
	}
}

function preencheCompleto(bean, form) {
	if(bean != null){
		form.find(':input,span[data-name]').each(function() {
			switch ($(this)[0].tagName.toLowerCase()) {
			case "span":
				$(this).html(pegaValor($(this).data("name"), bean));
				break;
			default:
				switch ($(this).prop("type")) {
				case 'password':
				case 'select-multiple':
				case 'select-one':
				case 'text':
				case 'hidden':
				case 'textarea':
					$(this).val(pegaValor(this.name, bean));
					break;
				case 'checkbox':
				case 'radio':
					if($(this).val() == pegaValor(this.name, bean)){
						this.checked = true;
					}
					break;
				}
			}
		});
	}
}

function pegaValor(atributo, objeto){
	if(atributo.split(".").length > 1){
		var atts = atributo.split(".");
		return pegaValor(atts[1], objeto[atts[0]]);
	} else {
		return objeto[atributo];
	}
}

function validaData(field, rules, i, options){
	var valor = field.val();
	var m = valor.match(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/);
	if(!m){
		return "Formato inv&aacute;lido, a data deve estar no formato DD/MM/YYYY";
	}
	var comp = valor.split('/');
	var d = parseInt(comp[0], 10);
	var m = parseInt(comp[1], 10);
	var y = parseInt(comp[2], 10);
	var date = new Date(y,m-1,d);
	if (date.getFullYear() != y || date.getMonth() + 1 != m || date.getDate() != d) {
		return "Data inv&aacute;lida, por favor verifique!";
	}
}