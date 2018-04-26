
// JavaScript for Phone Application Demo Program
// Jim Skon, Kenyon College, 2017
var operation;  // operation
var deloperation;
var editid;
var deleteid;
var modBoxAdded = false;
var projectEditID;
var saveID; //saves projectEditID in case of loss and undefinement
var disassociateID;
var idArray = [];
var projName;
var projInstructions;
var count = 0;
var saveLength;
var attempted = false;
//Edited this section :)
$(document).ready(function () {
    $('.editartifactdata').hide();
	$('.inputmodule').hide();
	$('.inputartifact').hide();
	$('.inputproject').hide();
	$('.editprojectdata').hide();
	$('.projsearchbox').hide();
	operation = "Find Item By Name";
    $("#search-btn").click(getMatches);
    /*
	$(document).keypress(function( event ) {
  		if ( event.which == 13 ) {
     		getMatches();
     		$('.editartifactdata').hide();
  		}
  	});
	*/
	
	
    $("#addArtifact-btn").click(addArtifact);
	$("#addMod-btn").click(addModule);
	$("#addProject-btn").click(addProject);
	
	
    $("#clear").click(clearResults);
	
	    
	$(document).on("click",".deleteart",function(){
		deleteid=$(this).attr('ID');
		processArtifactDelete();
		getMatches();
		//console.log(id);
	});
	
	$(document).on("click",".addarttoprojtable",function(){
		
		//$('.editprojectdata').show();
		id = $(this).attr('ID');
		console.log("addID: " + id);
		if(idArray.indexOf(id) == -1){
			idArray.push(id);
		}
		else if(idArray.indexOf(id) != -1){
			idArray.splice(idArray.indexOf(id), 1);
		}
		console.log(id + " "+idArray.indexOf(id));
		//console.log(idArray[2]);
	});
	
	$(document).on("click",".associateartifacts",function(){
		//operation = "Associate Art With Proj";
		while(idArray.length != 0){
			associateArtWithProj();
			//idArray.pop();
		}
		$('.projsearchbox').hide();

		operation = "Display Project Info";
		console.log("onclick projectEditID: " + projectEditID);
		saveID = projectEditID;
		processDisplayProjectInfo();
	});
	
	
	
	$(document).on("click",".editprojform",function(){
		console.log("memes");
		//$('.editprojectdata').show();
		processProjectEdit();
		

	});
	
	$(document).on("click","#editproj-btn",function(){
		console.log("memes");
		$('.editprojectdata').hide();
		editProject();
		

	});
	
	$(document).on("click",".addprojtoart",function(){
		console.log("memes");
		
		$('.searchbox').hide();
		$('.projsearchbox').show();
		operation = "Add Artifacts to Project";
			
		getMatches();
		
		//$("#projsearch-btn").click(getMatches);
		operation = "Associate Art With Proj";
	});
	
	$(document).on("click",".editproj-btn",function(){
		console.log("memes");
		$('.editprojectdata').hide();
		editProject();
	});
	
	$(document).on("click","#artobj-btn",function(){
		console.log("hey");
		
	});
	
	$(document).on("click",".disassociate-btn",function(){
		attempted = false;
		disassociateID = $(this).attr('ID');
		disassociateFromProj();
		
		operation = "Display Project Info";
		
		processDisplayProjectInfo();
		
	});
	
    $(".dropdown-menu li a").click(function(){
	console.log("pick!"+$(this).text());
	$(this).parents(".btn-group").find('.selection').text($(this).text());
	operation=$(this).text();
	changeOperation(operation);
    });


});

changeOperation(operation);

