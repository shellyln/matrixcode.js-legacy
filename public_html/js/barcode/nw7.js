


///
NW7BarcodeRenderer = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__reverse = [
    // bwbwbwb
    ["1111122",  0, "0"],
    ["1111221",  1, "1"],
    ["1112112",  2, "2"],
    ["2211111",  3, "3"],
    ["1121121",  4, "4"],
    ["2111121",  5, "5"],
    ["1211112",  6, "6"],
    ["1211211",  7, "7"],
    ["1221111",  8, "8"],
    ["2112111",  9, "9"],
    ["1112211", 10, "-"],
    ["1122111", 11, "$"],
    ["2111212", 12, ":"],
    ["2121112", 13, "/"],
    ["2121211", 14, "."],
    ["1121212", 15, "+"],
    ["1122121", 16, "A"],
    ["1212112", 17, "B"],
    ["1112122", 18, "C"],
    ["1112221", 19, "D"],
  ];


  ///
  __this__.__barPattern = {};
  for (var __i__ = 0; __i__ < __this__.__reverse.length; __i__++) {
    __this__.__barPattern[__this__.__reverse[__i__][2]] = __this__.__reverse[__i__];
  }


  ///
  __this__.modulas10wgt3nw7 = function(srcstr) {
    var m = 0;
    for (var i = 0; i < srcstr.length; i++) {
      m += (((srcstr.length - i) % 2) * 2 + 1) * this.__barPattern[srcstr[i]][1];
    }
    return this.__reverse[(10 - (m % 10)) % 10][2];
  }


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w = "";

    for (var i = 0; i < d.length; i++) {
      w = this.__barPattern[d[i]][0];
      for (var j = 0; j < 7; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 0) {
          ctx.fillRect(px + barw * p, py, barw * q, barh);
        }
        p += q;
      }
      p += 1;
    }
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    srcstr = srcstr.substring(0, srcstr.length - 1)
      + this.modulas10wgt3nw7(srcstr).toString()
      + srcstr.substring(srcstr.length - 1, srcstr.length);
    return srcstr;
  }
});


