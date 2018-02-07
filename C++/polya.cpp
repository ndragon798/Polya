// import math, time
// from multiprocessing.dummy import Pool as ThreadPool 

#include<iostream>
#include <iomanip>
#include <fstream>
#include <string>
#include <sstream>
#include <math.h> 
#include <algorithm>
#include<vector>
// #include<thread>
// using std::thread;
using std::vector;
using std::sort;
using std::ifstream;
using std::iostream;
using std::to_string;
using std::fixed;
using std::setprecision;
using std::stringstream;
using std::cout; 
using std::endl; 
using std::boolalpha;


long o=0;
long e=0;
void primes(long n){
	long ogn;
	ogn = n;
	if (n%1000000==0 || n==906150256 || n==906150257){
		cout<<n<<endl;
	}
	vector<long> primfac;
	while (n%2 == 0)
    {
        n = n/2;
        primfac.push_back(n);
    }
    for (int i = 3; i <= sqrt(n); i = i+2)
    {
        while (n%i == 0)
        {
            primfac.push_back(i);
            n = n/i;
        }
    }
    if (n > 2)
	    primfac.push_back(n);
	if (primfac.size()%2==0){
		e++;
	}
	else{
		o++;
	}
	if(e>o && n!=1){
		cout<<ogn<<" Winner Winner Chicken Dinner";
		exit(0);
	}
	}

int main(){
	for (int i = 1; i <= 1000000; ++i)
	{
		primes(i);
	}
	if (o>=e){
	cout<<("Polyas: True")<<endl;
	cout<<"Odd: "<< o << endl << "Even: " << e;
	}
}
