
$("document").ready(function() {
   $("button").click(function() {
      if(!$("input#input").text()) {
          alert("Wrong");
      } else {
          $.post('/', {code : $("input#input").text()}, function(data, status) {
             alert("data status:" + status);
          });
      }
   });
});



