Vue.config.devtools = true;
new Vue({
    el: '#app',
    data: {
        d: 0,
        e: 0,
        n: 0,
        p: 0,
        q: 0,
        t: 0,
        numberPlain: 42,
        numberEncrypted: null
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
            var p = Math.floor(Math.random() * ((max - 1) - min + 1)) + min;
            if(bigInt(p).isPrime()===true){
                return p;
            } else {
                return this.random_prime(min, max);   
            }
        },

        generate_random_number: function() {
            var max = 100000,
                min = 1;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        generate_keys: function() {
            this.p = this.random_prime(1, 255);
            this.q = this.random_prime(1, 255);
            this.n = this.p * this.q;
            this.t = (this.p-1)*(this.q-1);
            this.e = this.random_prime(1, this.t);
            this.d = this.modular_multiplicative_inverse(this.e, this.t);
        },

        encryptActivityOneNumber: function () {
            this.numberEncrypted = bigInt(this.numberPlain).pow(this.e).mod(this.n);
        }
    },

    watch: {
        numberPlain: function (val) {
            if (this.numberPlain > 100) {
                this.numberPlain = 100;
            }
        }
    }
})