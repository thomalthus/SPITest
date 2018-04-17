
#include "Entry.h"

ArtifactEntry::ArtifactEntry() {
}

//change phone entry to Artifact entry 
ArtifactEntry::ArtifactEntry(string n, string d, string s, string m, string I) {
    name = n;
    description = d;
    stock = s;
    module = m;
    artifactID = I;

}

ModuleEntry::ModuleEntry(string n, string I){
	name = n;
	moduleID = I;
}

ProjectEntry::ProjectEntry(string n, string d, string I){
        name = n;
        instructions = d;
	projectID = I;


}
