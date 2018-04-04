#include <stdlib.h>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>
/* uncomment for applications that use vectors */
#include <vector>

#include "mysql_connection.h"
#include "mysql_driver.h"
#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>
#include <cppconn/prepared_statement.h>
#include "Entry.h"

#ifndef ENTRYMANAGER_H
#define ENTRYMANAGER_H

#define HOST "localhost"
#define USER "rachfal1"
#define DB "SPI"
#define PASS "S216309"

using namespace std;

class EntryManager {
public:
    EntryManager();

    vector<ArtifactEntry> findByName(string name);
    vector<ArtifactEntry> findByDescription(string description);
    vector<ArtifactEntry> findByModule(string module); //search artifact table by module name
	vector<ModuleEntry> findModule(string name); //Search module table
    vector<ArtifactEntry> displayArtifactsByModule(string name);
	void addModule(string name);
	
	
	
	
	void addEntry(string name,string description,string stock,string module);
    void editArtifactEntry(string artifactID,string first,string last,string phone,string type);
    //void deleteEntry(string artifactID);
	void deleteArtifact(string artifactID);
private:
    const string url=HOST;
    const string user=USER;
    const string database=DB;
    const string pass=PASS;
    
};

#endif /* ENTRYMANAGER_H */

