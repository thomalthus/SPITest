#include <vector>
#include <iostream>
#include "EntryManager.h"
#include "Entry.h"
#include <ctype.h>

string url_decode(string &SRC);


EntryManager::EntryManager() {

}
vector<ArtifactEntry> EntryManager::getPassword(){
	sql::Driver* driver = sql::mysql::get_driver_instance();
	std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
	con->setSchema(database);
	std::auto_ptr<sql::Statement> stmt(con->createStatement());	
	
	vector<ArtifactEntry> list;
  
	stmt->execute("CALL getPassword()");
	
	std::auto_ptr< sql::ResultSet > res;
    do {
      res.reset(stmt->getResultSet());
      while (res->next()) {

           ArtifactEntry entry(res->getString("PasswordValue"),"","","","");

	  
	  list.push_back(entry);

      }
    } while (stmt->getMoreResults());
	
    return list;
}
void EntryManager::associateArtWithProj(string artID, string projID){
	
	sql::Driver* driver = sql::mysql::get_driver_instance();
	std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
	con->setSchema(database);
	std::auto_ptr<sql::Statement> stmt(con->createStatement());	
	
	stmt->execute("CALL add_ArtifactsProjects('"+artID+"','"+projID+"')");
	
}

void EntryManager::disassociateArtWithProj(string artID, string projID){
	
	sql::Driver* driver = sql::mysql::get_driver_instance();
	std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
	con->setSchema(database);
	std::auto_ptr<sql::Statement> stmt(con->createStatement());	
	
	stmt->execute("CALL delete_ArtifactsProjects('"+artID+"','"+projID+"')");
	
}

vector<ModuleEntry> EntryManager::findModule(string name) {

    sql::Driver* driver = sql::mysql::get_driver_instance();
    std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
    con->setSchema(database);
    std::auto_ptr<sql::Statement> stmt(con->createStatement());

    vector<ModuleEntry> list;
	
    stmt->execute("CALL find_module('%"+name+"%')");
	
    std::auto_ptr< sql::ResultSet > res;
    do {
      res.reset(stmt->getResultSet());
      while (res->next()) {

          ModuleEntry entry(res->getString("moduleName"),res->getString("modID"));

	  
	  list.push_back(entry);

      }
    } while (stmt->getMoreResults());
	
    return list;
    
}


vector<ArtifactEntry> EntryManager::displayArtifactsByModule(string modID) {

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());

  vector<ArtifactEntry> list;
  
  stmt->execute("CALL search_artifacts_by_module('%"+modID+"%')");
  
  std::auto_ptr< sql::ResultSet > res;
  
  do {
    res.reset(stmt->getResultSet());
    while (res->next()) {
      
      ArtifactEntry entry(res->getString("name"),res->getString("description"),
		       res->getString("stock"),
			   res->getString("module"), res->getString("artifactID"));
		
		list.push_back(entry);
		

    }
  } while (stmt->getMoreResults());
 
  return list;

}




vector<ArtifactEntry> EntryManager::findByName(string name) {

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());

  vector<ArtifactEntry> list;
  	
  stmt->execute("CALL find_name('%"+name+"%')");
  
  std::auto_ptr< sql::ResultSet > res;
  
  do {
    res.reset(stmt->getResultSet());
    while (res->next()) {
      
      ArtifactEntry entry(res->getString("name"),res->getString("description"),
		       res->getString("stock"),
			   res->getString("module"), res->getString("artifactID"));
		//res->getInt("artifactID");	
		
		list.push_back(entry);
		

    }
  } while (stmt->getMoreResults());
  
  return list;

}
vector<ArtifactEntry> EntryManager::findByModule(string module) {
  
 sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());

  vector<ArtifactEntry> list;

  stmt->execute("CALL find_module('"+module+"')");

  std::auto_ptr< sql::ResultSet > res;
  do {
    res.reset(stmt->getResultSet());
    while (res->next()) {

      ArtifactEntry entry(res->getString("name"),res->getString("description"),
		       res->getString("stock"),res->getString("module"),
	res->getString("artifactID"));


      list.push_back(entry);

    }
  } while (stmt->getMoreResults());
  return list;

}

void EntryManager::addEntry(string name,string description,string stock, string module){

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());
  /*	
  if(module != "Friend" && module != "Family" && module!="Business"){
      module="Other";
  }
  */
  stmt->execute("CALL add_entry('"+name+"','"+description+"','"+stock+"','"+module+"')");
  //stmt->execute("CALL add_entry('"+name+"','"+description+"','"+stock+"','"+"space test"+"')");
  }

