


///
ChinaPostPostalBarcodeRenderer = __extends(Matrix2of5BarcodeRendererBase,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  ///
  __this__.__getCDChar = function(srcstr) {
    return this.modulas10wgt3(srcstr).toString();
  }


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


