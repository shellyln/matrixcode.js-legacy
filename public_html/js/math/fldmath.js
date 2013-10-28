

///
FieldMathBase = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  /// ok
  __this__.Ty = function(x) {
    return x;
  }


  /// ok
  __this__.ZERO = function() {
    return this.Ty(0);
  }


  /// ok
  __this__.ONE = function() {
    return this.Ty(1);
  }


  ///
  __this__.fromString = function(s) {
    return this.Ty(parseFloat(s));
  }


  ///
  __this__.strFromVal = function(v) {
    return this.Ty(v).toString();
  }


  /// ok
  __this__.addVal = function(x, y) {
    return this.Ty(this.Ty(x) + this.Ty(y));
  }


  /// ok
  __this__.subVal = function(x, y) {
    return this.Ty(this.Ty(x) - this.Ty(y));
  }


  /// ok
  __this__.mulVal = function(x, y) {
    return this.Ty(this.Ty(x) * this.Ty(y));
  }


  /// ok
  __this__.divVal = function(x, y) {
    return this.Ty(this.Ty(x) / this.Ty(y));
  }


  ///
  __this__.modVal = function(x, y) {
    return this.Ty(this.Ty(x) % this.Ty(y));
  }


  ///
  __this__.divmodVal = function(x, y) {
    return [
      this.Ty(this.Ty(x) / this.Ty(y)),
      this.Ty(this.Ty(x) % this.Ty(y))
      ];
  }


  /// ok
  __this__.negVal = function(x) {
    return this.Ty(this.subVal(this.ZERO(), this.Ty(x)));
  }


  /// ok
  __this__.invVal = function(x) {
    return this.Ty(this.divDav(this.ONE(), this.Ty(x)));
  }


  ///
  __this__.eqVal = function(x, y) {
    return this.Ty(x) == this.Ty(y);
  }


  ///
  __this__.neVal = function(x, y) {
    return this.Ty(x) != this.Ty(y);
  }


  ///
  __this__.ltVal = function(x, y) {
    return this.Ty(x) < this.Ty(y);
  }


  ///
  __this__.leVal = function(x, y) {
    return this.Ty(x) <= this.Ty(y);
  }


  ///
  __this__.gtVal = function(x, y) {
    return this.Ty(x) > this.Ty(y);
  }


  ///
  __this__.geVal = function(x, y) {
    return this.Ty(x) >= this.Ty(y);
  }


  ///
  __this__.iszeroVal = function(x) {
    return this.Ty(x) == this.ZERO();
  }


  ///
  __this__.isnzVal = function(x) {
    return this.Ty(x) != this.ZERO();
  }


  /// ok
  __this__.addPoly = function(x, y) {
    var la, sa;
    var ll = 0, sl = 0;

    if (x.length >= y.length) {
      la = x; sa = y;
      ll = x.length; sl = y.length;
    } else {
      la = y; sa = x;
      ll = y.length; sl = x.length;
    }

    var ra = la.slice(0);
    for (var i = 0; i < sl; i++) {
      ra[i] = this.addVal(la[i], sa[i]);
    }

    return ra;
  }


  /// ok
  __this__.subPoly = function(x, y) {
    var la, sa;
    var ll = 0, sl = 0;

    if (x.length >= y.length) {
      la = x; sa = y;
      ll = x.length; sl = y.length;
    } else {
      la = y; sa = x;
      ll = y.length; sl = x.length;
    }

    var ra = la.slice(0);
    for (var i = 0; i < sl; i++) {
      ra[i] = this.subVal(la[i], sa[i]);
    }

    return ra;
  }


  /// ok
  __this__.mulPoly = function(x, y) {
    var la, sa;
    var ll = 0, sl = 0;

    if (x.length >= y.length) {
      la = x, sa = y;
      ll = x.length; sl = y.length;
    } else {
      la = y, sa = x;
      ll = y.length; sl = x.length;
    }

    var ra = [];
    ra.length = ll + (sl - 1);
    for(var i = 0; i < ra.length; i++) {ra[i] = this.ZERO();}

    for (var i = 0; i < sl; i++) {
      for (var j = 0; j < ll; j++) {
        ra[i + j] = this.addVal(ra[i + j], this.mulVal(la[j], sa[i]));
      }
    }

    return ra;
  }


  /// ok
  __this__.divmodPoly = function(x, y) {
    var yl = 0;
    for (var i = y.length - 1; i >= 0; i--) {
      if (y[i] != this.ZERO()) {
        yl = i + 1; break;
      }
    }
    var z = this.Ty(y[yl - 1]);

    var rda = [];
    var rma = __newArray(yl - 1, this.ZERO());

    for (var i = x.length - 1; i >= 0; i--) {
      var a = this.divVal(rma[rma.length - 1], z);

      for (var j = rma.length - 2; j >= 0; j--) {
        rma[j + 1] = this.subVal(rma[j], this.mulVal(y[j + 1], a));
      }
      rma[0] = this.subVal(x[i], this.mulVal(y[0], a));

      rda.push(a);
    }

    rda.reverse();
    return [rda, rma];
  }


  /// ok
  __this__.__swapArray2dRows = function(ar, sx, sy, r1, r2, len) {
    var v = this.ZERO();
    for (var i = 0; i < len; i++) {
      v = ar[r1 + sy][i + sx];
      ar[r1 + sy][i + sx] = ar[r2 + sy][i + sx];
      ar[r2 + sy][i + sx] = v;
    }
  }


  /// ok
  __this__.__gausianEliminateAfterpivotHandler = function(ia, sx, sy, n) {
    // do nothing
  }


  /// ok
  __this__.gausianEliminate = function(ia, sx, sy, n) {
    // ia[y][x]
    // do deep copy
    var ra = ia.slice(0);
    for (var i = 0; i < ra.length; i++) {
      ra[i] = ra[i].slice(0);
    }

    // pivot
    for (var i = 0; i < n - 1; i++) {
      if (ra[i + sy][i + sx] == this.ZERO()) {
        for (var j = i + 1; j < n; j++) {
          if (ra[j + sy][i + sx] != this.ZERO()) {
            // swap rows i and j
            this.__swapArray2dRows(ra, sx, sy, i, j, n + 1);
            break;
          }
        }
      }

      // if not solved...
      if (ra[i + sy][i + sx] == this.ZERO()) {
        for (var j = i - 1; j >= 0; j--) {
          if (ra[j + sy][i + sx] != this.ZERO()) {
            if (ra[i + sy][j + sx] != this.ZERO()) {
              // swap rows i and j
              this.__swapArray2dRows(ra, sx, sy, i, j, n + 1);
              break;
            }
          }
        }
      }

      // if not solved...
      if (ra[i + sy][i + sx] == this.ZERO()) {
        for (var j = i - 1; j >= 0; j--) {
          if (ra[j + sy][i + sx] != this.ZERO()) {
            for (var k = i + 1; k < n; k++) {
              if (ra[k + sy][j + sx] != this.ZERO()) {
                // swap rows j and k
                this.__swapArray2dRows(ra, sx, sy, j, k, n + 1);

                // swap rows i and k
                this.__swapArray2dRows(ra, sx, sy, i, k, n + 1);
                break;
              }
            }
          }
        }
      }

      // if not solved...
      if (ra[i + sy][i + sx] == this.ZERO()) {
        for (var j = i - 1; j >= 0; j--) {
          if (ra[j + sy][i + sx] != this.ZERO()) {
            for (var k = i - 1; k >= 0; k--) {
              if ((j != k) && (ra[k + sy][j + sx] != this.ZERO())) {
                if (ra[j + sy][k + sx] != this.ZERO()) {
                  // swap rows j and k
                  this.__swapArray2dRows(ra, sx, sy, j, k, n + 1);

                  // swap rows i and k
                  this.__swapArray2dRows(ra, sx, sy, i, k, n + 1);
                  break;
                }
              }
            }
          }
        }
      }

      // if not solved...
      if (ra[i + sy][i + sx] == this.ZERO()) {
        // give up!
        throw new Error("Can't pivot");
      }
    }

    this.__gausianEliminateAfterpivotHandler(ra, sx, sy, n);

    // forward elimination
    for (var i = 0; i < n; i++) {
      var p = ra[i + sy][i + sx];

      for (var j = 0; j <= n; j++) { // 0 <= x <= n
        ra[i + sy][j + sx] = this.divVal(ra[i + sy][j + sx], p);
      }

      for (var j = i + 1; j < n; j++) {
        var q = ra[j + sy][i + sx];

        for (var k = 0; k <= n; k++) { // 0 <= x <= n
          ra[j + sy][k + sx] =
            this.subVal(
              ra[j + sy][k + sx],
              this.mulVal(ra[i + sy][k + sx], q)
              );
        }
      }
    }

    // backword elimination
    for (var i = n - 1; i >= 1; i--) {
      var q = ra[i + sy][n + sx]

      for (var j = i - 1;j >= 0; j--){
        ra[j + sy][n + sx] =
          this.addVal(
            ra[j + sy][n + sx],
            this.mulVal(ra[j + sy][i + sx], q)
            );

          ra[j + sy][i + sx] = this.ZERO();
      }
    }

    // check the result
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (i == j) {
          if (ra[j + sy][i + sx] != this.ONE()) {
            throw new Error("Can't eliminate");
          }
        } else {
          if (ra[j + sy][i + sx] != this.ZERO()) {
            throw new Error("Can't eliminate");
          }
        }
      }
    }

    return ra;
  }


  /// ok
  __this__.makeConfactor = function(dst, src, sx, sy, n, i, j) {
    // det[y][x]
    var z = this.ONE();
    if (((i + 1 + j + 1) % 2) != 0) {
      z = this.negVal(z);
    }

    for (var p = 0; p < i; p++) {
      for (var q = 0; q < j; q++) {
        dst[q][p] = this.mulVal(src[q + sy][p + sx], z);
      }
      for (var q = j + 1; q < n; q++) {
        dst[q - 1][p] = this.mulVal(src[q + sy][p + sx], z);
      }
    }
    for (var p = i + 1; p < n; p++) {
      for (var q = 0; q < j; q++) {
        dst[q][p - 1] = this.mulVal(src[q + sy][p + sx], z);
      }
      for (var q = j + 1; q < n; q++) {
        dst[q - 1][p - 1] = this.mulVal(src[q + sy][p + sx], z);
      }
    }
  }


  /// ok
  __this__.determinantValue = function(det, sx, sy, n) {
    // det[y][x]
    if (n == 1) {
      return det[sy][sx];
    } else if (n == 2) {
      return this.addVal(
        this.mulVal(det[sy][    sx], det[1 + sy][1 + sx]),
        this.mulVal(det[sy][1 + sx], det[1 + sy][    sx])
        );
    } else if (n > 2) {
      var altbuf = __newArray2d(n - 1, n - 1, this.ZERO());
      var v = this.ZERO();

      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          this.makeConfactor(altbuf, det, sx, sy, n, i, j);
          v = this.addVal(v, this.determinantValue(altbuf, 0, 0, n - 1));
        }
      }
      return v;
    } else {
      throw new Error("Bad determinant");
      return this.ZERO();
    }
  }
});


