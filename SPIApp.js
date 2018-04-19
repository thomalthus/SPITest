
// JavaScript for Phone Application Demo Program
// Jim Skon, Kenyon College, 2017
var operation;  // operation
var deloperation;
var editid;
var modBoxAdded = false;
var projectEditID;
var disassociateID;
//Edited this section :)
$(document).ready(function () {
    $('.editartifactdata').hide();
	$('.inputmodule').hide();
	$('.inputartifact').hide();
	$('.inputproject').hide();
	$('.editprojectdata').hide();
	
    $("#search-btn").click(getMatches);
    $(document).keypress(function( event ) {
  		if ( event.which == 13 ) {
     		getMatches();
     		$('.editartifactdata').hide();
  		}
  	});
  	$('#addArtModule').keypress(function( event ) {
  		operation = 'Find Available Mods';
  		changeOperation(operation);
  	});
    $("#addArtifact-btn").click(addArtifact);
	$("#addMod-btn").click(addModule);
	$("#addProject-btn").click(addProject);
	$("#editproj-btn").click(editProject);
	
	//$("#addprojtoart").click(associateArtWithProj);
    operation = "Find Artifact By Name";
    $("#clear").click(clearResults);
	
	$(document).on("click",".editprojform",function(){
		console.log("memes");
		$('.editprojectdata').show();
		
	});
	
	$(document).on("click",".addprojtoart",function(){
		console.log("memes");
		$('.editprojectdata').show();
		
	});
	
	$(document).on("click",".editproj-btn",function(){
		console.log("memes");
		$('.editprojectdata').hide();
		editProject();
	});
	
	$(document).on("click","#artobj-btn",function(){
		console.log("hey");
		//addArtifact();
	});
	
	$(document).on("click",".disassociate-btn",function(){
		//console.log("hey");
		disassociateID = $(this).attr('ID');
		disassociateFromProj();
		//addArtifact();
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
    /*
	if(operation=="Add Entry"){
		$('#addmessage').empty();
		$('.inputdata').show();
		$('.searchbox').show();
		$('.results').hide();
		$('.editdata').hide();
		$('.inputmodule').hide();
	}
	*/
	if(operation=="Find Artifact By Name"){
		$('.editartifactdata').hide();
		$('.inputmodule').hide();
		$('.inputartifact').hide();
		$('.inputproject').hide();

		//$('.editdata').hide();
		
		$('.results').show();
		$('.searchbox').show();


	}
	else if(operation=="Find Artifact By Description"){
		$('.inputmodule').hide();
		$('.inputartifact').hide();
		//$('.editdata').hide();
		$('.inputproject').hide();
		$('.editartifactdata').hide();
	
		$('.searchbox').show();
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
			
		$('.editdata').hide();	
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
	else if(operation=="Add Artifact"){
		$('.inputartifact').show();
		$('.searchbox').show();
		
		
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
		$('.searchbox').show();
		
		
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
		var result = '<table class="w3-table-all w3-hoverable" border="2"><tr><th ID="artobj-btn">Object</th><th>Description</th><th>Stock</th><th>Module</th><th>Action</th><tr>';
		var aLen = a.length;
	for (var i = 1; i < aLen; i+=5) {
	    result += "<tr><td class='artName'>"+a[i]+"</td><td class='artDescrip'>"+a[i+1]+"</td><td class='artStock'>"+a[i+2]+"</td><td class='artMod'>"+a[i+3]+"</td>";
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
	    
	    result += "<td align=center><button type='button' ID='"+a[i + 1]+"' class='btn btn-primary btn-sm displayart'>Display artifacts</button></td></tr>";
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
	    result += "<tr ID='"+a[i]+"row'><td class='first' ID='"+a[i+2]+"cell'>"+a[i] +"</td>";
	    
	    result += "<td align=center><button type='button' ID='"+a[i+2]+
		"' class='btn btn-primary btn-sm displayprojinfo'>Display info</button></td></tr>";
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
    } else if (a.length == 1) {
		result = '<table class="w3-table-all w3-hoverable" border="2"><tr><th>Description and Instructions</th><tr>';
		result += "<tr><td class ='projInstructions'><pre>"+"Cannot display instructions for empty project. Add items!"+"</pre></td></tr></table>"
		return result
    } else {
		result = '<table class="w3-table-all w3-hoverable" border="2"><tr><th>Description and Instructions</th><tr>';
		result += "<tr><td class ='projInstructions'>"+a[1]+"</td></tr></table>"
		//result +=  '<form> <outputText value "Instruction"></output> </form>';
		result += '<table class="w3-table-all w3-hoverable" border="2">';
		result += '<tr><th ID="artobj-btn">Object</th><th>Description</th><th>Stock</th><th>Module</th><th>Action</th><tr>';
		
		
		var aLen = a.length;
		for (var i = 2; i < aLen; i+=5) {
			result += "<tr><td class='artName'>"+a[i]+"</td><td class='artDescrip'>"+a[i+1]+"</td><td class='artStock'>"+a[i+2]+"</td><td class='artMod'>"+a[i+3]+"</td>";
			result += "<td><button type='button' ID='"+a[i+4]+"' class='btn btn-primary btn-sm disassociate-btn'>Remove From Project</button> </td>";
			//result += "<button type='button' ID='"+a[i+4]+"' class='btn btn-primary btn-sm deleteart'>Delete</button></td></tr>";
		}
		result += "</table>";
		
		result += "<table><td button type='button' ID='"+projectEditID +"'class='btn btn-primary btn-sm editprojform'>Edit Project</button></td>";
		result += "<td button type='button' ID='"+projectEditID +"'class='btn btn-primary btn-sm addprojtoart'>Add Artifacts</button></td></table>";
	
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
    $('#editmessage').text($('#editArtName').val()+" with stock "+$('#editArtStock').val()+ " SAVED");
}
function editArtifactEntry(){
    console.log("Attempting to edit an entry");
	//$('.editartifactdata').hide();
    //console.log("Firstname:" + $('#editfirst').val() + "ID:" + editid);
    $('#searchresults').empty();
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?editartid='+
	editid +'&editartname='+$('#editArtName').val()+'&editartdescrip='+
	$('#editArtDescription').val()+'&editartstock='+
	$('#editArtStock').val()+'&editartmod='+
	$('#editArtModule').val()+'&operation='+"edit Artifact",
	dataType: 'text',
	success: editDone(),
	error: function(){alert("Error: Something went wrong");}
    });
}

function editProject(){
    console.log("memes" + projectEditID);
	//$('.editartifactdata').hide();
    //console.log("Firstname:" + $('#editfirst').val() + "ID:" + editid);
    $('#searchresults').empty();
    
	$.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?editprojid='+
	projectEditID +'&editprojname='+$('#editProjName').val()+'&editprojinstructions='+
	$('#editProjInstructions').val()+'&operation='+"edit Project",
	dataType: 'text',
	success: editDone(),
	error: function(){alert("Error: Something went wrong");}
    });
	
}


function processArtifactDelete(){
    console.log("Attempting to delete an entry");
    $('#searchresults').empty();
    var id=$(this).attr('ID');
	console.log(id);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?deleteid='+$(this).attr('ID')+'&operation=' + "delete Artifact",
	dataType: 'text',
	success: function(){alert("Deleted Record: " +id );},
	error: function(){alert("Error: Something went wrong with processDelete");}
    });
	/*
	$.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?deleteid='+$(this).attr('ID')+'&operation=' + "delete Artifact",
	dataType: 'text',
	success: function(){alert("Deleted Record: " +id );},
	error: function(){alert("Error: Something went wrong with processDelete");}
    });
	*/
}

