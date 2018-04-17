#include <string>
using namespace std;

#ifndef ENTRY_H
#define ENTRY_H
class ModuleEntry;

class ProjectEntry;

class ArtifactEntry {
public:
     ArtifactEntry();

     ArtifactEntry(string n, string d, string s, string m, string I);
     string name;
     string description;
     string stock;
     string module;
     string artifactID;

private:

};

class ModuleEntry{
public:
	 
	 ModuleEntry();
	 
	 ModuleEntry(string n, string I);
	 string name;
	 string moduleID;

};

class ProjectEntry{
public:
         ProjectEntry();
         ProjectEntry(string n, string d, string I);
	 string name;
	 string instructions;
	 string projectID;

};

#endif /* ENTRY_H */

