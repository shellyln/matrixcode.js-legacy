

__g_inst_Gf2p6Math_forPostbar__ = new Gf2p6Math(0x0043); // px = x^6 + x^1 + 1



///
PostbarBarcodeRendererBase = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
    this.__gfc = __g_inst_Gf2p6Math_forPostbar__;
    this.__gx = this.__gfc.rsMakeGx1(4);
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
  __this__.__encodeN = function(srcstr) {
    var r = "";
    for (var i = 0; i < srcstr.length; i++) {
      r += this.__NTable[parseInt(srcstr[i])];
    }
    return r;
  }


  ///
  __this__.__encodeC = function(srcstr) {
    var r = "";
    for (var i = 0; i < srcstr.length; i++) {
      r += this.__CTable[srcstr[i]];
    }
    return r;
  }


  ///
  __this__.__encodeMixed = function(srcstr) {
    var r = "";
    var m = 0;
    for (var i = 0; i < srcstr.length; i++) {
      if (srcstr == "@") {
        m = 0;
      } else if (srcstr == "$") {
        m = 1;
      } else if (m == 0) {
        r += this.__NTable[parseInt(srcstr[i])];
      } else {
        r += this.__CTable[srcstr[i]];
      }
    }
    return r;
  }


  /// abstract
  __this__.__formatData = function(srcstr) {
    return this.__encodeC(srcstr);
  }


  ///
  __this__.__calcECCodewords = function(d) {
    var e = "";
    var a = [];
    for (var i = 0; i < d.length; i += 3) {
      a.push(parseInt(d.substring(i, i + 3), 4));
    }
    a.reverse();
    var b = this.__gfc.rsModPoly(a, this.__gx);
    a.reverse();
    b.reverse();
    for (var i = 0; i < b.length; i ++) {
      e += this.__DecTable[b[i]];
    }
    return e;
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    var d = ""; // data codewords
    var e = ""; // error correction codewords

    d = this.__formatData(srcstr);

    // create error correction codewords
    e = this.__calcECCodewords(d);

    return "13" + d + e + "13";
  }


  ///
  __this__.__NTable = [
    "00",  // 0
    "01",  // 1
    "02",  // 2
    "10",  // 3
    "11",  // 4
    "12",  // 5
    "20",  // 6
    "21",  // 7
    "22",  // 8
    "30"   // 9
  ];


  ///
  __this__.__DecTable = [
    "000",  //  0
    "001",  //  1
    "002",  //  2
    "003",  //  3
    "010",  //  4
    "011",  //  5
    "012",  //  6
    "013",  //  7
    "020",  //  8
    "021",  //  9
    "022",  // 10
    "023",  // 11
    "030",  // 12
    "031",  // 13
    "032",  // 14
    "033",  // 15
    "100",  // 16
    "101",  // 17
    "102",  // 18
    "103",  // 19
    "110",  // 20
    "111",  // 21
    "112",  // 22
    "113",  // 23
    "120",  // 24
    "121",  // 25
    "122",  // 26
    "123",  // 27
    "130",  // 28
    "131",  // 29
    "132",  // 30
    "133",  // 31
    "200",  // 32
    "201",  // 33
    "202",  // 34
    "203",  // 35
    "210",  // 36
    "211",  // 37
    "212",  // 38
    "213",  // 39
    "220",  // 40
    "221",  // 41
    "222",  // 42
    "223",  // 43
    "230",  // 44
    "231",  // 45
    "232",  // 46
    "233",  // 47
    "300",  // 48
    "301",  // 49
    "302",  // 50
    "303",  // 51
    "310",  // 52
    "311",  // 53
    "312",  // 54
    "313",  // 55
    "320",  // 56
    "321",  // 57
    "322",  // 58
    "323",  // 59
    "330",  // 60
    "331",  // 61
    "332",  // 62
    "333"   // 63
  ];


  ///
  __this__.__CTable = {
    "A": "000",
    "B": "001",
    "C": "002",
    "D": "010",
    "E": "011",
    "F": "012",
    "G": "020",
    "H": "021",
    "I": "022",
    "J": "100",
    "K": "101",
    "L": "102",
    "M": "110",
    "N": "111",
    "O": "112",
    "P": "120",
    "Q": "121",
    "R": "122",
    "S": "200",
    "T": "201",
    "U": "202",
    "V": "210",
    "W": "211",
    "X": "212",
    "Y": "220",
    "Z": "221",
    "0": "222",
    "1": "300",
    "2": "301",
    "3": "302",
    "4": "310",
    "5": "311",
    "6": "312",
    "7": "320",
    "8": "321",
    "9": "322",
    " ": "003",
    "#": "013",
    "a": "023",
    "b": "030",
    "c": "031",
    "d": "032",
    "e": "033",
    "f": "103",
    "g": "113",
    "h": "123",
    "i": "130",
    "j": "131",
    "k": "132",
    "l": "133",
    "m": "203",
    "n": "213",
    "o": "223",
    "p": "230",
    "q": "231",
    "r": "232",
    "s": "233",
    "t": "303",
    "u": "313",
    "v": "323",
    "w": "330",
    "x": "331",
    "y": "332",
    "z": "333"
  };
});


