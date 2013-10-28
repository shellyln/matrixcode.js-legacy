


///
EANBarcodeRendererBase = __extends(SimpleBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__barPattern = {
    // [oe, odd, even]
    "0": ["_oooooo", "3211", "1123"],
    "1": ["_ooEoEE", "2221", "1222"],
    "2": ["_ooEEoE", "2122", "2212"],
    "3": ["_ooEEEo", "1411", "1141"],
    "4": ["_oEooEE", "1132", "2311"],
    "5": ["_oEEooE", "1231", "1321"],
    "6": ["_oEEEoo", "1114", "4111"],
    "7": ["_oEoEoE", "1312", "2131"],
    "8": ["_oEoEEo", "1213", "3121"],
    "9": ["_oEEoEo", "3112", "2113"]
  };
});


///
EAN13BarcodeRenderer = __extends(EANBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, exth, d) {
    var ctx = canvas.getContext("2d");
    var eo = this.__barPattern[d[0]][0];
    var p = 0, q = 0;
    var w = "";

    // bwb
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 1;

    for (var i = 1; i < 7; i++) {
      // wbwb
      w = this.__barPattern[d[i]][(eo[i] == "E") ? 2 : 1];
      for (var j = 0; j < 4; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 1) {
          ctx.fillRect(px + barw * p, py, barw * q, barh);
        }
        p += q;
      }
    }

    // wbwbw
    p += 1;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;

    for (var i = 7; i < 13; i++) {
      // bwbw
      w = this.__barPattern[d[i]][1];
      for (var j = 0; j < 4; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 0) {
          ctx.fillRect(px + barw * p, py, barw * q, barh);
        }
        p += q;
      }
    }

    // bwb
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    srcstr += "000000000000";
    srcstr = srcstr.substring(0, 12);
    srcstr += this.modulas10wgt3(srcstr).toString();
    return srcstr;
  }
});


///
EAN8BarcodeRenderer = __extends(EANBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, exth, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w = "";

    // bwb
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 1;

    for (var i = 0; i < 4; i++) {
      // wbwb
      w = this.__barPattern[d[i]][1];
      for (var j = 0; j < 4; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 1) {
          ctx.fillRect(px + barw * p, py, barw * q, barh);
        }
        p += q;
      }
    }

    // wbwbw
    p += 1;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;

    for (var i = 4; i < 8; i++) {
      // bwbw
      w = this.__barPattern[d[i]][1];
      for (var j = 0; j < 4; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 0) {
          ctx.fillRect(px + barw * p, py, barw * q, barh);
        }
        p += q;
      }
    }

    // bwb
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    srcstr += "0000000";
    srcstr = srcstr.substring(0, 7);
    srcstr += this.modulas10wgt3(srcstr).toString();
    return srcstr;
  }
});


///
UPCBarcodeRendererBase = __extends(SimpleBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__barPattern = {
    // eo, odd, even
    "0": ["EEEooo", "3211", "1123"],
    "1": ["EEoEoo", "2221", "1222"],
    "2": ["EEooEo", "2122", "2212"],
    "3": ["EEoooE", "1411", "1141"],
    "4": ["EoEEoo", "1132", "2311"],
    "5": ["EooEEo", "1231", "1321"],
    "6": ["EoooEE", "1114", "4111"],
    "7": ["EoEoEo", "1312", "2131"],
    "8": ["EoEooE", "1213", "3121"],
    "9": ["EooEoE", "3112", "2113"]
  };


  ///
  __this__.modulas10wgt3upc = function(srcstr) {
    var m = 0;
    for (var i = 0; i < srcstr.length; i++) {
      m += (((i + 1) % 2) * 2 + 1) * parseInt(srcstr[i]);
    }
    return (10 - (m % 10)) % 10;
  }


  ///
  __this__.modulas10wgt3n9upc = function(srcstr) {
    var m = 0;
    for (var i = 0; i < srcstr.length; i++) {
      m += (((i) % 2) * 3 + 3) * parseInt(srcstr[i]);
    }
    return (10 - (m % 10)) % 10;
  }
});


