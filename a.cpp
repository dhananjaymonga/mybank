#include <bits/stdc++.h>
using namespace std;

#define inf INT_MAX
#define minf INT_MIN
#define mod 1000000007
#define ll long long
#define ld long double
#define all(v) v.begin(), v.end()
typedef vector<int> vi;
typedef vector<string> vs;
typedef vector<bool> vb;
typedef pair<int,int> pii;
typedef vector<pii> vii;
typedef vector<vi> vvi;
typedef map<int, int> mii;
typedef map<char, int> mci;
template<typename... T>
void inp(T&... args) { ((cin >> args), ...);}
template<typename... T>
void out(T&&... args) { ((cout << args), ...);}
#define mid(l, r) (l + (r - l) / 2)
#define f(i, s, e) for(int i = s; i <= e; i++)
#define fr(i, s, e) for(int i = s; i >= e; i--)
#define logarr(s, e, arr) for(int i = s; i <= e; i++) cout << arr[i] << " ";  cout << "\n";
#define bitc(n) __builtin_popcountll(n)
#define debug(x) cout << #x << " = " << x << "\n";
#define mp make_pair
#define eb emplace_back
#define sz size()
#define br "\n"
#define ump unordered_map
#define pqmax priority_queue<int, vi>
#define pqmin priority_queue<pii, vii, greater<pii> >
#define py cout << "YES" << "\n";
#define pn cout << "NO" << "\n";
#define fi first
#define se second


int exp(int a, int b) {
  a %= mod;
  int res = 1;
  while(b) {
    if(b&1) res = (res * a) % mod;
    b >>= 1;
    a = (a * a) % mod;
  }

  return res;
}


class Solution {
public:
  vector<int> getFinalState(vector<int>& nums, int k, int multiplier) {
    pqmin pq;
    vi ans(nums.sz);

    f(i, 0, nums.sz-1) {
      pq.push({arr[i], i});
    }

    int op = k / nums.sz;
    int rem = k%nums.sz;


    if(op != 0) {
      int n = nums.sz;
      while(n--) {
        pii top = pq.top();
        pq.pop();
        pq.push({ (top.fi % mod * exp(multiplier, op) % mod) % mod, top.se })
      }
    }


    while(rem-->0) {
      pii top = pq.top();
      pq.pop();
      pq.push({ (top.fi % mod * multiplier % mod) % mod, top.se });
    }

    while(!pq.empty()) {
      pii top = pq.top();
      arr[top.se] = top.fi;
      pq.pop(); 
    }
    
    return ans;
  }
};