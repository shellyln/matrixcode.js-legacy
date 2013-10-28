


///
Code39BarcodeRenderer = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__reverse = [
    // bwbwbwbwb
    ["111221211",  0, "0"],
    ["211211112",  1, "1"],
    ["112211112",  2, "2"],
    ["212211111",  3, "3"],
    ["111221112",  4, "4"],
    ["211221111",  5, "5"],
    ["112221111",  6, "6"],
    ["111211212",  7, "7"],
    ["211211211",  8, "8"],
    ["112211211",  9, "9"],
    ["211112112", 10, "A"],
    ["112112112", 11, "B"],
    ["212112111", 12, "C"],
    ["111122112", 13, "D"],
    ["211122111", 14, "E"],
    ["112122111", 15, "F"],
    ["111112212", 16, "G"],
    ["211112211", 17, "H"],
    ["112112211", 18, "I"],
    ["111122211", 19, "J"],
    ["211111122", 20, "K"],
    ["112111122", 21, "L"],
    ["212111121", 22, "M"],
    ["111121122", 23, "N"],
    ["211121121", 24, "O"],
    ["112121121", 25, "P"],
    ["111111222", 26, "Q"],
    ["211111221", 27, "R"],
    ["112111221", 28, "S"],
    ["111121221", 29, "T"],
    ["221111112", 30, "U"],
    ["122111112", 31, "V"],
    ["222111111", 32, "W"],
    ["121121112", 33, "X"],
    ["221121111", 34, "Y"],
    ["122121111", 35, "Z"],
    ["121111212", 36, "-"],
    ["221111211", 37, "."],
    ["122111211", 38, " "],
    ["121212111", 39, "$"],
    ["121211121", 40, "/"],
    ["121112121", 41, "+"],
    ["111212121", 42, "%"],
    ["121121211", undefined, "*"] // start/stop
  ];


  ///
  __this__.__barPattern = {};
  for (var __i__ = 0; __i__ < __this__.__reverse.length; __i__++) {
    __this__.__barPattern[__this__.__reverse[__i__][2]] = __this__.__reverse[__i__];
  }


  ///
  __this__.modulas43 = function(srcstr) {
    var m = 0;
    for (var i = 0; i < srcstr.length; i++) {
      m += this.__barPattern[srcstr[i]][1];
    }
    return this.__reverse[m % 43][2];
  }


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w = "";

    for (var i = 0; i < d.length; i++) {
      w = this.__barPattern[d[i]][0];
      for (var j = 0; j < 9; j++) {
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
    srcstr = "*" + srcstr + this.modulas43(srcstr).toString() + "*";
    return srcstr;
  }
});


