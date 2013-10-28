

///
function __extends(s, c, n) {
  function f(){};
  f.prototype = s.prototype;
  c.prototype = new f();
  c.prototype.__super__ = s.prototype;
  c.prototype.__super__.constructor = s;
  n(c.prototype);
  return c;
}


///
function __constructSuper(thisobj, args) {
  var s = thisobj.__super__;
  if (s != undefined && s.__super__ != undefined) {
    thisobj.__super__ = s.__super__;
    if (args == undefined) {
      args = [];
    }
    try {
      s.constructor.apply(thisobj, args);
    } finally {
      thisobj.__super__ = s;
    }
  }
}


///
function __newArray(len, initval) {
  var ar = [];
  ar.length = len;
  for (var i = 0; i < len; i++) {
    ar[i] = initval;
  }
  return ar;
}


///
function __newArray2d(row, col, initval) {
  var ar = [];
  ar.length = row;
  for (var i = 0; i < row; i++) {
    ar[i] = [];
    ar[i].length = col;
    for (var j = 0; j < col; j++) {
      ar[i][j] = initval;
    }
  }
  return ar;
}


///
function __toUtf8Bytes(s) {
  var b16 = [];
  var b8  = [];
  var c  = 0;
  var c2 = 0;
  for (var i = 0; i < s.length; i++) {
    b16.push(s.charCodeAt(i));
  }
  for (var i = 0; i < b16.length; ) {
    c = b16[i++];
    if (0x00d800 <= c && c <= 0x00dbff) {
      // upper surrogate
      c2 = b16[i++];
      if (!(0x00dc00 <= c2 && c2 <= 0x00dfff)) {
        // not lower surrogate
        throw new Error("bad encoding");
      }
      c = (((c & 0x03ff) << 10) | (c2 & 0x03ff)) + 0x010000;
    }

    if (0x000000 <= c && c <= 0x00007f) {
      b8.push(0x0000 | c);
    } else if (0x000080 <= c && c <= 0x0007ff) {
      b8.push(0x00c0 | (0x001f & (c >>>  6)));
      b8.push(0x0080 | (0x003f & (c)));
    } else if (0x000800 <= c && c <= 0x00ffff) {
      b8.push(0x00e0 | (0x000f & (c >>> 12)));
      b8.push(0x0080 | (0x003f & (c >>>  6)));
      b8.push(0x0080 | (0x003f & (c)));
    } else if (0x010000 <= c && c <= 0x10ffff) {
      b8.push(0x00f0 | (0x0007 & (c >>> 18)));
      b8.push(0x0080 | (0x003f & (c >>> 12)));
      b8.push(0x0080 | (0x003f & (c >>>  6)));
      b8.push(0x0080 | (0x003f & (c)));
    } else {
      throw new Error("bad encoding");
    }
  }
  return b8;
}


///
function __fromUtf8Bytes(b) {
  var c  = 0;
  var c2 = 0;
  var n = 0;
  var s = "";
  for (var i = 0; i < b.length; ) {
    c = b[i++] | 0x0000;
    if (0x0000 <= c && c <= 0x007f) {
      n = 0;
    } else if (0x00c2 <= c && c <= 0x00df) {
      c &= 0x001f;
      n = 1;
    } else if (0x00e0 <= c && c <= 0x00ef) {
      c &= 0x000f;
      n = 2;
    } else if (0x00f0 <= c && c <= 0x00f4) {
      c &= 0x0007;
      n = 3;
    }
    for (var j = 0; j < n; j++) {
      c2 = b[i++];
      if (!(0x0080 <= c2 && c2 <= 0x00bf)) {
        throw new Error("bad encoding");
      }
      c = (c << 6) | (c2 & 0x3f);
    }
    if (0x010000 <= c && c <= 0x10ffff) {
      // to surrogate pair
      c -= 0x010000;
      c2 = 0x00dc00 | ( c         & 0x0003ff);
      c  = 0x00d800 | ((c >>> 10) & 0x0003ff);
      s += String.fromCharCode(c, c2);
    } else {
      s += String.fromCharCode(c);
    }
  }
  return s;
}


