


/// Deutsche Post Leitcode
DPLeitcodeBarcodeRenderer = __extends(ITFBarcodeRenderer,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.modulas10DP = function(srcstr) {
    var m = 0;
    for (var i = 0; i < srcstr.length; i++) {
      m += ((i % 2) * 5 + 4) * parseInt(srcstr[i]);
    }
    return (10 - (m % 10)) % 10;
  }


  ///
  __this__.__getCDChar = function(srcstr) {
    return this.modulas10DP(srcstr).toString();
  }

});


