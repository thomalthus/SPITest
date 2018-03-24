#include <vector>
#include <iostream>
#include "PhoneBook.h"
#include "PhoneEntry.h"

PhoneBook::PhoneBook() {

}

  vector<PhoneEntry> PhoneBook::findByDescription(string description) {

    sql::Driver* driver = sql::mysql::get_driver_instance();
    std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
    con->setSchema(database);
    std::auto_ptr<sql::Statement> stmt(con->createStatement());

    vector<PhoneEntry> list;

    stmt->execute("CALL find_description('%"+description+"%')");

    std::auto_ptr< sql::ResultSet > res;
    do {
      res.reset(stmt->getResultSet());
      while (res->next()) {

          PhoneEntry entry(res->getString("name"),res->getString("description"),
			   res->getString("stock"),"Module", "ID");

	  
	  list.push_back(entry);

      }
    } while (stmt->getMoreResults());
    return list;
    
}

vector<PhoneEntry> PhoneBook::findByName(string name) {

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());

  vector<PhoneEntry> list;
  	
  stmt->execute("CALL find_name('%"+name+"%')");
  
  std::auto_ptr< sql::ResultSet > res;
  
  do {
    res.reset(stmt->getResultSet());
    while (res->next()) {
		
      PhoneEntry entry(res->getString("name"),res->getString("description"),
		       res->getString("stock"),
			   "Module", "ID");
			   /*to_string(res->getInt("artifactID"))
	  PhoneEntry entry("Hello","Hello", "Hello", "Hello","Hello");
        */
		
		list.push_back(entry);
		

    }
  } while (stmt->getMoreResults());
  
  return list;

}
vector<PhoneEntry> PhoneBook::findByModule(string module) {

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());

  vector<PhoneEntry> list;

  stmt->execute("CALL find_module('"+module+"')");

  std::auto_ptr< sql::ResultSet > res;
  do {
    res.reset(stmt->getResultSet());
    while (res->next()) {

      PhoneEntry entry(res->getString("name"),res->getString("description"),
		       res->getString("stock"),res->getString("module"),
	res->getString("artifactID"));


      list.push_back(entry);

    }
  } while (stmt->getMoreResults());
  return list;

}

void PhoneBook::addEntry(string name,string description,string stock, string module){

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());

  if(module != "Friend" && module != "Family" && module!="Business"){
      module="Other";
  }
  stmt->execute("CALL add_entry('"+name+"','"+description+"','"+stock+"','"+module+"')");
}


void PhoneBook::editEntry(string artifactIDnum,string name,string description,string stock, string module){

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());

  if(module != "Friend" && module != "Family" && module!="Business"){
    module="Other";
  }
  stmt->execute("CALL edit_entry('"+artifactIDnum+"','"+name+"','"+description+"','"+stock+"','"+module+"')");
}


void PhoneBook::deleteEntry(string artifactIDnum){

  sql::Driver* driver = sql::mysql::get_driver_instance();
  std::auto_ptr<sql::Connection> con(driver->connect(url, user, pass));
  con->setSchema(database);
  std::auto_ptr<sql::Statement> stmt(con->createStatement());


  stmt->execute("CALL delete_entry('"+artifactIDnum+"')");

}
