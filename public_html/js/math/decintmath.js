


BigDecimalIntFieldMath = __extends(FieldMathBase,
// constructor
  function(precision) {
    __constructSuper(this);
    this.precision = precision;
    this.__zero    = __newArray(Math.ceil(this.precision / 2) + 1, 0);
    this.__zero[0] = 1;
    this.__one    = __newArray(Math.ceil(this.precision / 2) + 1, 0);
    this.__one[0] = 1;
    this.__one[1] = 1;
  },
// methods
function(__this__) {


  ///
  __this__.Ty = function(x) {
    return x;
  }


  ///
  __this__.ZERO = function() {
    return this.__zero;
  }


  ///
  __this__.ONE = function() {
    return this.__one;
  }


  ///
  __this__.fromString = function(s) {
    var z = __newArray(Math.ceil(this.precision / 2) + 1, 0);
    var w = 0;
    switch (s[0]) {
    case "-":
      w++;
      z[0] = -1;
      break;
    case "+":
      w++;
      // FALL_THRU
    default:
      z[0] = 1;
      break;
    }
    for (var i = s.length - 1, k = 0; w <= i; i--, k++) {
      if (this.precision <= k) {
        throw new Error("Overflow");
      }
      switch (s[i]) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        z[(k >>> 1) + 1] |= parseInt(s[i]) << ((k & 1) << 2);
        break;
      default:
        throw new Error("Invalid char");
        break;
      }
    }
    return z;
  }


  ///
  __this__.strFromVal = function(v) {
    var s = "";
    var a = 0;
    if (v[0] < 0) { s += "-"; }
    var i = this.precision - 1;
    for (; 0 < i; i--) {
      a = this.__getPlaceVal(v, i);
      if (a != 0) { break; }
    }
    for (; 0 <= i; i--) {
      a = this.__getPlaceVal(v, i);
      s += a.toString();
    }
    if (s == "-0") { s = "0"; }
    return s;
  }


  /// p: 0~(precision-1)
  __this__.__getPlaceVal = function(z, p) {
    return (z[(p >> 1) + 1] >>> ((p & 1) << 2)) & 0x000f;
  }


  /// p: 0~(precision-1)
  __this__.__setPlaceVal = function(z, p, v) {
    var q = z[(p >> 1) + 1];
    q &= 0x000f << (((p + 1) & 1) << 2);
    q |= v << ((p & 1) << 2);
    z[(p >> 1) + 1] = q;
  }


  /// "w" should be max(actual_length_of_data - 1, 0).
  /// if sign of x and (y*s) are not equal, x and y should be abs(x) >= abs(y).
  __this__.__addsubValCore = function(z, x, y, s, w) {
    var sign = x[0] * y[0] * s;
    var a = 0, b = 0, p = 0, q = 0, r = 0;

    for (var i = 0; i < w; i++) {
      p = (i >> 1) + 1;
      q = (i & 1) << 2;
      r = ((i + 1) & 1) << 2;
      a = ((x[p] >>> q) & 0x000f) + ((y[p] >>> q) & 0x000f) * sign + b;
      if      (a < 0) { a += 10; b = -1; }
      else if (9 < a) { a -= 10; b =  1; }
      else            {          b =  0; }
      z[p] = (z[p] & (0x000f << r)) | (a << q);
    }

    p = (w >> 1) + 1;
    q = (w & 1) << 2;
    r = ((w + 1) & 1) << 2;
    a = ((x[p] >>> q) & 0x000f) + ((y[p] >>> q) & 0x000f) * sign + b;

    z[p] = (z[p] & (0x000f << r)) | (a << q);

    if (9 < a) {
      if (w == (this.precision - 1)) {
        throw new Error("Overflow");
      }
      w++;
      p = (w >> 1) + 1;
      q = (w & 1) << 2;
      r = ((w + 1) & 1) << 2;
      z[p] = (z[p] & (0x000f << r)) | (1 << q);
    }
    return z;
  }


  ///
  __this__.__addsubVal = function(z, x, y, s) {
    var sign = x[0];
    var a = 0, b = 0, p = 0, q = 0;
    var w = this.precision - 1;

    if (x[0] != (y[0] * s)) {
      for (var i = z.length - 1; 0 <= i; i--) {
        w = i * 2 - 1;
        if ((x[i] | y[i]) != 0) {
          break;
        }
      }
      for (var i = z.length - 1; 0 <= i; i--) {
        if (x[i] != y[i]) {
          if (x[i] < y[i]) {
            sign = y[0] * s;
            var t = x;
            x = y;
            y = t;
          }
          break;
        }
      }
    }
    this.__addsubValCore(z, x, y, s, w);
    z[0] = sign;
    return z;
  }


  ///
  __this__.addVal = function(x, y) {
    var z = __newArray(Math.ceil(this.precision / 2) + 1, 0);
    return this.__addsubVal(z, x, y, 1);
  }


  ///
  __this__.subVal = function(x, y) {
    var z = __newArray(Math.ceil(this.precision / 2) + 1, 0);
    return this.__addsubVal(z, x, y, -1);
  }


  ///
  __this__.mulVal = function(x, y) {
    var a = 0, b = 0, p = 0, q = 0, w = 0, wx = 0, wy = 0;
    var t = __newArray(Math.ceil(this.precision / 2) + 1, 0);
    var z = __newArray(Math.ceil(this.precision / 2) + 1, 0);
    t[0] = 1; z[0] = 1;

    for (var i = 1; i < z.length; i++) {
      p = (i - 1) * 2 + 1;
      if (0 != (x[i] & 0x000f)) { wx = p; }
      if (0 != (y[i] & 0x000f)) { wy = p; }
      if (0 != (x[i] & 0x00f0)) { wx = p + 1; }
      if (0 != (y[i] & 0x00f0)) { wy = p + 1; }
    }
    if (this.precision < (wx + wy)) {
      throw new Error("Overflow");
    }

    for (var i = 0; i < wy; i++) {
      for (var j = 0; j < wx; j++) {
        a = this.__getPlaceVal(x, j) * this.__getPlaceVal(y, i) + b;
        b = Math.floor(a / 10);
        this.__setPlaceVal(t, i + j, a % 10);
      }
      this.__setPlaceVal(t, i + wx, b);
      this.__addsubValCore(z, z, t, 1, Math.max(i + wx, 0));

      for (var j = 1; j < t.length; j++) { t[j] = 0; }
      b = 0;
    }
    z[0] = x[0] * y[0];
    return z;
  }


  ///
  __this__.divmodVal = function(x, y) {
    var a = 0, b = 0, c = 0, g = 0, h = 0, p = 0, q = 0, wy = 0;
    var f = false;
    var z = __newArray(Math.ceil(this.precision / 2) + 1, 0);
    var m = __newArray(Math.ceil(this.precision / 2) + 1, 0);

    for (var i = 1; i < y.length; i++) {
      p = (i - 1) * 2 + 1;
      if (0 != (y[i] & 0x000f)) { wy = p; }
      if (0 != (y[i] & 0x00f0)) { wy = p + 1; }
    }
    if (wy == 0) { throw new Error("Div0"); }
    for (var i = 1; i < x.length; i++) {
      m[i] = x[i];
    }
    m[0] = 1;
    z[0] = x[0] * y[0];

    h = this.__getPlaceVal(y, wy - 1);
    for (var i = 0; i < (this.precision - wy + 1); i++) {
      f = false;
      g = g * 10 + this.__getPlaceVal(m, this.precision - 1 - i);
      this.__setPlaceVal(m, this.precision - 1 - i, 0);

      for (c = 0; ; c++) {
        if (! f) {
          if      (g > h) { f =  true; }
          else if (g < h) { f = false; }
          else {
            f = true;
            for (var k = 1; k < wy; k++) {
              a = this.__getPlaceVal(m, this.precision - 1 - i - k);
              b = this.__getPlaceVal(y, wy - 1 - k);
              if (a != b) {
                if (a < b) { f = false; }
                break;
              }
            }
          }
        }
        if (f) {
          f = false;
          b = 0;
          for (var k = wy - 1; 0 < k; k--) {
            a = this.__getPlaceVal(m, this.precision - 1 - i - k)
                - this.__getPlaceVal(y, wy - 1 - k) - b;
            if (a < 0) { a += 10; b = 1; }
            else       {          b = 0; }
            this.__setPlaceVal(m, this.precision - 1 - i - k, a);
          }
          g -= this.__getPlaceVal(y, wy - 1) + b;
        }
        else { break; }
      }
      this.__setPlaceVal(z, this.precision - wy - i, c);
    }
    this.__setPlaceVal(m, wy    , Math.floor(g / 10)); // precision should be greater than 1.
    this.__setPlaceVal(m, wy - 1,            g % 10 );

    return [z, m];
  }


  ///
  __this__.divVal = function(x, y) {
    return this.divmodVal(x, y)[0];
  }


  ///
  __this__.modVal = function(x, y) {
    return this.divmodVal(x, y)[1];
  }


  ///
  __this__.negVal = function(x) {
    var z = x.slice(0);
    z[0] *= -1;
    return z;
  }


  ///
  __this__.absVal = function(x) {
    var z = x.slice(0);
    z[0] = 1;
    return z;
  }


  ///
  __this__.eqVal = function(x, y) {
    var z = 0;
    for (var i = 1; i < x.length; i++){
      if (x[i] != y[i]) { return false; }
      z |= x | y;
    }
    if (x[0] == y[0]) { return  true; }
    else if (z == 0)  { return  true; }
    else              { return false; }
  }


  ///
  __this__.neVal = function(x, y) {
    var z = 0;
    for (var i = 1; i < x.length; i++){
      if (x[i] != y[i]) { return true; }
      z |= x | y;
    }
    if (x[0] == y[0]) { return false; }
    else if (z == 0)  { return false; }
    else              { return  true; }
  }


  ///
  __this__.ltVal = function(x, y) {
    for (var i = z.length - 1; 0 <= i; i--) {
      if (x[i] >= y[i]) {
        break;
      }
    }
  }


  ///
  __this__.leVal = function(x, y) {
  }


  ///
  __this__.gtVal = function(x, y) {
  }


  ///
  __this__.geVal = function(x, y) {
  }


  ///
  __this__.iszeroVal = function(x) {
    for (var i = 1; i < x.length; i++){
      if (x[i] != 0) { return false; }
    }
    return true;
  }


  ///
  __this__.isnzVal = function(x) {
    for (var i = 1; i < x.length; i++){
      if (x[i] != 0) { return true; }
    }
    return false;
  }
});


