var btn = document.querySelector("#btn");
var price = document.querySelector("#price");
var currency = "USD";

btn.addEventListener("click", function(){
	var XHR = new XMLHttpRequest();

	XHR.onreadystatechange = function() {
		if(XHR.readyState == 4 && XHR.status == 200) {
			var data = JSON.parse(XHR.responseText).bpi[currency].rate;
			price.innerText = data + " " + currency;
			
		}
	}

	XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");
	XHR.send();
})