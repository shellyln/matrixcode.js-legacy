


/// QR Code model2 renderer
QrCodeM2Renderer = __extends(QrCodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__hitDetAlignmentpat = function(hitdetmat, sinfo) {
    var nx = hitdetmat[0].length;
    var ny = hitdetmat.length;
    var apats = sinfo.alignmentPats;

    for (var i = 0; i < apats.length; i++) {
      var a = apats[i];
      for (var j = 0; j < apats.length; j++){
        var b = apats[j];
        var q = true;

        for (var x = (a - 2); x<= (a + 2); x++) {
          for (var y = (b - 2); y<= (b + 2); y++) {
            if (1 == hitdetmat[ny - y - 1][nx - x - 1]) {
              q = false;
            }
          }
        }
        if (q) {
          for (var x = (a - 2); x<= (a + 2); x++) {
            for (var y = (b - 2); y<= (b + 2); y++) {
              hitdetmat[ny - y - 1][nx - x - 1] = 88; //alignment pattern
            }
          }
        }
      }
    }
  }


  ///
  __this__.__hitDetProc = function(hitdetmat, sinfo) {
    var nx = hitdetmat[0].length;
    var ny = hitdetmat.length;

    for (var cx = 0; cx < nx; cx++) {
      for (var cy = 0; cy < ny; cy++) {
        if        (cy == (ny - 7)) {
          if (8 <= cx && cx <= (nx - 9)) {
            hitdetmat[cy][cx] = 88; // timing pattern
          } else {
            hitdetmat[cy][cx] = 1;
          }
        } else if (cx == (nx - 7)) {
          if (8 <= cy && cy <= (ny - 9)) {
            hitdetmat[cy][cx] = 88; // timing pattern
          } else {
            hitdetmat[cy][cx] = 1;
          }
        } else if ((cx >= (nx - 9)) && (cy >= (ny - 9))) {
          hitdetmat[cy][cx] = 1;
        } else if ((cx >= (nx - 9)) && (cy <=       7 )) {
          hitdetmat[cy][cx] = 1;
        } else if ((cx <=       7 ) && (cy >= (ny - 9))) {
          hitdetmat[cy][cx] = 1;
        } else if ((7 <= sinfo.version) && (cx >= (nx - 6) && (cy <= 10))) {
          hitdetmat[cy][cx] = 1;
        } else if ((7 <= sinfo.version) && (cy >= (ny - 6) && (cx <= 10))) {
          hitdetmat[cy][cx] = 1;
        }
      }
    }
  }


  /// place codewords to the bit matrix
  __this__.__placeCodewords = function(mat, hitdetmat, data, sinfo) {
    var nx = mat[0].length;
    var ny = mat.length;
    var cx =  1;
    var cy = -1;
    var d2u =  true;
    var odd = false;

    for (var i = 0; i < data.length; i++) {
      for (var j = 7; j >= 0; j--) {
        for (;;) {
          if (odd) {
            cx += 1;
          } else if ((((ny - 1) == cy) && d2u) || ((0 == cy) && (! d2u))) {
            if (cx == (nx - 8)) { cx += 2; }
            else                { cx += 1; }
            d2u = ! d2u;
          } else {
            cx -= 1;
            if (d2u) { cy += 1; }
            else     { cy -= 1; }
          }
          odd = ! odd;

          // determine
          if (0 == hitdetmat[cy][cx]) {
            mat[cy][cx] = (data[i] >>> j) & 0x01;
            break;
          } else { continue; }
        }
      }
    }
  }


  /// place format info to the bit matrix
  __this__.__placeFormatInfo = function(mat, v) {
    var nx = mat[0].length;
    var ny = mat.length;

    for (var i = 0; i <= 7; i++) {
      mat[ny - 9][i          ] = ((v >>> i) & 1);
    }
    for (var i = 8; i <= 8; i++) {
      mat[ny - 9][i + nx - 16] = ((v >>> i) & 1);
    }
    for (var i = 9; i <= 14; i++) {
      mat[ny - 9][i + nx - 15] = ((v >>> i) & 1);
    }

    for (var i = 0; i <= 5; i++) {
      mat[ny - 1 - i][nx - 9] = ((v >>> i) & 1);
    }
    for (var i = 6; i <= 7; i++) {
      mat[ny - 2 - i][nx - 9] = ((v >>> i) & 1);
    }
    for (var i = 8; i <= 14; i++) {
      mat[14     - i][nx - 9] = ((v >>> i) & 1);
    }
  }


  /// place version info to the bit matrix
  __this__.__placeVersionInfo = function(mat, vi) {
    var nx = mat[0].length;
    var ny = mat.length;

    mat[10][nx - 1] = ((vi >>>  0) & 1);
    mat[ 9][nx - 1] = ((vi >>>  1) & 1);
    mat[ 8][nx - 1] = ((vi >>>  2) & 1);
    mat[10][nx - 2] = ((vi >>>  3) & 1);
    mat[ 9][nx - 2] = ((vi >>>  4) & 1);
    mat[ 8][nx - 2] = ((vi >>>  5) & 1);
    mat[10][nx - 3] = ((vi >>>  6) & 1);
    mat[ 9][nx - 3] = ((vi >>>  7) & 1);
    mat[ 8][nx - 3] = ((vi >>>  8) & 1);
    mat[10][nx - 4] = ((vi >>>  9) & 1);
    mat[ 9][nx - 4] = ((vi >>> 10) & 1);
    mat[ 8][nx - 4] = ((vi >>> 11) & 1);
    mat[10][nx - 5] = ((vi >>> 12) & 1);
    mat[ 9][nx - 5] = ((vi >>> 13) & 1);
    mat[ 8][nx - 5] = ((vi >>> 14) & 1);
    mat[10][nx - 6] = ((vi >>> 15) & 1);
    mat[ 9][nx - 6] = ((vi >>> 16) & 1);
    mat[ 8][nx - 6] = ((vi >>> 17) & 1);

    mat[ny - 1][10] = ((vi >>>  0) & 1);
    mat[ny - 1][ 9] = ((vi >>>  1) & 1);
    mat[ny - 1][ 8] = ((vi >>>  2) & 1);
    mat[ny - 2][10] = ((vi >>>  3) & 1);
    mat[ny - 2][ 9] = ((vi >>>  4) & 1);
    mat[ny - 2][ 8] = ((vi >>>  5) & 1);
    mat[ny - 3][10] = ((vi >>>  6) & 1);
    mat[ny - 3][ 9] = ((vi >>>  7) & 1);
    mat[ny - 3][ 8] = ((vi >>>  8) & 1);
    mat[ny - 4][10] = ((vi >>>  9) & 1);
    mat[ny - 4][ 9] = ((vi >>> 10) & 1);
    mat[ny - 4][ 8] = ((vi >>> 11) & 1);
    mat[ny - 5][10] = ((vi >>> 12) & 1);
    mat[ny - 5][ 9] = ((vi >>> 13) & 1);
    mat[ny - 5][ 8] = ((vi >>> 14) & 1);
    mat[ny - 6][10] = ((vi >>> 15) & 1);
    mat[ny - 6][ 9] = ((vi >>> 16) & 1);
    mat[ny - 6][ 8] = ((vi >>> 17) & 1);
  }


  ///
  __this__.__makeAlignmentPattern = function(mat, hitdetmat, sinfo) {
    var nx = mat[0].length;
    var ny = mat.length;
    var apats = sinfo.alignmentPats;

    for (var i = 0; i < apats.length; i++) {
      var a = nx - apats[i] - 1;
      for (var j = 0; j < apats.length; j++) {
        var b = ny - apats[j] - 1;
        var v = hitdetmat[b][a];
        if (88 == v) {
          mat[b + 2][a - 2] = 1;
          mat[b + 1][a - 2] = 1;
          mat[b    ][a - 2] = 1;
          mat[b - 1][a - 2] = 1;
          mat[b - 2][a - 2] = 1;
          mat[b + 2][a + 2] = 1;
          mat[b + 1][a + 2] = 1;
          mat[b    ][a + 2] = 1;
          mat[b - 1][a + 2] = 1;
          mat[b - 2][a + 2] = 1;
          mat[b - 2][a + 1] = 1;
          mat[b + 2][a + 1] = 1;
          mat[b + 2][a    ] = 1;
          mat[b    ][a    ] = 1;
          mat[b - 2][a    ] = 1;
          mat[b - 2][a - 1] = 1;
          mat[b + 2][a - 1] = 1;
        }
      }
    }
  }


  ///
  __this__.__makeFunctionPattern = function(mat, hitdetmat, sinfo) {
    var nx = mat[0].length;
    var ny = mat.length;

    // finder patterns
    this.__makeFinderPattern(mat, nx - 7, ny - 7);
    this.__makeFinderPattern(mat,      0, ny - 7);
    this.__makeFinderPattern(mat, nx - 7,      0);
    mat[7][nx - 9] = 1;

    // alignment patterns
    this.__makeAlignmentPattern(mat, hitdetmat, sinfo);

    // timing pattern
    for (var i = 8; i <= ny - 9; i += 2) {
      mat[     i][nx - 7] = 1;
      mat[ny - 7][     i] = 1;
    }
  }


  ///
  __this__.__getHnFLenNumMode = function(version) {
    if (version < 10) {
      return 14;
    } else if (version < 27) {
      return 16;
    } else {
      return 18;
    }
  }


  ///
  __this__.__beginNumMode = function(cur, c, sinfo) {
    cur.addRawdataBit(0x01, 4);

    if (sinfo.version < 10) {
      cur.addRawdataBit((c >>> 2) & 0x00ff, 8);
      cur.addRawdataBit( c        & 0x00ff, 2);
    } else if (sinfo.version < 27) {
      cur.addRawdataBit((c >>> 4) & 0x00ff, 8);
      cur.addRawdataBit( c        & 0x00ff, 4);
    } else {
      cur.addRawdataBit((c >>> 6) & 0x00ff, 8);
      cur.addRawdataBit( c        & 0x00ff, 6);
    }
  }


  ///
  __this__.__getHnFLenAlnumMode = function(version) {
    if (version < 10) {
      return 13;
    } else if (version < 27) {
      return 15;
    } else {
      return 17;
    }
  }


  ///
  __this__.__beginAlnumMode = function(cur, c, sinfo) {
    cur.addRawdataBit(0x02, 4);

    if (sinfo.version < 10) {
      cur.addRawdataBit((c >>> 1) & 0x00ff, 8);
      cur.addRawdataBit( c        & 0x00ff, 1);
    } else if (sinfo.version < 27) {
      cur.addRawdataBit((c >>> 3) & 0x00ff, 8);
      cur.addRawdataBit( c        & 0x00ff, 3);
    } else {
      cur.addRawdataBit((c >>> 5) & 0x00ff, 8);
      cur.addRawdataBit( c        & 0x00ff, 5);
    }
  }


  ///
  __this__.__getHnFLen8bitMode = function(version) {
    if (version < 10) {
      return 12;
    } else {
      return 20;
    }
  }


  ///
  __this__.__begin8bitMode = function(cur, c, sinfo) {
    cur.addRawdataBit(0x04, 4);

    if (sinfo.version < 10) {
      cur.addRawdataBit( c       & 0x00ff, 8);
    } else {
      cur.addRawdataBit((c >> 8) & 0x00ff, 8);
      cur.addRawdataBit( c       & 0x00ff, 8);
    }
  }


  ///
  __this__.__beginRootEci = function(cur) {
    cur.addRawdataBit(0, 4);
    throw new Error("not impl");
  }


  ///
  __this__.__endRootEci = function(cur) {
    cur.addRawdataBit(0, 4);
    throw new Error("not impl");
  }


  __this__.__buildCodewords = function(cur, sinfo) {
    var codewords = [];
    var dcwstack = [];
    var ecwstack = [];

    // interleaving
    for (var i = 0, p = 0; i < sinfo.segments.length; i++) {
      var dsize = sinfo.segments[i][2];
      var esize = sinfo.segments[i][1] - dsize;
      var gx = this.gfc.rsMakeGx(esize);
      var segrepeat = sinfo.segments[i][0];
      for (var j = 0; j < segrepeat; j++) {
        var dseg = cur.ar.slice(p, p + dsize).reverse();
        var eseg = this.gfc.rsModPoly(dseg, gx);
        dcwstack.push(dseg.reverse());
        ecwstack.push(eseg.reverse());
        p += dsize;
      }
    }

    for (var i = 0, z = true; z; i++) {
      z = false;
      for (var j = 0; j < dcwstack.length; j++) {
        if (i < dcwstack[j].length) {
          codewords.push(dcwstack[j][i]);
          z = true;
        }
      }
    }
    for (var i = 0, z = true; z; i++) {
      z = false;
      for (var j = 0; j < ecwstack.length; j++) {
        if (i < ecwstack[j].length) {
          codewords.push(ecwstack[j][i]);
          z = true;
        }
      }
    }
    return codewords;
  }


  __this__.__writerProcsDicts = {
    "Auto" : {
      getHnFLen   :__this__.__getHnFLenAutoMode,
      prepareData :__this__.__prepareAutoData  ,
      beginMode   :__this__.__beginAutoMode    ,
      addData     :__this__.__addBitarrData    ,
      endMode     :__this__.__endAutoMode      ,
      verSensitive:true                        ,
      next        :undefined                   },
    "Num"  : {
      getHnFLen   :__this__.__getHnFLenNumMode,
      prepareData :__this__.__prepareNumData  ,
      beginMode   :__this__.__beginNumMode    ,
      addData     :__this__.__addBitarrData   ,
      endMode     :__this__.__endNumMode      ,
      verSensitive:false                      ,
      next        :"Alnum"                    },
    "Alnum": {
      getHnFLen   :__this__.__getHnFLenAlnumMode,
      prepareData :__this__.__prepareAlnumData  ,
      beginMode   :__this__.__beginAlnumMode    ,
      addData     :__this__.__addBitarrData     ,
      endMode     :__this__.__endAlnumMode      ,
      verSensitive:false                        ,
      next        :"8bit"                       },
    "8bit" : {
      getHnFLen   :__this__.__getHnFLen8bitMode,
      prepareData :__this__.__prepare8bitData  ,
      beginMode   :__this__.__begin8bitMode    ,
      addData     :__this__.__add8bitData      ,
      endMode     :__this__.__end8bitMode      ,
      verSensitive:false                       ,
      next        :undefined                   },
    "Kanji": {}
  };


  __this__.createSymbol = function(srcstr, version, eclevel, mode, charset, masknr) {
    version = parseInt(version);
    masknr  = parseInt(masknr);

    // make data
    var encodeResults = this.__encodeData(srcstr,
      QrM2SymbolInfo, this.__writerProcsDicts,
      version, eclevel, mode, charset, 0);
    var sinfo       = encodeResults.sinfo;
    var writerProcs = encodeResults.writerProcs;
    var rawdat      = encodeResults.rawdat;

    var cur = new BitArrayCursor(sinfo.dataCodewords);

    writerProcs["beginMode"].call(this, cur, rawdat.charactors, sinfo);
    writerProcs["addData"  ].call(this, cur, rawdat);
    writerProcs["endMode"  ].call(this, cur);
    this.__finalizeSymbolData(cur, sinfo);

    // build codewords
    var concatdseg = this.__buildCodewords(cur, sinfo);

    // create matrix
    var mat       = __newArray2d(sinfo.matrixSize, sinfo.matrixSize, 0);
    var hitdetmat = __newArray2d(sinfo.matrixSize, sinfo.matrixSize, 0);

    this.__hitDetProc(hitdetmat, sinfo);
    this.__hitDetAlignmentpat(hitdetmat, sinfo);

    // place codewords
    this.__placeCodewords(mat, hitdetmat, concatdseg, sinfo);

    // masking
    var curMask = this.__maskCodewordsEx(mat, hitdetmat, this.__maskProcs, sinfo, masknr);

    // place the others
    var ti = (sinfo.eclevel << 13) | (curMask[0] << 10);
    this.__placeFormatInfo(mat, (ti | this.bfc.bchModPoly(ti, 0x0537)) ^ 0x5412);

    if (7 <= sinfo.version) {
      var vi = sinfo.version << 12;
      this.__placeVersionInfo(mat, ti | this.bfc.bchModPoly(vi, 0x1f25));
    }

    this.__makeFunctionPattern(mat, hitdetmat, sinfo);

    return [mat];
  }
});