function changeOperation(operation){
	$('.editartifactdata').hide();
	$('.projsearchbox').hide();
	$('.inputartifact').hide();

	if(operation=="Find Item By Name"){
		$('.editartifactdata').hide();
		$('.inputmodule').hide();
		$('.inputartifact').hide();
		$('.inputproject').hide();
		
		//$('.editdata').hide();
		
		$('.results').show();
		$('.searchbox').show();


	}
	else if(operation=="Find Item By Description"){
		$('.inputmodule').hide();
		$('.inputartifact').hide();
		//$('.editdata').hide();
		$('.inputproject').hide();
		$('.editartifactdata').hide();
	
		$('.searchbox').show();
		$('.results').show();
	}
	else if(operation=="Add Artifacts to Project"){
		$('.inputmodule').hide();
		$('.inputartifact').hide();
		//$('.editdata').hide();
		$('.inputproject').hide();
		$('.editartifactdata').hide();
		
	
		$('.projsearchbox').show();
		$('.results').show();
		
	}
	else if(operation=="Find Available Mods"){
		if(!modBoxAdded){
			modBoxAdded = true;
			$('#main-jumbo').append('<div id=displayModsBox>yo</div>');
			
		}
		operation = "Find Module";
		getMatches();
	}
	else if(operation=="Find Module"){
		$('.inputmodule').hide();
		$('.inputartifact').hide();
		$('.editartifactdata').hide();
			
		$('.editprojectdata').hide();	
		
		$('.searchbox').show();
		$('.results').show();
	}
	else if(operation=="Find Project"){
		$('.editartifactdata').hide();
		$('.editartifactdata').hide();
		$('.inputmodule').hide();
	    $('.inputartifact').hide();
		$('.inputproject').hide();

	    $('.searchbox').show();
		$('.results').show();
	
	    
	}
	else if(operation=="Add Item"){
		$('.inputartifact').show();
		
		$('.searchbox').hide();
		$('.editartifactdata').hide();
		$('.editdata').hide();
		$('.inputmodule').hide();
		$('.results').hide();
		$('.inputproject').hide();
	}	
	
    else if(operation == "Add Module"){
        $('.inputmodule').show();
		$('.searchbox').show();
		
		$('.editartifactdata').hide();
		$('.inputproject').hide();
		$('.editdata').hide();
		$('.searchbox').hide();
		$('.inputartifact').hide();
		$('.results').hide();
    }
	else if(operation=="Add Project"){
		$('.inputproject').show();
		$('.searchbox').hide();
		
		
		$('.editartifactdata').hide();
		$('.editdata').hide();
		
		$('.inputmodule').hide();
		$('.inputartifact').hide();
		$('.results').hide();
	}
    else{
		$('.editdata').hide();
		$('.inputdata').hide();
		$('.results').show();
		$('.searchbox').show();
    }    
}

