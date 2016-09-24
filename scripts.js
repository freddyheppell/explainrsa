Vue.config.devtools = true;

var letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
];

new Vue({
    el: '#app',
    data: {
        d: 0,
        e: 0,
        n: 0,
        p: 0,
        q: 0,
        t: 0,
        aOneLetterPlain: 0
    },

    methods: {
        modular_multiplicative_inverse: function (a,n) {
            var t  = 0,
                nt = 1,
                r  = n,
                n,
                a,
                nr;
            if (n < 0){
                n = -n;
            }
            if (a < 0){
                a = n - (-a % n);
            }
            nr = a % n;
            while (nr !== 0) {
                var quot= (r/nr) | 0;
                var tmp = nt;  nt = t - quot*nt;  t = tmp;
                    tmp = nr;  nr = r - quot*nr;  r = tmp;
            }
            if (r > 1) { return -1; }
            if (t < 0) { t += n; }
            return t;
        },

        random_prime: function(min, max) {
            while (true) {
                var p = Math.floor(Math.random() * ((max - 1) - min + 1)) + min;
                console.log("checking " + p)
                if(bigInt(p).isPrime()===true){
                    return p;
                }
                console.log(p + " is not prime");
            }
        },
        
        generate_keys: function() {
            this.p = this.random_prime(1, 50);
            this.q = this.random_prime(1, 50);
            this.n = this.p * this.q;
            this.t = (this.p-1)*(this.q-1);
            this.e = this.random_prime(1, this.t);
            this.d = this.modular_multiplicative_inverse(this.e, this.t);
        },

        encrypt: function (m) {
            return bigInt(m).pow(this.e).mod(this.n);
        },

        decrypt: function(mEnc) {
            return bigInt(mEnc).pow(this.d).mod(this.n);
        },
        
        getLetterFromNumber: function (n) {
            return letters[n-1];
        }
    },

    computed: {
        aOneLetterEncrypted: function () {
            return this.encrypt(this.aOneLetterPlain);
        }
    }
})