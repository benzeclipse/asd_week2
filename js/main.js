// ASDI
// Term 1308
// Banchop Ben Kangdouangnhot


// Calling JSON
$(document).ready(function(){

  $("#clickme").click(function(){
    $.getJSON("json.json",function(result){
      $.each(result, function(i, field){
     
     
     $("#jason").append('<li id= " " >' + i + ":" + " " + field +  '</li>' );   //Working 
   //   $("#jason").append('<li id= " " >' + i + ":" + " " + field +  '</li>' );   //Working
   	  // $("#jason").append('<li id="' + i + '" >' + field +  '</li>');   //string only
      //	$("#jason").append('<li id="' + field + '" >' + i + "" + '</li>');  //id only
      //  $("#jason").append(field + " ");  //does one at a time
      });
    });
  });
});


$('#button').click(function() {
	var name = $('#name').val();
	var string = $('#string').val();
	alert(string);
	//$.post('php/reverse.php', { input: string }, function(data) {
	$.post('php/reverse.php', { string: string, name: name }, function(data) {
		$('#feedback').html(data);
	
	}).error(function() {
		$('#messages').text("error occurred");
	}).complete(function() {
		$('#messages').text("Request complete");
	}).success(function() {
		$('#messages').text("Request successful");
	
	});
 });



$('#buttons').click(function() {
	$.ajax({
		url: 'page.html',
		success: function(datas) {
			$('#content').html(datas);
		
		}
	
	
	});


});

// AJAX and PHP
$('#buttons').click(function() {
	var names = $('#names').val();
	
	$.ajax({
		url: 'php/page.php',
		data: 'names=' +names,
		success: function(data) {
			$('#content').html(data);	
		}
	}).error(function() {
		alert("error occurred!");

	});


});


// xmlHttp request
var xmlHttp= createXmlHttpRequestObject();
 
function createXmlHttpRequestObject(){
   var xmlHttp;
   
   if(window.ActiveXObject){
      try{
         xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
         }catch(e){
            xmlHttp =false;
            }
      }else{
         try{
            xmlHttp= new XMLHttpRequest();
            }catch(e){
               xmlHttp =false;
               }
         }
      if(!xmlHttp)
            alert("cant create that object!");
      else
            return xmlHttp;
   }
   
function process(){   
    if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
      food=encodeURIComponent(document.getElementById("userInput").value );
      xmlHttp.open("GET", "php/tickets.php?food="+food, true);
      xmlHttp.onreadystatechange = handleServerResponse;
      xmlHttp.send(null);
      }else{
         setTimeout('process()', 1000);
         }
   }
      
function handleServerResponse(){
   if(xmlHttp.readyState==4){
            if(xmlHttp.status==200){
               xmlResponse=xmlHttp.responseXML;
               xmlDocumentElement=xmlResponse.documentElement;
               message=xmlDocumentElement.firstChild.data;
               document.getElementById('underInput').innerHTML='<span style="color:blue">' +message + '</span>';
               setTimeout('process()', 1000);
         }else{
            alert('No sever connected!');
            }
      }
   }



// JQM form validation
$('#homes').on('pageinit', function(){

	var rbform = $('#recordform');	// calling form
    var FEerror = $('#formerrorlink'); // calling error dialog 
	
	rbform.validate({
		invalidHandler: function(form, validator){
			FEerror.click(); // taget error anchor tag
			//console.log(validator.submitted);
			
			var html = "";
			
			
			for(var key in validator.submitted){  //Looping through keys
				var label = $('label[for^="'+ key +'"]'); // finding label thats start with 'for'
				//console.log(label.text());
				var legend = label.closest('fieldset').find('.ui-controlgroup-label').not(); // getting radios
				var fieldName = legend.length ? legend.text() :label.text();
				//console.log(fieldName);
				
				
				html += '<li>' + fieldName + '</li>'; //Strings added to dialog by targeting
			};
			$('#formErrors ul').html(html);
		
		},
		
		    submitHandler: function(){
			var data = rbform.serializeArray();
			
			getData();
			console.log(data);
			
		}
		
	});
		


});
  

	//Get XML
	$("#xml").on("click", function(){
		$("#exlist").empty();
		$('<h1> XML Listing </h1>').appendTo("#exlist");
		$.ajax({
			url: "ticket_catalog.xml",
			type: "GET",
			dataType: "xml",
			success: function(data){
				$(data).find("TK").each(function() {
					$('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child ui-last-child">' +
					  '<h3 class="ui-li-heading">' + $(this).find('TEAMS').text() +'</h3>' +
					  '<p class="ui-li-desc">' + 'Tickets found: Qty ' + $(this).find('TICKETS').text() + '</p>' +
					    '</li>').appendTo("#xmllist");
				});
			},
			error: function(error, perror){
				console.log("Error:" + error + "\n" + "Parse Error: " + perror);
			}
		});
	});


