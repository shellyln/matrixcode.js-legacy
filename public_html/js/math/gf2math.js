

///
Gf2pMMathBase = __extends(GFMathBase,
// constructor
  function(px, mask) {
    __constructSuper(this);

    this.__mask = mask;
    this.__px   = px & mask;

    this.__rsMakeGxCache  = {};
    this.__rsMakeGx2Cache = {};
  },
// methods
function(__this__) {


  /// ok
  __this__.Ty = function(x) {
    return x & this.__mask;
  }


  /// abstract
  __this__.M = function() {
    throw new Error("abstract method");
  }


  /// ok
  __this__.PX = function() {
    return this.__px;
  }


  /// ok
  __this__.ZERO = function() {
    return this.Ty(0);
  }


  /// ok
  __this__.ONE = function() {
    return this.Ty(1);
  }


  /// ok
  __this__.addVal = function(x, y) {
    return this.Ty(this.Ty(x) ^ this.Ty(y));
  }


  /// ok
  __this__.subVal = function(x, y) {
    return this.Ty(this.Ty(x) ^ this.Ty(y));
  }


  /// abstract
  __this__.mulVal = function(x, y) {
    throw new Error("abstract method");
  }


  /// ok
  __this__.divVal = function(x, y) {
    y = this.Ty(y);
    if (0 == y) {
      // 0 is expressed zero and/or infinity.
      return 0;
    } else {
      return this.Ty(this.mulVal(this.Ty(x), this.invVal(this.Ty(y))));
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


  /// ok
  __this__.negVal = function(x) {
    return this.Ty(x);
  }


  /// abstract
  __this__.invVal = function(x) {
    throw new Error("abstract method");
  }


  /// abstract
  __this__.expOfVal = function(x) {
    throw new Error("abstract method");
  }


  /// abstract
  __this__.logOfVal = function(x) {
    throw new Error("abstract method");
  }


  /// ok
  /// Create a generating polynomial of Reed-Solomon Coding
  /// n: max order
  __this__.rsMakeGx = function(n) {
    var c = this.__rsMakeGxCache[n];
    if (c != undefined) { return c; }

    var x = [1, 1]; // x - a^0
    var y = [2, 1]; // x - a^1
    this.__rsMakeGxCache[1] = x;

    for (var i = 3; i <= n + 1; i++) {
      x = this.mulPoly(x, y);
      y[0] = this.logOfVal(i - 1);
      this.__rsMakeGxCache[i - 1] = x;
    }
    return x;
  }

  ///
  __this__.rsMakeGx1 = function(n) {
    var c = this.__rsMakeGxCache[n];
    if (c != undefined) { return c; }

    var x = [2, 1]; // x - a^1
    var y = [4, 1]; // x - a^2
    this.__rsMakeGxCache[1] = x;

    for (var i = 3; i <= n + 1; i++) {
      x = this.mulPoly(x, y);
      y[0] = this.logOfVal(i);
      this.__rsMakeGxCache[i - 1] = x;
    }
    return x;
  }

  ///
  __this__.rsMakeGx2 = function(n) {
    var c = this.__rsMakeGx2Cache[n];
    if (c != undefined) { return c; }

    var x = [2, 1]; // x - a^1
    var y = [4, 1]; // x - a^2
    this.__rsMakeGx2Cache[1] = x;

    for (var i = 3; i <= n + 1; i++) {
      x = this.mulPoly(x, y);
      y[0] = this.mulVal(y[0], 2);
      this.__rsMakeGx2Cache[i - 1] = x;
    }
    return x;
  }
});


///
Gf2pMMathTableCalcBase = __extends(Gf2pMMathBase,
// constructor
  function(px, mask) {
    __constructSuper(this, [px, mask]);

    this.__l2edict = [];
    this.__l2edict.length = this.__mask + 1;
    this.__e2ldict = [];
    this.__e2ldict.length = this.__mask;

    // creating log to exp and exp to log tables...
    this.__l2edict[0] = 0;
    var v = this.ONE();
    for (var i = 1; i <= this.__mask; i++) {
      this.__l2edict[v] = i - 1;
      this.__e2ldict[i - 1] = v;

      v <<= 1;
      if (0 != (v & ~this.__mask)) {
        v = this.Ty((v & this.__mask) ^ this.__px);
      }
    }
    for (var i = 0; i < this.__e2ldict.length; i++) {
      if (this.__e2ldict[i] == undefined) {
        throw new Error("bad px error");
      }
    }
  },
// methods
function(__this__) {


  /// ok
  __this__.mulVal = function(x, y) {
    if (this.Ty(x) == 0 || this.Ty(y) == 0) {
      return 0;
    } else {
      return this.__e2ldict[
        (this.__l2edict[this.Ty(x)] + this.__l2edict[this.Ty(y)]) % this.__mask];
    }
  }


  /// ok
  __this__.invVal = function(x) {
    if (this.Ty(x) == 0) {
      return 0;
    } else {
      return this.__e2ldict[
        (this.__mask - this.__l2edict[this.Ty(x)]) % this.__mask];
    }
  }


  /// ok
  __this__.expOfVal = function(x) {
    return this.__l2edict[this.Ty(x)];
  }


  /// ok
  __this__.logOfVal = function(x) {
    if (0 <= x) {
      return this.__e2ldict[x % this.__mask];
    } else {
      return this.__e2ldict[this.__mask - ((-x) % this.__mask)];
    }
  }
});


///
Gf2p8Math = __extends(Gf2pMMathTableCalcBase,
// constructor
  function(px) {
    if (px == undefined) px = 0x011d;
    __constructSuper(this, [px, 0x00ff]);
  },
// methods
function(__this__) {


  /// ok
  __this__.M = function() {
    return 8;
  }
});


///
Gf2p6Math = __extends(Gf2pMMathTableCalcBase,
// constructor
  function(px) {
    if (px == undefined) px = 0x0043;
    __constructSuper(this, [px, 0x003f]);
  },
// methods
function(__this__) {


  /// ok
  __this__.M = function() {
    return 6;
  }
});

