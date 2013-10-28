

///
SimpleBarcodeRendererBase = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.modulas10wgt3 = function(srcstr) {
    var m = 0;
    for (var i = 0; i < srcstr.length; i++) {
      m += (((srcstr.length - i) % 2) * 2 + 1) * parseInt(srcstr[i]);
    }
    return (10 - (m % 10)) % 10;
  }
});


