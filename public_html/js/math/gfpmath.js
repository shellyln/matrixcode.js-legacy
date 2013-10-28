


///
GfPMath = __extends(GFMathBase,
// constructor
  function(P) {
    __constructSuper(this);

    this.__P  = P;
    this.__Q  = 3;
    if (this.__P == this.__Q) {
      this.__Q = 5;
    }

    this.__l2e = [];
    this.__l2e.length = this.__P;
    this.__e2l = [];
    this.__e2l.length = this.__P;
    var a = 1; // Q^0
    for (var i = 0; i < this.__P; i++) {
      this.__l2e[a] = i;
      this.__e2l[i] = a;
      a = (a * this.__Q) % this.__P;
    }

    this.__rsMakeGxCache  = {};
  },
// methods
function(__this__) {


  ///
  __this__.Ty = function(x) {
    if (x < 0) {
      return this.__P - (((-x) % this.__P) | 0x0000);
    } else {
      return (x % this.__P) | 0x0000;
    }
  }


  /// ok
  __this__.ZERO = function() {
    return 0;
  }


  /// ok
  __this__.ONE = function() {
    return 1;
  }


  ///
  __this__.addVal = function(x, y) {
    return (this.Ty(x) + this.Ty(y)) % this.__P;
  }


  ///
  __this__.subVal = function(x, y) {
    return this.Ty(this.Ty(x) - this.Ty(y));
  }


  ///
  __this__.mulVal = function(x, y) {
    return this.Ty(this.Ty(x) * this.Ty(y));
  }


  ///
  __this__.divVal = function(x, y) {
    y = this.Ty(y);
    if (0 == y) {
      // 0 is expressed zero and/or infinity.
      return 0;
    } else {
      return this.Ty(this.Ty(x) * this.invVal(y));
    }
  }


  ///
  __this__.modVal = function(x, y) {
    return 0;
  }


  ///
  __this__.divmodVal = function(x, y) {
    return [this.divVal(x, y), 0];
  }


  ///
  __this__.negVal = function(x) {
    return this.Ty(- this.Ty(x));
  }


  ///
  __this__.invVal = function(x) {
    // 1 == (retval * x) mod P
    // 1 == (Q^(P-x) * Q^x) mod P
    if (this.Ty(x) == 0) {
      return 0;
    } else {
      return this.__e2l[this.__P - this.__l2e[this.Ty(x)] - 1];
    }
  }


  ///
  __this__.expOfVal = function(x) {
    // x == (P^retval) mod P
    return this.__l2e[this.Ty(x)];
  }


  ///
  __this__.logOfVal = function(x) {
    // retval == (P^x) mod P
    if (0 <= x) {
      return this.__e2l[x % this.__P];
    } else {
      return this.__e2l[(this.__P - x - 1) % this.__P];
    }
  }


  ///
  __this__.rsMakeGx = function(n) {
    var c = this.__rsMakeGxCache[n];
    if (c != undefined) { return c; }

    var x = [this.negVal(this.logOfVal(1)), 1]; // x - Q^1
    var y = [this.negVal(this.logOfVal(2)), 1]; // x - Q^2
    this.__rsMakeGxCache[1] = x;

    for (var i = 3; i <= n + 1; i++) {
      x = this.mulPoly(x, y);
      y[0] = this.negVal(this.logOfVal(i));
      this.__rsMakeGxCache[i - 1] = x;
    }
    return x;
  }
});