// Build output table from comma delimited list
function buildArtifactTable(list) {
    var a = list.split("~@$");
    
    if (a.length < 1) {
		return "<h3>Internal Error</h3>";
    } else if (a.length == 1) {
		return "<h3>No Item Found</h3>";
    } else {
		var result = '<table class="w3-table-all w3-hoverable" border="2"><tr><th ID="artobj-btn">Item</th><th>Description</th><th>Stock</th><th>Module</th><th>Action</th><tr>';
		var aLen = a.length;
	for (var i = 1; i < aLen; i+=5) {
	    result += "<tr><td class='artName'>"+decodeURI(a[i]).replace(/\"/g,"")+"</td><td class='artDescrip'>"+decodeURI(a[i+1])+"</td><td class='artStock'>"+decodeURI(a[i+2])+"</td><td class='artMod'>"+decodeURI(a[i+3])+"</td>";
	    result += "<td><button type='button' ID='"+a[i+4]+"' class='btn btn-primary btn-sm editart'>Change</button> ";
	    result += "<button type='button' ID='"+a[i+4]+"' class='btn btn-primary btn-sm deleteart'>Delete</button></td></tr>";
	}
		result += "</table>";
	
		return result;
    }
}

function buildModuleTable(list) {
    var a = list.split("~@$");
    
    if (a.length < 1) {
		return "<h3>Internal Error</h3>";
    } else if (a.length == 1) {
		return "<h3>No Item Found</h3>";
    } else {
		var result = '<table id="modtable" class="w3-table-all w3-hoverable" border="2"><tr><th>Module Name</th><th>Action</th><tr>';
		var aLen = a.length;
	for (var i = 1; i < aLen; i+=2) {
	    result += "<tr ID='"+a[i]+"row'><td class='first' ID='"+a[i]+"cell'>"+a[i] +"</td>";
	    
	    result += "<td align=center><button type='button' ID='"+a[i + 1]+"' class='btn btn-primary btn-sm displayart'>Display Items</button>";
		result += "<button type='button' ID='"+a[i + 1]+"' class='btn btn-primary btn-sm deletemod'>Delete</button></td></tr>"
	}
		result += "</table>";
		
		return result;
    }
}


function buildProjectTable(list) {
    var a = list.split("~@$");
    
    if (a.length < 1) {
		return "<h3>Internal Error</h3>";
    } else if (a.length == 1) {
		return "<h3>No Item Found</h3>";
    } else {
		var result = '<table id="projtable" class="w3-table-all w3-hoverable" border="2"><tr><th>Project Name</th><th>Project Info</th><tr>';
		var aLen = a.length;
	for (var i = 1; i < aLen; i+=3) {
	    result += "<tr ID='"+a[i]+"row'><td class='first' ID='"+a[i+2]+"cell'>"+decodeURI(a[i]) +"</td>";
	    
	    result += "<td align=center><button type='button' ID='"+a[i+2]+
		"' class='btn btn-primary btn-sm displayprojinfo'>Display info</button>";
		result+= "<button type='button' ID='"+a[i+2]+
		"' class='btn btn-primary btn-sm deleteproj'>Delete</button></td></tr>";
	}
		result += "</table>";
		
		return result;
    }
}


function buildProjectInfoPanel(list) {
    var a = list.split("~@$");
    var result;
    
	if (a.length < 1) {
		return "<h3>Internal Error</h3>";
    } 
	
	
	else if (a.length == 1) {
		//Sometimes the program falsely returns a.length == 1
		//This if else control structure checks until there are two consistent
		//readings of a.length and then prints
		saveID = projectEditID;
		if(attempted == true && saveLength == a.length){
			
		
		
			//console.log("Legit build");
			//console.log("a length: " + a.length);
			//console.log("a[0]: " + a[0]);
			result = '<table class="w3-table-all w3-hoverable" border="2"><tr><th>Description and Instructions</th><tr>';
			result += "<tr><td class ='projInstructions'><pre>"+"Cannot display instructions for empty project. Add items!"+"</pre></td></tr></table>"
			result += "<table><td button type='button' ID='"+projectEditID +"'class='btn btn-primary btn-sm editprojform'>Edit Project</button></td>";
			result += "<td button type='button' ID='"+projectEditID +"'class='btn btn-primary btn-sm addprojtoart'>Add Items</button></td></table>";
			saveID = projectEditID;
			attempted = false
			return result
			
		}
		else if(attempted == true && saveLength != a.length){
			console.log("inconsistent repeated results");
			processDisplayProjectInfo();
			saveLength = a.length
			attempted = false;
		}
		else{
			console.log("first try");
			saveLength = a.length
			attempted = true;
			processDisplayProjectInfo();
		}
    } 
	
	else {
		//flag *= -1;
		saveID = projectEditID;
		projInstructions = a[1];
		//projName = a[2];
		console.log("a length: " + a.length);
		console.log("a[1]: " + a[1]);
		var str = a[1];
		
		str = a[1].replace(/~~~1~~~/g,'<br>');
		//replaceAll(str, '<br>', '~~~1~~~');
		
		console.log("str: " + str);
		result = '<table class="w3-table-all w3-hoverable" border="2"><tr><th>Description and Instructions</th><tr>';
		result += "<tr><td class ='projInstructions'>"+str+"</td></tr></table>"
		
		result += '<table class="w3-table-all w3-hoverable" border="2">';
		result += '<tr><th ID="artobj-btn">Item</th><th>Description</th><th>Stock</th><th>Module</th><th>Action</th><tr>';
		
		
		var aLen = a.length;
		for (var i = 2; i < aLen; i+=5) {
			result += "<tr><td class='artName'>"+decodeURI(a[i]).replace(/"/g,"")+"</td><td class='artDescrip'>"+a[i+1]+"</td><td class='artStock'>"+a[i+2]+"</td><td class='artMod'>"+a[i+3]+"</td>";
			result += "<td><button type='button' ID='"+a[i+4]+"' class='btn btn-primary btn-sm disassociate-btn'>Remove From Project</button> </td>";
			//result += "<button type='button' ID='"+a[i+4]+"' class='btn btn-primary btn-sm deleteart'>Delete</button></td></tr>";
		}
		result += "</table>";
		
		result += "<table><td button type='button' ID='"+projectEditID +"'class='btn btn-primary btn-sm editprojform'>Edit Project</button></td>";
		result += "<td button type='button' ID='"+projectEditID +"'class='btn btn-primary btn-sm addprojtoart'>Add Items</button></td></table>";
		
		return result;
    }
}


function buildAddArtifactToProjectTable(list) {
    var a = list.split("~@$");
    
    if (a.length < 1) {
		return "<h3>Internal Error</h3>";
    } else if (a.length == 1) {
		return "<h3>No Item Found</h3>";
    } else {
		var result = '<table class="w3-table-all w3-hoverable" border="2"><tr>'
		result +="<td button type='button' ID='"+projectEditID +"'class='btn btn-primary btn-sm associateartifacts'>Add Item</button></td><tr></table>";
		result += '<table class="w3-table-all w3-hoverable" border="2"><tr><th ID="artobj-btn">Item</th><th>Description</th><th>Stock</th><th>Module</th><th>Action</th><tr>';
		var aLen = a.length;
	for (var i = 1; i < aLen; i+=5) {
	    result += "<tr><td class='artName'>"+decodeURI(a[i])+"</td><td class='artDescrip'>"+a[i+1]+"</td><td class='artStock'>"+a[i+2]+"</td><td class='artMod'>"+a[i+3]+"</td>";
	    
	    result += "<td><input type='checkbox' ID='"+a[i+4]+"' class='btn btn-primary btn-sm addarttoprojtable'>Add</td></tr>";
	}
		result += "</table>";
	
		return result;
    }
}

function processArtifactEdit(){
    $('#searchresults').empty();
    $('.editartifactdata').show();
    $("#editart-btn").click(editArtifactEntry);
    //console.log("Edit Record: " + $(this).attr('ID'));
    var row=$(this).parents("tr");
    //console.log("First name of record: "+ $(row).find('.first').text());
    editid=$(this).attr('ID');

    $('#editArtName').val( $(row).find('.artName').text());
    $('#editArtDescription').val( $(row).find('.artDescrip').text());
    $('#editArtStock').val( $(row).find('.artStock').text());
    $('#editArtModule').val( $(row).find('.artMod').text());
}

function editDone() {
    //$('#editmessage').text($('#editArtName').val()+" with stock "+$('#editArtStock').val()+ " SAVED");
}

function editArtifactEntry(){
    console.log("Attempting to edit an entry");
	//$('.editartifactdata').hide();
    //console.log("Firstname:" + $('#editfirst').val() + "ID:" + editid);
    $('#searchresults').empty();
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?editartid='+
	editid +'&editartname='+encodeURIComponent(JSON.stringify($('#editArtName').val()))+'&editartdescrip='+
	$('#editArtDescription').val()+'&editartstock='+
	$('#editArtStock').val()+'&editartmod='+
	$('#editArtModule').val()+'&operation='+"edit Artifact",
	dataType: 'text',
	success: editDone(),
	error: function(){alert("Error: Must add artifact to an already-existing storage module");}
    });
}

