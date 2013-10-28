


/// QR Code model1 renderer
QrCodeM1Renderer = __extends(QrCodeRendererBase,
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
        if (cx < 2 && cy < 2) {
          hitdetmat[cy][cx] = 1;
        } else if (cy == (ny - 7)) {
          if (8 <= cx && cx <= (nx - 9)) {
            hitdetmat[cy][cx] = 1; // timing pattern
          } else {
            hitdetmat[cy][cx] = 1;
          }
        } else if (cx == (nx - 7)) {
          if (8 <= cy && cy <= (ny - 9)) {
            hitdetmat[cy][cx] = 1; // timing pattern
          } else {
            hitdetmat[cy][cx] = 1;
          }
        } else if ((cx >= (nx - 9)) && (cy >= (ny - 9))) {
          hitdetmat[cy][cx] = 1;
        } else if ((cx >= (nx - 9)) && (cy <=       7 )) {
          hitdetmat[cy][cx] = 1;
        } else if ((cx <=       7 ) && (cy >= (ny - 9))) {
          hitdetmat[cy][cx] = 1;
        }
      }
    }
  }


  ///
  __this__.__placeCodewordsDataHelper = function(data, p) {
    if (p < data.length) { return data[p]; }
    else {
      if (0 == ((data.length - p) % 2)) { return 0x00ec; }
      else                              { return 0x0011; }
    }
  }

  ///
  __this__.__placeCodewords = function(mat, hitdetmat, data, sinfo) {
    var nx = mat[0].length;
    var ny = mat.length;
    var p = 0, w = 0;
    var cx = 0, cy = 0;
    var v = 0;
    var zn = Math.floor(sinfo.version / 2);
    var za = 0, zx = 0;

    w = (Math.floor((ny - 9) / 4));
    for (var j = 0; j < w; j++) {
      za = Math.floor(j / 2);
      cy = 4 * j;
      if (! ((0 == (j % 2)) && 1 <= za && za <= zn)) {
        v = data[p];
        mat[cy + 3][1] = (v >>> 0) & 0x01;
        mat[cy + 3][0] = (v >>> 1) & 0x01;
        mat[cy + 2][1] = (v >>> 2) & 0x01;
        mat[cy + 2][0] = (v >>> 3) & 0x01;
        mat[cy + 1][1] = (v >>> 4) & 0x01;
        mat[cy + 1][0] = (v >>> 5) & 0x01;
        mat[cy + 0][1] = (v >>> 6) & 0x01;
        mat[cy + 0][0] = (v >>> 7) & 0x01;
        p++;
      } else {
        hitdetmat[cy + 3][1] = 1;
        hitdetmat[cy + 3][0] = 1;
        hitdetmat[cy + 2][1] = 1;
        hitdetmat[cy + 2][0] = 1;
        hitdetmat[cy + 1][1] = 1;
        hitdetmat[cy + 1][0] = 1;
        hitdetmat[cy + 0][1] = 1;
        hitdetmat[cy + 0][0] = 1;
      }
    }
    for (var j = 0; j < w; j++) {
      cy = 4 * j;
      v = data[p];
      mat[cy + 3][2 + 1] = (v >>> 0) & 0x01;
      mat[cy + 3][2 + 0] = (v >>> 1) & 0x01;
      mat[cy + 2][2 + 1] = (v >>> 2) & 0x01;
      mat[cy + 2][2 + 0] = (v >>> 3) & 0x01;
      mat[cy + 1][2 + 1] = (v >>> 4) & 0x01;
      mat[cy + 1][2 + 0] = (v >>> 5) & 0x01;
      mat[cy + 0][2 + 1] = (v >>> 6) & 0x01;
      mat[cy + 0][2 + 0] = (v >>> 7) & 0x01;
      p++;
    }

    w = (Math.floor((ny - 9) / 2));
    for (var j = 0; j < w; j++) {
      cy = 2 * j;
      v = data[p];
      mat[cy + 1][4 + 3] = (v >>> 0) & 0x01;
      mat[cy + 1][4 + 2] = (v >>> 1) & 0x01;
      mat[cy + 1][4 + 1] = (v >>> 2) & 0x01;
      mat[cy + 1][4 + 0] = (v >>> 3) & 0x01;
      mat[cy + 0][4 + 3] = (v >>> 4) & 0x01;
      mat[cy + 0][4 + 2] = (v >>> 5) & 0x01;
      mat[cy + 0][4 + 1] = (v >>> 6) & 0x01;
      mat[cy + 0][4 + 0] = (v >>> 7) & 0x01;
      p++;
    }

    w = (Math.floor((ny - 7) / 2));
    zx = Math.floor((nx - 17) / 4)
    for (var i = 0; i < zx; i++) {
      for (var j = 0; j < w; j++) {
        cx = 4 * i + 8;
        cy = 2 * j;
        if (! ((j == 0) && (0 == (i % 2)) && (Math.floor(i / 2) < zn))) {
          v = data[p];
          mat[cy + 1][cx + 3] = (v >>> 0) & 0x01;
          mat[cy + 1][cx + 2] = (v >>> 1) & 0x01;
          mat[cy + 1][cx + 1] = (v >>> 2) & 0x01;
          mat[cy + 1][cx + 0] = (v >>> 3) & 0x01;
          mat[cy + 0][cx + 3] = (v >>> 4) & 0x01;
          mat[cy + 0][cx + 2] = (v >>> 5) & 0x01;
          mat[cy + 0][cx + 1] = (v >>> 6) & 0x01;
          mat[cy + 0][cx + 0] = (v >>> 7) & 0x01;
          p++;
        } else {
          hitdetmat[cy + 1][cx + 3] = 1;
          hitdetmat[cy + 1][cx + 2] = 1;
          hitdetmat[cy + 1][cx + 1] = 1;
          hitdetmat[cy + 1][cx + 0] = 1;
          hitdetmat[cy + 0][cx + 3] = 1;
          hitdetmat[cy + 0][cx + 2] = 1;
          hitdetmat[cy + 0][cx + 1] = 1;
          hitdetmat[cy + 0][cx + 0] = 1;
        }
      }
      for (var j = 3; j > 0; j--) {
        cx = 4 * i + 8 ;
        cy = ny - (2 * j);
        v = data[p];
        mat[cy + 1][cx + 3] = (v >>> 0) & 0x01;
        mat[cy + 1][cx + 2] = (v >>> 1) & 0x01;
        mat[cy + 1][cx + 1] = (v >>> 2) & 0x01;
        mat[cy + 1][cx + 0] = (v >>> 3) & 0x01;
        mat[cy + 0][cx + 3] = (v >>> 4) & 0x01;
        mat[cy + 0][cx + 2] = (v >>> 5) & 0x01;
        mat[cy + 0][cx + 1] = (v >>> 6) & 0x01;
        mat[cy + 0][cx + 0] = (v >>> 7) & 0x01;
        p++;
      }
    }

    w = (Math.floor((ny - 17) / 4));
    for (var j = 0; j < w; j++) {
      cx = nx - 9;
      cy = 4 * j + 8;
      v = data[p];
      mat[cy + 3][cx + 1] = (v >>> 0) & 0x01;
      mat[cy + 3][cx + 0] = (v >>> 1) & 0x01;
      mat[cy + 2][cx + 1] = (v >>> 2) & 0x01;
      mat[cy + 2][cx + 0] = (v >>> 3) & 0x01;
      mat[cy + 1][cx + 1] = (v >>> 4) & 0x01;
      mat[cy + 1][cx + 0] = (v >>> 5) & 0x01;
      mat[cy + 0][cx + 1] = (v >>> 6) & 0x01;
      mat[cy + 0][cx + 0] = (v >>> 7) & 0x01;
      p++;
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < w; j++) {
        cx = nx - 6 + 2 * i;
        cy = 4 * j + 8;
        v = this.__placeCodewordsDataHelper(data, p);
        mat[cy + 3][cx + 1] = (v >>> 0) & 0x01;
        mat[cy + 3][cx + 0] = (v >>> 1) & 0x01;
        mat[cy + 2][cx + 1] = (v >>> 2) & 0x01;
        mat[cy + 2][cx + 0] = (v >>> 3) & 0x01;
        mat[cy + 1][cx + 1] = (v >>> 4) & 0x01;
        mat[cy + 1][cx + 0] = (v >>> 5) & 0x01;
        mat[cy + 0][cx + 1] = (v >>> 6) & 0x01;
        mat[cy + 0][cx + 0] = (v >>> 7) & 0x01;
        p++;
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


  ///
  __this__.__makeFunctionPattern = function(mat, hitdetmat, sinfo) {
    var nx = mat[0].length;
    var ny = mat.length;

    // finder patterns
    this.__makeFinderPattern(mat, nx - 7, ny - 7);
    this.__makeFinderPattern(mat,      0, ny - 7);
    this.__makeFinderPattern(mat, nx - 7,      0);
    mat[0][0] = 1;
    mat[7][nx - 9] = 1;

    var z = Math.floor(sinfo.version / 2);
    for (var i = 1; i <= z; i++) {
      mat[0][i * 8 + 0] = 1;
      mat[0][i * 8 + 1] = 1;
      mat[0][i * 8 + 2] = 1;
      mat[0][i * 8 + 3] = 1;
      mat[i * 8 + 0][0] = 1;
      mat[i * 8 + 1][0] = 1;
      mat[i * 8 + 2][0] = 1;
      mat[i * 8 + 3][0] = 1;
    }

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
    } else {
      return 16;
    }
  }


  ///
  __this__.__beginNumMode = function(cur, c, sinfo) {
    cur.addRawdataBit(0x01, 4);

    if (sinfo.version < 10) {
      cur.addRawdataBit((c >>> 2) & 0x00ff, 8);
      cur.addRawdataBit( c        & 0x00ff, 2);
    } else {
      cur.addRawdataBit((c >>> 4) & 0x00ff, 8);
      cur.addRawdataBit( c        & 0x00ff, 4);
    }
  }


  ///
  __this__.__getHnFLenAlnumMode = function(version) {
    if (version < 10) {
      return 13;
    } else {
      return 15;
    }
  }


  ///
  __this__.__beginAlnumMode = function(cur, c, sinfo) {
    cur.addRawdataBit(0x02, 4);

    if (sinfo.version < 10) {
      cur.addRawdataBit((c >>> 1) & 0x00ff, 8);
      cur.addRawdataBit( c        & 0x00ff, 1);
    } else {
      cur.addRawdataBit((c >>> 3) & 0x00ff, 8);
      cur.addRawdataBit( c        & 0x00ff, 3);
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
    return dcws.concat(ecws);
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
      QrM1SymbolInfo, this.__writerProcsDicts,
      version, eclevel, mode, charset, 4);
    var sinfo       = encodeResults.sinfo;
    var writerProcs = encodeResults.writerProcs;
    var rawdat      = encodeResults.rawdat;

    var cur = new BitArrayCursor(sinfo.dataCodewords);
    cur.addRawdataBit(0x00, 4);

    writerProcs["beginMode"].call(this, cur, rawdat.charactors, sinfo);
    writerProcs["addData"  ].call(this, cur, rawdat);
    writerProcs["endMode"  ].call(this, cur);
    this.__finalizeSymbolData(cur, sinfo);

    // build codewords
    var concatseg = this.__buildCodewords(cur, sinfo);

    // concat remainder

    // create matrix
    var mat       = __newArray2d(sinfo.matrixSize, sinfo.matrixSize, 0);
    var hitdetmat = __newArray2d(sinfo.matrixSize, sinfo.matrixSize, 0);

    this.__hitDetProc(hitdetmat, sinfo);

    // place codewords
    this.__placeCodewords(mat, hitdetmat, concatseg, sinfo);

    // masking
    var curMask = this.__maskCodewordsEx(mat, hitdetmat, this.__maskProcs, sinfo, masknr);

    // place the others
    var ti = (sinfo.eclevel << 13) | (curMask[0] << 10);
    this.__placeFormatInfo(mat, (ti | this.bfc.bchModPoly(ti, 0x0537)) ^ 0x2825);

    this.__makeFunctionPattern(mat, hitdetmat, sinfo);

    return [mat];
  }
});


