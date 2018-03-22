#include <string>
using namespace std;

#ifndef PHONEENTRY_H
#define PHONEENTRY_H

class PhoneEntry {
public:
     PhoneEntry();
     PhoneEntry(string n, string d, string s, string m, string I);
     string name;
     string description;
     string stock;
     string module;
     string artifactID;

private:

};

#endif /* PHONEENTRY_H */

