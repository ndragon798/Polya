import math, time
from multiprocessing.dummy import Pool as ThreadPool 

o=0
e=0
def primes(n):
	global e
	global o
	# print(n)
	if n%100==0:
		print(n)
	# if n == 1:	
	# 	e+=1
	primfac = []
	d = 2
	while d*d <= n:
		while (n % d) == 0:
			primfac.append(d)  # supposing you want multiple factors repeated
			n //= d
		d += 1
	if n > 1:
		primfac.append(n)

		# print(primfac)
	if len(primfac)%2==0:
		e+=1
	else:
		o+=1

# pool = ThreadPool(1000) 
# results = pool.map(primes, range(1,1000))
# results = pool.map(primes, range(1,100000000))
# results = pool.map(primes, range(100000001,200000000))
# results = pool.map(primes, range(200000001,300000000))
# results = pool.map(primes, range(300000001,400000000))
# results = pool.map(primes, range(400000001,500000000))
# results = pool.map(primes, range(500000001,600000000))
# results = pool.map(primes, range(600000001,700000000))
# results = pool.map(primes, range(700000001,800000000))
# results = pool.map(primes, range(800000001,900000000))
# results = pool.map(primes, range(900000001,1000000000))
for s in range(0,1000000):
	primes(s)
if (o>=e):
	print("Polyas: True")
print("Odd: "+str(o)+" Even: "+str(e))
