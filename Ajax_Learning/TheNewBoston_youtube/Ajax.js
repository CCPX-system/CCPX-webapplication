var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject(){
	var xmlHttp;
	if (window.ActiveXObject){ /* window.XMLHttpRequest*/
		try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
		catch(e){
			xmlHttp = false;
			}
	}
	else{
		try{
			xmlHttp = new XMLHttpRequest();
			}
		catch(e){
			xmlHttp = false;
			}
	}
	
	if (!xmlHttp)
		alert("Cannot create that object");
	else
		return xmlHttp; /* core that allows connection*/
}		

/* basically, we will have to 1) create the object to communicate with the server createXmlHttpRequestObject(), 2)communicate with the server process(), 3) and the thing to to with the response. */

function process() {
	if (xmlHttp.readystate==0 || xmlHttp.readystate==4){  	/* we can apply functions on object xmlHttp. State = 0 means that ready to communicate with the server, 4=done communicating, 200 = communication session went ok with no corruption and we get XML file */
		food = encodeURIComponent(document.getElementbyId("userInput").value); 	/* scanning of the page */
		xmlHttp.open("GET","restaurant.php?food="+food,true);	/* open function = create request to send to the server, here the "GET" we have in our page, true= asynchronous or not. This function only configure or sets up the connection, but don't create the connection. */
		xmlHttp.onreadystatechange = handleServerResponse; /* what to do with the response back? we say that we want to do something with it */
		xmlHttp.send(null);  /* on utilise ici get, on n'envoie rien au serveur */
	}
	else{
		setTimout('process()',1000); 	/* if server is busy, i will wait for 1 sec and recheck again */
	}
}

function handleServerResponse(){ /* it sends back an XMl file*/
	if (xmlHttp.readystate==4){
		if (xmlHttp.readystate==200){
			xmlResponse = xmlHttp.responseXML;
			xmlDocumentElement = xmlResponse.documentElement; 	
			/* raw/core element of the XML file */
			message = xmlDocumentElement.firstChild.data;
			/* gets data from XML file , it is what we want to pu on the screen */
			document.getElementById("underInput").innerHTML='<spanstyle="color:blue>'+ message +'</span>'; /* innerHTML=shows what is on the webpage. We can show the response, but her we want to do: what is between the div is put in blue*/
			setTimout('process()',1000);
		}
		else{
		alert('Something went wrong');
		}
	}

}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	