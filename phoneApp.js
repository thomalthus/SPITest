
// JavaScript for Phone Application Demo Program
// Jim Skon, Kenyon College, 2017
var operation;  // operation
var deloperation;
var editid;
//Edited this section :)
$(document).ready(function () {
    $('.editartifactdata').hide();
	$('.inputmodule').hide();
	$('.inputartifact').hide();
    $("#search-btn").click(getMatches);
    $("#addArtifact-btn").click(addArtifact);
	$("#addMod-btn").click(addModule);
    operation = "Find Artifact By Name";
    $("#clear").click(clearResults);

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
		$('.results').show();
		$('.searchbox').show();


	}
	else if(operation=="Find Artifact By Description"){
		$('.inputmodule').hide();
		$('.inputartifact').hide();
		$('.results').show();
	}
	else if(operation=="Find Module"){
		$('.inputmodule').hide();
		$('.inputartifact').hide();
	}
	else if(operation=="Find Project"){
		$('.inputmodule').hide();
		$('.inputartifact').hide();
	}
	else if(operation=="Add Artifact"){
		$('.inputartifact').show();
		
		$('.searchbox').hide();
		$('.inputmodule').hide();
		$('.results').hide();
	}	
    else if(operation == "Add Module"){
        $('.inputmodule').show();
		
		$('.inputartifact').hide();
    }
	else if(operation=="Add Project"){
	
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
 	var result = '<table class="w3-table-all w3-hoverable" border="2"><tr><th>Object</th><th>Description</th><th>Stock</th><th>Module</th><th>Action</th><tr>';
	var aLen = a.length;
	for (var i = 1; i < aLen; i+=5) {
	    result += "<tr><td class='artName'>"+a[i]+"</td><td class='artDescrip'>"+a[i+1]+"</td><td class='artStock'>"+a[i+2]+"</td><td class='artMod'>"+a[i+3]+"</td>";
	    result += "<td><button type='button' ID='"+a[i+4]+"' class='btn btn-primary btn-sm editart'>Change</button> ";
	    result += "<button type='button' ID='"+a[i+4]+"' class='btn btn-primary btn-sm delete'>Delete</button></td></tr>";
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
	for (var i = 1; i < aLen; i++) {
	    result += "<tr ID='"+a[i]+"row'><td class='first' ID='"+a[i]+"cell'>"+a[i] +"</td>";
	    //result += "<td><button type='button' ID='"+a[i+4]+"' class='btn btn-primary btn-sm edit'>Change</button> ";
	    result += "<td align=center><button type='button' ID='"+a[i]+"button' class='btn btn-primary btn-sm edit'>Display artifacts</button></td></tr>";
	}
	result += "</table>";
	
	return result;
    }
}

function processEdit(){
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
	$('#editArtModule').val()+'&operation=edit',
	dataType: 'text',
	success: editDone(),
	error: function(){alert("Error: Something went wrong");}
    });
}


function processDelete(){
    console.log("Attempting to delete an entry");
    $('#searchresults').empty();
    var id=$(this).attr('ID');
	console.log(id);
    $.ajax({
	url: '/cgi-bin/stantont_phoneAppComplete.cgi?deleteid='+$(this).attr('ID')+'&operation=delete',
	dataType: 'text',
	success: function(){alert("Deleted Record: " +id );},
	error: function(){alert("Error: Something went wrong with processDelete");}
    });
}
function processResults(results) {
    $('#editmessage').empty();
    $('#addmessage').empty();
    console.log("Results:"+results);
    
	$('#searchresults').empty();
    if(operation == "Find Module"){
		$('#searchresults').append(buildModuleTable(results));	
	}
	
	if(operation == "Find Artifact By Name" || operation == "Find Artifact By Description"){
		$('#searchresults').append(buildArtifactTable(results));
	}
    $(".editart").click(processEdit);
    $(".delete").click(processDelete);
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