// jQuery refactoring form
$('#testform').on('pageinit', function() {

// Storing DATA
function storeData() {

	var id 					= Math.floor(Math.random()* 100000001);

	var item 				={};
	
		item.fullname  		=['Name:', $('#fullname').val()];
		item.email			=['Email:', $('#email').val()];
		item.concerns		=['Concerns:', $('#concerns').val()];
		
	localStorage.setItem(id, JSON.stringify(item));
	alert('contact saved!');
}

// Getting DATA
function getData() {

	if(localStorage.length === 0) {
		alert("Local Storage empty...");
		//aFillData()
		
	}
	var makeDiv = $('<div></div>');
	
	makeDiv.attr("id", "items");
	makeDiv.attr("data-role","fieldcontain");
	var makeList = $('<ul></ul>');
	makeDiv.append(makeList);
	$('#testform').append(makeDiv);
	$('#clearLocal').css('display', 'inline');
	for(var i=0, len=localStorage.length; i<len; i++) {
		var makeLi = $('<li></li>');
		var linksLi = $('<li></li>');
		makeList.append(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = $('<ul></ul>');
		makeLi.append(makeSubList);
		for(var n in obj) {
			var makeSubLi = $('<li></li>');
			makeSubList.append(makeSubLi);
			var optSubText = obj[n][0]+ " "+obj[n][1];
			makeSubLi.html(optSubText);
			makeSubList.append(linksLi);
		}
		makeItemLinks(localStorage.key(i),linksLi);
	}
}


//Edit and delete
function makeItemLinks(key, linksLi) {
	var editLink = $('<a></a>');
		editLink.attr("href", "#");
	editLink.key = key;
	var editText = "Edit Info";
	$(editLink).click(function() {
		editItem(key);
		$('#displayData').css('display', 'none');

	});
	editLink.html(editText);
	linksLi.append(editLink);

	var breakTag = $('<br/>');
	linksLi.append(breakTag);

	var deleteLink = $('<a></a>');
	deleteLink.attr("href", "#");
	deleteLink.key = key;
	var deleteText = "Delete Data";
	$(deleteLink).click(function() {
		deleteItem();
	});
	deleteLink.html(deleteText);
	linksLi.append(deleteLink);
}
// Delete single item
  function deleteItem() {
	var ask = confirm("Delete Item?");
	if(ask) {
		//localStorage.removeItem(this.key);
		localStorage.clear(this.key);
		 window.location.reload();
	} else{
		alert("Nothing has been change!!!")

	}
}

//Edit Item
function editItem(key) {
	var value = localStorage.getItem(key);
	var item = JSON.parse(value);
	
	$('#fullname').val(item.fullname[1]);
	$('#email').val(item.email[1]);
	$('#concerns').val(item.concerns[1]);
}

// Clear Local Data
function clearLocal() {
	if(localStorage.length === 0) {
		alert("Storage is Empty!");
	} else {
		localStorage.clear();
		alert("Data Deleted");
		window.location.reload();
		return false;
	}
}

	$('#displayData').on('click', function() {
		getData();
	
	});
	
	$('#clearLocal').on('click', function() {
		clearLocal();
	});
	
	$('#submit').on('click', function() {
		storeData();
		window.location.reload();
		
	});

});