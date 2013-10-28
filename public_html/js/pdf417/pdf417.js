


__g_inst_BigDecimalIntMath_forPDF417__ = new BigDecimalIntFieldMath(45);
__g_inst_GfPMath_forPDF417__ = new GfPMath(929);


///
Pdf417Renderer = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
    this.__dfm = __g_inst_BigDecimalIntMath_forPDF417__;
    this.__ddiv = this.__dfm.fromString("900");
    this.__gfm = __g_inst_GfPMath_forPDF417__;
  },
// methods
function(__this__) {


  ///
  __this__.__drawSymbolCore = function(ctx, px, py, p, dotw, doth, s) {
    for (var i = 0; i < s.length; i++) {
      var w = parseFloat(s[i]);
      if (0 == (i % 2)) {
        ctx.fillRect(px + dotw * p, py, dotw * w, doth);
      }
      p += w;
    }
    return p;
  }


  /// draw the bit matrix to renderer
  __this__.drawSymbol = function(canvas, px, py, dotw, doth, mat) {
    px = parseFloat(px);
    py = parseFloat(py);
    dotw = parseFloat(dotw);
    doth = parseFloat(doth);

    var ctx = canvas.getContext("2d");
    var nrow = mat.length;
    var ncol = mat[0].length;
    var p = 0;
    var r = 0;
    var s = "";
    for (var row = 0; row < nrow; row++) {
      p = 0;
      r = py + doth * row;

      // start pattern
      s = "81111113";
      p = this.__drawSymbolCore(ctx, px, r, p, dotw, doth, s);

      // row indicator and data
      for (var col = 0; col < ncol; col++) {
        s = __g_pdf417_lolv_encoding__[mat[row][col]][row % 3];
        p = this.__drawSymbolCore(ctx, px, r, p, dotw, doth, s);
      }

      // stop pattern
      s = "711311121";
      p = this.__drawSymbolCore(ctx, px, r, p, dotw, doth, s);
    }
  }


  /// draw the bit matrix to renderer
  __this__.drawCompactSymbol = function(canvas, px, py, dotw, doth, mat) {
    px = parseFloat(px);
    py = parseFloat(py);
    dotw = parseFloat(dotw);
    doth = parseFloat(doth);

    var ctx = canvas.getContext("2d");
    var nrow = mat.length;
    var ncol = mat[0].length - 1; // without right row indicator
    var p = 0;
    var r = 0;
    var s = "";
    for (var row = 0; row < nrow; row++) {
      p = 0;
      r = py + doth * row;

      // start pattern
      s = "81111113";
      p = this.__drawSymbolCore(ctx, px, r, p, dotw, doth, s);

      // row indicator and data
      for (var col = 0; col < ncol; col++) {
        s = __g_pdf417_lolv_encoding__[mat[row][col]][row % 3];
        p = this.__drawSymbolCore(ctx, px, r, p, dotw, doth, s);
      }

      // stop pattern
      s = "1";
      p = this.__drawSymbolCore(ctx, px, r, p, dotw, doth, s);
    }
  }


  ///
  __this__.__encodeDataTextCore = function(c, mode) {
    var x = this.__textmapArray[mode][c.toString()];
    if (x == undefined) {
      switch (mode[0]) {
      case 0: // Alpha
        x = this.__textmapArray[1][c.toString()];
        if (x != undefined) {
          // latch to Lower
          mode[0] = 1;
          return [27, x];
        }
        x = this.__textmapArray[2][c.toString()];
        if (x != undefined) {
          // latch to Mixed
          mode[0] = 2;
          return [28, x];
        }
        x = this.__textmapArray[3][c.toString()];
        if (x != undefined) {
          if (false) {
            // latch to Mixed
            // latch to Punctuation
            mode[0] = 3;
            return [28, 25, x];
          } else {
            // shift to Punctuation
            return [29, x];
          }
        }
        break;
      case 1: // Lower
        x = this.__textmapArray[0][c.toString()];
        if (x != undefined) {
          // shift to Alpha
          return [27, x];
        }
        x = this.__textmapArray[2][c.toString()];
        if (x != undefined) {
          // latch to Mixed
          mode[0] = 2;
          return [28, x];
        }
        x = this.__textmapArray[3][c.toString()];
        if (x != undefined) {
          // shift to Punctuation
          return [29, x];
        }
        break;
      case 2: // Mixed
        x = this.__textmapArray[0][c.toString()];
        if (x != undefined) {
          // latch to Alpha
          mode[0] = 0;
          return [28, x];
        }
        x = this.__textmapArray[1][c.toString()];
        if (x != undefined) {
          // latch to Lower
          mode[0] = 1;
          return [27, x];
        }
        x = this.__textmapArray[3][c.toString()];
        if (x != undefined) {
          if (false) {
            // latch to Punctuation
            mode[0] = 3;
            return [25, x];
          } else {
            // shift to Punctuation
            return [29, x];
          }
        }
        break;
      case 3: // Punctuation
        x = this.__textmapArray[0][c.toString()];
        if (x != undefined) {
          // latch to Alpha
          mode[0] = 0;
          return [29, x];
        }
        x = this.__textmapArray[1][c.toString()];
        if (x != undefined) {
          // latch to Alpha
          // latch to Lower
          mode[0] = 1;
          return [29, 27, x];
        }
        x = this.__textmapArray[2][c.toString()];
        if (x != undefined) {
          // latch to Alpha
          // latch to Mixed
          mode[0] = 2;
          return [29, 28, x];
        }
        break;
      }
    } else {
      return [x];
    }
  }


  ///
  __this__.__encodeDataText = function(cur, a, lenLimit) {
    var d = cur.d;
    var p = 0;
    var v = 0;
    var z = undefined;
    var submode = [0];
    for (var i = 0; i < a.length; i++) {
      z = this.__encodeDataTextCore(a[i], submode);
      for (var j = 0; j < z.length; j++, p++) {
        v = v * 30 + z[j];
        if ((p % 2) == 1) {
          d.push(v);
          v = 0;
        }
      }
    }
    if ((p % 2) != 0) {
      v = v * 30 + 29;
      d.push(v);
    }
  }


  ///
  __this__.__encodeDataByte = function(cur, a, lenLimit) {
    var d = cur.d;
    if (a.length == 1) {
      // mode shift to Byte compaction
      // if current mode is Numeric, the sequence of mode shift 913 is incorrect.
      d.push(913);
      d.push(a[0]);
    } else {
      var m = a.length % 6;
      if (m == 0) {
        // mode latch to Byte compaction (length is multiple of 6)
        d.push(924);
      } else {
        // mode latch to Byte compaction (length is NOT multiple of 6)
        d.push(901);
      }
      // convert base 256 to base 900 codewords
      // six octet -> five codewords
      var i = 0;
      var v = 0.0; // <- IEEE 754 double (52bit fraction)
      for (var n = a.length - m; i < n; i++) {
        v = v * 256 + a[i];
        if ((i % 6) == 5) {
          var w = [];
          for (var j = 0; j < 5; j++) {
            w.push(v % 900);
            v = Math.floor(v / 900);
          }
          for (var j = 4; 0 <= j; j--) {
            d.push(w[j]);
          }
          v = 0;
        }
      }
      for (; i < a.length; i++) {
        d.push(a[i]);
      }

      // mode latch to Text compaction
      d.push(900);
    }
  }


  ///
  __this__.__encodeDataNumericCore = function(d, s) {
    var w = [];
    var x = this.__dfm.fromString(s);
    do {
      var z = this.__dfm.divmodVal(x, this.__ddiv);
      w.push(parseInt(this.__dfm.strFromVal(z[1])));
      x = z[0];
    } while (this.__dfm.isnzVal(x));
    d.push.apply(d, w.reverse());
  }


  ///
  __this__.__encodeDataNumeric = function(cur, a, lenLimit) {
    var d = cur.d;

    // mode latch to Numeric compaction
    d.push(902);

    var c = 0;
    var s = "1";
    for (var i = 0; i < a.length; i++) {
      if (0x0030 <= a[i] && a[i] <= 0x0039) {
        s += (a[i] - 0x0030).toString();
      } else {
        throw new Error("can't encode");
      }
      c++;
      if (c == 44) {
        this.__encodeDataNumericCore(d, s);
        c = 0;
        s = "1";
      }
    }
    if (c != 0) {
      this.__encodeDataNumericCore(d, s);
    }

    // mode latch to Text compaction
    d.push(900);
  }


  ///
  __this__.__finalizeSymbol = function(cur, lenLimit) {
    var d = cur.d;
    for (var i = d.length; i < lenLimit; i++) {
      d.push(29 * 30 + 29);
    }
    d.length = lenLimit;
  }


  ///
  __this__.createSymbol = function(srcstr, nrow, ncol, eclevel, mode, charset) {
    nrow = parseInt(nrow);
    ncol = parseInt(ncol);
    eclevel = parseInt(eclevel);

    if (eclevel < 0 || 8 < eclevel) {
      throw new Error("bad argument");
    }

    var charconvProc = __getCharconvStrToByteProc(charset);
    var writerProcs = this.__writerProcsDicts[mode];
    var ecCodewords = 2 << eclevel;
    var dataCaps = nrow * ncol - ecCodewords;

    // split source string by ECI sequence.
    var eciSplitStrArr = [srcstr];
    // first codeword is data length
    // including symbol length descriptor itself.
    var cur = {d:[dataCaps]};

    // for each split segments by ECI
    for (var i = 0; i < eciSplitStrArr.length; i++) {
      var srcarr = [];

      // split source string by FNC
      var strsegments = [eciSplitStrArr[i]];

      for (var j = 0; j < strsegments.length; j++) {
        // convert charactor encoding
        srcarr = srcarr.concat(charconvProc(strsegments[j], charset));

        // append FNC
      }

      // build data codewords
      writerProcs.encodeData.call(this, cur, srcarr, dataCaps);

      // append ECI
    }

    // finalize data codewords
    this.__finalizeSymbol(cur, dataCaps);

    // append error correction codewords
    cur.d.reverse();
    var gx = this.__gfm.rsMakeGx(ecCodewords);
    var rx = this.__gfm.rsModPoly(cur.d, gx);
    cur.d.reverse();
    cur.d = cur.d.concat(rx.reverse());

    // create matrix
    var mat = __newArray2d(nrow, ncol + 2, 0);

    // set row indicators
    for (var i = 0; i < nrow; i++) {
      switch (i % 3) {
      case 0:
        // left row indicator
        mat[i][0] = 30 * Math.floor(i / 3) + Math.floor((nrow - 1) / 3);
        // right row indicator
        mat[i][ncol + 1] = 30 * Math.floor(i / 3) + (ncol - 1);
        break;
      case 1:
        // left row indicator
        mat[i][0] = 30 * Math.floor(i / 3) + (eclevel * 3) + ((nrow - 1) % 3);
        // right row indicator
        mat[i][ncol + 1] = 30 * Math.floor(i / 3) + Math.floor((nrow - 1) / 3);
        break;
      case 2:
        // left row indicator
        mat[i][0] = 30 * Math.floor(i / 3) + (ncol - 1);
        // right row indicator
        mat[i][ncol + 1] = 30 * Math.floor(i / 3) + (eclevel * 3) + ((nrow - 1) % 3);
        break;
      }
    }

    // place codewords
    for (var i = 0, p = 0; i < nrow; i++) {
      for (var j = 0; j < ncol; j++) {
        mat[i][j + 1] = cur.d[p++];
      }
    }
    return [mat];
  }


  ///
  __this__.__writerProcsDicts = {
    "Auto" : {},
    "Text" : {
      encodeData :__this__.__encodeDataText,
      next       :undefined                },
    "Byte" : {
      encodeData :__this__.__encodeDataByte,
      next       :undefined                },
    "Numeric" : {
      encodeData :__this__.__encodeDataNumeric,
      next       :undefined                   }
  };


  ///
  __this__.__textmapAlpha = {
    "65":  0,
    "66":  1,
    "67":  2,
    "68":  3,
    "69":  4,
    "70":  5,
    "71":  6,
    "72":  7,
    "73":  8,
    "74":  9,
    "75": 10,
    "76": 11,
    "77": 12,
    "78": 13,
    "79": 14,
    "80": 15,
    "81": 16,
    "82": 17,
    "83": 18,
    "84": 19,
    "85": 20,
    "86": 21,
    "87": 22,
    "88": 23,
    "89": 24,
    "90": 25,
    "32": 26
  };


  ///
  __this__.__textmapLower = {
     "97":  0,
     "98":  1,
     "99":  2,
    "100":  3,
    "101":  4,
    "102":  5,
    "103":  6,
    "104":  7,
    "105":  8,
    "106":  9,
    "107": 10,
    "108": 11,
    "109": 12,
    "110": 13,
    "111": 14,
    "112": 15,
    "113": 16,
    "114": 17,
    "115": 18,
    "116": 19,
    "117": 20,
    "118": 21,
    "119": 22,
    "120": 23,
    "121": 24,
    "122": 25,
     "32": 26
  };


  ///
  __this__.__textmapMixed = {
    "48":  0,
    "49":  1,
    "50":  2,
    "51":  3,
    "52":  4,
    "53":  5,
    "54":  6,
    "55":  7,
    "56":  8,
    "57":  9,
    "38": 10,
    "13": 11,
     "9": 12,
    "44": 13,
    "58": 14,
    "35": 15,
    "45": 16,
    "46": 17,
    "36": 18,
    "47": 19,
    "43": 20,
    "37": 21,
    "42": 22,
    "61": 23,
    "94": 24,
    "32": 26
  };


  ///
  __this__.__textmapPunctuation = {
     "59":  0,
     "60":  1,
     "62":  2,
     "64":  3,
     "91":  4,
     "92":  5,
     "93":  6,
     "95":  7,
     "96":  8,
    "126":  9,
     "33": 10,
     "13": 11,
      "9": 12,
     "44": 13,
     "58": 14,
     "10": 15,
     "45": 16,
     "46": 17,
     "36": 18,
     "47": 19,
     "34": 20,
    "124": 21,
     "42": 22,
     "40": 23,
     "41": 24,
     "63": 25,
    "123": 26,
    "125": 27,
     "39": 28
  };


  ///
  __this__.__textmapArray = [
    __this__.__textmapAlpha,
    __this__.__textmapLower,
    __this__.__textmapMixed,
    __this__.__textmapPunctuation
  ];
});


