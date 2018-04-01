#include <string>
using namespace std;

#ifndef ENTRY_H
#define ENTRY_H
class ModuleEntry;

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
#endif /* ENTRY_H */