///
GFMathBase = __extends(FieldMathBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  /// ok
  /// Polynomial modulo for Reed-Solomon Coding
  __this__.rsModPoly = function(x, y) {
    var yl = 0;
    for (var i = y.length - 1; i >= 0; i--) {
      if (y[i] != 0) {
        yl = i + 1;
        break;
      }
    }
    var z = this.Ty(y[yl - 1]);

    var rma = __newArray(yl - 1, this.ZERO());

    for (var i = x.length - 1; i >= 0; i--) {
      var a = this.Ty(rma[rma.length - 1]);
      a = this.divVal(a, z);
      a = this.addVal(x[i], a);

      for (var j = rma.length - 2; j >= 0; j--) {
        rma[j + 1] = this.subVal(rma[j], this.mulVal(a, y[j + 1]));
      }
      rma[0] = this.negVal(this.mulVal(a, y[0]));
    }

    for (var i = 0; i < rma.length; i++) {
      rma[i] = this.negVal(rma[i]);
    }
    return rma;
  }


  /// ok
  /// Reed-Solomon Coding error check/detection and correction
  __this__.rsCheckAndCorrect = function(cwa, maxex) {
    var ec = maxex;

    // calculate syndromes
    var sa = __newArray(ec * 2, this.ZERO());
    var sm = __newArray2d(ec, ec + 1, undefined);

    var noerr = true;

    for (var i = 0; i < sa.length; i++) {
      var s = this.ZERO();

      for (var j = 0; j < cwa.length; j++) {
        s = this.addVal(s, this.mulVal(cwa[j], this.logOfVal(i * j)));
      }
      sa[i] = s;

      if (s != this.ZERO()) {noerr = false;}
    }
    if (noerr) {return cwa;}

    // get error locations
    while (true) {
      for (var j = 0; j < ec; j++) {
        for (var i = 0; i <= ec; i++) {
          if ((i % 2) == 1) {
            sm[j][i] = this.negVal(sa[j + i]);
          } else {
            sm[j][i] = sa[j + i];
          }
        }
        sm[j][ec] = this.negVal(sm[j][ec]);
      }
      // if the number of errors is less than ec, it can't eliminate.
      try {
        sm = this.gausianEliminate(sm, 0, 0, ec);
        break;
      } catch (ex) {
        if (ec > 1) {
          ec--;
          continue;
        } else {
          throw new Error("Can't correct");
        }
      }
    }

    var ea = [];
    var pa = [];
    pa.length = ec + 1;
    for (var i = 0; i < ec; i++) {
      pa[i] = sm[i][ec];
    }
    pa[ec] = this.ONE();

    for (var i = 0; i < cwa.length; i++) {
      var p = this.ZERO();
      for (var j = 0; j < pa.length; j++) {
        p = this.addVal(p, this.mulVal(pa[j], this.logOfVal(i * j)));
      }
      if (p == 0) {
        // error location
        ea.push(i);
      }
    }

    if (ea.length != ec) {
      throw new Error("Can't correct");
    }

    // get error values and correct it
    var vm = [];
    vm.length = ec;
    for (var i = 0; i < ec; i++) {
      vm[i] = [];
      vm[i].length = ec + 1;
      for (var j = 0; j < ec; j++) {
        vm[i][j] = this.logOfVal(i * ea[j]);
      }

      vm[i][ec] = sa[i];
    }
    vm = this.gausianEliminate(vm, 0, 0, ec);

    for (i = 0; i < ec; i++) {
      // correct error
      cwa[ea[i]] = this.addVal(cwa[ea[i]], vm[i][ec]);
    }
    return cwa;
  }
});