///
UPCABarcodeRenderer = __extends(UPCBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, exth, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w = "";

    // bwb
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 1;

    for (var i = 0; i < 6; i++) {
      // wbwb
      w = this.__barPattern[d[i]][1];
      for (var j = 0; j < 4; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 1) {
          ctx.fillRect(px + barw * p, py, barw * q, barh + (exth * (((i % 11) == 0) ? 1 : 0)));
        }
        p += q;
      }
    }

    // wbwbw
    p += 1;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;

    for (var i = 6; i < 12; i++) {
      // bwbw
      w = this.__barPattern[d[i]][1];
      for (var j = 0; j < 4; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 0) {
          ctx.fillRect(px + barw * p, py, barw * q, barh + (exth * (((i % 11) == 0) ? 1 : 0)));
        }
        p += q;
      }
    }

    // bwb
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    srcstr += "00000000000";
    srcstr = srcstr.substring(0, 11);
    srcstr += this.modulas10wgt3upc(srcstr).toString();
    return srcstr;
  }
});


///
UPCEBarcodeRenderer = __extends(UPCBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, exth, d) {
    var ctx = canvas.getContext("2d");
    var eo = this.__barPattern[d[6]][0];
    var p = 0, q = 0;
    var w = "";

    // bwb
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 1;

    for (var i = 0; i < 6; i++) {
      // wbwb
      w = this.__barPattern[d[i]][(eo[i] == "E") ? 2 : 1];
      for (var j = 0; j < 4; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 1) {
          ctx.fillRect(px + barw * p, py, barw * q, barh);
        }
        p += q;
      }
    }

    // wbwbwb
    p += 1;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh + exth);
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    srcstr += "000000";
    srcstr = srcstr.substring(0, 6);
    var expstr = "";
    switch (srcstr[5]) {
    case "0":
      expstr = "0" + srcstr.substring(0, 2) + "00000" + srcstr.substring(2, 5);
      break;
    case "1":
      expstr = "0" + srcstr.substring(0, 2) + "10000" + srcstr.substring(2, 5);
      break;
    case "2":
      expstr = "0" + srcstr.substring(0, 2) + "20000" + srcstr.substring(2, 5);
      break;
    case "3":
      expstr = "0" + srcstr.substring(0, 3) + "00000" + srcstr.substring(3, 5);
      break;
    case "4":
      expstr = "0" + srcstr.substring(0, 4) + "00000" + srcstr.substring(4, 5);
      break;
    case "5":
      expstr = "0" + srcstr.substring(0, 5) + "00005";
      break;
    case "6":
      expstr = "0" + srcstr.substring(0, 5) + "00006";
      break;
    case "7":
      expstr = "0" + srcstr.substring(0, 5) + "00007";
      break;
    case "8":
      expstr = "0" + srcstr.substring(0, 5) + "00008";
      break;
    case "9":
      expstr = "0" + srcstr.substring(0, 5) + "00009";
      break;
    }
    srcstr += this.modulas10wgt3upc(expstr).toString();
    return srcstr;
  }
});


///
UPC5BarcodeRenderer = __extends(UPCBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, exth, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w = "";

    // bwb
    ctx.fillRect(px + barw * p, py, barw, barh);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw * 2, barh);
    p += 2;

    for (var i = 0; i < 5; i++) {
      // wbwb
      w = this.__barPattern[d[i]][1];
      for (var j = 0; j < 4; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 1) {
          ctx.fillRect(px + barw * p, py, barw * q, barh);
        }
        p += q;
      }
      p += 1;
      ctx.fillRect(px + barw * p, py, barw, barh);
    }

    // wbwb
    p += 1;
    ctx.fillRect(px + barw * p, py, barw, barh);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh);
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    srcstr += "00000";
    srcstr = srcstr.substring(0, 5);
    srcstr += this.modulas10wgt3n9upc(srcstr).toString();
    return srcstr;
  }
});


///
UPC2BarcodeRenderer = __extends(UPCBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, exth, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w = "";

    // bwb
    ctx.fillRect(px + barw * p, py, barw, barh);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw * 2, barh);
    p += 2;

    for (var i = 0; i < 2; i++) {
      // wbwb
      w = this.__barPattern[d[i]][1];
      for (var j = 0; j < 4; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 1) {
          ctx.fillRect(px + barw * p, py, barw * q, barh);
        }
        p += q;
      }
      p += 1;
      ctx.fillRect(px + barw * p, py, barw, barh);
    }

    // wbwb
    p += 1;
    ctx.fillRect(px + barw * p, py, barw, barh);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh);
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    srcstr += "00";
    srcstr = srcstr.substring(0, 2);
    return srcstr;
  }
});