void EntryManager::addModule(string name){
    
	sql::Driver* driver = sql::mysql::get_driver_instance();
	std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
	con->setSchema(database);
	std::auto_ptr<sql::Statement> stmt(con->createStatement());	
	
	stmt->execute("CALL add_module('"+name+"')");
	
}

void EntryManager::addProject(string name, string instructions){
    
	sql::Driver* driver = sql::mysql::get_driver_instance();
	std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
	con->setSchema(database);
	std::auto_ptr<sql::Statement> stmt(con->createStatement());	
	
	stmt->execute("CALL add_project('"+name+"','"+instructions+"')");
	
}

vector<ArtifactEntry> EntryManager::findByDescription(string description) {

    sql::Driver* driver = sql::mysql::get_driver_instance();
    std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
    con->setSchema(database);
    std::auto_ptr<sql::Statement> stmt(con->createStatement());

    vector<ArtifactEntry> list;
	
    stmt->execute("CALL find_description('%"+description+"%')");
	
    std::auto_ptr< sql::ResultSet > res;
    do {
      res.reset(stmt->getResultSet());
      while (res->next()) {

          ArtifactEntry entry(res->getString("name"),res->getString("description"),
			   res->getString("stock"),res->getString("module"), res->getString("artifactID"));

	  
	  list.push_back(entry);

      }
    } while (stmt->getMoreResults());
	
    return list;
    
}

vector<ArtifactEntry> EntryManager::displayProjectInfo(string projectID) {
	bool instructionsAdded = false;
	
    sql::Driver* driver = sql::mysql::get_driver_instance();
    std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
    con->setSchema(database);
    std::auto_ptr<sql::Statement> stmt(con->createStatement());

    vector<ArtifactEntry> list;
	
    stmt->execute("CALL display_by_project('"+projectID+"')");
	
    std::auto_ptr< sql::ResultSet > res;
    do {
      res.reset(stmt->getResultSet());
	  
	  //Occupy first elt of list with entry that stores instructions for project
	  
	  while (res->next()) {
		
		if(!instructionsAdded){	
			ArtifactEntry projectInstructions(res->getString("projectInstructions"), res->getString("projectName"),"","","");
			list.push_back(projectInstructions);	
			instructionsAdded = true;
		}
		
        ArtifactEntry entry(res->getString("name"),res->getString("description"),
			   res->getString("stock"),res->getString("module"), res->getString("artifactID"));

	  
		list.push_back(entry);

      }
    } while (stmt->getMoreResults());
	
    return list;
    
}

vector<ProjectEntry> EntryManager::findProjectByName(string projectName){
       
	 sql::Driver* driver = sql::mysql::get_driver_instance();
	  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
	  con->setSchema(database);
	  std::auto_ptr<sql::Statement> stmt(con->createStatement());

	  vector<ProjectEntry> list;

	  stmt->execute("CALL find_project('%"+projectName+"%')");

	  std::auto_ptr< sql::ResultSet > res;
	  do {
		res.reset(stmt->getResultSet());
		while (res->next()) {

		  ProjectEntry entry(res->getString("projectName"),res->getString("projectInstructions"),
				   res->getString("projectID"));


		  list.push_back(entry);

		}
	  } while (stmt->getMoreResults());
	  return list;

  

}

void EntryManager::editArtifactEntry(string artifactID,string name,string description,string stock, string module){
  
  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());
  
  stmt->execute("CALL edit_entry('"+artifactID+"','"+name+"','"+description+"','"+stock+"','"+module+"')");
}

void EntryManager::editProjectEntry(string ID,string name,string instructions){
  
  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());
  
  stmt->execute("CALL edit_project('"+name+"','"+instructions+"','"+ID+"')");
}
/*
void EntryManager::deleteEntry(string artifactID){

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());


  stmt->execute("CALL delete_artifact('"+artifactID+"')");

}
*/
void EntryManager::deleteArtifact(string artifactID){

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());


  stmt->execute("CALL delete_artifact('"+artifactID+"')");

}

void EntryManager::deleteModule(string modID){

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());


  stmt->execute("CALL delete_module('"+modID+"')");

}


void EntryManager::deleteProject(string projectID){

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());


  stmt->execute("CALL delete_project('"+projectID+"')");

}


string url_decode(string &SRC) {
    string ret;
    char ch;
    int i, ii;
    for (i=0; i<SRC.length(); i++) {
        if (int(SRC[i])==37) {
            sscanf(SRC.substr(i+1,2).c_str(), "%x", &ii);
            ch=static_cast<char>(ii);
            ret+=ch;
            i=i+2;
        } else {
            ret+=SRC[i];
        }
    }
    return (ret);
}



