#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <vector>
#include <algorithm>
#include <boost/algorithm/string.hpp>    
// Stuff for AJAX
#include "cgicc/Cgicc.h"
#include "cgicc/HTTPHTMLHeader.h"
#include "cgicc/HTMLClasses.h"

#include "EntryManager.h"
#include "Entry.h"

#define XML_USE_STL

using namespace std;
using namespace cgicc; // Needed for AJAX functions.

ofstream logfile; 

void sortArtByName(vector<ArtifactEntry> &a);
bool compareArtByName(ArtifactEntry a, ArtifactEntry b);
void sortArtByDescription(vector<ArtifactEntry> &a);
bool compartArtByDescription(ArtifactEntry a, ArtifactEntry b);



int main() {
  Cgicc cgi;    // Ajax object
  char *cstr;

  EntryManager am; // Phone Book SQL Interface Object
  EntryManager mm; //manages modules

  EntryManager pm; //manages project
  
  vector<ArtifactEntry> amResults;
  vector<ModuleEntry> mmResults; //Ways to manage different types of classes
  vector<ProjectEntry> pmResults; 
  
  // Create AJAX objects to recieve information from web page.
  form_iterator op = cgi.getElement("operation");
  string operation = **op;
  logfile.open("stantontphone.log",ios::out | ios::app);
  logfile << "Op:" << operation << endl;
  logfile.close();
  string output = "Error =- Operation not supported yet!";

  if(operation == "Find Project"){
    form_iterator searchString = cgi.getElement("find");
    string search = **searchString;
    
    pmResults = pm.findProjectByName(search);
    if (pmResults.size() > 0) {
      output = "success";
      for (int i = 0; i<pmResults.size(); i++) {
	output += "~@$" + pmResults.at(i).name + "~@$"
	  + pmResults.at(i).instructions + "~@$"
	  + pmResults.at(i).projectID;

      }
    } else {
      output = "No Match Found";
    }

  }
  
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

	int j = 5;
	form_iterator searchString = cgi.getElement("find");
   
    string search = **searchString;
    
    amResults = am.findByName(search);
    sortArtByName(amResults);
	
	if (amResults.size() > 0) {
		
      //output = "~@$ success";
	  
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
    sortArtByDescription(amResults);
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
	output += "~@$" + mmResults.at(i).name +"~@$"
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
  
  if(operation=="Add Project"){

    form_iterator anameString = cgi.getElement("aprojname");
    form_iterator ainstructionsString = cgi.getElement("aprojinstructions");


    string addname=**anameString;
    string addinstructions=**ainstructionsString;
    
    mm.addProject(addname, addinstructions);

    output="success";
  }
  
  if(operation=="Display Project Info"){
    
	form_iterator searchString = cgi.getElement("disprojinfo");
   
    string search = **searchString;
    
    amResults = am.displayProjectInfo(search);
    
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
  
  
  if(operation=="Display Artifact By Module"){
    
	form_iterator searchString = cgi.getElement("disartmod");
   
    string search = **searchString;
    
    amResults = am.displayArtifactsByModule(search);
    
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


bool compareArtByName(ArtifactEntry a, ArtifactEntry b){
	string A(a.name), B(b.name);
	boost::algorithm::to_lower(A);
	boost::algorithm::to_lower(B);
	return((A) < (B));
		
	
}

bool compareArtByDescription(ArtifactEntry a, ArtifactEntry b){
	string A(a.description), B(b.description);
	boost::algorithm::to_lower(A);
	boost::algorithm::to_lower(B);
	return((A) < (B));
		
	
}

void sortArtByName(vector<ArtifactEntry> &a) {

   sort(a.begin(), a.end(), compareArtByName);
  

}

void sortArtByDescription(vector<ArtifactEntry> &a) {

   sort(a.begin(), a.end(), compareArtByDescription);
  

}


