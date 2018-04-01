#MakeFile to build and deploy the Sample US CENSUS Name Data using ajax
# For CSC3004 Software Development

# Put your user name below:

USER= stantont


CC= g++

#For Optimization
#CFLAGS= -O2
#For debugging
CFLAGS= -std=c++14  -Wno-deprecated-declarations

RM= /bin/rm -f

all:  SPIApp PutHTML PutCGI

Entry.o: Entry.cpp Entry.h
	$(CC) -c $(CFLAGS) Entry.cpp

EntryManager.o: EntryManager.cpp EntryManager.h
	$(CC) -c $(CFLAGS) -I/usr/include/cppconn EntryManager.cpp

SPIApp.o: SPIApp.cpp 
	$(CC) -c $(CFLAGS) SPIApp.cpp

SPIApp: SPIApp.o EntryManager.o Entry.o
	$(CC) SPIApp.o EntryManager.o Entry.o -o SPIApp -L/usr/local/lib -lcgicc -lmysqlcppconn

PutCGI: SPIApp
	chmod 757 SPIApp
	cp SPIApp /usr/lib/cgi-bin/$(USER)_phoneAppComplete.cgi 

	echo "Current contents of your cgi-bin directory: "
	ls -l /usr/lib/cgi-bin/

PutHTML:
	cp phoneApp.html /var/www/html/class/ssd/$(USER)/PhoneAppComplete
	cp phoneApp.js /var/www/html/class/ssd/$(USER)/PhoneAppComplete
	cp phoneApp.css /var/www/html/class/ssd/$(USER)/PhoneAppComplete


	echo "Current contents of your HTML directory: "
	ls -l /var/www/html/class/ssd/$(USER)/PhoneAppComplete

clean:
	rm -f *.o  phoneApp 