function processProjectEdit(){
	$('#searchresults').empty();
    $('.editprojectdata').show();
    $("#editproj-btn").click(editProject);
	console.log("projectName: " + projName);
    //console.log("Edit Record: " + $(this).attr('ID'));
    var row=$(this).parents("tr");
    //console.log("First name of record: "+ $(row).find('.first').text());
    //editid=$(this).attr('ID');
	
    $('#editProjName').val(projName);
    
    var str = projInstructions.replace(/~~~1~~~/g, '\n');
	$('#editProjInstructions').val(str);
	
}


function editProject(){
    //console.log("memes" + projectEditID);
	$('.editprojectdata').hide();
    //console.log("Firstname:" + $('#editfirst').val() + "ID:" + editid);
    $('#searchresults').empty();
	
	var str = $('#editProjInstructions').val().replace(/\n/g, '~~~1~~~');
	console.log("We are sending: " + str)
	//var str = $('#editProjInstructions').val().replace('\n'
    processDisplayProjectInfo();
	$.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?editprojid='+
	projectEditID +'&editprojname='+$('#editProjName').val()+'&editprojinstructions='+
	str
	+'&operation='+"edit Project",
	dataType: 'text',
	success: editDone(),
	error: function(){alert("Error: Something went wrong");}
    });
	
}


