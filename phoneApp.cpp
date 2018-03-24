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

  PhoneBook pb; // Phone Book SQL Interface Object
  vector<PhoneEntry> pbResults;
  
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
    
    pbResults = pb.findByDescription(search);
    if (pbResults.size() > 0) {
      output = "success";
      for (int i = 0; i<pbResults.size(); i++) {
	output += "," + pbResults.at(i).name + ","
	  + pbResults.at(i).description + ","
	  + pbResults.at(i).stock + ","
	  + pbResults.at(i).module + ","
	  + pbResults.at(i).artifactID;

      }
    } else {
      output = "No Match Found";
    }
  }


  if (operation == "Find name") {
    form_iterator searchString = cgi.getElement("find");
    string search = **searchString;
    
    pbResults = pb.findByName(search);
    if (pbResults.size() > 0) {
      output = "success";
      for (int i = 0; i<pbResults.size(); i++) {
	output += "," + pbResults.at(i).name + ","
	  + pbResults.at(i).description + ","
	  + pbResults.at(i).stock + ","
	  + pbResults.at(i).module+ ","
	  + pbResults.at(i).artifactID;

      }
    } else {
      output = "No Match Found";
    }
  }

  if (operation == "Find module") {
    form_iterator searchString = cgi.getElement("find");
    string search = **searchString;
    
    pbResults = pb.findByModule(search);
    if (pbResults.size() > 0) {
      output = "success";
      for (int i = 0; i<pbResults.size(); i++) {
	output += "," + pbResults.at(i).name + ","
	  + pbResults.at(i).description + ","
	  + pbResults.at(i).stock + ","
	  + pbResults.at(i).module + ","
	  + pbResults.at(i).artifactID;

      }
    } else {
      output = "No Match Found";
    }
  }

  if(operation=="Add Entry"){

    form_iterator anameString = cgi.getElement("aname");
    form_iterator adescripString = cgi.getElement("adescrip");
    form_iterator addstockString = cgi.getElement("astock");
    form_iterator addmoduleString = cgi.getElement("amodule");

    string addname=**anameString;
    string adddescrip=**adescripString;
    string addstock=**addstockString;
    string addmodule=**addmoduleString;

    pb.addEntry(addname,adddescrip,addstock,addmodule);

    output="success";
  }
  
  if(operation=="delete"){
    form_iterator idtodeleteString = cgi.getElement("deleteid");
    string iddelete=**idtodeleteString;

    pb.deleteEntry(iddelete);
    output="success";
  }
  if(operation=="edit"){
    form_iterator idtoeditString = cgi.getElement("editid");
    string idedit=**idtoeditString;

    form_iterator editnameString = cgi.getElement("editname");
    form_iterator editdescripString = cgi.getElement("editdescrip");
    form_iterator editstockString = cgi.getElement("editstock");
    form_iterator editmoduleString = cgi.getElement("editmodule");

    string editname=**editnameString;
    string editdescrip=**editdescripString;
    string editstock=**editstockString;
    string editmodule=**editmoduleString;


    pb.editEntry(idedit,editname,editdescrip,editstock,editmodule);
    output="success";
  }
  //didnt change "editid" or anthing similar to "editartifactid" because i dont think it matters

  
  /* send back the results */
  cout << "Content-Type: text/plain\n\n";

  cout << output << endl;
  
  
  return 0;
}

