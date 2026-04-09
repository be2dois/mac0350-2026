function errorHandler(msg, exception) {
   var mensagemErroJSON = dwr.util.toDescriptiveString(exception, 2);
   //alert("mensagemErroJSON=" + mensagemErroJSON);
   /* mensagemErroJSON =
      {
      javaClassName:"javax.servlet.ServletException",
      message:"O critério de busca especificado para o Número de Telefone é insuficiente. Informe pelo menos 4 dígitos."
      }
   */

   //Eliminar texto até message:"
   //O critério de busca especificado para o Número de Telefone é insuficiente. Informe pelo menos 4 dígitos."}   
   var indiceInicioMensagem = mensagemErroJSON.indexOf("message:") + 9; //9 = nº de letras de message:
   var mensagem = mensagemErroJSON.substring(indiceInicioMensagem);

   //Eliminar o final "}
   //O critério de busca especificado para o Número de Telefone é insuficiente. Informe pelo menos 4 dígitos.
   var indiceFimMensagem = mensagem.indexOf("\"");
   mensagem = mensagem.substring(0, indiceFimMensagem);

   mostrarErroModal(mensagem);
}
dwr.engine.setErrorHandler(errorHandler);
dwr.engine.setTimeout(60000);