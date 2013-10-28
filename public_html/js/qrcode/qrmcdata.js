

///done, not debug
__g_qrmCmatsize__ = [
  undefined,
   11, 13, 15, 17
];


///
__g_qrmCdatacodewords__ = {
  L:[
    undefined,
       3,   5,  11,  16
  ],
  M:[
    undefined,
       0,   4,   9,  14
  ],
  Q:[
    undefined,
       0,   0,   0,  10
  ]
};


///
__g_qrmCtotalcodewords__ = {
  L:[
    undefined,
  ],
  M:[
    undefined,
  ],
  Q:[
    undefined,
  ]
};


///
__g_qrmCeccodewords__ = {
  L:[
    undefined,
  ],
  M:[
    undefined,
  ],
  Q:[
    undefined,
  ]
};


///notyet
__g_qrmCdatalen__ = {
// number of characters [num,alnum,8bit,kanji]
  L:[
    undefined,
    [  0,  0,  0,  0],// 1
    [  0,  0,  0,  0],// 2
    [ 0,  0,  0,  0],// 3
    [ 0, 0,  0,  0] // 4
  ],
  M:[
    undefined,
    [  0,  0,  0,  0],// 1
    [  0,  0,  0,  0],// 2
    [ 0,  0,  0,  0],// 3
    [ 0, 0,  0,  0] // 4
  ],
  Q:[
    undefined,
    [  0,  0,  0,  0],// 1
    [  0,  0,  0,  0],// 2
    [ 0,  0,  0,  0],// 3
    [ 0, 0,  0,  0] // 4
  ]
};


///
__g_qrmCsegments__ = [
  //[[repeat,totalCodewords,dataCodewords,correctableCodewords],...]
  undefined,
  { L:[[  1,  5,  3,  0]] },//1

  { L:[[  1, 10,  5,  1]],
    M:[[  1, 10,  4,  2]] },//2

  { L:[[  1, 17, 11,  2]],
    M:[[  1, 17,  9,  4]] },//3

  { L:[[  1, 24, 16,  3]],
    M:[[  1, 24, 14,  5]],
    Q:[[  1, 24, 10,  7]] } //4
];


///
__g_qrmCtypenumbers__ = {
  L:[
    undefined,
    0, 1, 3, 5
  ],
  M:[
    undefined,
    undefined, 2, 4, 6
  ],
  Q:[
    undefined,
    undefined, undefined, undefined, 7
  ]
};


///
QrMCSymbolInfo = __extends(Object,
// constructor
  function(version, eclevel) {
    __constructSuper(this);
    if (version == undefined) { version =   1; }
    if (eclevel == undefined) { eclevel = "M"; }
    this.version = version;
    this.eclevel = {L:1,M:0,Q:3}[eclevel]; // L<M<Q
    this.matrixSize    = __g_qrmCmatsize__               [version];
    this.dataCodewords = __g_qrmCdatacodewords__[eclevel][version];
    this.segments      = __g_qrmCsegments__     [version][eclevel];
    this.typeNumber    = __g_qrmCtypenumbers__  [eclevel][version];
  },
// methods
function(__this__) {
  __this__.MAXVER = 4;
});


