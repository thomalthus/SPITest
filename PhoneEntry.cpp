
#include "PhoneEntry.h"

PhoneEntry::PhoneEntry() {
}

//change phone entry to Artifact entry 
PhoneEntry::PhoneEntry(string n, string d, string s, string m, string I) {
    name = n;
    description = d;
    stock = s;
    module = m;
    artifactID = I;

}