///
function __strToBytes_usejava(s, charset) {
  if (charset == undefined) {
    charset = "UTF-8"; //"Shift_JIS";
  }
  var p = s.toString();
  var q = new java.lang.String(p);
  var a = q.getBytes(charset);
  var b = [];
  for (var i = 0; i < a.length; i++) {
    b.push(a[i] & 0x00ff);
  }
  return b;
}


///
function __strFromBytes_usejava(b, charset) {
  if (charset == undefined) {
    charset = "UTF-8"; //"Shift_JIS";
  }
  //var n = b.length | 0x00;
  ////var b2 = java.lang.reflect.Array.newInstance(java.lang.Byte, n);
  //var theClass = java.lang.Class.forName("java.lang.Byte")
  //var b2 = java.lang.reflect.Array.newInstance(theClass, n);
  //for (var i = 0; i < b.length; i++) {
  //  b2[i] = b[i];
  //}
  //var s = new java.lang.String(b2, charset);
  var s = new java.lang.String(b, charset);
  return s;
}


function __encodeURI(s) {
  var b = __toUtf8Bytes(s);
  var r = "";
  var w = "";
  for (var i = 0; i < b.length; i++) {
    w = b[i].toString(16);
    if (w.length < 2) { w = "0" + w; }
    r += "%" + w;
  }
  return r;
}


///
function __strToBytes_ajax(s, charset) {
  if (charset == undefined) {
    charset = "UTF-8";
  }
  var req = new XMLHttpRequest();
  var url = __getAjaxBaseAddr() + "txtconv/txtenc.jsp";
  req.open("POST", url, false);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  var args = "txt=" + __encodeURI(s.toString()) + "&enc=" + __encodeURI(charset.toString());
  req.send(args);
  var b = JSON.parse(req.responseText);
  for (var i = 0; i < b.length; i++) {
    b[i] &= 0x00ff
  }
  return b;
}


///
function __strFromBytes_ajax(b, charset) {
  if (charset == undefined) {
    charset = "UTF-8";
  }
  var req = new XMLHttpRequest();
  var url = __getAjaxBaseAddr() + "txtconv/txtdec.jsp";
  req.open("POST", url, false);
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  var args = "json=" + __encodeURI("[" + b.toString() + "]") + "&enc=" + __encodeURI(charset.toString());
  req.send(args);
  return req.responseText;
}


///
function __getCharconvStrToByteProc(charset) {
  var charconvProc = undefined;
  switch (charset) {
  case undefined:
  case "":
  case "UTF-8": // valid IANA name
  case "utf-8": // not valid?
    charconvProc = __toUtf8Bytes;
    break;
  default:
    // testing capability
    try {
      var aaa = __strToBytes_usejava("0123456789ABCDEF", charset);
      if (aaa.length == 0) { throw new Error("no caps"); }
      charconvProc = __strToBytes_usejava;
    } catch (Error) {
      charconvProc = __strToBytes_ajax;
    }
    break;
  }
  return charconvProc;
}


