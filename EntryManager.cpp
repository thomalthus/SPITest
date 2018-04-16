#include <vector>
#include <iostream>
#include "EntryManager.h"
#include "Entry.h"

EntryManager::EntryManager() {

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
}

void EntryManager::addModule(string name){
    
	sql::Driver* driver = sql::mysql::get_driver_instance();
	std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
	con->setSchema(database);
	std::auto_ptr<sql::Statement> stmt(con->createStatement());	
	
	stmt->execute("CALL add_module('"+name+"')");
	
}

void EntryManager::editArtifactEntry(string artifactID,string name,string description,string stock, string module){

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());
  
  stmt->execute("CALL edit_entry('"+artifactID+"','"+name+"','"+description+"','"+stock+"','"+module+"')");
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


