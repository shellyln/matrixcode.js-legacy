


///
JapanPostalCustomerBarcodeRenderer = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__reverse = [
    [   "144",  0,  "0",  "0" ],
    [   "114",  1,  "1",  "1" ],
    [   "132",  2,  "2",  "2" ],
    [   "312",  3,  "3",  "3" ],
    [   "123",  4,  "4",  "4" ],
    [   "141",  5,  "5",  "5" ],
    [   "321",  6,  "6",  "6" ],
    [   "213",  7,  "7",  "7" ],
    [   "231",  8,  "8",  "8" ],
    [   "411",  9,  "9",  "9" ],
    [   "414", 10,  "-",  "-" ],
    [   "324", 11, "[1", "[1" ], // CC1
    [   "342", 12, "[2", "[2" ],
    [   "234", 13, "[3", "[3" ],
    [   "432", 14, "[4", "[4" ],
    [   "243", 15, "[5", "[5" ],
    [   "423", 16, "[6", "[6" ],
    [   "441", 17, "[7", "[7" ],
    [   "111", 18, "[8", "[8" ],
    ["324144", 11,  "A", "[10"], // CC1+0
    ["324114", 12,  "B", "[11"],
    ["324132", 13,  "C", "[12"],
    ["324312", 14,  "D", "[13"],
    ["324123", 15,  "E", "[14"],
    ["324141", 16,  "F", "[15"],
    ["324321", 17,  "G", "[16"],
    ["324213", 18,  "H", "[17"],
    ["324231", 19,  "I", "[18"],
    ["324411", 20,  "J", "[19"],
    ["342144", 12,  "K", "[20"],
    ["342114", 13,  "L", "[21"],
    ["342132", 14,  "M", "[22"],
    ["342312", 15,  "N", "[23"],
    ["342123", 16,  "O", "[24"],
    ["342141", 17,  "P", "[25"],
    ["342321", 18,  "Q", "[26"],
    ["342213", 19,  "R", "[27"],
    ["342231", 20,  "S", "[28"],
    ["342411", 21,  "T", "[29"],
    ["234144", 13,  "U", "[30"],
    ["234114", 14,  "V", "[31"],
    ["234132", 15,  "W", "[32"],
    ["234312", 16,  "X", "[33"],
    ["234123", 17,  "Y", "[34"],
    ["234141", 18,  "Z", "[35"],
    ["13", undefined, "<"],// start
    ["31", undefined, ">"] // stop
  ];


  ///
  __this__.__barPattern = {};
  for (var __i__ = 0; __i__ < __this__.__reverse.length; __i__++) {
    __this__.__barPattern[__this__.__reverse[__i__][2]] = __this__.__reverse[__i__];
  }


  ///
  __this__.modulas19 = function(srcstr) {
    var m = 0;
    var s = "";
    for (var i = 0; i < srcstr.length; i++) {
      s = srcstr[i];
      if (s == "[") { s += srcstr[++i]; }
      m += this.__barPattern[s][1];
    }
    return this.__reverse[(19 - (m % 19)) % 19][2];
  }


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w = "";
    var s = "";

    for (var i = 0; i < d.length; i++) {
      s = d[i];
      if (s == "[") { s += d[++i]; }
      w = this.__barPattern[s][0];
      for (var j = 0; j < w.length; j++) {
        q = parseInt(w[j]);
        switch (q) {
        case 1: // full
          ctx.fillRect(px + barw * p, py, barw, barh * 3);
          break;
        case 2: // ascender
          ctx.fillRect(px + barw * p, py, barw, barh * 2 );
          break;
        case 3: // descender
          ctx.fillRect(px + barw * p, py + barh, barw, barh * 2);
          break;
        case 4: // tracker
          ctx.fillRect(px + barw * p, py + barh, barw, barh);
          break;
        }
        p += 2;
      }
    }
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();

    var t = "";
    var s = "";
    for (var i = 0; i < srcstr.length; i++) {
      s = srcstr[i];
      if (s == "[") { s += srcstr[++i]; }
      t += this.__barPattern[s][3];
    }
    srcstr = t;
    var n = 0;
    var m = 0;
    for (var i = 0; i < srcstr.length; i++) {
      s = srcstr[i];
      if (s == "[") { s += srcstr[++i]; m++; }
      n++;
      if (20 <= n) { break; }
    }
    for (var i = n; i < 20; i++) {
      srcstr += "[4";
      m++;
    }
    srcstr = srcstr.substring(0, 20 + m);
    srcstr = "<" + srcstr + this.modulas19(srcstr).toString() + ">";

    return srcstr;
  }
});


