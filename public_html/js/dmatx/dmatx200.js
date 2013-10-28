

__g_inst_Gf2p8Math_forDMATX__ = new Gf2p8Math(301); // px = x^8 + x^5 + x^3 + x^2 + 1


///
DataMatrixECC200Renderer = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
    this.gfc = __g_inst_Gf2p8Math_forDMATX__;
  },
// methods
function(__this__) {


  /// constant
  __this__.__FNC1 = 1001;


  /// draw the bit matrix to renderer
  __this__.drawSymbol = function(canvas, px, py, dotsize, mat, acol, arow) {
    px = parseFloat(px);
    py = parseFloat(py);
    dotsize = parseFloat(dotsize);
    acol = parseInt(acol);
    arow = parseInt(arow);

    var ctx = canvas.getContext("2d");
    var nrow = mat.length;
    var ncol = mat[0].length;

    var wrow = 0, wcol = 0;
    for (var row = 0; row < nrow; row++) {
      if ((row % arow) == 0) { wrow += 2; }
    }
    var srow = wrow;
    for (var col = 0; col < ncol; col++) {
      if ((col % acol) == 0) { wcol += 2; }
    }
    var scol = wcol;

    // finder/alignment patterns
    for (var i = 0; i < (nrow + srow); i += arow + 2) {
      for (var j = 0; j < (ncol + scol); j += acol + 2) {
        ctx.fillRect(
          px + dotsize * j,
          py + dotsize * i,
          dotsize,
          dotsize * (arow + 2)
          );
        ctx.fillRect(
          px + dotsize * j,
          py + dotsize * (i + arow + 1),
          dotsize * (acol + 2),
          dotsize
          );
        for (var k = 1; k < (arow + 2); k += 2) {
          ctx.fillRect(
            px + dotsize * (j + acol + 1),
            py + dotsize * (i + k),
            dotsize,
            dotsize
            );
        }
        for (var k = 2; k < (acol + 2); k += 2) {
          ctx.fillRect(
            px + dotsize * (j + k),
            py + dotsize * i,
            dotsize,
            dotsize
            );
        }
      }
    }

    // data patterns
    wcol = -1;
    for (var col = 0; col < ncol; col++) {
      if ((col % acol) == 0) { wcol += 2; }

      wrow = -1;
      for (var row = 0; row < nrow; row++) {
        if ((row % arow) == 0) { wrow += 2; }

        if (mat[row][col] != 0) {
          ctx.fillRect(
            px + dotsize * (col + wcol),
            py + dotsize * (row + wrow),
            dotsize,
            dotsize
            );
        }
      }
    }
  }


  ///
  __this__.placeCodewordsCore = function(mat, row, col, val) {
    var nrow = mat.length;
    var ncol = mat[0].length;
    if (row < 0) { row += nrow; col += 4 - ((nrow + 4) % 8); }
    if (col < 0) { col += ncol; row += 4 - ((ncol + 4) % 8); }
    mat[row][col] = val;
  }


  ///
  __this__.placeCodewordsUtah = function(mat, row, col, d) {
    this.placeCodewordsCore(mat, row - 2, col - 2, (d >>> 7) & 1);
    this.placeCodewordsCore(mat, row - 2, col - 1, (d >>> 6) & 1);
    this.placeCodewordsCore(mat, row - 1, col - 2, (d >>> 5) & 1);
    this.placeCodewordsCore(mat, row - 1, col - 1, (d >>> 4) & 1);
    this.placeCodewordsCore(mat, row - 1, col    , (d >>> 3) & 1);
    this.placeCodewordsCore(mat, row    , col - 2, (d >>> 2) & 1);
    this.placeCodewordsCore(mat, row    , col - 1, (d >>> 1) & 1);
    this.placeCodewordsCore(mat, row    , col    , (d      ) & 1);
  }


  ///
  __this__.placeCodewordsCorner1 = function(mat, d) {
    var nrow = mat.length;
    var ncol = mat[0].length;
    this.placeCodewordsCore(mat, nrow - 1,        0, (d >>> 7) & 1);
    this.placeCodewordsCore(mat, nrow - 1,        1, (d >>> 6) & 1);
    this.placeCodewordsCore(mat, nrow - 1,        2, (d >>> 5) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 2, (d >>> 4) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 1, (d >>> 3) & 1);
    this.placeCodewordsCore(mat,        1, ncol - 1, (d >>> 2) & 1);
    this.placeCodewordsCore(mat,        2, ncol - 1, (d >>> 1) & 1);
    this.placeCodewordsCore(mat,        3, ncol - 1, (d      ) & 1);
  }


  ///
  __this__.placeCodewordsCorner2 = function(mat, d) {
    var nrow = mat.length;
    var ncol = mat[0].length;
    this.placeCodewordsCore(mat, nrow - 3,        0, (d >>> 7) & 1);
    this.placeCodewordsCore(mat, nrow - 2,        0, (d >>> 6) & 1);
    this.placeCodewordsCore(mat, nrow - 1,        0, (d >>> 5) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 4, (d >>> 4) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 3, (d >>> 3) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 2, (d >>> 2) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 1, (d >>> 1) & 1);
    this.placeCodewordsCore(mat,        1, ncol - 1, (d      ) & 1);
  }


  ///
  __this__.placeCodewordsCorner3 = function(mat, d) {
    var nrow = mat.length;
    var ncol = mat[0].length;
    this.placeCodewordsCore(mat, nrow - 3,        0, (d >>> 7) & 1);
    this.placeCodewordsCore(mat, nrow - 2,        0, (d >>> 6) & 1);
    this.placeCodewordsCore(mat, nrow - 1,        0, (d >>> 5) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 2, (d >>> 4) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 1, (d >>> 3) & 1);
    this.placeCodewordsCore(mat,        1, ncol - 1, (d >>> 2) & 1);
    this.placeCodewordsCore(mat,        2, ncol - 1, (d >>> 1) & 1);
    this.placeCodewordsCore(mat,        3, ncol - 1, (d      ) & 1);
  }


  ///
  __this__.placeCodewordsCorner4 = function(mat, d) {
    var nrow = mat.length;
    var ncol = mat[0].length;
    this.placeCodewordsCore(mat, nrow - 1,        0, (d >>> 7) & 1);
    this.placeCodewordsCore(mat, nrow - 1, ncol - 1, (d >>> 6) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 3, (d >>> 5) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 2, (d >>> 4) & 1);
    this.placeCodewordsCore(mat,        0, ncol - 1, (d >>> 3) & 1);
    this.placeCodewordsCore(mat,        1, ncol - 3, (d >>> 2) & 1);
    this.placeCodewordsCore(mat,        1, ncol - 2, (d >>> 1) & 1);
    this.placeCodewordsCore(mat,        1, ncol - 1, (d      ) & 1);
  }


  ///
  __this__.placeCodewords = function(mat, d) {
    var nrow = mat.length;
    var ncol = mat[0].length;
    var row = 4;
    var col = 0;
    var p = 0;

    do {
      // repeatedly first check for one of the special corner cases, then...
      if ((row == nrow    ) && (col == 0)) {
        this.placeCodewordsCorner1(mat, d[p++]);
      }
      if ((row == nrow - 2) && (col == 0) && (ncol % 4)) {
        this.placeCodewordsCorner2(mat, d[p++]);
      }
      if ((row == nrow - 2) && (col == 0) && (ncol % 8 == 4)) {
        this.placeCodewordsCorner3(mat, d[p++]);
      }
      if ((row == nrow + 4) && (col == 2) && (! (ncol % 8))) {
        this.placeCodewordsCorner4(mat, d[p++]);
      }

      // sweep upward diagonally, inserting successive characters,...
      do {
        if ((row < nrow) && (col >= 0) && (-1 == mat[row][col])) {
          this.placeCodewordsUtah(mat, row, col, d[p++]);
        }
        row -= 2; col += 2;
      } while ((row >= 0) && (col < ncol));
      row += 1; col += 3;

      // & then sweep downward diagonally, inserting successive characters,...
      do {
        if ((row >= 0) && (col < ncol) && (-1 == mat[row][col])) {
          this.placeCodewordsUtah(mat, row, col, d[p++]);
        }
        row += 2; col -= 2;
      } while ((row < nrow) && (col >= 0));
      row += 3; col += 1;

      // ... until the entire array is scanned
    } while ((row < nrow) || (col < ncol));

    // Lastly, if the lower righthand corner is untouched, fill in fixed pattern
    if (-1 == mat[nrow - 1][ncol - 1]) {
      mat[nrow - 1][ncol - 1] = 1;
      mat[nrow - 2][ncol - 2] = 1;
      mat[nrow - 2][ncol - 1] = 0;
      mat[nrow - 1][ncol - 2] = 0;
    }
  }


  ///
  __this__.__addBitarrData = function(cur, d) {
    cur.concat(d);
  }


  ///
  __this__.__add8bitData = function(cur, d) {
    cur.addRawdataArr(d.ar);
  }


  ///
  __this__.__encodeDataAsciiCore = function(cur, a, n) {
    var v = 0;
    for (var i = 0; i < n; i++) {
      if (a[i] < 128) {
        if (0x0030 <= a[i] && a[i] <= 0x0039 && (i + 1) < a.length &&
            0x0030 <= a[i + 1] && a[i + 1] <= 0x0039) {
          v = (a[i] - 0x0030) * 10 + (a[i + 1] - 0x0030) + 130;
          cur.addRawdataBit(v & 0x00ff, 8);
          i++;
        } else {
          v = a[i] + 1;
          cur.addRawdataBit(v & 0x00ff, 8);
        }
      } else {
        v = a[i] - 127;
        cur.addRawdataBit(235 & 0x00ff, 8);
        cur.addRawdataBit(  v & 0x00ff, 8);
      }
    }
  }


  ///
  __this__.__encodeDataAscii = function(cur, a, lenLimit) {
    var n = 0, c = 0;
    for (var i = 0; i < a.length; i++) {
      var y = 2;
      if (a[i] < 128) {
        if (0x0030 <= a[i] && a[i] <= 0x0039 && (i + 1) < a.length &&
            0x0030 <= a[i + 1] && a[i + 1] <= 0x0039) {
          y = 1;
        }
      } else {
        y = 4;
      }
      if (0 <= lenLimit && 0 > ((lenLimit - Math.floor(cur.length / 8)) * 2 - c - y)) {
        break;
      }
      c += y;
      n++;
    }
    this.__encodeDataAsciiCore(cur, a, n);
    cur.charactors += Math.floor(c / 2);
  }


  ///
  __this__.__encodeDataC40Helper = function(cur, q, v) {
    q.v = q.v * 40 + v;
    q.m++;
    if (0 == (q.m % 3)) {
      q.v++;
      cur.addRawdataBit((q.v >>> 8) & 0x00ff, 8);
      cur.addRawdataBit( q.v        & 0x00ff, 8);
      q.v = 0;
      q.m = 0;
    }
  }


  ///
  __this__.__encodeDataC40Family = function(cur, a, lenLimit, latchVal, detAvailable, detShifting, prepareCore) {
    var n = 0;
    var v = 0;
    var y = 0;

    if (a.length == 0) { return; }

    for (var i = 0; i < a.length; i++) {
      y += 1;
      v = a[i];
      detAvailable.call(this, v);

      if (128 <= v) {
        y += 2;
        v -= 128;
      }
      y += detShifting.call(this, v);
      if (0 <= lenLimit && 0 > (lenLimit - 1 - Math.ceil(y * 2 / 3))) {
        break;
      }
      n++;
    }

    if (n == 0) { return; }

    var q = {v:0, m:0};

    if (! (0 <= lenLimit && 0 > (lenLimit - 1))) {
      // latch to C40Family encoding
      cur.addRawdataBit(latchVal, 8);
    }

    for (var i = 0; i < n; i++) {
      v = a[i];
      if (128 <= v) {
        if ((i + 1) == n && (1 == ((q.m + 3 + detShifting.call(this, v - 128)) % 3))) {
          //   if it is the last byte and the second byte of upper shift pair
          //   is to be pushed alone to final triplet,
          // use ASCII encoding
          q.m = 1;
          break;
        }
        // upper shift
        this.__encodeDataC40Helper(cur, q, 1);
        this.__encodeDataC40Helper(cur, q, 30 & 0x00ff);
        v -= 128;
      }
      prepareCore.call(this, cur, q, v);
    }

    switch (q.m) {
    case 1:
      if (! (0 <= lenLimit && 0 > (lenLimit - Math.floor(cur.length / 8) - 2))) {
        // unlatch (switch back to ASCII)
        cur.addRawdataBit(254, 8);
      }
      this.__encodeDataAscii(cur, [v], lenLimit);
      break;
    case 2:
      this.__encodeDataC40Helper(cur, q, 0);
      // FALL THRU
    case 0:
      if (! (0 <= lenLimit && 0 > (lenLimit - Math.floor(cur.length / 8) - 1))) {
        // unlatch (switch back to ASCII)
        cur.addRawdataBit(254, 8);
      }
      break;
    }

    cur.charactors += y;
    return;
  }


  ///
  __this__.__encodeDataC40DetAvailable = function(v) {
    // do nothing
  }


  ///
  __this__.__encodeDataC40DetShifting = function(v) {
    if (! ((v == 32) || (48 <= v && v <= 57) || (65 <= v && v <= 90))) {
      return 1;
    } else {
      return 0;
    }
  }


  ///
  __this__.__encodeDataC40Core = function(cur, q, v) {
    if ( 0 <= v && v <= 31) {
      // shift 1
      this.__encodeDataC40Helper(cur, q, 0);
      this.__encodeDataC40Helper(cur, q, v & 0x00ff);
    } else if (33 <= v && v <= 47) {
      // shift 2
      this.__encodeDataC40Helper(cur, q, 1);
      this.__encodeDataC40Helper(cur, q, (v - 33) & 0x00ff);
    } else if (58 <= v && v <= 64) {
      // shift 2
      this.__encodeDataC40Helper(cur, q, 1);
      this.__encodeDataC40Helper(cur, q, (v - 43) & 0x00ff);
    } else if (91 <= v && v <= 95) {
      // shift 2
      this.__encodeDataC40Helper(cur, q, 1);
      this.__encodeDataC40Helper(cur, q, (v - 69) & 0x00ff);
    } else if (96 <= v && v <= 127) {
      // shift 3
      this.__encodeDataC40Helper(cur, q, 2);
      this.__encodeDataC40Helper(cur, q, (v - 96) & 0x00ff);
    } else if (v == 32){
      // basic
      this.__encodeDataC40Helper(cur, q, 3);
    } else {
      // basic
      this.__encodeDataC40Helper(cur, q, (v - 44) & 0x00ff);
    }
  }


  ///
  __this__.__encodeDataC40 = function(cur, a, lenLimit) {
    return this.__encodeDataC40Family(
      cur, a, lenLimit, 230,
      this.__encodeDataC40DetAvailable,
      this.__encodeDataC40DetShifting,
      this.__encodeDataC40Core
      );
  }


  ///
  __this__.__encodeDataTextDetAvailable = function(v) {
    // do nothing
  }


  ///
  __this__.__encodeDataTextDetShifting = function(v) {
    if (! ((v == 32) || (48 <= v && v <= 57) || (97 <= v && v <= 122))) {
      return 1;
    } else {
      return 0;
    }
  }


  ///
  __this__.__encodeDataTextCore = function(cur, q, v) {
    if ( 0 <= v && v <= 31) {
      // shift 1
      this.__encodeDataC40Helper(cur, q, 0);
      this.__encodeDataC40Helper(cur, q, v & 0x00ff);
    } else if (33 <= v && v <= 47) {
      // shift 2
      this.__encodeDataC40Helper(cur, q, 1);
      this.__encodeDataC40Helper(cur, q, (v - 33) & 0x00ff);
    } else if (58 <= v && v <= 64) {
      // shift 2
      this.__encodeDataC40Helper(cur, q, 1);
      this.__encodeDataC40Helper(cur, q, (v - 43) & 0x00ff);
    } else if (91 <= v && v <= 95) {
      // shift 2
      this.__encodeDataC40Helper(cur, q, 1);
      this.__encodeDataC40Helper(cur, q, (v - 69) & 0x00ff);
    } else if ((v == 96) || (123 <= v && v <= 127)) {
      // shift 3
      this.__encodeDataC40Helper(cur, q, 2);
      this.__encodeDataC40Helper(cur, q, (v - 96) & 0x00ff);
    } else if (65 <= v && v <= 90) {
      // shift 3
      this.__encodeDataC40Helper(cur, q, 2);
      this.__encodeDataC40Helper(cur, q, (v - 64) & 0x00ff);
    } else if (v == 32){
      // basic
      this.__encodeDataC40Helper(cur, q, 3);
    } else if (97 <= v && v <= 122) {
      // basic
      this.__encodeDataC40Helper(cur, q, (v - 83) & 0x00ff);
    } else {
      // basic
      this.__encodeDataC40Helper(cur, q, (v - 44) & 0x00ff);
    }
  }


  ///
  __this__.__encodeDataText = function(cur, a, lenLimit) {
    return this.__encodeDataC40Family(
      cur, a, lenLimit, 239,
      this.__encodeDataTextDetAvailable,
      this.__encodeDataTextDetShifting,
      this.__encodeDataTextCore
      );
  }


  ///
  __this__.__encodeDataX12DetAvailable = function(v) {
    switch (v) {
    case 10:
    case 13:
    case 42:
    case 62:
    case 32:
      return;
    default:
      if (48 <= v && v <= 57) {
        return;
      } else if (65 <= v && v <= 90) {
        return;
      }
      throw new Error("can't encode");
    }
  }


  ///
  __this__.__encodeDataX12DetShifting = function(v) {
    if (v == 10) { return -1; } // ignore LF
    else         { return  0; }
  }


  ///
  __this__.__encodeDataX12Core = function(cur, q, v) {
    switch (v) {
    case 10: // ignore LF
      break;
    case 13:
      this.__encodeDataC40Helper(cur, q, 0);
      break;
    case 42:
      this.__encodeDataC40Helper(cur, q, 1);
      break;
    case 62:
      this.__encodeDataC40Helper(cur, q, 2);
      break;
    case 32:
      this.__encodeDataC40Helper(cur, q, 3);
      break;
    default:
      if (48 <= v && v <= 57) {
        this.__encodeDataC40Helper(cur, q, (v - 44) & 0x00ff);
      } else if (65 <= v && v <= 90) {
        this.__encodeDataC40Helper(cur, q, (v - 51) & 0x00ff);
      }
      break;
    }
  }


  ///
  __this__.__encodeDataX12 = function(cur, a, lenLimit) {
    return this.__encodeDataC40Family(
      cur, a, lenLimit, 238,
      this.__encodeDataX12DetAvailable,
      this.__encodeDataX12DetShifting,
      this.__encodeDataX12Core
      );
  }


  ///
  __this__.__encodeDataEDIFACTHelper = function(cur, q, v) {
    q.v = (q.v << 6) | (v & 0x003f);
    q.m++;
    if (0 == (q.m % 4)) {
      cur.addRawdataBit((q.v >>> 16) & 0x00ff, 8);
      cur.addRawdataBit((q.v >>>  8) & 0x00ff, 8);
      cur.addRawdataBit( q.v         & 0x00ff, 8);
      q.v = 0;
      q.m = 0;
    }
  }


  ///
  __this__.__encodeDataEDIFACT = function(cur, a, lenLimit) {
    var q = {v:0, m:0};
    var c = 0;
    var v = 0;

    if (a.length == 0) { return; }

    if (! (0 <= lenLimit && 0 > (lenLimit - Math.floor(cur.length / 8) - 1))) {
      // latch to EDIFACT
      cur.addRawdataBit(240, 8);
    }

    for (var i = 0; i < a.length; i++) {
      if (0 <= lenLimit && 0 > (lenLimit - Math.floor(cur.length / 8) - 1)) {
        break;
      }
      v = a[i];
      if (! (32 <= v && v <= 94)) {
        throw new Error("can't encode");
      }
      v &= 0x003f;
      this.__encodeDataEDIFACTHelper(cur, q, v);
      c++;
    }

    if (! (0 <= lenLimit && 0 > (lenLimit - Math.floor(cur.length / 8) - 1))) {
      // unlatch (switch back to ASCII)
      this.__encodeDataEDIFACTHelper(cur, q, 31);
      while (0 != q.m) {
        this.__encodeDataEDIFACTHelper(cur, q, 0);
      }
    }

    cur.charactors += c;
    return;
  }


  ///
  __this__.__rundomizeValue253 = function(c, pos) {
    var v = ((149 * pos) % 253) + 1 + (c & 0x00ff);
    if (254 < v) { v -= 254; }
    return v;
  }


  ///
  __this__.__rundomizeValue255 = function(c, pos) {
    var v = ((149 * pos) % 255) + 1 + (c & 0x00ff);
    if (256 <= v) { v -= 256; }
    return v;
  }


  ///
  __this__.__encodeDataBase256 = function(cur, a, lenLimit) {
    var n = a.length;

    if (n == 0) { return; }

    if (0 <= lenLimit) {
      n = Math.max(0, Math.min(lenLimit - Math.floor(cur.length / 8) - 2, n));
      if (250 < n) {
        n = Math.max(0, n - 1);
      }
    }

    if (n == 0) { return; }

    if (! (0 <= lenLimit && 0 > (lenLimit - Math.floor(cur.length / 8) - 3))) {
      // latch to Base 256
      cur.addRawdataBit(231, 8);

      // push the field length
      if (n < 250) {
        // if we never unlatch from the b256 mode and use entired symbol as b256,
        // set "n" = 0 here.
        cur.addRawdataBit(this.__rundomizeValue255(n, Math.floor(cur.length / 8) + 1), 8);
      } else {
        cur.addRawdataBit(this.__rundomizeValue255((Math.floor(n / 250) + 249) & 0x00ff, Math.floor(cur.length / 8) + 1), 8);
        cur.addRawdataBit(this.__rundomizeValue255((n % 250) & 0x00ff, Math.floor(cur.length / 8) + 1), 8);
      }
    }

    var v = 0;
    for (var i = 0; i < n; i++) {
      cur.addRawdataBit(this.__rundomizeValue255(a[i], Math.floor(cur.length / 8) + 1) & 0x00ff, 8);
    }

    cur.charactors += n;
    return;
  }


  ///
  __this__.__encodeDataAuto = function(a, lenLimit) {
    var cur = new BitArrayCursor(Math.ceil(s.length * 10 / 24));
    cur.charactors = c;
    return cur;
  }


  ///
  __this__.__finalizeSymbolData = function(cur, dataCaps) {
    if (Math.ceil(cur.length / 8) < dataCaps) {
      cur.addRawdataBit(129 & 0x00ff, 8);

      while (Math.ceil(cur.length / 8) < dataCaps) {
        cur.addRawdataBit(this.__rundomizeValue253(129 & 0x00ff, Math.floor(cur.length / 8) + 1) & 0x00ff, 8);
      }
    }
  }


  ///
  __this__.createSymbol = function(srcstr, nrow, ncol, mode, charset) {
    nrow = parseInt(nrow);
    ncol = parseInt(ncol);

    var charconvProc = __getCharconvStrToByteProc(charset);

    var writerProcs = this.__writerProcsDicts[mode];

    var nrowcol = nrow.toString() + "x" + ncol.toString();
    var symbolInfo = this.symbolInfoDict[nrowcol];

    var dataCaps = symbolInfo.dataCaps;
    var eccCaps  = symbolInfo.eccCaps;
    var dataLenArr = [];
    var eccLenArr = [];
    for (var i = 0; i < symbolInfo.eccBlocks.length; i++) {
      for (var j = 0; j < symbolInfo.eccBlocks[i][0]; j++) {
        dataLenArr.push(symbolInfo.eccBlocks[i][1]);
        eccLenArr.push(symbolInfo.eccBlocks[i][2]);
      }
    }

    // mapping matrix
    var mat = __newArray2d(nrow, ncol, -1);
    // codewords bit array
    var cur = new BitArrayCursor(dataCaps);

    // split source string by ECI sequence.
    var eciSplitStrArr = [srcstr];

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

    // finalize
    this.__finalizeSymbolData(cur, dataCaps);

    // build error correction codewords and interleaving
    var eccs = [];
    for (var i = 0; i < eccLenArr.length; i++) {
      var dataLen = dataLenArr[i];
      var eccLen = eccLenArr[i];
      var gx = this.gfc.rsMakeGx2(eccLen);
      var e = [];
      for (var j = i, k = 0; k < dataLen; j += eccLenArr.length, k++) {
        e.push(cur.ar[j]);
      }
      var zx = this.gfc.rsModPoly(e.reverse(), gx).reverse();
      eccs.push(zx);
    }
    for (var j = 0; j < eccs[0].length; j++) {
      for (var i = 0; i < eccs.length; i++) {
        if (j < eccs[i].length) {
          cur.addRawdataBit(eccs[(i + symbolInfo.eccPlaceOffset) % eccs.length][j] & 0x00ff, 8);
        }
      }
    }

    // place codewords to the matrix
    this.placeCodewords(mat, cur.ar);

    return [[symbolInfo.alignment.slice(0), mat]];
  }


  __this__.getAllSymbolSize = function() {
    var a = [
      [ 10,  10,   8,   8, "", ""],
      [ 12,  12,  10,  10, "", ""],
      [ 14,  14,  12,  12, "", ""],
      [ 16,  16,  14,  14, "", ""],
      [ 18,  18,  16,  16, "", ""],
      [ 20,  20,  18,  18, "", ""],
      [ 22,  22,  20,  20, "", ""],
      [ 24,  24,  22,  22, "", ""],
      [ 26,  26,  24,  24, "", ""],
      [ 32,  32,  28,  28, "", ""],
      [ 36,  36,  32,  32, "", ""],
      [ 40,  40,  36,  36, "", ""],
      [ 44,  44,  40,  40, "", ""],
      [ 48,  48,  44,  44, "", ""],
      [ 52,  52,  48,  48, "", ""],
      [ 64,  64,  56,  56, "", ""],
      [ 72,  72,  64,  64, "", ""],
      [ 80,  80,  72,  72, "", ""],
      [ 88,  88,  80,  80, "", ""],
      [ 96,  96,  88,  88, "", ""],
      [104, 104,  96,  96, "", ""],
      [120, 120, 108, 108, "", ""],
      [132, 132, 120, 120, "", ""],
      [144, 144, 132, 132, "", ""],
      [  8,  18,   6,  16, "", ""],
      [  8,  32,   6,  28, "", ""],
      [ 12,  26,  10,  24, "", ""],
      [ 12,  36,  10,  32, "", ""],
      [ 16,  36,  14,  32, "", ""],
      [ 16,  48,  14,  44, "", ""],
    ];
    for (var i = 0; i < a.length; i++) {
      a[i][4] = a[i][0].toString() + "x" + a[i][1].toString();
      a[i][5] = JSON.stringify(a[i].slice(0, 4));
    }
    return a;
  }


  ///
  __this__.__writerProcsDicts = {
    "Auto" : {},
    "ASCII"  : {
      encodeData :__this__.__encodeDataAscii,
      addData    :__this__.__addBitarrData   ,
      next       :undefined                  },
    "C40": {
      encodeData :__this__.__encodeDataC40,
      addData    :__this__.__addBitarrData ,
      next       :undefined                },
    "Text" : {
      encodeData :__this__.__encodeDataText,
      addData    :__this__.__addBitarrData  ,
      next       :undefined                 },
    "X12" : {
      encodeData :__this__.__encodeDataX12,
      addData    :__this__.__addBitarrData ,
      next       :"ASCII"                  },
    "EDIFACT" : {
      encodeData :__this__.__encodeDataEDIFACT,
      addData    :__this__.__addBitarrData     ,
      next       :"ASCII"                      },
    "Base256" : {
      encodeData :__this__.__encodeDataBase256,
      addData    :__this__.__add8bitData       ,
      next       :undefined                    }
  };


  /// keys are "data matrix size"
  __this__.symbolInfoDict = {
    "8x8": {
      dataCaps :   3,
      eccCaps  :   5,
      eccBlocks:[[1, 3, 5]],
      eccPlaceOffset:0,
      alignment:[8, 8]
      },
    "10x10": {
      dataCaps :   5,
      eccCaps  :   7,
      eccBlocks:[[1, 5, 7]],
      eccPlaceOffset:0,
      alignment:[10, 10]
      },
    "12x12": {
      dataCaps :   8,
      eccCaps  :  10,
      eccBlocks:[[1, 8, 10]],
      eccPlaceOffset:0,
      alignment:[12, 12]
      },
    "14x14": {
      dataCaps :  12,
      eccCaps  :  12,
      eccBlocks:[[1, 12, 12]],
      eccPlaceOffset:0,
      alignment:[14, 14]
      },
    "16x16": {
      dataCaps :  18,
      eccCaps  :  14,
      eccBlocks:[[1, 18, 14]],
      eccPlaceOffset:0,
      alignment:[16, 16]
      },
    "18x18": {
      dataCaps :  22,
      eccCaps  :  18,
      eccBlocks:[[1, 22, 18]],
      eccPlaceOffset:0,
      alignment:[18, 18]
      },
    "20x20": {
      dataCaps :  30,
      eccCaps  :  20,
      eccBlocks:[[1, 30, 20]],
      eccPlaceOffset:0,
      alignment:[20, 20]
      },
    "22x22": {
      dataCaps :  36,
      eccCaps  :  24,
      eccBlocks:[[1, 36, 24]],
      eccPlaceOffset:0,
      alignment:[22, 22]
      },
    "24x24": {
      dataCaps :  44,
      eccCaps  :  28,
      eccBlocks:[[1, 44, 28]],
      eccPlaceOffset:0,
      alignment:[24, 24]
      },
    "28x28": {
      dataCaps :  62,
      eccCaps  :  36,
      eccBlocks:[[1, 62, 36]],
      eccPlaceOffset:0,
      alignment:[14, 14]
      },
    "32x32": {
      dataCaps :  86,
      eccCaps  :  42,
      eccBlocks:[[1, 86, 42]],
      eccPlaceOffset:0,
      alignment:[16, 16]
      },
    "36x36": {
      dataCaps : 114,
      eccCaps  :  48,
      eccBlocks:[[1, 114, 48]],
      eccPlaceOffset:0,
      alignment:[18, 18]
      },
    "40x40": {
      dataCaps : 144,
      eccCaps  :  56,
      eccBlocks:[[1, 144, 56]],
      eccPlaceOffset:0,
      alignment:[20, 20]
      },
    "44x44": {
      dataCaps : 174,
      eccCaps  :  68,
      eccBlocks:[[1, 174, 68]],
      eccPlaceOffset:0,
      alignment:[22, 22]
      },
    "48x48": {
      dataCaps : 204,
      eccCaps  :  84,
      eccBlocks:[[2, 102, 42]],
      eccPlaceOffset:0,
      alignment:[24, 24]
      },
    "56x56": {
      dataCaps : 280,
      eccCaps  : 112,
      eccBlocks:[[2, 140, 56]],
      eccPlaceOffset:0,
      alignment:[14, 14]
      },
    "64x64": {
      dataCaps : 368,
      eccCaps  : 144,
      eccBlocks:[[4, 92, 36]],
      eccPlaceOffset:0,
      alignment:[16, 16]
      },
    "72x72": {
      dataCaps : 456,
      eccCaps  : 192,
      eccBlocks:[[4, 114, 48]],
      eccPlaceOffset:0,
      alignment:[18, 18]
      },
    "80x80": {
      dataCaps : 576,
      eccCaps  : 224,
      eccBlocks:[[4, 144, 56]],
      eccPlaceOffset:0,
      alignment:[20, 20]
      },
    "88x88": {
      dataCaps : 696,
      eccCaps  : 272,
      eccBlocks:[[4, 174, 68]],
      eccPlaceOffset:0,
      alignment:[22, 22]
      },
    "96x96": {
      dataCaps : 816,
      eccCaps  : 336,
      eccBlocks:[[6, 136, 56]],
      eccPlaceOffset:0,
      alignment:[24, 24]
      },
    "108x108": {
      dataCaps :1050,
      eccCaps  : 408,
      eccBlocks:[[6, 175, 68]],
      eccPlaceOffset:0,
      alignment:[18, 18]
      },
    "120x120": {
      dataCaps :1304,
      eccCaps  : 496,
      eccBlocks:[[8, 163, 62]],
      eccPlaceOffset:0,
      alignment:[20, 20]
      },
    "132x132": {
      dataCaps :1558,
      eccCaps  : 620,
      eccBlocks:[[8, 156, 62], [2, 155, 62]],
      eccPlaceOffset:8,
      alignment:[22, 22]
      },
    "6x16": {
      dataCaps :   5,
      eccCaps  :   7,
      eccBlocks:[[1, 5, 7]],
      eccPlaceOffset:0,
      alignment:[6, 16]
      },
    "6x28": {
      dataCaps :  10,
      eccCaps  :  11,
      eccBlocks:[[1, 10, 11]],
      eccPlaceOffset:0,
      alignment:[6, 14]
      },
    "10x24": {
      dataCaps :  16,
      eccCaps  :  14,
      eccBlocks:[[1, 16, 14]],
      eccPlaceOffset:0,
      alignment:[10, 24]
      },
    "10x32": {
      dataCaps :  22,
      eccCaps  :  18,
      eccBlocks:[[1, 22, 18]],
      eccPlaceOffset:0,
      alignment:[10, 16]
      },
    "14x32": {
      dataCaps :  32,
      eccCaps  :  24,
      eccBlocks:[[1, 32, 24]],
      eccPlaceOffset:0,
      alignment:[14, 16]
      },
    "14x44": {
      dataCaps :  49,
      eccCaps  :  28,
      eccBlocks:[[1, 49, 28]],
      eccPlaceOffset:0,
      alignment:[14, 22]
      },
  };



/* /// debug functions
  __this__.__encodeDataDebugBitArray = function(s, lenLimit) {
    var d = __newArray(lenLimit, 0);
    for (var i = 0; i < d.length; i++) {
      d[i] = i + 1;
    }
    return {ar:d, length:d.length * 8, charactors:d.length};
  }
  __this__.placeCodewordsCore_debug = function(mat, row, col, cwpos, bitpos) {
    var nrow = mat.length;
    var ncol = mat[0].length;
    if (row < 0) { row += nrow; col += 4 - ((nrow + 4) % 8); }
    if (col < 0) { col += ncol; row += 4 - ((ncol + 4) % 8); }
    mat[row][col] = cwpos * 10 + bitpos;
  }
  __this__.__debugDumpPositionMap = function(mat) {
    var nrow = mat.length;
    var ncol = mat[0].length;
    var s = "";

    for (var row = 0; row < nrow; row++) {
      for (var col = 0; col < ncol; col++) {
        var v = mat[row][col];
        var p = Math.floor(v / 10);
        var q = v % 10;

        if (p == 0) {
          if (q == 0) {
            s += "WHT,";
          } else {
            s += "BLK,";
          }
        } else {
          s += p.toString() + ":" + q.toString() + ",";
        }
      }
      s += "\n";
    }
    return s;
  }*/


});


