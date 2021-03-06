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
    vector<ProjectEntry> findProjectByName(string name);
    void addModule(string name);    
	void addProject(string name, string instructions);
    void addEntry(string name,string description,string stock,string module);
    void editArtifactEntry(string artifactID,string name,string description,string stock, string module);
	void editProjectEntry(string id,string name,string instructions);
	void disassociateArtWithProj(string artID, string projID);
	void associateArtWithProj(string artID, string projID);
    //void deleteEntry(string artifactID);
    void deleteArtifact(string artifactID);
	void deleteProject(string projectID);
	void deleteModule(string modID);
	vector<ArtifactEntry> getPassword();
	
	
	vector<ArtifactEntry> displayProjectInfo(string projectID);
private:
    const string url=HOST;
    const string user=USER;
    const string database=DB;
    const string pass=PASS;
    
};

#endif /* ENTRYMANAGER_H */

