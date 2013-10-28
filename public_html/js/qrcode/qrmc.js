


/// micro QR Code renderer
QrCodeMCRenderer = __extends(QrCodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__hitDetProc = function(hitdetmat, sinfo) {
    var nx = hitdetmat[0].length;
    var ny = hitdetmat.length;

    for (var cx = 0; cx < nx; cx++) {
      for (var cy = 0; cy < ny; cy++) {
        if        (cy == (ny - 1)) {
          hitdetmat[cy][cx] = 1; // timing pattern
        } else if (cx == (nx - 1)) {
          hitdetmat[cy][cx] = 1; // timing pattern
        } else if ((cx >= (nx - 9)) && (cy >= (ny - 9))) {
          hitdetmat[cy][cx] = 1;
        }
      }
    }
  }


  /// place codewords to the bit matrix
  __this__.__placeCodewords = function(mat, hitdetmat, segpair, sinfo, shortBits) {
    var nx = mat[0].length;
    var ny = mat.length;
    var cx =  1;
    var cy = -1;
    var d2u =  true;
    var odd = false;

    var data = segpair[0].concat(segpair[1]);
    var intermit = segpair[0].length - 1;
    for (var i = 0; i < data.length; i++) {
      for (var j = 7; j >= 0; j--) {
        for (;;) {
          if (0 < shortBits && i == intermit && j < shortBits) {
            break;
          }

          if (odd) {
            cx += 1;
          } else if ((((ny - 1) == cy) && d2u) || ((0 == cy) && (! d2u))) {
            cx += 1;
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
          } else {
            if (undefined == hitdetmat[cy][cx]) {
              throw new Error("index out of range");
            }
            else { continue; }
          }
        }
      }
    }
  }


  /// place format info to the bit matrix
  __this__.__placeFormatInfo = function(mat, v) {
    var nx = mat[0].length;
    var ny = mat.length;

    for (var i = 0; i <= 7; i++) {
      mat[ny - 2 - i][nx - 9] = ((v >>> i) & 1);
    }
    for (var i = 8; i <= 14; i++) {
      mat[ny - 9][nx - 16 + i] = ((v >>> i) & 1);
    }
  }


  ///
  __this__.__makeFunctionPattern = function(mat, hitdetmat, sinfo) {
    var nx = mat[0].length;
    var ny = mat.length;

    // finder patterns
    this.__makeFinderPattern(mat, nx - 7, ny - 7);

    // timing pattern
    for (var i = 0; i <= ny - 8; i += 2) {
      mat[     i][nx - 1] = 1;
      mat[ny - 1][     i] = 1;
    }
  }


  ///
  __this__.__getHnFLenNumMode = function(version) {
    switch (version) {
    case 1: return 3;
    case 2: return 5;
    case 3: return 7;
    case 4: return 9;
    }
  }


  ///
  __this__.__beginNumMode = function(cur, c, sinfo) {
    switch (sinfo.version) {
    case 1:
      cur.addRawdataBit(c, 3);
      return;
    case 2:
      cur.addRawdataBit(0x00, 1);
      cur.addRawdataBit(c, 4);
      return;
    case 3:
      cur.addRawdataBit(0x00, 2);
      cur.addRawdataBit(c, 5);
      return;
    case 4:
      cur.addRawdataBit(0x00, 3);
      cur.addRawdataBit(c, 6);
      return;
    }
  }


  ///
  __this__.__getHnFLenAlnumMode = function(version) {
    switch (version) {
    case 2: return 4;
    case 3: return 6;
    case 4: return 8;
    }
  }


  ///
  __this__.__beginAlnumMode = function(cur, c, sinfo) {
    switch (sinfo.version) {
    case 2:
      cur.addRawdataBit(0x01, 1);
      cur.addRawdataBit(c, 3);
      return;
    case 3:
      cur.addRawdataBit(0x01, 2);
      cur.addRawdataBit(c, 4);
      return;
    case 4:
      cur.addRawdataBit(0x01, 3);
      cur.addRawdataBit(c, 5);
      return;
    }
  }


  ///
  __this__.__getHnFLen8bitMode = function(version) {
    switch (version) {
    case 3: return 6;
    case 4: return 8;
    }
  }


  ///
  __this__.__begin8bitMode = function(cur, c, sinfo) {
    switch (sinfo.version) {
    case 3:
      cur.addRawdataBit(0x02, 2);
      cur.addRawdataBit(c, 4);
      return;
    case 4:
      cur.addRawdataBit(0x02, 3);
      cur.addRawdataBit(c, 5);
      return;
    }
  }


  ///
  __this__.__finalizeSymbolData = function(cur, sinfo, shortBits) {
    var z = sinfo.dataCodewords * 8 - cur.length - shortBits;

    if (0 < z) {
      // terminator
      var y = Math.min(1 + sinfo.version * 2, z);
      if (8 < y) {
        cur.addRawdataBit(0, 8);
        cur.addRawdataBit(0, 1);
        z -= 9;
      } else {
        cur.addRawdataBit(0, y);
        z -= y;
      }

      // padding bits
      if ((0 < z) && (0 != (cur.length % 8))) {
        y = 8 - Math.min(cur.length % 8, z);
        cur.addRawdataBit(0, y);
        z -= y;
      }

      // pad codewords
      for (var i = 0; 0 < z; i++) {
        y = Math.min(8, z);
        if (y == 8) {
          var a = (0 == (i % 2)) ? 0x00ec: 0x0011;
          cur.addRawdataBit(a, y);
        } else {
          cur.addRawdataBit(0, y);
        }
        z -= y;
      }
    }
  }


  __this__.__buildCodewords = function(cur, sinfo) {
    var dcws = [];
    var ecws = [];

    for (var i = 0, p = 0; i < sinfo.segments.length; i++) {
      var dsize = sinfo.segments[i][2];
      var esize = sinfo.segments[i][1] - dsize;
      var gx = this.gfc.rsMakeGx(esize);
      var segrepeat = sinfo.segments[i][0];
      for (var j = 0; j < segrepeat; j++) {
        var dseg = cur.ar.slice(p, p + dsize).reverse();
        var eseg = this.gfc.rsModPoly(dseg, gx);
        dcws = dcws.concat(dseg.reverse());
        ecws = ecws.concat(eseg.reverse());
        p += dsize;
      }
    }
    return [dcws, ecws];
  }


  ///
  __this__.__estimateMask = function(mat) {
    var nx = mat[0].length;
    var ny = mat.length;
    var z = 0;
    var sum1 = 0, sum2 = 0;
    for (var i = 0; i < ny; i++) {
      if (mat[0][i] != 0) { sum1 += 1; }
      if (mat[i][0] != 0) { sum2 += 1; }
    }
    if (sum1 <= sum2) { z = sum1 * 16 + sum2; }
    else              { z = sum2 * 16 + sum1; }
    return -z;
  }


  ///
  __this__.__maskProcs = [
    [0x00, function(x, y){return (y % 2) == 0;}],
    [0x01, function(x, y){return ((Math.floor(x/3) + Math.floor(y/2)) % 2) == 0;}],
    [0x02, function(x, y){return ((((x * y) % 2) + (x * y) % 3) % 2) == 0;}],
    [0x03, function(x, y){return ((((x + y) % 2) + (x * y) % 3) % 2) == 0;}]
  ];


  ///
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


  ///
  __this__.createSymbol = function(srcstr, version, eclevel, mode, charset, masknr) {
    version = parseInt(version);
    masknr  = parseInt(masknr);

    // make data
    var shortBits = (version % 2) * 4;

    var encodeResults = this.__encodeData(srcstr,
      QrMCSymbolInfo, this.__writerProcsDicts,
      version, eclevel, mode, charset, shortBits);

    var sinfo       = encodeResults.sinfo;
    var writerProcs = encodeResults.writerProcs;
    var rawdat      = encodeResults.rawdat;

    shortBits = (sinfo.version % 2) * 4;

    var cur = new BitArrayCursor(sinfo.dataCodewords);

    writerProcs["beginMode"].call(this, cur, rawdat.charactors, sinfo);
    writerProcs["addData"  ].call(this, cur, rawdat);
    writerProcs["endMode"  ].call(this, cur);
    this.__finalizeSymbolData(cur, sinfo, shortBits);

    if (0 < shortBits) { cur.addRawdataBit(0, 4); }

    // build codewords
    var segpair = this.__buildCodewords(cur, sinfo);

    // create matrix
    var mat       = __newArray2d(sinfo.matrixSize, sinfo.matrixSize, 0);
    var hitdetmat = __newArray2d(sinfo.matrixSize, sinfo.matrixSize, 0);

    this.__hitDetProc(hitdetmat, sinfo);

    // place codewords
    this.__placeCodewords(mat, hitdetmat, segpair, sinfo, shortBits);

    // masking
    var curMask = this.__maskCodewordsEx(mat, hitdetmat, this.__maskProcs, sinfo, masknr);

    // place the others
    var ti = (sinfo.typeNumber << 12) | (curMask[0] << 10);
    this.__placeFormatInfo(mat, (ti | this.bfc.bchModPoly(ti, 0x0537)) ^ 0x4445);

    this.__makeFunctionPattern(mat, hitdetmat, sinfo);

    return [mat];
  }
});


