


///
Code128BarcodeRenderer = __extends(Object,
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

    for (var i = 0; i < d.length; i++) {
      w = this.__barPattern[d[i]];
      for (var j = 0; j < 6; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 0) {
          ctx.fillRect(px + barw * p, py, barw * q, barh);
        }
        p += q;
      }
    }

    ctx.fillRect(px + barw * p, py, barw * 2, barh);
    p += 5;
    ctx.fillRect(px + barw * p, py, barw * 3, barh);
    p += 4;
    ctx.fillRect(px + barw * p, py, barw * 1, barh);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw * 2, barh);
  }


  /// [newmode][oldmode][fnc]
  __this__.__latchDict = [
    // [  new=A      ]  [  new=B      ]  [  new=C      ]
    // (lat)(fnc)(lat)  (lat)(fnc)(lat)  (lat)(fnc)(lat)
    [
      [[             ], [          100], [           99]], // old=A
      [[          101], [             ], [           99]], // old=B
      [[          101], [          100], [             ]], // old=C
      [[103          ], [104          ], [105          ]]  // old=Initial
    ], // no FNC
    [
      [[     102     ], [     102, 100], [     102,  99]], // old=A
      [[     102, 101], [     102     ], [     102,  99]], // old=B
      [[     102, 101], [     102, 100], [     102     ]], // old=C
      [[103, 102     ], [104, 102     ], [105, 102     ]]  // old=Initial
    ], // FNC1
    [
      [[      97     ], [      97, 100], [      97,  99]], // old=A
      [[      97, 101], [      97     ], [      97,  99]], // old=B
      [[101,  97     ], [100,  97     ], [101,  97,  99]], // old=C
      [[103,  97     ], [104,  97     ], [103,  97,  99]]  // old=Initial
    ], // FNC2
    [
      [[      96     ], [      96, 100], [      96,  99]], // old=A
      [[      96, 101], [      96     ], [      96,  99]], // old=B
      [[101,  96     ], [100,  96     ], [101,  96,  99]], // old=C
      [[103,  96     ], [104,  96     ], [103,  96,  99]]  // old=Initial
    ], // FNC3
    [
      [[     101     ], [     101, 100], [     101,  99]], // old=A
      [[     100, 101], [     100     ], [     100,  99]], // old=B
      [[101, 101     ], [100, 100     ], [101, 101,  99]], // old=C
      [[103, 101     ], [104, 100     ], [103, 101,  99]]  // old=Initial
    ]  // FNC4
  ];


  ///
  __this__.__encodeDataTextCore = function(mode, fnc, c) {
    var x = this.__textmapArray[mode];
    if (x != undefined) { x = x[c.toString()]; }
    if (x == undefined) {
      switch (mode[0]) {
      case 0: // A
        x = this.__textmapArray[1][c.toString()];
        if (x != undefined) {
          if (false) {
            // shift to B
            return [98, x];
          } else {
            // latch to B
            mode[0] = 1;
            return this.__latchDict[fnc][0][1].concat([x]);
          }
        }
        break;
      case 1: // B
        x = this.__textmapArray[0][c.toString()];
        if (x != undefined) {
          if (false) {
            // shift to A
            return [98, x];
          } else {
            // latch to A
            mode[0] = 0;
            return this.__latchDict[fnc][1][0].concat([x]);
          }
        }
        break;
      case 2: // C
        x = this.__textmapArray[1][c.toString()];
        if (x != undefined) {
          if (false) {
            // shift to B
            return [98, x];
          } else {
            // latch to B
            mode[0] = 1;
            return this.__latchDict[fnc][2][1].concat([x]);
          }
        }
        x = this.__textmapArray[0][c.toString()];
        if (x != undefined) {
          if (false) {
            // shift to A
            return [98, x];
          } else {
            // latch to A
            mode[0] = 0;
            return this.__latchDict[fnc][2][0].concat([x]);
          }
        }
        break;
      case 3: // Initial
        x = this.__textmapArray[1][c.toString()];
        if (x != undefined) {
          // latch to B
          mode[0] = 1;
          return this.__latchDict[fnc][3][1].concat([x]);
        }
        x = this.__textmapArray[0][c.toString()];
        if (x != undefined) {
          // latch to A
          mode[0] = 0;
          return this.__latchDict[fnc][3][0].concat([x]);
        }
        break;
      }
    } else {
      return this.__latchDict[fnc][mode[0]][mode[0]].concat([x]);
    }
  }


  ///
  __this__.__getNumericLen = function(a, p) {
    var r = 0;
    for (var i = p; i < a.length; i++) {
      if (0x0030 > a[i] || 0x0039 < a[i]) { break; }
      r++;
    }
    return r;
  }


  ///
  __this__.__encodeDataText = function(cur, fnc, a) {
    var d = cur.d;
    var mode = cur.mode;
    var p = 0;
    var v = 0;
    var z = undefined;
    for (var i = 0; i < a.length; ) {
      var m = this.__getNumericLen(a, i);
      if (((fnc == 0 || fnc == 1) && mode[0] == 3 && 4 <= m) || (6 <= m)) {
        // Numeric compaction
        z = this.__latchDict[fnc][mode[0]][2].slice();
        mode[0] = 2;
        // and numbers...
        for (var j = 1; j < m; j += 2) {
          z.push((a[i] - 0x0030) * 10 + (a[i + 1] - 0x0030));
          i += 2;
        }
      } else {
        z = this.__encodeDataTextCore(mode, fnc, a[i]);
        i++;
      }
      for (var j = 0; j < z.length; j++) {
        d.push(z[j]);
      }
      fnc = 0;
    }
  }


  ///
  __this__.__encodeFnc = function(cur, fnc) {
    var z = undefined;
    var next = cur.mode[0];
    if (next == 3) { next = 1; }
    z = this.__latchDict[fnc][cur.mode[0]][next].slice();
    cur.mode[0] = next;
    for (var j = 0; j < z.length; j++) {
      cur.d.push(z[j]);
    }
  }


  ///
  __this__.__splitEci = function(s) {
    var r = [];
    return r;
  }


  ///
  __this__.__splitFnc = function(s) {
    var r = [];
    var p = 0;
    var q = 0;
    var w = "";
    for (;;) {
      q = s.indexOf("\\", p);
      if (q == -1) {
        w += s.substring(p);
        r.push(w);
        break;
      } else {
        w += s.substring(p, q);

        switch (s.charAt(q + 1)) {
        case "{":
          r.push(w);
          w = "";
          var x = 0;
          for (var i = q + 2; ; i++) {
            var t = s.charAt(i);
            if (t == "}") {
              p = i + 1;
              break;
            } else if (t != "") {
              x = x * 10 + parseInt(t);
            } else {
              p = i;
              break;
            }
          }
          r.push(x); // FNC
          break;
        case "\\":
          w += "\\";
          p = q + 2;
          break;
        default:
          p = q + 1;
          break;
        }
      }
    }
    return r;
  }


  ///
  __this__.createSymbol = function(srcstr, charset) {
    var charconvProc = __getCharconvStrToByteProc(charset);
    var writerProcs = this.__writerProcsDicts["Text"];

    var cur = {d:[], mode:[3]};

    // split source string by FNC
    var strsegments = [srcstr];
    strsegments = this.__splitFnc(srcstr);

    for (var j = 0; j < strsegments.length; j += 2) {
      // convert charactor encoding
      if (0 < strsegments[j].length) {
        strsegments[j] = charconvProc(strsegments[j], charset);
      }
    }

    var fnc = 0;
    for (var j = 0; j < strsegments.length; j += 2) {
      // append FNC
      if (0 <= (j - 1)) {
        fnc = strsegments[j - 1];
      }

      if (0 < strsegments[j].length) {
        // build data codewords
        writerProcs.encodeData.call(this, cur, fnc, strsegments[j]);
        fnc = 0;
      } else if (0 <= (j - 1)) {
        this.__encodeFnc(cur, fnc);
      }
    }

    // append check digit
    var cd = cur.d[0];
    for (var i = 1; i < cur.d.length; i++) {
      cd += cur.d[i] * i;
    }
    cur.d.push(cd % 103);

    return cur.d;
  }


  ///
  __this__.__writerProcsDicts = {
    "Text" : {
      encodeData :__this__.__encodeDataText,
      next       :undefined                }
  };


  ///
  __this__.__textmapA = {
    "32":  0,
    "33":  1,
    "34":  2,
    "35":  3,
    "36":  4,
    "37":  5,
    "38":  6,
    "39":  7,
    "40":  8,
    "41":  9,
    "42": 10,
    "43": 11,
    "44": 12,
    "45": 13,
    "46": 14,
    "47": 15,
    "48": 16,
    "49": 17,
    "50": 18,
    "51": 19,
    "52": 20,
    "53": 21,
    "54": 22,
    "55": 23,
    "56": 24,
    "57": 25,
    "58": 26,
    "59": 27,
    "60": 28,
    "61": 29,
    "62": 30,
    "63": 31,
    "64": 32,
    "65": 33,
    "66": 34,
    "67": 35,
    "68": 36,
    "69": 37,
    "70": 38,
    "71": 39,
    "72": 40,
    "73": 41,
    "74": 42,
    "75": 43,
    "76": 44,
    "77": 45,
    "78": 46,
    "79": 47,
    "80": 48,
    "81": 49,
    "82": 50,
    "83": 51,
    "84": 52,
    "85": 53,
    "86": 54,
    "87": 55,
    "88": 56,
    "89": 57,
    "90": 58,
    "91": 59,
    "92": 60,
    "93": 61,
    "94": 62,
    "95": 63,
     "0": 64,
     "1": 65,
     "2": 66,
     "3": 67,
     "4": 68,
     "5": 69,
     "6": 70,
     "7": 71,
     "8": 72,
     "9": 73,
    "10": 74,
    "11": 75,
    "12": 76,
    "13": 77,
    "14": 78,
    "15": 79,
    "16": 80,
    "17": 81,
    "18": 82,
    "19": 83,
    "20": 84,
    "21": 85,
    "22": 86,
    "23": 87,
    "24": 88,
    "25": 89,
    "26": 90,
    "27": 91,
    "28": 92,
    "29": 93,
    "30": 94,
    "31": 95
  };


  ///
  __this__.__textmapB = {
     "32":  0,
     "33":  1,
     "34":  2,
     "35":  3,
     "36":  4,
     "37":  5,
     "38":  6,
     "39":  7,
     "40":  8,
     "41":  9,
     "42": 10,
     "43": 11,
     "44": 12,
     "45": 13,
     "46": 14,
     "47": 15,
     "48": 16,
     "49": 17,
     "50": 18,
     "51": 19,
     "52": 20,
     "53": 21,
     "54": 22,
     "55": 23,
     "56": 24,
     "57": 25,
     "58": 26,
     "59": 27,
     "60": 28,
     "61": 29,
     "62": 30,
     "63": 31,
     "64": 32,
     "65": 33,
     "66": 34,
     "67": 35,
     "68": 36,
     "69": 37,
     "70": 38,
     "71": 39,
     "72": 40,
     "73": 41,
     "74": 42,
     "75": 43,
     "76": 44,
     "77": 45,
     "78": 46,
     "79": 47,
     "80": 48,
     "81": 49,
     "82": 50,
     "83": 51,
     "84": 52,
     "85": 53,
     "86": 54,
     "87": 55,
     "88": 56,
     "89": 57,
     "90": 58,
     "91": 59,
     "92": 60,
     "93": 61,
     "94": 62,
     "95": 63,
     "96": 64,
     "97": 65,
     "98": 66,
     "99": 67,
    "100": 68,
    "101": 69,
    "102": 70,
    "103": 71,
    "104": 72,
    "105": 73,
    "106": 74,
    "107": 75,
    "108": 76,
    "109": 77,
    "110": 78,
    "111": 79,
    "112": 80,
    "113": 81,
    "114": 82,
    "115": 83,
    "116": 84,
    "117": 85,
    "118": 86,
    "119": 87,
    "120": 88,
    "121": 89,
    "122": 90,
    "123": 91,
    "124": 92,
    "125": 93,
    "126": 94,
    "127": 95
  };


  ///
  __this__.__textmapArray = [
    __this__.__textmapA,
    __this__.__textmapB
  ];


  ///
  __this__.__barPattern = [
    "212222",  //   0
    "222122",  //   1
    "222221",  //   2
    "121223",  //   3
    "121322",  //   4
    "131222",  //   5
    "122213",  //   6
    "122312",  //   7
    "132212",  //   8
    "221213",  //   9
    "221312",  //  10
    "231212",  //  11
    "112232",  //  12
    "122132",  //  13
    "122231",  //  14
    "113222",  //  15
    "123122",  //  16
    "123221",  //  17
    "223211",  //  18
    "221132",  //  19
    "221231",  //  20
    "213212",  //  21
    "223112",  //  22
    "312131",  //  23
    "311222",  //  24
    "321122",  //  25
    "321221",  //  26
    "312212",  //  27
    "322112",  //  28
    "322211",  //  29
    "212123",  //  30
    "212321",  //  31
    "232121",  //  32
    "111323",  //  33
    "131123",  //  34
    "131321",  //  35
    "112313",  //  36
    "132113",  //  37
    "132311",  //  38
    "211313",  //  39
    "231113",  //  40
    "231311",  //  41
    "112133",  //  42
    "112331",  //  43
    "132131",  //  44
    "113123",  //  45
    "113321",  //  46
    "133121",  //  47
    "313121",  //  48
    "211331",  //  49
    "231131",  //  50
    "213113",  //  51
    "213311",  //  52
    "213131",  //  53
    "311123",  //  54
    "311321",  //  55
    "331121",  //  56
    "312113",  //  57
    "312311",  //  58
    "332111",  //  59
    "314111",  //  60
    "221411",  //  61
    "431111",  //  62
    "111224",  //  63
    "111422",  //  64
    "121124",  //  65
    "121421",  //  66
    "141122",  //  67
    "141221",  //  68
    "112214",  //  69
    "112412",  //  70
    "122114",  //  71
    "122411",  //  72
    "142112",  //  73
    "142211",  //  74
    "241211",  //  75
    "221114",  //  76
    "413111",  //  77
    "241112",  //  78
    "134111",  //  79
    "111242",  //  80
    "121142",  //  81
    "121241",  //  82
    "114212",  //  83
    "124112",  //  84
    "124211",  //  85
    "411212",  //  86
    "421112",  //  87
    "421211",  //  88
    "212141",  //  89
    "214121",  //  90
    "412121",  //  91
    "111143",  //  92
    "111341",  //  93
    "131141",  //  94
    "114113",  //  95
    "114311",  //  96
    "411113",  //  97
    "411311",  //  98
    "113141",  //  99
    "114131",  // 100
    "311141",  // 101
    "411131",  // 102
    "211412",  // 103
    "211214",  // 104
    "211232"   // 105
  ];
});


