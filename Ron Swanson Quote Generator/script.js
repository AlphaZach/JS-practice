var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

var xhrbtn = document.querySelector("#xhr");
var fetchbtn = document.querySelector("#fetch");
var jquerybtn = document.querySelector("#jquery");
var axiosbtn = document.querySelector("#axios");
var display = document.querySelector("#quote");

//XHR
xhrbtn.addEventListener("click", function(){
	var XHR = new XMLHttpRequest();

	XHR.onreadystatechange = function() {
      if(XHR.readyState == 4) {
        if(XHR.status == 200) {
          display.innerText = JSON.parse(XHR.responseText)[0];
        } else {
          console.log("There was a problem!");
        }
      }
  }

	XHR.open("GET", url);
	XHR.send();
});

//Fetch
fetchbtn.addEventListener("click", function(){
  fetch(url)
  .then(handleErrors)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    display.innerText = data;
  })
  .catch(function(error){
    console.log(error);
  });
});

function handleErrors (request){
  if(!request.ok) {
    throw Error(request.status);
  }
  return request;
}

//jQuery
$("#jquery").click(function(){
  $.getJSON(url)
  .done(function(data){
    $('#quote').text(data[0]);
  });
});

//Axios
axiosbtn.addEventListener("click", function(){
  axios.get(url)
  .then(function(res){
    display.innerText = res.data[0];
  })
  .catch(function(){
    console.log("Error");
  })
});