function __encodeBase64(s) {
  var dict = {
     0:"A",  1:"B",  2:"C",  3:"D",  4:"E",  5:"F",  6:"G",  7:"H",  8:"I",  9:"J",
    10:"K", 11:"L", 12:"M", 13:"N", 14:"O", 15:"P", 16:"Q", 17:"R", 18:"S", 19:"T",
    20:"U", 21:"V", 22:"W", 23:"X", 24:"Y", 25:"Z", 26:"a", 27:"b", 28:"c", 29:"d",
    30:"e", 31:"f", 32:"g", 33:"h", 34:"i", 35:"j", 36:"k", 37:"l", 38:"m", 39:"n",
    40:"o", 41:"p", 42:"q", 43:"r", 44:"s", 45:"t", 46:"u", 47:"v", 48:"w", 49:"x",
    50:"y", 51:"z", 52:"0", 53:"1", 54:"2", 55:"3", 56:"4", 57:"5", 58:"6", 59:"7",
    60:"8", 61:"9", 62:"+", 63:"/"
  };
  var b = __toUtf8Bytes(s);
  var r = "", w = "", z = "";
  var q = 0;
  while (0 != (b.length % 3)) {
    b.push(0); q++; z += "=";
  }
  for (var i = 0; i < b.length; i += 3) {
    w = "";
    w += dict[( 0x0000         | (b[i    ] >>> 2)) & 0x003f]; // remains 2
    w += dict[((b[i    ] << 4) | (b[i + 1] >>> 4)) & 0x003f]; // remains 4
    w += dict[((b[i + 1] << 2) | (b[i + 2] >>> 6)) & 0x003f]; // remains 6
    w += dict[ (b[i + 2]     )                     & 0x003f];
    r += w;
  }
  if (0 != q) {
    r = r.substring(0, r.length - q) + z;
  }
  return r;
}


function __decodeBase64(s) {
  var dict = {
    "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7, "I": 8, "J": 9,
    "K":10, "L":11, "M":12, "N":13, "O":14, "P":15, "Q":16, "R":17, "S":18, "T":19,
    "U":20, "V":21, "W":22, "X":23, "Y":24, "Z":25, "a":26, "b":27, "c":28, "d":29,
    "e":30, "f":31, "g":32, "h":33, "i":34, "j":35, "k":36, "l":37, "m":38, "n":39,
    "o":40, "p":41, "q":42, "r":43, "s":44, "t":45, "u":46, "v":47, "w":48, "x":49,
    "y":50, "z":51, "0":52, "1":53, "2":54, "3":55, "4":56, "5":57, "6":58, "7":59,
    "8":60, "9":61, "+":62, "/":63, "=":0
  };
  var b = [];
  var q = 0;
  var v = 0;
  s = s.replace(/\s+/g, "");
  if (0 != (s.length % 4)) {
    throw new Error("bad length");
  }
  if (0 < s.length) {
    for (var i = 1; i < 4; i++) {
      if ("=" == s[s.length - i]) { q++; }
    }
    for (var i = 4; i < s.length; i++) {
      if ("=" == s[s.length - i]) { throw new Error("bad sequence"); }
    }
  }
  for (var i = 0; i < s.length; i += 4) {
    if (undefined == dict[s[i    ]] || undefined == dict[s[i + 1]] ||
        undefined == dict[s[i + 2]] || undefined == dict[s[i + 3]] ) {
      throw new Error("bad sequence");
    }
    v = (dict[s[i    ]] << 18) + (dict[s[i + 1]] << 12) +
        (dict[s[i + 2]] <<  6) + (dict[s[i + 3]]      );
    b.push((v >>> 16) & 0x00ff);
    b.push((v >>>  8) & 0x00ff);
    b.push( v         & 0x00ff);
  }
  if (0 < q) {
    b.length -= q;
  }
  return __fromUtf8Bytes(b);
}


function __encodeBase32(s) {
  var dict = {
     0:"A",  1:"B",  2:"C",  3:"D",  4:"E",  5:"F",  6:"G",  7:"H",  8:"I",  9:"J",
    10:"K", 11:"L", 12:"M", 13:"N", 14:"O", 15:"P", 16:"Q", 17:"R", 18:"S", 19:"T",
    20:"U", 21:"V", 22:"W", 23:"X", 24:"Y", 25:"Z", 26:"2", 27:"3", 28:"4", 29:"5",
    30:"6", 31:"7"
  };
  var b = __toUtf8Bytes(s);
  var r = "", w = "", z = "";
  var q = 0;
  while (0 != (b.length % 5)) {
    b.push(0); q++; z += "=";
  }
  for (var i = 0; i < b.length; i += 5) {
    w = "";
    w += dict[( 0x0000         | (b[i    ] >>> 3)) & 0x001f]; // remains 3
    w += dict[((b[i    ] << 2) | (b[i + 1] >>> 6)) & 0x001f]; // remains 6
    w += dict[( 0x0000         | (b[i + 1] >>> 1)) & 0x001f]; // remains 1
    w += dict[((b[i + 1] << 4) | (b[i + 2] >>> 4)) & 0x001f]; // remains 4
    w += dict[((b[i + 2] << 1) | (b[i + 3] >>> 7)) & 0x001f]; // remains 7
    w += dict[( 0x0000         | (b[i + 3] >>> 2)) & 0x001f]; // remains 2
    w += dict[((b[i + 3] << 3) | (b[i + 4] >>> 5)) & 0x001f]; // remains 5
    w += dict[ (b[i + 4]     )                     & 0x001f];
    r += w;
  }
  if (0 != q) {
    r = r.substring(0, r.length - q) + z;
  }
  return r;
}


