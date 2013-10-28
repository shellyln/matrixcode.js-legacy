


///
RM4SCCBarcodeRendererBase = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w = "";
    var s = "";

    for (var i = 0; i < d.length; i++) {
      q = parseInt(d[i]);
      switch (q) {
      case 0: // full
        ctx.fillRect(px + barw * p, py, barw, barh * 3);
        break;
      case 1: // ascender
        ctx.fillRect(px + barw * p, py, barw, barh * 2 );
        break;
      case 2: // descender
        ctx.fillRect(px + barw * p, py + barh, barw, barh * 2);
        break;
      case 3: // tracker
        ctx.fillRect(px + barw * p, py + barh, barw, barh);
        break;
      }
      p += 2;
    }
  }


  ///
  __this__.__encodeC = function(srcstr) {
    var r = "";
    for (var i = 0; i < srcstr.length; i++) {
      r += this.__CTable[srcstr[i]];
    }
    return r;
  }


  /// abstract
  __this__.__formatData = function(srcstr) {
    return srcstr;
  }


  ///
  __this__.__calcCD = function(d) {
    var row = 0;
    var col = 0;
    for (var i = 0; i < d.length; i++) {
      row += this.__fwdmap[d[i]][0];
      col += this.__fwdmap[d[i]][1];
    }
    return this.__revmat[row % 6][col % 6];
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    var s = "";
    var d = ""; // data codewords
    var e = ""; // error correction codewords

    s = this.__formatData(srcstr);
    d = this.__encodeC(s);

    // calc check digit
    e = this.__CTable[this.__calcCD(s)];

    return this.__CTable["("] + d + e + this.__CTable[")"];
  }


  /// full:0 a:1 d:2 t:3
  __this__.__CTable = {
    "0": "3300",
    "1": "3210",
    "2": "3201",
    "3": "2310",
    "4": "2301",
    "5": "2211",
    "6": "3120",
    "7": "3030",
    "8": "3021",
    "9": "2130",
    "A": "2121",
    "B": "2031",
    "C": "3102",
    "D": "3012",
    "E": "3003",
    "F": "2112",
    "G": "2103",
    "H": "2013",
    "I": "1320",
    "J": "1230",
    "K": "1221",
    "L": "0330",
    "M": "0321",
    "N": "0231",
    "O": "1302",
    "P": "1212",
    "Q": "1203",
    "R": "0312",
    "S": "0303",
    "T": "0213",
    "U": "1122",
    "V": "1032",
    "W": "1023",
    "X": "0132",
    "Y": "0123",
    "Z": "0033",
    "(": "1",
    ")": "0"
  };


  __this__.__fwdmap = {
    // row / col
    "0": [ 1, 1],
    "1": [ 1, 2],
    "2": [ 1, 3],
    "3": [ 1, 4],
    "4": [ 1, 5],
    "5": [ 1, 0],
    "6": [ 2, 1],
    "7": [ 2, 2],
    "8": [ 2, 3],
    "9": [ 2, 4],
    "A": [ 2, 5],
    "B": [ 2, 0],
    "C": [ 3, 1],
    "D": [ 3, 2],
    "E": [ 3, 3],
    "F": [ 3, 4],
    "G": [ 3, 5],
    "H": [ 3, 0],
    "I": [ 4, 1],
    "J": [ 4, 2],
    "K": [ 4, 3],
    "L": [ 4, 4],
    "M": [ 4, 5],
    "N": [ 4, 0],
    "O": [ 5, 1],
    "P": [ 5, 2],
    "Q": [ 5, 3],
    "R": [ 5, 4],
    "S": [ 5, 5],
    "T": [ 5, 0],
    "U": [ 0, 1],
    "V": [ 0, 2],
    "W": [ 0, 3],
    "X": [ 0, 4],
    "Y": [ 0, 5],
    "Z": [ 0, 0]
  };


  __this__.__revmat = [
  //  0    1    2    3    4    5
    ["Z", "U", "V", "W", "X", "Y"], // row 0
    ["5", "0", "1", "2", "3", "4"], // row 1
    ["B", "6", "7", "8", "9", "A"], // row 2
    ["H", "C", "D", "E", "F", "G"], // row 3
    ["N", "I", "J", "K", "L", "M"], // row 4
    ["T", "O", "P", "Q", "R", "S"], // row 5
  ];
});


