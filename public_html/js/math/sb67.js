

SB67 = __extends(Object,
// constructor
  function() {
    __constructSuper(this);
  },
// methods
function(__this__) {


  __this__.P = 67;
  __this__.v2c = [
    "=","+","-","*","/",
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "0","1","2","3","4","5","6","7","8","9",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
  ];
  __this__.c2v = {};
  __this__.neg = {0:0};
  __this__.inv = {0:0};

  for (var i = 0; i < __this__.P; i++) {
    __this__.c2v[__this__.v2c[i]] = i;
  }
  for (var i = 1; i < __this__.P; i++) {
    __this__.neg[i] = __this__.P - i;
  }
  for (var i = 1; i < __this__.P; i++) {
    for (var j = 1; j < __this__.P; j++) {
      if (((i * j) % __this__.P) == 1) {
        __this__.inv[i] = j;
      }
    }
  }
  __this__.useiv = 0;


  __this__.encode = function(key, text, solt) {
    var r = "";
    var z = 0;
    var iv = (solt + 9941) % this.P;

    for (var i = 0; i < text.length; i++) {
      if (undefined != this.c2v[text[i]]) {
        var y = Math.floor((i - z) / key.length);
        var v1 = this.c2v[text[i]];
        var v2 = this.c2v[key[(i - z + solt + y) % key.length]];
        var v3 = this.c2v[key[(i - z + solt + 1) % key.length]];

        v2 = (0 == v2 ? 1 : v2);
        v1 = (v1 * v2) % this.P;
        v1 = (v1 + v3) % this.P;
        v1 = (v1 + (this.useiv * iv)) % this.P;
        iv = v1;

        r += this.v2c[v1];
      } else {
        r += text[i]; z++;
      }
    }
    return r;
  }


  __this__.decode = function(key, text, solt) {
    var r = "";
    var z = 0;
    var iv = (solt + 9941) % this.P;

    for (var i = 0; i < text.length; i++) {
      if (undefined != this.c2v[text[i]]) {
        var y = Math.floor((i - z) / key.length);
        var v1 = this.c2v[text[i]];
        var v2 = this.inv[this.c2v[key[(i - z + solt + y) % key.length]]];
        var v3 = this.neg[this.c2v[key[(i - z + solt + 1) % key.length]]];
        var nextiv = v1;

        v2 = (0 == v2 ? 1 : v2);
        v1 = (v1 + this.neg[this.useiv * iv]) % this.P;
        v1 = (v1 + v3) % this.P;
        v1 = (v1 * v2) % this.P;
        iv = nextiv;

        r += this.v2c[v1];
      } else {
        r += text[i]; z++;
      }
    }
    return r;
  }


  __this__.escape = function(text) {
    var sb = text;
    sb = sb.replace(/=/g    , "=*");
    sb = sb.replace(/%/g    , "=0"); // percent
    sb = sb.replace(/(?:^)/g, "=A"); // cAret
    sb = sb.replace(/@/g    , "=a"); // At
    sb = sb.replace(/\|/g   , "=B"); // vertical Bar
    sb = sb.replace(/:/g    , "=C"); // Colon
    sb = sb.replace(/;/g    , "=c"); // cemi Colon
    sb = sb.replace(/(?:$)/g, "=D"); // Doller
    sb = sb.replace(/&/g    , "=E"); // Et
    sb = sb.replace(/`/g    , "=G"); // Grave
    sb = sb.replace(/#/g    , "=H"); // Hash
    sb = sb.replace(/\(/g   , "=I"); // parenthesIs
    sb = sb.replace(/\)/g   , "=i"); // parenthesIs
    sb = sb.replace(/\[/g   , "=L"); // Left bracket
    sb = sb.replace(/\{/g   , "=l"); // Left bracket
    sb = sb.replace(/\?/g   , "=O"); // quaestiO
    sb = sb.replace(/!/g    , "=o"); // iO
    sb = sb.replace(/\./g   , "=P"); // Period
    sb = sb.replace(/,/g    , "=p"); // comma
    sb = sb.replace(/"/g    , "=Q"); // double Quot
    sb = sb.replace(/'/g    , "=q"); // single Quot
    sb = sb.replace(/\]/g   , "=R"); // Right bracket
    sb = sb.replace(/\}/g   , "=r"); // Right bracket
    sb = sb.replace(/_/g    , "=S"); // underScore
    sb = sb.replace(/ /g    , "=s"); // Space
    sb = sb.replace(/~/g    , "=T"); // Tilde
    sb = sb.replace(/\t/g   , "=t"); // Tab
    sb = sb.replace(/</g    , "=V"); // angle bracket
    sb = sb.replace(/>/g    , "=v"); // angle bracket
    sb = sb.replace(/\\/g   , "=/"); // backslash

    sb = sb.replace(/=s=s=s=s=s=s=s=s/g   , "=4");
    sb = sb.replace(/=s=s=s=s=s=s/g       , "=3");
    sb = sb.replace(/=s=s=s=s/g           , "=2");
    sb = sb.replace(/=s=s/g               , "=1");

    sb = sb.replace(/=t=t=t=t=t=t=t=t/g   , "=8");
    sb = sb.replace(/=t=t=t=t=t=t/g       , "=7");
    sb = sb.replace(/=t=t=t=t/g           , "=6");
    sb = sb.replace(/=t=t/g               , "=5");
    return sb;
  }


  __this__.unescape = function(text) {
    var sb = text;

    sb = sb.replace(/=5/g, "=t=t"            );
    sb = sb.replace(/=6/g, "=t=t=t=t"        );
    sb = sb.replace(/=7/g, "=t=t=t=t=t=t"    );
    sb = sb.replace(/=8/g, "=t=t=t=t=t=t=t=t");

    sb = sb.replace(/=1/g, "=s=s"            );
    sb = sb.replace(/=2/g, "=s=s=s=s"        );
    sb = sb.replace(/=3/g, "=s=s=s=s=s=s"    );
    sb = sb.replace(/=4/g, "=s=s=s=s=s=s=s=s");

    sb = sb.replace(/=0/g     , "%" ); // percent
    sb = sb.replace(/=A/g     , "^" ); // cAret
    sb = sb.replace(/=a/g     , "@" ); // At
    sb = sb.replace(/=B/g     , "|" ); // vertical Bar
    sb = sb.replace(/=C/g     , ":" ); // Colon
    sb = sb.replace(/=c/g     , ";" ); // cemi Colon
    sb = sb.replace(/=D/g     , "$$"); // Doller
    sb = sb.replace(/=E/g     , "&" ); // Et
    sb = sb.replace(/=G/g     , "`" ); // Grave
    sb = sb.replace(/=H/g     , "#" ); // Hash
    sb = sb.replace(/=I/g     , "(" ); // parenthesIs
    sb = sb.replace(/=i/g     , ")" ); // parenthesIs
    sb = sb.replace(/=L/g     , "[" ); // Left bracket
    sb = sb.replace(/=l/g     , "{" ); // Left bracket
    sb = sb.replace(/=O/g     , "?" ); // quaestiO
    sb = sb.replace(/=o/g     , "!" ); // iO
    sb = sb.replace(/=P/g     , "." ); // Period
    sb = sb.replace(/=p/g     , "," ); // comma
    sb = sb.replace(/=Q/g     , "\""); // double Quot
    sb = sb.replace(/=q/g     , "'" ); // single Quot
    sb = sb.replace(/=R/g     , "]" ); // Right bracket
    sb = sb.replace(/=r/g     , "}" ); // Right bracket
    sb = sb.replace(/=S/g     , "_" ); // underScore
    sb = sb.replace(/=s/g     , " " ); // Space
    sb = sb.replace(/=T/g     , "~" ); // Tilde
    sb = sb.replace(/=t/g     , "\t"); // Tab
    sb = sb.replace(/=V/g     , "<" ); // angle bracket
    sb = sb.replace(/=v/g     , ">" ); // angle bracket
    sb = sb.replace(/=(?:\/)/g, "\\"); // backslash
    sb = sb.replace(/=\*/g    , "=" );
    return sb;
  }
});

