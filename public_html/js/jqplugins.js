

/// global instance of QR Code model2 renderer.
__g_inst_QrCodeM2Renderer__ = new QrCodeM2Renderer();
__g_inst_QrCodeMCRenderer__ = new QrCodeMCRenderer();
__g_inst_QrCodeM1Renderer__ = new QrCodeM1Renderer();
__g_inst_Dmatx200Renderer__ = new DataMatrixECC200Renderer();


/// JQuery plugin of QR Code model2 renderer.
$.fn.paintQrCodeM2 = function(version, level, mode, charset, data, px, py, dotsize, mask) {
  var mat = __g_inst_QrCodeM2Renderer__.createSymbol(data, version, level, mode, charset, mask);
  var i = 0;
  return this.each(function() {
    if (i < mat.length) {
      __g_inst_QrCodeM2Renderer__.drawSymbol(this, px, py, dotsize, mat[i]);
    }
    i++;
  });
}


///
$.fn.paintQrCodeM2_SVG = function(version, level, mode, charset, data, px, py, dotsize, mask) {
  var canvsizeX = (__g_qrm2matsize__[version] * dotsize) + (px * 2);
  var canvsizeY = (__g_qrm2matsize__[version] * dotsize) + (py * 2);
  var mat = __g_inst_QrCodeM2Renderer__.createSymbol(data, version, level, mode, charset, mask);
  var i = 0;
  return this.each(function() {
    var svg = "";
    if (i < mat.length) {
      svg = __g_inst_QrCodeM2Renderer__.toSymbolSVG(
        canvsizeX.toString() + "cm", canvsizeY.toString() + "cm",
        "black", px, py, dotsize, "cm", mat[i]);
    }
    this.innerHTML = svg;
    i++;
  });
}


/// JQuery plugin of Micro QR Code renderer.
$.fn.paintQrCodeMC = function(version, level, mode, charset, data, px, py, dotsize, mask) {
  var mat = __g_inst_QrCodeMCRenderer__.createSymbol(data, version, level, mode, charset, mask);
  var i = 0;
  return this.each(function() {
    if (i < mat.length) {
      __g_inst_QrCodeMCRenderer__.drawSymbol(this, px, py, dotsize, mat[i]);
    }
    i++;
  });
}


///
$.fn.paintQrCodeMC_SVG = function(version, level, mode, charset, data, px, py, dotsize, mask) {
  var canvsizeX = (__g_qrm2matsize__[version] * dotsize) + (px * 2);
  var canvsizeY = (__g_qrm2matsize__[version] * dotsize) + (py * 2);
  var mat = __g_inst_QrCodeMCRenderer__.createSymbol(data, version, level, mode, charset, mask);
  var i = 0;
  return this.each(function() {
    var svg = "";
    if (i < mat.length) {
      svg = __g_inst_QrCodeMCRenderer__.toSymbolSVG(
        canvsizeX.toString() + "cm", canvsizeY.toString() + "cm",
        "black", px, py, dotsize, "cm", mat[i]);
    }
    this.innerHTML = svg;
    i++;
  });
}


/// JQuery plugin of QR Code model1 renderer.
$.fn.paintQrCodeM1 = function(version, level, mode, charset, data, px, py, dotsize, mask) {
  var mat = __g_inst_QrCodeM1Renderer__.createSymbol(data, version, level, mode, charset, mask);
  var i = 0;
  return this.each(function() {
    if (i < mat.length) {
      __g_inst_QrCodeM1Renderer__.drawSymbol(this, px, py, dotsize, mat[i]);
    }
    i++;
  });
}


///
$.fn.paintQrCodeM1_SVG = function(version, level, mode, charset, data, px, py, dotsize, mask) {
  var canvsizeX = (__g_qrm1matsize__[version] * dotsize) + (px * 2);
  var canvsizeY = (__g_qrm1matsize__[version] * dotsize) + (py * 2);
  var mat = __g_inst_QrCodeM1Renderer__.createSymbol(data, version, level, mode, charset, mask);
  var i = 0;
  return this.each(function() {
    var svg = "";
    if (i < mat.length) {
      svg = __g_inst_QrCodeM1Renderer__.toSymbolSVG(
        canvsizeX.toString() + "cm", canvsizeY.toString() + "cm",
        "black", px, py, dotsize, "cm", mat[i]);
    }
    this.innerHTML = svg;
    i++;
  });
}


/// JQuery plugin of DataMatric (ECC200) renderer.
$.fn.paintDmatx200 = function(nrow, ncol, mode, charset, data, px, py, dotsize) {
  var mat = __g_inst_Dmatx200Renderer__.createSymbol(data, nrow, ncol, mode, charset);
  var i = 0;
  return this.each(function() {
    if (i < mat.length) {
      __g_inst_Dmatx200Renderer__.drawSymbol(this, px, py, dotsize, mat[i][1], mat[i][0][1], mat[i][0][0]);
    }
    i++;
  });
}


/// JQuery plugin
$.fn.clearCanvas = function() {
  return this.each(function() {
    this.getContext("2d").clearRect(0, 0, this.width, this.height);
  });
}


