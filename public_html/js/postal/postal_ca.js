


///
CaPostalPostbarBarcodeRenderer = __extends(PostbarBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__formatData = function(srcstr) {
    var s = "";
    switch (srcstr.substring(0, 1)) {
      case "B": // D52.01 (spec is not disclosed)
        return "001";
      case "C": // D82.02 (spec is not disclosed)
        return "002";
      case "Y": // S52.40 (spec is not disclosed)
        return "220";
      case "n": // S82.39 (spec is not disclosed)
        switch (srcstr.substring(1, 2)) {
        case "0":
          s = (this.__encodeC(srcstr.substring(2) + "00000000000000000000")).substring(0, 60);
          return "213" + "222" + s;
        default:
          return "213";
        }
    }
  }
});


