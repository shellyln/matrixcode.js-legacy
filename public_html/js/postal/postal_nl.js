


///
NlTNTKixBarcodeRenderer = __extends(RM4SCCBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__formatData = function(srcstr) {
    return srcstr;
  }


  ///
  __this__.createSymbol = function(srcstr) {
    srcstr = srcstr.toString();
    var s = "";
    var d = ""; // data codewords

    s = this.__formatData(srcstr);
    d = this.__encodeC(s);

    return d;
  }
});


