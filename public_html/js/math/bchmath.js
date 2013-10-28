

BchMMath = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {

  ///
  __this__.bits = function() {
    return 0;
  }

  ///
  __this__.addPoly = function(x, y) {
    return x ^ y;
  }

  ///
  __this__.subPoly = function(x, y) {
    return x ^ y;
  }

  ///
  __this__.mulPoly = function(x, y) {
    var z = 0;

    for (var i = 0; i < this.bits(); i++) {
      var a = y >>> i;
      if (a != 0) { a = (~0); }
      z ^= (x & a);
    }
    return z;
  }

  ///
  __this__.divmodPoly = function(x, y) {
    var yl  = 0;
    var rma = 0; // remainder
    var rda = 0; // quotient

    for (var i = this.bits() - 1; i >= 0; i--) {
      if (((y >>> i) & 1) != 0) {
        yl = i + 1;
        break;
      }
    }

    for (var i = this.bits() - 1; i >= 0; i--) {
      var a = (rma >>> (yl - 2)) & 1;
      var b = ((x >>> i) & 1) ^ a;
      if (a != 0) { a = (~0) << 1; }
      a  |= b;
      rma = (rma << 1) ^ (y & a);
      rda = (rda << 1) | (a >>> (this.bits() - 1));
    }
    return [rda, rma];
  }

  ///
  __this__.bchModPoly = function(x, y) {
    var yl  = 0;
    var rma = 0; // remainder

    for (var i = this.bits() - 1; i >= 0; i--) {
      if (((y >>> i) & 1) != 0) {
        yl = i + 1;
        break;
      }
    }

    for (var i = this.bits() - 1; i >= 0; i--) {
      // follow is same as this.divmod-poly without storeing a quotient.
      // it is different from Gf2pMMath.rsModPoly proc.
      var a = (rma >>> (yl - 2)) & 1;
      var b = ((x >>> i) & 1) ^ a;
      if (a != 0) { a = (~0) << 1; }
      a  |= b;
      rma = (rma << 1) ^ (y & a);
    }
    return rma;
  }

  ///
  __this__.bchCheckAndCorrect3 = function(cwa) {
    // not impl
    // calc syndromes
    // get the error position variables
    // search the error positions
    // correct the errors
    return cwa;
  }
});


Bch32Math = __extends(BchMMath,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {
  __this__.bits = function() {
    return 32;
  }
});


Bch64Math = __extends(BchMMath,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {
  __this__.bits = function() {
    return 64;
  }
});

