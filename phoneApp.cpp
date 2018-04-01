#include <iostream>
#include <fstream>
#include <string>
#include <map>

// Stuff for AJAX
#include "cgicc/Cgicc.h"
#include "cgicc/HTTPHTMLHeader.h"
#include "cgicc/HTMLClasses.h"

#include "PhoneBook.h"
#include "PhoneEntry.h"

#define XML_USE_STL

using namespace std;
using namespace cgicc; // Needed for AJAX functions.

ofstream logfile; 

int main() {
  Cgicc cgi;    // Ajax object
  char *cstr;

  EntryManager am; // Phone Book SQL Interface Object
  EntryManager mm;
  
  vector<ArtifactEntry> amResults;
  vector<ModuleEntry> mmResults; //Ways to manage different types of classes
  // Create AJAX objects to recieve information from web page.
  form_iterator op = cgi.getElement("operation");
  string operation = **op;
  logfile.open("stantontphone.log",ios::out | ios::app);
  logfile << "Op:" << operation << endl;
  logfile.close();
  string output = "Error =- Operation not support yet!";

  if (operation == "Find description") {
    form_iterator searchString = cgi.getElement("find");
    string search = **searchString;
    
    amResults = am.findByDescription(search);
    if (amResults.size() > 0) {
      output = "success";
      for (int i = 0; i<amResults.size(); i++) {
	output += "," + amResults.at(i).name + ","
	  + amResults.at(i).description + ","
	  + amResults.at(i).stock + ","
	  + amResults.at(i).module + ","
	  + amResults.at(i).artifactID;

      }
    } else {
      output = "No Match Found";
    }
  }


  if (operation == "Find Artifact By Name") {

	
	form_iterator searchString = cgi.getElement("find");
   
    string search = **searchString;
    
    amResults = am.findByName(search);
    
	if (amResults.size() > 0) {
		
      output = "success";
	  
      for (int i = 0; i<amResults.size(); i++) {
	output += "~@$" + amResults.at(i).name + "~@$"
	  + amResults.at(i).description + "~@$"
	  + amResults.at(i).stock + "~@$"
	  + amResults.at(i).module + "~@$" + amResults.at(i).artifactID;

      }
    } else {
      output = "No Match Found";
    }
	
  }
  
  if (operation == "Find Artifact By Description") {

	
	form_iterator searchString = cgi.getElement("find");
   
    string search = **searchString;
    
    amResults = am.findByDescription(search);
    
	if (amResults.size() > 0) {
		
      output = "success";
	  
      for (int i = 0; i<amResults.size(); i++) {
	output += "~@$" + amResults.at(i).name + "~@$"
	  + amResults.at(i).description + "~@$"
	  + amResults.at(i).stock + "~@$"
	  + amResults.at(i).module + "~@$" + amResults.at(i).artifactID;

      }
    } else {
      output = "No Match Found";
    }
	
  }
	
  if (operation == "Find Module") {
    form_iterator searchString = cgi.getElement("find");
    string search = **searchString;
    
    mmResults = mm.findModule(search);
    if (mmResults.size() > 0) {
      output = "success";
      for (int i = 0; i<mmResults.size(); i++) {
	output += "~@$" + mmResults.at(i).name
	  + mmResults.at(i).moduleID;

      }
    } else {
      output = "No Match Found";
    }
	
  }
  

  if(operation=="Add Artifact"){

    form_iterator anameString = cgi.getElement("aname");
    form_iterator adescripString = cgi.getElement("adescrip");
    form_iterator addstockString = cgi.getElement("astock");
    form_iterator addmoduleString = cgi.getElement("amodule");

    string addname=**anameString;
    string adddescrip=**adescripString;
    string addstock=**addstockString;
    string addmodule=**addmoduleString;

    am.addEntry(addname,adddescrip,addstock,addmodule);

    output="success";
  }
  
  if(operation=="Add Module"){

    form_iterator anameString = cgi.getElement("amodname");
    //form_iterator adescripString = cgi.getElement("amoddescrip");


    string addname=**anameString;
    //string adddescrip=**adescripString;
    
    mm.addModule(addname);

    output="success";
  }
  
  
  
  if(operation=="delete Artifact"){
    form_iterator idtodeleteString = cgi.getElement("deleteid");
    string iddelete=**idtodeleteString;

    am.deleteArtifact(iddelete);
    output="success";
  }
  
  if(operation=="edit Artifact"){
    form_iterator idtoeditString = cgi.getElement("editartid");
    string idedit=**idtoeditString;

    form_iterator editnameString = cgi.getElement("editartname");
    form_iterator editdescripString = cgi.getElement("editartdescrip");
    form_iterator editstockString = cgi.getElement("editartstock");
    form_iterator editmoduleString = cgi.getElement("editartmod");

    string editname=**editnameString;
    string editdescrip=**editdescripString;
    string editstock=**editstockString;
    string editmodule=**editmoduleString;


    am.editArtifactEntry(idedit,editname,editdescrip,editstock,editmodule);
    output="success";
  }
  
  if(operation=="Display Artifacts"){
	  
	  
  }
  //didnt change "editid" or anthing similar to "editartifactid" because 
  //i dont think it matters

  
  /* send back the results */
  cout << "Content-Type: text/plain\n\n";

  cout << output << endl;
  
  
  return 0;
}

