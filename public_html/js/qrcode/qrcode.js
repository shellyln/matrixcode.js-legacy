

///
BitArrayCursor = __extends(Object,
// constructor
  function(byteLength) {
    __constructSuper(this);
    this.ar = __newArray(byteLength, 0);
    this.length = 0;
    this.charactors = 0;
  },
// methods
function(__this__) {


  ///
  __this__.addRawdataBit = function(b, c) {
    var m = this.length % 8;
    var n = Math.floor(this.length / 8);
    var shift = 8 - c - m;
    var w = 0;

    if (0 <= shift) {
      w = (b <<  shift) & 0x00ff;
    } else {
      w = (b >> -shift) & 0x00ff;
      this.ar[n + 1] = (b << (8 + shift)) & 0x00ff;
    }
    this.ar[n] |= (w & (~ ((~ 0) << (8 - m)))) & 0x00ff;
    this.length += c;
  }


  ///
  __this__.addRawdataArr = function(d) {
    var m = this.length % 8;

    if (0 == m) {
      for (var i = 0; i < d.length; i++) {
        var b = d[i] & 0x00ff;
        this.ar[Math.floor(this.length / 8)] = b & 0x00ff;
        this.length += 8;
      }
    } else {
      for (var i = 0; i < d.length; i++) {
        var b = d[i] & 0x00ff;
        var frp = Math.floor(this.length / 8);
        this.ar[frp    ] = (this.ar[frp] | (b >>> m)) & 0x00ff;
        this.ar[frp + 1] = (b << (8 - m)) & 0x00ff;
        this.length += 8;
      }
    }
  }


  ///
  __this__.concat = function(d) {
    var n = Math.floor(d.length / 8);
    var m = d.length % 8;
    for (var p = 0; p < n; p++) {
      this.addRawdataBit(d.ar[p] & 0x00ff, 8);
    }
    if (m != 0) {
      this.addRawdataBit((d.ar[n] & 0x00ff) >>> (8 - m), m);
    }
  }
});


///
__g_inst_Gf2p8Math_forQRC__ = new Gf2p8Math();
__g_inst_Bch32Math_forQRC__ = new Bch32Math();


QrCodeRendererBase = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
    this.gfc = __g_inst_Gf2p8Math_forQRC__;
    this.bfc = __g_inst_Bch32Math_forQRC__;
  },