function __decodeBase32(s) {
  var dict = {
    "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7, "I": 8, "J": 9,
    "K":10, "L":11, "M":12, "N":13, "O":14, "P":15, "Q":16, "R":17, "S":18, "T":19,
    "U":20, "V":21, "W":22, "X":23, "Y":24, "Z":25, "2":26, "3":27, "4":28, "5":29,
    "6":30, "7":31, "=": 0
  };
  var b = [];
  var q = 0;
  var v0 = 0, v1 = 0;
  s = s.replace(/\s+/g, "");
  if (0 != (s.length % 8)) {
    throw new Error("bad length");
  }
  if (0 < s.length) {
    for (var i = 1; i < 8; i++) {
      if ("=" == s[s.length - i]) { q++; }
    }
    for (var i = 8; i < s.length; i++) {
      if ("=" == s[s.length - i]) { throw new Error("bad sequence"); }
    }
  }
  for (var i = 0; i < s.length; i += 8) {
    if (undefined == dict[s[i    ]] || undefined == dict[s[i + 1]] ||
        undefined == dict[s[i + 2]] || undefined == dict[s[i + 3]] ||
        undefined == dict[s[i + 4]] || undefined == dict[s[i + 5]] ||
        undefined == dict[s[i + 6]] || undefined == dict[s[i + 7]] ) {
      throw new Error("bad sequence");
    }
    v0 =            0x0000ffff & ((dict[s[i    ]] << 11) |
         (dict[s[i + 1]] <<  6) | (dict[s[i + 2]] <<  1) |
         (dict[s[i + 3]] >>> 4));
    v1 =            0x00ffffff & ((dict[s[i + 3]] << 20) |
         (dict[s[i + 4]] << 15) | (dict[s[i + 5]] << 10) |
         (dict[s[i + 6]] <<  5) | (dict[s[i + 7]]      ));
    b.push((v0 >>>  8) & 0x00ff);
    b.push( v0         & 0x00ff);
    b.push((v1 >>> 16) & 0x00ff);
    b.push((v1 >>>  8) & 0x00ff);
    b.push( v1         & 0x00ff);
  }
  if (0 < q) {
    b.length -= q;
  }
  return __fromUtf8Bytes(b);
}


function __encodeHex(s) {
  var b = __toUtf8Bytes(s);
  var r = "", w = "";
  for (var i = 0; i < b.length; i++) {
    w = b[i].toString(16);
    if (w.length < 2) { w = "0" + w; }
    r += w;
  }
  return r;
}


function __decodeHex(s) {
  var dict = {
    "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
    "A":10, "B":11, "C":12, "D":13, "E":14, "F":15,
    "a":10, "b":11, "c":12, "d":13, "e":14, "f":15
  };
  var b = [];
  s = s.replace(/\s+/g, "");
  if (0 != (s.length % 2)) {
    throw new Error("bad length");
  }
  for (var i = 0; i < s.length; i += 2) {
    if (undefined == dict[s[i]] || undefined == dict[s[i + 1]]) {
      throw new Error("bad sequence");
    }
    b.push(dict[s[i]] * 16 + dict[s[i + 1]]);
  }
  return __fromUtf8Bytes(b);
}


