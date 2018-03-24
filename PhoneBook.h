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
#include "PhoneEntry.h"

#ifndef PHONEBOOK_H
#define PHONEBOOK_H

#define HOST "localhost"
#define USER "rachfal1"
#define DB "SPI"
#define PASS "S216309"

using namespace std;

class PhoneBook {
public:
    PhoneBook();

    vector<PhoneEntry> findByName(string name);
    vector<PhoneEntry> findByDescription(string description);
    vector<PhoneEntry> findByModule(string module);

    void addEntry(string name,string description,string stock,string module);
    void editEntry(string artifactID,string first,string last,string phone,string type);
    void deleteEntry(string artifactID);

private:
    const string url=HOST;
    const string user=USER;
    const string database=DB;
    const string pass=PASS;
    
};

#endif /* PHONEBOOK_H */