function processArtifactDisplayByModule(){
    console.log("Attempting to display artifacts associated with this module");
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
    console.log("Attempting to display artifacts and instructions associated with this project");
    $('#searchresults').empty();
	operation = "Display Project Info";
    var id=$(this).attr('ID');
	projectEditID = $(this).attr('ID');
	console.log(id);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?disprojinfo='+$(this).attr('ID')+'&operation=' + operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong with processDisplayProjectInfo");}
    });
	
}
/*
function processGetInstructions(){
	$('#searchresults').empty();
	operation = "Get Instructions";
    var id=$(this).attr('ID');
	console.log(id);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?disprojinfo='+$(this).attr('ID')+'&operation=' + operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong with processDisplayProjectInfo");}
    });
	
	
}
*/

function processResults(results) {
    $('#editmessage').empty();
    $('#addmessage').empty();
    console.log("Results:"+results);
    
	$('#searchresults').empty();

	$('.editprojectdata').hide();

	if(operation == "Find Project"){
                $('#searchresults').append(buildProjectTable(results));	
                
	}
	if(operation == "Find Module"){
		$('#searchresults').append(buildModuleTable(results));	
	}
	
	if(operation == "Find Artifact By Name" || 
	operation == "Find Artifact By Description" ){
		$('#searchresults').append(buildArtifactTable(results));
		
	}
	if(operation == "Display Project Info"){
		$('#searchresults').append(buildProjectInfoPanel(results));
		
	}
	if(operation == "Display Artifact By Module"){
		$('#searchresults').append(buildArtifactTable(results));
		operation = "Find Module";
	}
    $(".editart").click(processArtifactEdit);
    $(".deleteart").click(processArtifactDelete);
	$(".displayart").click(processArtifactDisplayByModule);
	$(".displayprojinfo").click(processDisplayProjectInfo);
	/*
	$("#search-btn").keypress(function(e)){
		if(e.which == 13){
			$("#go").click();
		}
	}
	*/
    $('#addmessage').text($('#addname').val()+" ADDED to Database");
    
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
    //console.log("Firstname:" + $('#addfirst').val());
    $('#searchresults').empty();
	console.log("name: "+$("#addArtName").val())
	desc = $("#addArtDescription").val()
	name = $("#addArtName").val()
	stock = $("#addArtStock").val()
	mod = $("#addArtModule").val()
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?aname='+name
	+'&adescrip='+desc+
	'&astock='+stock+
	'&amodule='+mod+'&operation='+operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong");}
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
	console.log("instructions: "+$("#addProjInstructions").val())
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?aprojname='+name
    +'&aprojinstructions='+instructions +
	'&operation='+operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong");}
    });

}

/*
function associateArtWithProj(){
    
	console.log("Attempting to display artifacts and instructions associated with this project");
    $('#searchresults').empty();
	operation = "Display Project Info";
    var id=$(this).attr('ID');
	projectEditID = $(this).attr('ID');
	console.log(id);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?disprojinfo='+$(this).attr('ID')+'&operation=' + operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong with processDisplayProjectInfo");}
    });
	

}
*/

function disassociateFromProj(){
	console.log("Attempting to disassociate art from project");
    $('#searchresults').empty();
	operation = "Disassociate Artifact From Project";
    //var id=$(this).attr('ID');
	
	console.log("artID: " + disassociateID + " projID: " + projectEditID);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?disprojid='+projectEditID+'&disartid='+disassociateID+'&operation=' + operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong with disassociateFromProj");}
    });
	
}


