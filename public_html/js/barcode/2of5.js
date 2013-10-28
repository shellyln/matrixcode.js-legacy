


///
ITFBarcodeRenderer = __extends(SimpleBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__barPattern = {
    "0": "11221",
    "1": "21112",
    "2": "12112",
    "3": "22111",
    "4": "11212",
    "5": "21211",
    "6": "12211",
    "7": "11122",
    "8": "21121",
    "9": "12121"
  };


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w1 = "";
    var w2 = "";

    // bwbw
    ctx.fillRect(px + barw * p, py, barw, barh);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw, barh);
    p += 2;

    for (var i = 0; i < d.length; i += 2) {
      w1 = this.__barPattern[d[i]];
      w2 = this.__barPattern[d[i + 1]];
      for (var j = 0; j < 5; j++) {
        q = parseInt(w1[j]);
        ctx.fillRect(px + barw * p, py, barw * q, barh);
        p += q + parseInt(w2[j]);
      }
    }

    // bbwb
    ctx.fillRect(px + barw * p, py, barw * 2, barh);
    p += 3;
    ctx.fillRect(px + barw * p, py, barw, barh);
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    srcstr += this.__getCDChar(srcstr);
    return srcstr;
  }


  ///
  __this__.__getCDChar = function(srcstr) {
    return this.modulas10wgt3(srcstr).toString();
  }
});


///
Matrix2of5BarcodeRendererBase = __extends(SimpleBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  /// start(<), stop(>), 0-9
  //__this__.__barPattern = {
  //};


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w = "";

    for (var i = 0; i < d.length; i++) {
      w = this.__barPattern[d[i]];
      for (var j = 0; j < w.length; j++) {
        q = parseInt(w[j]);
        if ((j % 2) == 0) {
          ctx.fillRect(px + barw * p, py, barw * q, barh);
        }
        p += q;
      }
      p += 1;
    }
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    return "<" + srcstr + this.__getCDChar(srcstr) + ">";
  }


  ///
  __this__.__getCDChar = function(srcstr) {
    return this.modulas10wgt3(srcstr).toString();
  }
});


///
COOP2of5BarcodeRenderer = __extends(Matrix2of5BarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__barPattern = {
    "<": "212",
    "0": "22111",
    "1": "11122",
    "2": "11212",
    "3": "11221",
    "4": "12112",
    "5": "12121",
    "6": "12211",
    "7": "21112",
    "8": "21121",
    "9": "21211",
    ">": "122"
  };
});


///
Matrix2of5BarcodeRenderer = __extends(Matrix2of5BarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__barPattern = {
    "<": "21111",
    "0": "11221",
    "1": "21112",
    "2": "12112",
    "3": "22111",
    "4": "11212",
    "5": "21211",
    "6": "12211",
    "7": "11122",
    "8": "21121",
    "9": "12121",
    ">": "21111"
  };
});


///
Ind2of5BarcodeRenderer = __extends(SimpleBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__barPattern = {
    "0": "11221",
    "1": "21112",
    "2": "12112",
    "3": "22111",
    "4": "11212",
    "5": "21211",
    "6": "12211",
    "7": "11122",
    "8": "21121",
    "9": "12121"
  };


  ///
  __this__.drawSymbol = function(canvas, px, py, barw, barh, d) {
    var ctx = canvas.getContext("2d");
    var p = 0, q = 0;
    var w = "";

    // bbwbbwbw
    ctx.fillRect(px + barw * p, py, barw * 2, barh);
    p += 3;
    ctx.fillRect(px + barw * p, py, barw * 2, barh);
    p += 3;
    ctx.fillRect(px + barw * p, py, barw, barh);
    p += 2;

    for (var i = 0; i < d.length; i++) {
      w = this.__barPattern[d[i]];
      for (var j = 0; j < 5; j++) {
        q = parseInt(w[j]);
        ctx.fillRect(px + barw * p, py, barw * q, barh);
        p += q + 1;
      }
    }

    // bbwbwbb
    ctx.fillRect(px + barw * p, py, barw * 2, barh);
    p += 3;
    ctx.fillRect(px + barw * p, py, barw, barh);
    p += 2;
    ctx.fillRect(px + barw * p, py, barw * 2, barh);
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    srcstr += this.modulas10wgt3(srcstr).toString();
    return srcstr;
  }
});