function processArtifactDelete(){
    console.log("Attempting to delete an entry");
    if (confirm("Are you sure you want to delete this?")) {
        //txt = "You pressed OK!";
    } else {
        //txt = "You pressed Cancel!";
		return;
    }
	$('#searchresults').empty();
    
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?deleteid='+deleteid+'&operation=' + "delete Artifact",
	dataType: 'text',
	
	error: function(){alert("Error: Something went wrong with processDelete");}
    });
	//operation = "Find Item By Description";
}

function processModuleDelete(){
    console.log("Attempting to delete an entry");
    if (confirm("Are you sure you want to delete this?")) {
        //txt = "You pressed OK!";
    } else {
        //txt = "You pressed Cancel!";
		return;
    }
	$('#searchresults').empty();
    var id=$(this).attr('ID');
	console.log(id);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?deletemodid='+$(this).attr('ID')+'&operation=' + "delete Module",
	dataType: 'text',
	
	error: function(){alert("Error: Must Move all items in this storage module to another module");}
    });
	
}

function processProjectDelete(){
    console.log("Attempting to delete an entry");
    if (confirm("Are you sure you want to delete this?")) {
        //txt = "You pressed OK!";
    } else {
        //txt = "You pressed Cancel!";
		return;
    }
	$('#searchresults').empty();
    var id=$(this).attr('ID');
	console.log(id);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?deleteprojid='+$(this).attr('ID')+'&operation=' + "delete Project",
	dataType: 'text',
	
	error: function(){alert("Error: Something went wrong with processDelete");}
    });
	
}

function processArtifactDisplayByModule(){
    //console.log("Attempting to display artifacts associated with this module");
    $('#searchresults').empty();
	operation = "Display Artifact By Module";
    var id=$(this).attr('ID');
	console.log(id);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?disartmod='+$(this).attr('ID')+'&operation=' + operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong with processArtifactDisplayByModule");}
    });
	
}

function processDisplayProjectInfo(){
    //console.log("Attempting to display artifacts and instructions associated with this project");
    $('.searchbox').hide();

	$('#searchresults').empty();
	operation = "Display Project Info";
    projectEditID = $(this).attr('ID');
	console.log("before undefined check projectEditId: " + projectEditID + " saveID: " + saveID);
	if(projectEditID === undefined){
		projectEditID = saveID;
	}
	
	

	
	console.log("after undefined check projectEditId: " + projectEditID);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?disprojinfo='+projectEditID+'&operation=' + operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong with processDisplayProjectInfo");}
    });
	
}


