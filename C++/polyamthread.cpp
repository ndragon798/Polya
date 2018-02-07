#include<iostream>
using std::cout; 
using std::endl;
#include <math.h>
#include<vector>
using std::vector;
#include<map>
using std::map;
#include<thread>
using std::thread;

static const int num_threads = 16;

map<long,char> m;

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
        // While i divides n, print i and divide n
        while (n%i == 0)
        {
            primfac.push_back(i);
            n = n/i;
        }
    }
    if (n > 2){
	    primfac.push_back(n);
    }
	if (primfac.size()%2==0){
		m[ogn]='e';
		// e++;
	}
	else{
		m[ogn]='o';
		// o++;
	}
	// if(e>o && n!=1){
	// 	cout<<ogn<<" Winner Winner Chicken Dinner";
	// 	exit(0);
	// }
	}

int main(){
	cout<<thread::hardware_concurrency();
	thread t[num_threads];
	for (int i = 1; i < num_threads; ++i)
	{
		// for (int i = 0; i < count; ++i)
		// {
		// }
		// t[i] = thread(primes, j);	
	}
	for (int i = 1; i < num_threads; ++i) {
        t[i].join();
    }

	for(auto x:m){
		if (x.second=='e'){
			e++;
		}else{
			o++;
		}
	}
	if (o>=e){
		cout<<("Polyas: True")<<endl;
		cout<<"Odd: "<< o << endl << "Even: " << e<<endl;
	}
	return 0;
}