// methods
function(__this__) {


  __this__.__numDict = {
    "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9
  };


  __this__.__alnumDict = {
    "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
    "A":10, "B":11, "C":12, "D":13, "E":14, "F":15, "G":16, "H":17, "I":18, "J":19,
    "K":20, "L":21, "M":22, "N":23, "O":24, "P":25, "Q":26, "R":27, "S":28, "T":29,
    "U":30, "V":31, "W":32, "X":33, "Y":34, "Z":35, " ":36, "$":37, "%":38, "*":39,
    "+":40, "-":41, ".":42, "/":43, ":":44,
    "a":10, "b":11, "c":12, "d":13, "e":14, "f":15, "g":16, "h":17, "i":18, "j":19,
    "k":20, "l":21, "m":22, "n":23, "o":24, "p":25, "q":26, "r":27, "s":28, "t":29,
    "u":30, "v":31, "w":32, "x":33, "y":34, "z":35
  };


  ///
  __this__.__prepareAutoData = function(s, lenLimit, version, charset) {
    // split source string by ECI sequence.
    var eciSplitStrArr = [s];

    // for each split segments by ECI
    for (var i = 0; i < eciSplitStrArr.length; i++) {
      var srcarr = [];

      // split source string by FNC
      var strsegments = [eciSplitStrArr[i]];

      for (var j = 0; j < strsegments.length; j++) {

        // append FNC
      }

      // append ECI
    }
  }


  ///
  __this__.__prepareNumData = function(s, lenLimit, version, charset) {
    var cur = new BitArrayCursor(Math.ceil(s.length * 10 / 24));
    var i = 0, c = 0, v = 0, w = 0, y = 0, z = 0;
    for (var p = 0; p < s.length; p++) {
      switch (++i) {
      case 1: y =  4; break;
      case 2: y =  7; break;
      case 3: y = 10; break;
      }
      if (0 <= lenLimit && 0 > (lenLimit - cur.length - y)) {
        break;
      }
      w = this.__numDict[s[p]];
      if (w == undefined) {
        return undefined;
      }
      v = (v * 10) + w;
      z = y; c++;

      if (0 == (i % 3)) {
        cur.addRawdataBit((v >>> 2) & 0x00ff, 8);
        cur.addRawdataBit( v        & 0x00ff, 2);
        z = 0; v = 0; i = 0;
      }
    }
    if (0 != z) {
      cur.addRawdataBit(v & 0x00ff, z);
    }
    cur.charactors = c;
    return cur;
  }


  ///
  __this__.__prepareAlnumData = function(s, lenLimit, version, charset) {
    var cur = new BitArrayCursor(Math.ceil(s.length * 11 / 16));
    var i = 0, c = 0, v = 0, w = 0, y = 0, z = 0;
    for (var p = 0; p < s.length; p++) {
      switch (++i) {
      case 1: y =  6; break;
      case 2: y = 11; break;
      }
      if (0 <= lenLimit && 0 > (lenLimit - cur.length - y)) {
        break;
      }
      w = this.__alnumDict[s[p]];
      if (w == undefined) {
        return undefined;
      }
      v = (v * 45) + w;
      z = y; c++;

      if (0 == (i % 2)) {
        cur.addRawdataBit((v >>> 3) & 0x00ff, 8);
        cur.addRawdataBit( v        & 0x00ff, 3);
        z = 0; v = 0; i = 0;
      }
    }
    if (0 != z) {
      cur.addRawdataBit(v & 0x00ff, z);
    }
    cur.charactors = c;
    return cur;
  }


  ///
  __this__.__prepare8bitData = function(s, lenLimit, version, charset) {
    var charconvProc = __getCharconvStrToByteProc(charset);
    var a = charconvProc(s, charset);
    if (0 <= lenLimit && 0 > (lenLimit - (a.length * 8))) {
      var z = a.length - Math.floor(lenLimit / 8);
      a.length -= Math.max(0, z);
    }
    return {ar:a, charactors:a.length};
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
  __this__.__getHnFLenAutoMode = function(version) {
    return 0;
  }


  ///
  __this__.__beginAutoMode = function(cur, c, sinfo) {
    // do nothing.
  }


  ///
  __this__.__endAutoMode = function(cur) {
    // do nothing.
  }


  ///
  __this__.__endNumMode = function(cur) {
    // do nothing.
  }


  ///
  __this__.__endAlnumMode = function(cur) {
    // do nothing.
  }


  ///
  __this__.__end8bitMode = function(cur) {
    // do nothing.
  }


  ///
  __this__.__finalizeSymbolData = function(cur, sinfo) {
    var z = sinfo.dataCodewords * 8 - cur.length;

    if (0 < z) {
      // terminator
      var y = Math.min(4, z);
      cur.addRawdataBit(0, y);
      z -= y;

      // padding bits
      if ((0 < z) && (0 != (cur.length % 8))) {
        y = 8 - Math.min(cur.length % 8, z);
        cur.addRawdataBit(0, y);
        z -= y;
      }

      // pad codewords
      for (var i = 0; 0 < z; i++) {
        y = Math.min(8, z);
        var a = (0 == (i % 2)) ? 0x00ec: 0x0011;
        cur.addRawdataBit(a, y);
        z -= y;
      }
    }
  }


  ///
  __this__.__encodeData = function(srcstr, symInfoClass, procDicts, version, eclevel, mode, charset, usedLen) {
    var sinfo = new symInfoClass(version, eclevel);
    var rawdat = undefined;
    var limLen = -1;
    var writerProcs = procDicts[mode];

    // get max data length for truncating to symbol capacity.
    if (true) {
      var hnflen = writerProcs["getHnFLen"].call(this, sinfo.version);
      if (hnflen == undefined) {
        throw new Error("Invalid version and encoding");
      }
      limLen = sinfo.dataCodewords * 8 - hnflen - usedLen;
    }

    // detect available encoding and create data codewords.
    for (;;) {
      rawdat = writerProcs["prepareData"].call(this, srcstr, limLen, version, charset);
      if (rawdat == undefined) {
        writerProcs = procDicts[writerProcs.next];
        if (writerProcs == undefined) {
          throw new Error("can't encode");
        }
      } else { break; }
    }

    // find minimum version to place all the data.
    if (limLen < 0) {
      for (var i = version; i <= symInfoClass.MAXVER; i++) {
        if (sinfo == undefined) {
          sinfo = new symInfoClass(version, eclevel);
        }
        var hnflen = writerProcs["getHnFLen"].call(this, sinfo.version);
        if (hnflen == undefined) {
          continue;
        }
        limLen = sinfo.dataCodewords * 8 - hnflen - usedLen;

        // rebuild data if data is version sensitive.
        if (rawdat == undefined) {
          rawdat = writerProcs["prepareData"].call(this, srcstr, limLen, version);
          if (rawdat == undefined) {
            throw new Error("can't encode");
          }
        }

        if (0 <= (limLen - rawdat.length)) { break; }

        // clear variables.
        sinfo = undefined;
        if (writerProcs["verSensitive"]) { // if data is version sensitive
          rawdat = undefined;
        }
      }
      if (sinfo == undefined) {
        throw new Error("Capacity overflow");
      }
    }
    return {sinfo:sinfo, rawdat:rawdat, writerProcs:writerProcs};
  }


  ///
  __this__.__makeFinderPattern = function(mat, px, py) {
    mat[py + 0][px + 0] = 1;
    mat[py + 1][px + 0] = 1;
    mat[py + 2][px + 0] = 1;
    mat[py + 3][px + 0] = 1;
    mat[py + 4][px + 0] = 1;
    mat[py + 5][px + 0] = 1;
    mat[py + 6][px + 0] = 1;
    mat[py + 0][px + 1] = 1;
    mat[py + 0][px + 2] = 1;
    mat[py + 0][px + 3] = 1;
    mat[py + 0][px + 4] = 1;
    mat[py + 0][px + 5] = 1;
    mat[py + 0][px + 6] = 1;
    mat[py + 1][px + 6] = 1;
    mat[py + 2][px + 6] = 1;
    mat[py + 3][px + 6] = 1;
    mat[py + 4][px + 6] = 1;
    mat[py + 5][px + 6] = 1;
    mat[py + 6][px + 1] = 1;
    mat[py + 6][px + 2] = 1;
    mat[py + 6][px + 3] = 1;
    mat[py + 6][px + 4] = 1;
    mat[py + 6][px + 5] = 1;
    mat[py + 6][px + 6] = 1;

    mat[py + 2][px + 2] = 1;
    mat[py + 3][px + 2] = 1;
    mat[py + 4][px + 2] = 1;
    mat[py + 2][px + 3] = 1;
    mat[py + 2][px + 4] = 1;
    mat[py + 3][px + 4] = 1;
    mat[py + 4][px + 4] = 1;
    mat[py + 4][px + 3] = 1;
    mat[py + 3][px + 3] = 1;
  }


  ///
  __this__.__maskProcs = [
    [0x00, function(x, y){return ((x + y) % 2) == 0;}],
    [0x01, function(x, y){return (     y  % 2) == 0;}],
    [0x02, function(x, y){return ( x      % 3) == 0;}],
    [0x03, function(x, y){return ((x + y) % 3) == 0;}],
    [0x04, function(x, y){return ((Math.floor(x/3) + Math.floor(y/2)) % 2) == 0;}],
    [0x05, function(x, y){return ( ((x * y) % 2) + (x * y) % 3)      == 0;}],
    [0x06, function(x, y){return ((((x * y) % 2) + (x * y) % 3) % 2) == 0;}],
    [0x07, function(x, y){return ((((x * y) % 3) + (x + y) % 2) % 2) == 0;}]
  ];


  ///
  __this__.__estimateMask = function(mat) {
    var nx = mat[0].length;
    var ny = mat.length;
    var z = 0;
    for (var i = 0; i < ny; i++) {
      for (var j = 0; j < (nx - 6); j++) {
        var k = j + 1;
        for (; k < nx; k++) {
          if (mat[i][j] != mat[i][k]) {
            break;
          }
        }
        k -= j + 1 + 5;
        if (0 < k) { z += 3 + k; }
      }
    }
    for (var i = 0; i < nx; i++) {
      for (var j = 0; j < (ny - 6); j++) {
        var k = j + 1;
        for (; k < ny; k++) {
          if (mat[j][i] != mat[k][i]) {
            break;
          }
        }
        k -= j + 1 + 5;
        if (0 < k) { z += 3 + k; }
      }
    }
    for (var i = 0; i < (ny - 1); i++) {
      for (var j = 0; j < (nx - 1); j++) {
        if (mat[i][j] == mat[i][j + 1] &&
            mat[i][j] == mat[i + 1][j] &&
            mat[i][j] == mat[i + 1][j + 1]) {
          z += 3;
        }
      }
    }
    for (var i = 0; i < ny; i++) {
      for (var j = 0; j < (nx - 6); j++) {
        if (mat[i][j    ] != 0 &&
            mat[i][j + 1] == 0 &&
            mat[i][j + 2] != 0 &&
            mat[i][j + 3] != 0 &&
            mat[i][j + 4] != 0 &&
            mat[i][j + 5] == 0 &&
            mat[i][j + 6] != 0) {
          z += 40;
        }
      }
    }
    for (var i = 0; i < nx; i++) {
      for (var j = 0; j < (ny - 6); j++) {
        if (mat[j    ][i] != 0 &&
            mat[j + 1][i] == 0 &&
            mat[j + 2][i] != 0 &&
            mat[j + 3][i] != 0 &&
            mat[j + 4][i] != 0 &&
            mat[j + 5][i] == 0 &&
            mat[j + 6][i] != 0) {
          z += 40;
        }
      }
    }
    var white = 0, black = 0;
    for (var i = 0; i < ny; i++) {
      for (var j = 0; j < nx; j++) {
        if (mat[j][i] == 0) { white++; }
        else                { black++; }
      }
    }
    z += Math.floor(Math.abs((black / (white + black)) * 100 - 50) / 5) * 10;
    return z;
  }


  ///
  __this__.__maskCodewords = function(mat, hitdetmat, maskproc, sinfo) {
    var nx = mat[0].length;
    var ny = mat.length;

    for (var x = 0; x < nx; x++) {
      for (var y = 0; y < ny; y++) {
        if (0 == hitdetmat[ny - 1 - y][nx - 1 - x]) {
          mat[ny - 1 - y][nx - 1 - x] ^= ((maskproc(x, y)) ? 1: 0);
        }
      }
    }
  }


  ///
  __this__.__maskCodewordsEx = function(mat, hitdetmat, maskProcs, sinfo, masknr) {
    var curMask = maskProcs[Math.max(masknr, 0)];
    this.__maskCodewords(mat, hitdetmat, curMask[1], sinfo);

    if (masknr < 0) {
      var matScore = this.__estimateMask(mat);
      this.__maskCodewords(mat, hitdetmat, curMask[1], sinfo);

      for (var i = 0; i < this.__maskProcs.length; i++) {
        var tmpMask = maskProcs[i];
        if (curMask[0] != tmpMask[0]) {
          this.__maskCodewords(mat, hitdetmat, tmpMask[1], sinfo);
          var matScore2 = this.__estimateMask(mat);
          this.__maskCodewords(mat, hitdetmat, tmpMask[1], sinfo);
          if (matScore > matScore2) {
            matScore = matScore2;
            curMask = tmpMask;
          }
        }
      }
      this.__maskCodewords(mat, hitdetmat, curMask[1], sinfo);
    }
    return curMask;
  }


  // draw the bit matrix to renderer
  __this__.drawSymbol = function(canvas, px, py, dotsize, mat) {
    var ctx = canvas.getContext("2d");
    var n = mat.length;
    for (var x = 0; x < n; x++) {
      for (var y = 0; y < n; y++) {
        if (mat[y][x] != 0) {
          ctx.fillRect(
            px + dotsize * (n - x - 1),
            py + dotsize * (n - y - 1),
            dotsize,
            dotsize
            );
        }
      }
    }
  }


  //
  __this__.toSymbolSVG = function(gwidth, gheight, gcolor, px, py, dotsize, unit, mat) {
    var svgns    = "svg:";
    var svgnsuri = "xmlns:svg=\"http://www.w3.org/2000/svg\"";
    var svgver   = "version=\"1.1\"";

    var width   = gwidth ; // "8cm"
    var height  = gheight; // "6cm"
    var color   = gcolor ; // "black"

    var svg = "<" + svgns + "svg " + svgnsuri + " " + svgver + " " +
        "width=\"" + width + "\" height=\"" + height + "\" " +
        " >\n";
    var n = mat.length;
    for (var x = 0; x < n; x++) {
      for (var y = 0; y < n; y++) {
        if (mat[y][x] != 0) {
          var zx = px + dotsize * (n - x - 1);
          var zy = py + dotsize * (n - y - 1);
          svg += "<" + svgns + "rect " +
              "style=\"" +
                  "fill:" + color + ";" +
                  "stroke:" + "none" + ";" +
                  //"stroke-width:0.05mm;" +
                  "\" " +
              "x=\"" + zx.toString() + unit + "\" " +
              "y=\"" + zy.toString() + unit + "\" " +
              "width=\""  + dotsize.toString() + unit + "\" " +
              "height=\"" + dotsize.toString() + unit + "\" />\n";
        }
      }
    }
    svg += "</" + svgns + "svg>";
    return svg;
  }
});


