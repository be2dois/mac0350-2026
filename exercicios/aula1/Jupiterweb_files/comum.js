/*/Autor: Edson Vicente Carli Junior
 * NUPS: 7095587
 * Objetivo: Scripts comums ao sistema 
 *   */		
$(document).ready(init);

function init()
{
	if($(".novo").exists())
	{		
		$(".novo").append("<label class='novo-content' title='Novo'> ! <label>Novo</label></label>");		
		$(".novo-content").effect("pulsate",{times:3},1000);
	}
	$(".newline").before("<BR>");
}





function atencao(options)
{	
	if(typeof options == "string")
	{
		options = {mensagem:options};
	}
	if($("#msgAlerta").exists())
	{
		$("#msgAlerta").remove();
	}
	var cabecalho = "";
	if(options.cabecalho)
	{			
		cabecalho  = "<H3>" + options.cabecalho + "</H3>";
	}
	var conteudo = "<DIV id='msgAlerta'>" + cabecalho + "<P>" +  options.mensagem  + "</P></DIV>";
	$("body").append(conteudo);
	$("#msgAlerta").modal();
}

/*
 *
 *
 *
 * 	var conteudo = [
	        {nome:'Fulano Ciclano Beltrano', nomeMae:'Fulano Ciclano Beltrano', cpf:'2342343434',dtNasc:'23-01-2012',conflito:false},
	        {nome:'Fulano Ciclano Beltrano', nomeMae:'Fulano Ciclano Beltrano', cpf:'2342343434',dtNasc:'23-01-2012',conflito:true},
	        {nome:'Fulano Ciclano Beltrano', nomeMae:'Fulano Ciclano Beltrano', cpf:'2342343434',dtNasc:'23-01-2012',conflito:true},
	        {nome:'Fulano Ciclano Beltrano', nomeMae:'Fulano Ciclano Beltrano', cpf:'2342343434',dtNasc:'23-01-2012',conflito:false},
	        {nome:'Fulano Ciclano Beltrano', nomeMae:'Fulano Ciclano Beltrano', cpf:'2342343434',dtNasc:'23-01-2012',conflito:false}];
	var colNames = ['CPF','Nome','Nome Da Mãe','Dt. Nasc.'];
	var colModel = [
						{name:'cpf',width:100},
						{name:'nome',width:180},
						{name:'nomeMae',width:180},
						{name:'dtNasc',width:100}];
	
	var options =
	{
		lista:conteudo,
		seletorTabela:"#listaAceite", 
		seletorRodape:"#listaAceiteRodape",
		colNamesValues:colNames,
		colModelValues:colModel,
		multiselect:false,
		view:true,
		viewtext:"Validar Dados",
		viewfunc:onValidarDados,
		onAfterInsertRow:insereCor,
		rowNum:30,
		height:400
		
	};
	
onAfterInsertRow result in one 
afterInsertRow	rowid
rowdata
rowelem 	This event fires after every inserted row.
rowid is the id of the inserted row
rowdata is an array of the data to be inserted into the row. This is array of type name: value, where the name is a name from colModel
rowelem is the element from the response. If the data is xml this is the xml element of the row; if the data is json this is array containing all the data for the row
Note: this event does not fire if gridview option is set to true 

 * */
function montarGrid(options)
{
	if(!options.lista || !options.seletorTabela || !options.seletorRodape ||!options.colNamesValues
			||!options.colModelValues)
		
	{
		alert("lista,selectorTabela,selectorRodape,colNamesValues,colModelValues são parâmetros obrigatórios");
		return; 
	}
	if(!options.onCellSelectFunction)
	{
		options.onCellSelectFunction = null;
	}
	if(!options.onAfterInsertRow)
	{
		options.afterInsertRow = null;
	}
	if(!options.onLoadComplete)
	{
		options.onLoadComplete = null;
	}
	
	
	if(!options.multiselect)
	{
		options.multiselect = false;
	}

	if(!options.view)
	{
		options.view = false;
		options.viewtext = null;
		options.viewfunc = null;
	} 
	

	if(!options.autowidth)
	{
		options.autowidth = false;
	} 
	
	if(!options.viewrecords)
	{
		options.viewrecords = false;
	}
	
	if(!options.rowNum)
	{
		options.rowNum = 10;
	}

	if(!options.height)
	{
		options.height = "250px";	
	}
	
	if(!options.idPrefix)
	{
		options.idPrefix = "";
	}

	
	// descarrega o grid para funcionar ao realizar nova busca
	
	
	$(options.seletorTabela).jqGrid('GridUnload');
	$(options.seletorTabela).removeData("list",options.lista);
	$(options.seletorTabela).removeData("options",options);
	$(options.seletorTabela).data("list",options.lista);
	$(options.seletorTabela).data("options",options);
	$(options.seletorTabela).jqGrid({
		datatype: "local",
		align: "center",
		data: options.lista,
		pager: options.seletorRodape,
		height: options.height,
		idPrefix: options.idPrefix,
		autowidth: options.autowidth,
		rownumbers: false,
		viewrecords: options.viewrecords,
		multiselect: options.multiselect,
		ignoreCase: true,		   	
		//caption: "Tipo de Exceção", //titulo do grid
		rowNum: options.rowNum,
		colNames:options.colNamesValues,
		colModel:options.colModelValues,
		onCellSelect:options.onCellSelectFunction,
		afterInsertRow:options.onAfterInsertRow,
		gridComplete:options.onLoadComplete
	});
	$(options.seletorTabela).jqGrid('filterToolbar',{stringResult:true,searchOnEnter:false});
	$(options.seletorTabela).jqGrid('navGrid',options.seletorRodape,
		{			
			add:false,
			edit:false,
			del:false,
			view:options.view, viewtext:options.viewtext, viewfunc:options.viewfunc,
			search:false,
			refresh:false
		},
		{}, // use default settings for edit
		{}, // use default settings for add
		{}, // delete instead that del:false we need this
		{multipleSearch:true}, // enable the advanced searching
		{closeOnEscape:true}  // allow the view dialog to be closed when user press ESC key
	);
}
