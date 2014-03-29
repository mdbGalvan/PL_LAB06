$(document).ready(function() {
  $('#parse').click(function() {
    try {
      var myCodeMirror = $(".CodeMirror")[0].CodeMirror
      var source = myCodeMirror.getValue()

      out.className = "unhidden";

      var result = pl0.parse(source);
      $('#output').html(JSON.stringify(result,undefined,2));
    } catch (e) {
      $('#output').html('<div class="error"><pre>\n' + String(e) + '\n</pre></div>');
    }
    if (window.localStorage) {
      myCodeMirror = $(".CodeMirror")[0].CodeMirror;
      //localStorage.input = myCodeMirror.getValue();
      localStorage.output = $('#output').html();
    }
  });



  $("#examples").change(function(ev) {
    var f = ev.target.files[0]; 
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      
      var myCodeMirror = $('.CodeMirror')[0].CodeMirror;
      myCodeMirror.setValue(contents);
    }
    r.readAsText(f);
  });

});

window.onload = function() {
  var myCodeMirror;
    // Si el navegador soporta localStorage y tenemos algo almacenado, pues lo cargamos en el textarea
  if (window.localStorage && localStorage.output) {  
    out.className = "unhidden";   
    //myCodeMirror = $(".CodeMirror")[0].CodeMirror;
    //myCodeMirror.setValue(localStorage.input);   
    output.innerHTML = localStorage.output;   
  } //else {
    //$("#input").val("VAR a, b;\n BEGIN \n CALL b;\n a = b END.");
    //out.className = "unhidden";
  //}
}
  

