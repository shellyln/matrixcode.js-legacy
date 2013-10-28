


///
AuPostalPostbarBarcodeRenderer = __extends(PostbarBarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__formatData = function(srcstr) {
    var s = "";
    switch (srcstr.substring(0, 2)) {
      case "11": // Standard Customer Barcode
        return "0101" +
          (this.__encodeN(srcstr.substring(2, 10) + "00000000")).substring(0, 16) + "3";
      case "45": // Reply Paid Barcode
        return "1112" +
          (this.__encodeN(srcstr.substring(2, 10) + "00000000")).substring(0, 16) + "3";
      case "92": // Redirection Barcode // spec is not disclosed.
        return "3002";
      case "59": // Customer Barcode 2
        s = (this.__encodeMixed(srcstr.substring(10)) +
          "0000000000000000").substring(0, 16);
        return "1230" +
          (this.__encodeN(srcstr.substring(2, 10) + "00000000")).substring(0, 16) + s;
      case "62": // Customer Barcode 3
        s = (this.__encodeMixed(srcstr.substring(10)) +
          "0000000000000000000000000000000").substring(0, 31);
        return "2002" +
          (this.__encodeN(srcstr.substring(2, 10) + "00000000")).substring(0, 16) + s;
      case "44": // Currently Reserved
        return "1111";
      case "CC": // nonstandarded
        return this.__encodeC(srcstr.substring(2));
      case "NN": // nonstandarded
        return this.__encodeN(srcstr.substring(2));
      case "MM": // nonstandarded
        return this.__encodeMixed(srcstr.substring(2));
    }
  }

});