function processResults(results) {
    $('#editmessage').empty();
    $('#addmessage').empty();
    console.log("Results:"+results);
    
	$('#searchresults').empty();

	$('.editprojectdata').hide();
	$('.editartifactdata').hide();

	if(operation == "Find Project"){
                $('#searchresults').append(buildProjectTable(results));	
                
	}
	if(operation == "Find Module"){
		$('#searchresults').append(buildModuleTable(results));	
	}
	
	if(operation == "Find Item By Name" || 
	operation == "Find Item By Description" ){
		$('#searchresults').append(buildArtifactTable(results));
		
	}
	if(operation == "Associate Art With Proj"){
		$('#searchresults').append(buildAddArtifactToProjectTable(results));

		
	}
	if(operation == "Display Project Info"){
		$('#searchresults').append(buildProjectInfoPanel(results));
		
	}
	if(operation == "Display Artifact By Module"){
		$('#searchresults').append(buildArtifactTable(results));
		operation = "Find Module";
	}
    $(".editart").click(processArtifactEdit);
    

	$(".displayart").click(processArtifactDisplayByModule);
	$(".displayprojinfo").click(processDisplayProjectInfo);
	
	//$(".deleteart").click(processArtifactDelete);
	
	$(".deletemod").click(processModuleDelete);
	
	$(".deleteproj").click(processProjectDelete);
	/*
	$("#search-btn").keypress(function(e)){
		if(e.which == 13){
			$("#go").click();
		}
	}
	*/
   
    
}

function clearResults() {
    $('#searchresults').empty();
}

function getMatches(){
	console.log("Getting Matches");
    $('.editdata').hide();
    $('#searchresults').empty();
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?find='+$('#search').val()+'&operation='+operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong with getMatches");}
    });
}


function addArtifact(){
    console.log("Attempting to add an entry");
	//$('.inputartifact').hide();
	//$('.inputartifact').show();
    console.log("addArtifact Operation: " + operation);
	//console.log("Firstname:" + $('#addfirst').val());
    $('#searchresults').empty();
	
	desc = $("#addArtDescription").val()
	name = $("#addArtName").val()
	stock = $("#addArtStock").val()
	mod = $("#addArtModule").val()
	
	
	console.log("name: "+$("#addArtName").val())
	/*
	$("#addArtDescription").reset()
	$("#addArtName").reset()
	$("#addArtStock").reset()
	$("#addArtModule").reset()
	*/
	document.getElementById('inputartform').reset();
	console.log("name: "+$("#addArtName").val())
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?aname='+encodeURIComponent(JSON.stringify(name))
	+'&adescrip='+desc+
	'&astock='+stock+
	'&amodule='+mod+'&operation='+operation,
	dataType: 'text',
	success: processResults, 
	error: function(){alert("Error: Must Add Items to already-existing storage modules");}
    });

}




function addModule(){
    console.log("Attempting to add an entry");
    //console.log("Firstname:" + $('#addfirst').val());
    $('#searchresults').empty();
	console.log("name: "+$("#addModName").val())
	//desc = $("#addModDescription").val()
	name = $("#addModName").val()
	
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?amodname='+name
    +'&operation='+operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong");}
    });

}
function addProject(){
    console.log("Attempting to add an entry");
    //console.log("Firstname:" + $('#addfirst').val());
    $('#searchresults').empty();
	console.log("name: "+$("#addProjName").val())
	//desc = $("#addModDescription").val()
	name = $("#addProjName").val()
	var instructions = $("#addProjInstructions").val();
	var str = instructions.replace(/\n/g, '~~~1~~~');
	console.log("instructions: "+$("#addProjInstructions").val())
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?aprojname='+name
    +'&aprojinstructions='+str +
	'&operation='+operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong");}
    });

}


function associateArtWithProj(){
    
	console.log("Attempting to associate an artifact with this project");
    $('#searchresults').empty();
	operation = "Associate Art With Proj";
    console.log("project ID: " + projectEditID + " artifact ID: " + idArray[0]);
	//console.log(id);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?aprojid='+projectEditID
	+'&aartid='+ idArray.shift() +'&operation=' + operation,
	dataType: 'text',
	success: processResults,
	//error: function(){alert("Error: Something went wrong with associateArtWithProj");}
    });
	

}


function disassociateFromProj(){
	console.log("Attempting to disassociate art from project");
    //$('#searchresults').empty();
	operation = "Disassociate Artifact From Project";
    //disassociateID=$(this).attr('ID');
	
	//console.log("artID: " + disassociateID + " projID: " + projectEditID);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?disprojid='+projectEditID+'&disartid='+disassociateID+'&operation=' + operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong with disassociateFromProj");}
    });
	
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}