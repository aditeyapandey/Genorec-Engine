(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "sequences": [
        {   
        "sequenceName":"XYZ", 
        "sequenceInterconnection":{"list":[]},
        "interFeatureTasks":{"compare":["feature_0","feature_1"],"summarize":["feature_0"],"browse":["feature_0","feature_1"]},
            "features":
            [
                { 
                    "featureId":"feature_0",
                    "featureGranularity":"point",
                    "featureDensity":"sparse",
                    "featureLabel": "Epigenetic Signal",
                    "featureInterconnection": true,
                    "denseInterconnection": false,
                    "attr":
                    [
                        {
                            "dataType":"quantitative",
                            "intraAttrTask":["identify"]
                        },
                        {
                            "dataType":"quantitative",
                            "intraAttrTask":["identify","compare"]
                        },
                        {
                            "dataType":"text",
                            "intraAttrTask":["identify"]
                        }
                    ]
                },
                { 
                    "featureId":"feature_1",
                    "featureGranularity":"segment",
                    "featureDensity":"sparse",
                    "featureLabel": "Gene Annotation",
                    "featureInterconnection": true,
                    "denseInterconnection": false,
                    "attr":
                    [
                    {
                        "dataType":"categorical",
                        "intraAttrTask":["identify","summarize"]
                    },
                    {
                        "dataType":"text",
                        "intraAttrTask":["identify"]
                    }]
                }
            ]
    },{
        "sequenceName":"ABC", 
        "sequenceInterconnection":{"list":[]},
        "interFeatureTasks":{"compare":[],"summarize":[],"browse":[]},
            "features":
            [
                { 
                    "featureId":"feature_0",
                    "featureGranularity":"point",
                    "featureDensity":"sparse",
                    "featureLabel": "Epigenetic Signal",
                    "featureInterconnection": true,
                    "denseInterconnection": false,
                    "attr":
                    [
                        {
                            "dataType":"quantitative",
                            "intraAttrTask":["identify","compare"]
                        },
                        {
                            "dataType":"text",
                            "intraAttrTask":["identify"]
                        }
                    ]
                }
            ]
    }],
    "intraSequenceTask": {"correlate":["XYZ","ABC"]}
}
},{}],2:[function(require,module,exports){
module.exports=[
{"chart":"dotplot","mark":"point","channel":"position","quantitative":"1","categorical":"0","text":"0","sparse":"1","continous":"0","point":"1","segment":"0","identify":"1","compare":"1","summarize":"1"},
{"chart":"linechart","mark":"line","channel":"position","quantitative":"1","categorical":"0","text":"0","sparse":"0","continous":"1","point":"1","segment":"0","identify":"1","compare":"1","summarize":"1"},
{"chart":"barsize","mark":"line","channel":"size","quantitative":"1","categorical":"0","text":"0","sparse":"1","continous":"1","point":"1","segment":"0","identify":"1","compare":"1","summarize":"1"},
{"chart":"barsaturation","mark":"line","channel":"saturation","quantitative":"1","categorical":"0","text":"0","sparse":"1","continous":"1","point":"1","segment":"0","identify":"1","compare":"0","summarize":"1"},
{"chart":"barhue","mark":"line","channel":"hue","quantitative":"0","categorical":"1","text":"0","sparse":"1","continous":"1","point":"1","segment":"0","identify":"1","compare":"1","summarize":"1"},
{"chart":"areasize","mark":"area","channel":"size","quantitative":"1","categorical":"0","text":"0","sparse":"1","continous":"1","point":"0","segment":"1","identify":"1","compare":"1","summarize":"1"},
{"chart":"areasaturation","mark":"area","channel":"saturation","quantitative":"1","categorical":"0","text":"0","sparse":"1","continous":"1","point":"0","segment":"1","identify":"1","compare":"0","summarize":"1"},
{"chart":"areahue","mark":"area","channel":"hue","quantitative":"0","categorical":"1","text":"0","sparse":"1","continous":"1","point":"1","segment":"1","identify":"1","compare":"1","summarize":"1"},
{"chart":"annotation","mark":"label","channel":"text","quantitative":"0","categorical":"0","text":"1","sparse":"1","continous":"1","point":"1","segment":"1","identify":"1","compare":"0","summarize":"0"}
]

},{}],3:[function(require,module,exports){
module.exports=[
{"layout":"linear","spacesaving":"0","featureinterconnection":"1","denseinterconnection":"1","identify":"1","compare":"1","summarize":"1","size":"1","hue":"1","saturation":"1","text":"1"},
{"layout":"circular","spacesaving":"1","featureinterconnection":"1","denseinterconnection":"0","identify":"1","compare":"0","summarize":"1","size":"0","hue":"1","saturation":"1","text":"1"},
{"layout":"hilbert","spacesaving":"1","featureinterconnection":"0","denseinterconnection":"0","identify":"1","compare":"0","summarize":"0","size":"0","hue":"1","saturation":"1","text":"0"}
]

},{}],4:[function(require,module,exports){
module.exports = function(haystack, needle, comparator, low, high) {
  var mid, cmp;

  if(low === undefined)
    low = 0;

  else {
    low = low|0;
    if(low < 0 || low >= haystack.length)
      throw new RangeError("invalid lower bound");
  }

  if(high === undefined)
    high = haystack.length - 1;

  else {
    high = high|0;
    if(high < low || high >= haystack.length)
      throw new RangeError("invalid upper bound");
  }

  while(low <= high) {
    // The naive `low + high >>> 1` could fail for array lengths > 2**31
    // because `>>>` converts its operands to int32. `low + (high - low >>> 1)`
    // works for array lengths <= 2**32-1 which is also Javascript's max array
    // length.
    mid = low + ((high - low) >>> 1);
    cmp = +comparator(haystack[mid], needle, mid, haystack);

    // Too low.
    if(cmp < 0.0)
      low  = mid + 1;

    // Too high.
    else if(cmp > 0.0)
      high = mid - 1;

    // Key found.
    else
      return mid;
  }

  // Key not found.
  return ~low;
}

},{}],5:[function(require,module,exports){
'use strict';

const toString = Object.prototype.toString;

function isAnyArray(object) {
  return toString.call(object).endsWith('Array]');
}

module.exports = isAnyArray;

},{}],6:[function(require,module,exports){
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sum = _interopDefault(require('ml-array-sum'));

/**
 * Computes the mean of the given values
 * @param {Array<number>} input
 * @return {number}
 */
function mean(input) {
  return sum(input) / input.length;
}

module.exports = mean;

},{"ml-array-sum":7}],7:[function(require,module,exports){
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isArray = _interopDefault(require('is-any-array'));

/**
 * Computes the mean of the given values
 * @param {Array<number>} input
 * @return {number}
 */
function sum(input) {
  if (!isArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  let sumValue = 0;
  for (let i = 0; i < input.length; i++) {
    sumValue += input[i];
  }
  return sumValue;
}

module.exports = sum;

},{"is-any-array":5}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function squaredEuclidean(p, q) {
    let d = 0;
    for (let i = 0; i < p.length; i++) {
        d += (p[i] - q[i]) * (p[i] - q[i]);
    }
    return d;
}
exports.squaredEuclidean = squaredEuclidean;
function euclidean(p, q) {
    return Math.sqrt(squaredEuclidean(p, q));
}
exports.euclidean = euclidean;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mlDistanceEuclidean = require('ml-distance-euclidean');
var mlTreeSimilarity = require('ml-tree-similarity');
var mean = _interopDefault(require('ml-array-mean'));

function additiveSymmetric(a, b) {
  var i = 0;
  var ii = a.length;
  var d = 0;
  for (; i < ii; i++) {
    d += ((a[i] - b[i]) * (a[i] - b[i]) * (a[i] + b[i])) / (a[i] * b[i]);
  }
  return 2 * d;
}

function avg(a, b) {
  var ii = a.length;
  var max = 0;
  var ans = 0;
  var aux = 0;
  for (var i = 0; i < ii; i++) {
    aux = Math.abs(a[i] - b[i]);
    ans += aux;
    if (max < aux) {
      max = aux;
    }
  }
  return (max + ans) / 2;
}

function bhattacharyya(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += Math.sqrt(a[i] * b[i]);
  }
  return -Math.log(ans);
}

function canberra(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += Math.abs(a[i] - b[i]) / (a[i] + b[i]);
  }
  return ans;
}

function chebyshev(a, b) {
  var ii = a.length;
  var max = 0;
  var aux = 0;
  for (var i = 0; i < ii; i++) {
    aux = Math.abs(a[i] - b[i]);
    if (max < aux) {
      max = aux;
    }
  }
  return max;
}

function clark(a, b) {
  var i = 0;
  var ii = a.length;
  var d = 0;
  for (; i < ii; i++) {
    d += Math.sqrt(
      ((a[i] - b[i]) * (a[i] - b[i])) / ((a[i] + b[i]) * (a[i] + b[i]))
    );
  }
  return 2 * d;
}

function czekanowskiSimilarity(a, b) {
  var up = 0;
  var down = 0;
  for (var i = 0; i < a.length; i++) {
    up += Math.min(a[i], b[i]);
    down += a[i] + b[i];
  }
  return (2 * up) / down;
}

function czekanowskiDistance(a, b) {
  return 1 - czekanowskiSimilarity(a, b);
}

function dice(a, b) {
  var ii = a.length;
  var p = 0;
  var q1 = 0;
  var q2 = 0;
  for (var i = 0; i < ii; i++) {
    p += a[i] * a[i];
    q1 += b[i] * b[i];
    q2 += (a[i] - b[i]) * (a[i] - b[i]);
  }
  return q2 / (p + q1);
}

function divergence(a, b) {
  var i = 0;
  var ii = a.length;
  var d = 0;
  for (; i < ii; i++) {
    d += ((a[i] - b[i]) * (a[i] - b[i])) / ((a[i] + b[i]) * (a[i] + b[i]));
  }
  return 2 * d;
}

function fidelity(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += Math.sqrt(a[i] * b[i]);
  }
  return ans;
}

function gower(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += Math.abs(a[i] - b[i]);
  }
  return ans / ii;
}

function harmonicMean(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += (a[i] * b[i]) / (a[i] + b[i]);
  }
  return 2 * ans;
}

function hellinger(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += Math.sqrt(a[i] * b[i]);
  }
  return 2 * Math.sqrt(1 - ans);
}

function innerProduct(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += a[i] * b[i];
  }
  return ans;
}

function intersection(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += Math.min(a[i], b[i]);
  }
  return 1 - ans;
}

function jaccard(a, b) {
  var ii = a.length;
  var p1 = 0;
  var p2 = 0;
  var q1 = 0;
  var q2 = 0;
  for (var i = 0; i < ii; i++) {
    p1 += a[i] * b[i];
    p2 += a[i] * a[i];
    q1 += b[i] * b[i];
    q2 += (a[i] - b[i]) * (a[i] - b[i]);
  }
  return q2 / (p2 + q1 - p1);
}

function jeffreys(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += (a[i] - b[i]) * Math.log(a[i] / b[i]);
  }
  return ans;
}

function jensenDifference(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans +=
      (a[i] * Math.log(a[i]) + b[i] * Math.log(b[i])) / 2 -
      ((a[i] + b[i]) / 2) * Math.log((a[i] + b[i]) / 2);
  }
  return ans;
}

function jensenShannon(a, b) {
  var ii = a.length;
  var p = 0;
  var q = 0;
  for (var i = 0; i < ii; i++) {
    p += a[i] * Math.log((2 * a[i]) / (a[i] + b[i]));
    q += b[i] * Math.log((2 * b[i]) / (a[i] + b[i]));
  }
  return (p + q) / 2;
}

function kdivergence(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += a[i] * Math.log((2 * a[i]) / (a[i] + b[i]));
  }
  return ans;
}

function kulczynski(a, b) {
  var ii = a.length;
  var up = 0;
  var down = 0;
  for (var i = 0; i < ii; i++) {
    up += Math.abs(a[i] - b[i]);
    down += Math.min(a[i], b[i]);
  }
  return up / down;
}

function kullbackLeibler(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += a[i] * Math.log(a[i] / b[i]);
  }
  return ans;
}

function kumarHassebrook(a, b) {
  var ii = a.length;
  var p = 0;
  var p2 = 0;
  var q2 = 0;
  for (var i = 0; i < ii; i++) {
    p += a[i] * b[i];
    p2 += a[i] * a[i];
    q2 += b[i] * b[i];
  }
  return p / (p2 + q2 - p);
}

function kumarJohnson(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans +=
      Math.pow(a[i] * a[i] - b[i] * b[i], 2) / (2 * Math.pow(a[i] * b[i], 1.5));
  }
  return ans;
}

function lorentzian(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += Math.log(Math.abs(a[i] - b[i]) + 1);
  }
  return ans;
}

function manhattan(a, b) {
  var i = 0;
  var ii = a.length;
  var d = 0;
  for (; i < ii; i++) {
    d += Math.abs(a[i] - b[i]);
  }
  return d;
}

function matusita(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += Math.sqrt(a[i] * b[i]);
  }
  return Math.sqrt(2 - 2 * ans);
}

function minkowski(a, b, p) {
  var i = 0;
  var ii = a.length;
  var d = 0;
  for (; i < ii; i++) {
    d += Math.pow(Math.abs(a[i] - b[i]), p);
  }
  return Math.pow(d, 1 / p);
}

function motyka(a, b) {
  var ii = a.length;
  var up = 0;
  var down = 0;
  for (var i = 0; i < ii; i++) {
    up += Math.min(a[i], b[i]);
    down += a[i] + b[i];
  }
  return 1 - up / down;
}

function neyman(a, b) {
  var i = 0;
  var ii = a.length;
  var d = 0;
  for (; i < ii; i++) {
    d += ((a[i] - b[i]) * (a[i] - b[i])) / a[i];
  }
  return d;
}

function pearson(a, b) {
  var i = 0;
  var ii = a.length;
  var d = 0;
  for (; i < ii; i++) {
    d += ((a[i] - b[i]) * (a[i] - b[i])) / b[i];
  }
  return d;
}

function probabilisticSymmetric(a, b) {
  var i = 0;
  var ii = a.length;
  var d = 0;
  for (; i < ii; i++) {
    d += ((a[i] - b[i]) * (a[i] - b[i])) / (a[i] + b[i]);
  }
  return 2 * d;
}

function ruzicka(a, b) {
  var ii = a.length;
  var up = 0;
  var down = 0;
  for (var i = 0; i < ii; i++) {
    up += Math.min(a[i], b[i]);
    down += Math.max(a[i], b[i]);
  }
  return up / down;
}

function soergel(a, b) {
  var ii = a.length;
  var up = 0;
  var down = 0;
  for (var i = 0; i < ii; i++) {
    up += Math.abs(a[i] - b[i]);
    down += Math.max(a[i], b[i]);
  }
  return up / down;
}

function sorensen(a, b) {
  var ii = a.length;
  var up = 0;
  var down = 0;
  for (var i = 0; i < ii; i++) {
    up += Math.abs(a[i] - b[i]);
    down += a[i] + b[i];
  }
  return up / down;
}

function squared(a, b) {
  var i = 0;
  var ii = a.length;
  var d = 0;
  for (; i < ii; i++) {
    d += ((a[i] - b[i]) * (a[i] - b[i])) / (a[i] + b[i]);
  }
  return d;
}

function squaredChord(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans +=
      (Math.sqrt(a[i]) - Math.sqrt(b[i])) * (Math.sqrt(a[i]) - Math.sqrt(b[i]));
  }
  return ans;
}

function taneja(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans +=
      ((a[i] + b[i]) / 2) *
      Math.log((a[i] + b[i]) / (2 * Math.sqrt(a[i] * b[i])));
  }
  return ans;
}

function tanimoto(a, b, bitvector) {
  if (bitvector) {
    var inter = 0;
    var union = 0;
    for (var j = 0; j < a.length; j++) {
      inter += a[j] && b[j];
      union += a[j] || b[j];
    }
    if (union === 0) {
      return 1;
    }
    return inter / union;
  } else {
    var ii = a.length;
    var p = 0;
    var q = 0;
    var m = 0;
    for (var i = 0; i < ii; i++) {
      p += a[i];
      q += b[i];
      m += Math.min(a[i], b[i]);
    }
    return 1 - (p + q - 2 * m) / (p + q - m);
  }
}

function tanimoto$1(a, b, bitvector) {
  if (bitvector) {
    return 1 - tanimoto(a, b, bitvector);
  } else {
    var ii = a.length;
    var p = 0;
    var q = 0;
    var m = 0;
    for (var i = 0; i < ii; i++) {
      p += a[i];
      q += b[i];
      m += Math.min(a[i], b[i]);
    }
    return (p + q - 2 * m) / (p + q - m);
  }
}

function topsoe(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans +=
      a[i] * Math.log((2 * a[i]) / (a[i] + b[i])) +
      b[i] * Math.log((2 * b[i]) / (a[i] + b[i]));
  }
  return ans;
}

function waveHedges(a, b) {
  var ii = a.length;
  var ans = 0;
  for (var i = 0; i < ii; i++) {
    ans += 1 - Math.min(a[i], b[i]) / Math.max(a[i], b[i]);
  }
  return ans;
}



var distances = /*#__PURE__*/Object.freeze({
  euclidean: mlDistanceEuclidean.euclidean,
  squaredEuclidean: mlDistanceEuclidean.squaredEuclidean,
  additiveSymmetric: additiveSymmetric,
  avg: avg,
  bhattacharyya: bhattacharyya,
  canberra: canberra,
  chebyshev: chebyshev,
  clark: clark,
  czekanowski: czekanowskiDistance,
  dice: dice,
  divergence: divergence,
  fidelity: fidelity,
  gower: gower,
  harmonicMean: harmonicMean,
  hellinger: hellinger,
  innerProduct: innerProduct,
  intersection: intersection,
  jaccard: jaccard,
  jeffreys: jeffreys,
  jensenDifference: jensenDifference,
  jensenShannon: jensenShannon,
  kdivergence: kdivergence,
  kulczynski: kulczynski,
  kullbackLeibler: kullbackLeibler,
  kumarHassebrook: kumarHassebrook,
  kumarJohnson: kumarJohnson,
  lorentzian: lorentzian,
  manhattan: manhattan,
  matusita: matusita,
  minkowski: minkowski,
  motyka: motyka,
  neyman: neyman,
  pearson: pearson,
  probabilisticSymmetric: probabilisticSymmetric,
  ruzicka: ruzicka,
  soergel: soergel,
  sorensen: sorensen,
  squared: squared,
  squaredChord: squaredChord,
  taneja: taneja,
  tanimoto: tanimoto$1,
  topsoe: topsoe,
  waveHedges: waveHedges
});

function cosine(a, b) {
  var ii = a.length;
  var p = 0;
  var p2 = 0;
  var q2 = 0;
  for (var i = 0; i < ii; i++) {
    p += a[i] * b[i];
    p2 += a[i] * a[i];
    q2 += b[i] * b[i];
  }
  return p / (Math.sqrt(p2) * Math.sqrt(q2));
}

function dice$1(a, b) {
  return 1 - dice(a, b);
}

function intersection$1(a, b) {
  return 1 - intersection(a, b);
}

function jaccard$1(a, b) {
  return 1 - jaccard(a, b);
}

function kulczynski$1(a, b) {
  return 1 / kulczynski(a, b);
}

function motyka$1(a, b) {
  return 1 - motyka(a, b);
}

function pearson$1(a, b) {
  var avgA = mean(a);
  var avgB = mean(b);

  var newA = new Array(a.length);
  var newB = new Array(b.length);
  for (var i = 0; i < newA.length; i++) {
    newA[i] = a[i] - avgA;
    newB[i] = b[i] - avgB;
  }

  return cosine(newA, newB);
}

function squaredChord$1(a, b) {
  return 1 - squaredChord(a, b);
}



var similarities = /*#__PURE__*/Object.freeze({
  tree: mlTreeSimilarity,
  cosine: cosine,
  czekanowski: czekanowskiSimilarity,
  dice: dice$1,
  intersection: intersection$1,
  jaccard: jaccard$1,
  kulczynski: kulczynski$1,
  motyka: motyka$1,
  pearson: pearson$1,
  squaredChord: squaredChord$1,
  tanimoto: tanimoto
});

exports.distance = distances;
exports.similarity = similarities;

},{"ml-array-mean":6,"ml-distance-euclidean":8,"ml-tree-similarity":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var binarySearch = _interopDefault(require('binary-search'));
var numSort = require('num-sort');

/**
 * Function that creates the tree
 * @param {Array<Array<number>>} spectrum
 * @param {object} [options]
 * @return {Tree|null}
 * left and right have the same structure than the parent,
 * or are null if they are leaves
 */
function createTree(spectrum, options = {}) {
  var X = spectrum[0];
  const {
    minWindow = 0.16,
    threshold = 0.01,
    from = X[0],
    to = X[X.length - 1]
  } = options;

  return mainCreateTree(
    spectrum[0],
    spectrum[1],
    from,
    to,
    minWindow,
    threshold
  );
}

function mainCreateTree(X, Y, from, to, minWindow, threshold) {
  if (to - from < minWindow) {
    return null;
  }

  // search first point
  var start = binarySearch(X, from, numSort.ascending);
  if (start < 0) {
    start = ~start;
  }

  // stop at last point
  var sum = 0;
  var center = 0;
  for (var i = start; i < X.length; i++) {
    if (X[i] >= to) {
      break;
    }
    sum += Y[i];
    center += X[i] * Y[i];
  }

  if (sum < threshold) {
    return null;
  }

  center /= sum;
  if (center - from < 1e-6 || to - center < 1e-6) {
    return null;
  }
  if (center - from < minWindow / 4) {
    return mainCreateTree(X, Y, center, to, minWindow, threshold);
  } else {
    if (to - center < minWindow / 4) {
      return mainCreateTree(X, Y, from, center, minWindow, threshold);
    } else {
      return new Tree(
        sum,
        center,
        mainCreateTree(X, Y, from, center, minWindow, threshold),
        mainCreateTree(X, Y, center, to, minWindow, threshold)
      );
    }
  }
}

class Tree {
  constructor(sum, center, left, right) {
    this.sum = sum;
    this.center = center;
    this.left = left;
    this.right = right;
  }
}

/**
 * Similarity between two nodes
 * @param {Tree|Array<Array<number>>} a - tree A node
 * @param {Tree|Array<Array<number>>} b - tree B node
 * @param {object} [options]
 * @return {number} similarity measure between tree nodes
 */
function getSimilarity(a, b, options = {}) {
  const { alpha = 0.1, beta = 0.33, gamma = 0.001 } = options;

  if (a === null || b === null) {
    return 0;
  }
  if (Array.isArray(a)) {
    a = createTree(a);
  }
  if (Array.isArray(b)) {
    b = createTree(b);
  }

  var C =
    (alpha * Math.min(a.sum, b.sum)) / Math.max(a.sum, b.sum) +
    (1 - alpha) * Math.exp(-gamma * Math.abs(a.center - b.center));

  return (
    beta * C +
    ((1 - beta) *
      (getSimilarity(a.left, b.left, options) +
        getSimilarity(a.right, b.right, options))) /
      2
  );
}

function treeSimilarity(A, B, options = {}) {
  return getSimilarity(A, B, options);
}

function getFunction(options = {}) {
  return (A, B) => getSimilarity(A, B, options);
}

exports.createTree = createTree;
exports.getFunction = getFunction;
exports.treeSimilarity = treeSimilarity;

},{"binary-search":4,"num-sort":11}],11:[function(require,module,exports){
'use strict';

function assertNumber(number) {
	if (typeof number !== 'number') {
		throw new TypeError('Expected a number');
	}
}

exports.ascending = (left, right) => {
	assertNumber(left);
	assertNumber(right);

	if (Number.isNaN(left)) {
		return -1;
	}

	if (Number.isNaN(right)) {
		return 1;
	}

	return left - right;
};

exports.descending = (left, right) => {
	assertNumber(left);
	assertNumber(right);

	if (Number.isNaN(left)) {
		return 1;
	}

	if (Number.isNaN(right)) {
		return -1;
	}

	return right - left;
};

},{}],12:[function(require,module,exports){
function Dataspec(obj) {
    console.log(obj)
    dataSpec = {}
    dataSpec["sequences"] = [];
    dataSpec["intraSequenceTask"] = (typeof obj.intraSequenceTask =="object") ? obj.intraSequenceTask : (function(){throw "Interconnection should be an object"}());
  
    for(let i=0;i<obj.sequences.length;i++)
    {
        dataSpec["sequences"].push(Sequence(obj.sequences[i]))
    }

    return dataSpec

}


function Sequence(obj) {
    var sequenceName;
    var features = [];
    var sequenceInterconnection;
   
    //We can implement a type of checker before assignment of the value    
    sequenceName = (typeof obj.sequenceName =="string") ?  obj.sequenceName : (function(){throw "Sequence name should be a string"}());
    sequenceInterconnection = (typeof obj.sequenceInterconnection =="object") ? obj.sequenceName : (function(){throw "Interconnection should be an object"}());
    interFeatureTasks = (typeof obj.interFeatureTasks =="object") ? obj.interFeatureTasks : (function(){throw "Inter feature tasks should be an object"}());
    //Features has to be an array
    for(let i=0;i<obj.features.length;i++){
        features.push(Features(obj.features[i]));
    }

    return {sequenceName,features,sequenceInterconnection,interFeatureTasks}
}



function Features(obj){
    var featureGranularity
    var featureDensity
    var attributes = []
    var interFeatureTasks = []
    var featureLabel 
    var featureInterconnection
    var denseInterconnection
   
    featureGranularity =  (["point","interval"].indexOf(obj.featureGranularity != -1)) ?  obj.featureGranularity : (function(){throw "Feature Granularity must be either Point or Interval"}());
    featureDensity =  (["sparse","continous"].indexOf(obj.featureDensity) != -1) ?  obj.featureDensity : (function(){throw "Feature Density must be either Sparse or Continous"}());
    featureLabel = obj.featureLabel
    interFeatureTasks = obj.interFeatureTasks
    featureInterconnection = (typeof obj.featureInterconnection == "boolean") ?  obj.featureInterconnection : (function(){throw "Feature Interconnection must be Boolean type"}());
    denseInterconnection = (typeof obj.denseInterconnection == "boolean") ? obj.denseInterconnection :  (function(){throw "Dense Interconnection must be Boolean type"}());
    for(let i=0;i<obj.attr.length;i++){
        attributes.push(Attributes(obj.attr[i]))   
    }
    return {featureGranularity,featureDensity,featureLabel,interFeatureTasks,featureInterconnection,denseInterconnection,attributes}
}



function Attributes(obj){
    var dataDescriptor
    var dataType
    var intraAttrTask = []
    var interAttrTask = []


    dataDescriptor =  obj.dataDescriptor; // Allow assignment without typecheck for partial dataspec
    dataType = (typeof obj.dataType == "string" && ["quantitative","categorical","text"].indexOf(obj.dataType) != -1) ?  obj.dataType : (function(){throw "Data Descriptor should be a string and should be either: Quant, Categorical or Text "}());
    intraAttrTask = (Array.isArray(obj.intraAttrTask)) ? obj.intraAttrTask: (function(){throw "Intra attribute tasks should be an array with one or more entries consisting indentify, compare or summarize"}());
    interAttrTask = (Array.isArray(obj.interAttrTask)) ? obj.interAttrTask : [] // Allow assignment of [] without typecheck for partial dataspec
    
    return {dataDescriptor,dataType,intraAttrTask,interAttrTask}
  
}

module.exports = Dataspec
},{}],13:[function(require,module,exports){
var Dataspec = require('./dataspec.js')
var encodeAttribute  = require("./s1_en.js")
var getTracks  = require("./s2_ca.js")
var inputData = require("../configuration/input.json")
var getLayout  = require("./s3_ls.js")
var getAlignment = require("./s4_al.js")
var getArrangment = require("./s5_ar.js")

//Validate the input dataspecification to ensure correctness of input data
const dataspec = Dataspec(inputData)
const sequenceInputArrays = dataspec["sequences"]
var sequencesOutput = {}


// //First determine sequence level encoding
for (var i=0;i<sequenceInputArrays.length;i++){
    //Stage 1: Encoding Selection
    var attributeEncoding = encodeAttribute(sequenceInputArrays[i]);
    //Stage 2: Combining Attributes
    var tracks = getTracks(attributeEncoding)
    //Stage 3: Predict the Layout
    var layout = getLayout(tracks, attributeEncoding)
    //Stage 4: Alignment 
    sequencesOutput[sequenceInputArrays[i]['sequenceName']]= getAlignment(layout,sequenceInputArrays[i]['interFeatureTasks'],sequenceInputArrays[i]['sequenceName'])
    //console.log(attributeEncoding,tracks,layout)
}

//Get Arrangement given the entire sequence data
var arrangements = getArrangment(sequencesOutput,dataspec['intraSequenceTask'])


// function setInput(param) {
//     //Validate the input dataspecification to ensure correctness of input data
//     const dataspec = Dataspec(param)
//     //Test output only for 1 sequence
//     var attributeEncoding,tracks,layout

//     // //First determine sequence level encoding
//     for (var i=0;i<dataspec.length;i++){
//         //Stage 1: Encoding Selection
//         var attributeEncoding = encodeAttribute(dataspec[i]);
//         //Stage 2: Combining Attributes
//         var tracks = getTracks(attributeEncoding)
//         //Stage 3: Predict the Layout
//         var layout = getLayout(tracks, attributeEncoding)
//         //Stage 4: Alignment 
//         // var finalSequence = getAlignment(layout)
//     }
//     return {attributeEncoding,tracks,layout}
// }  

// //Define the libary's api for external applications
// module.exports ={
// setInput
// }
},{"../configuration/input.json":1,"./dataspec.js":12,"./s1_en.js":15,"./s2_ca.js":16,"./s3_ls.js":17,"./s4_al.js":18,"./s5_ar.js":19}],14:[function(require,module,exports){
const stage1Model = require('../model/stage1.json');
const stage3Model = require('../model/stage3.json');

//Converting the model to objects
let stage1ModelObj = {}

stage1Model.map(val =>{
    stage1ModelObj[val["chart"]] = val
})


let stage3ModelObj = {}

stage3Model.map(val =>{
    stage3ModelObj[val["layout"]] = val
})


module.exports = {
    model1: stage1ModelObj,
    model3: stage3ModelObj
}

},{"../model/stage1.json":2,"../model/stage3.json":3}],15:[function(require,module,exports){
// Description: This page identifies the visual encoding of each attribute avaialble in the dataset.
// Output: Featureid -> [{attrid, inputVector, similarityScore, recommendation}]
// inputVector consists an array and an object that store information about the input attribute.
// similarityScore contains the score of an inputVector with all the encoding options available for genomics visualization.
// recommendation is an array of one or more product recommendation. 
const model = require('../model/stage1.json');
const vectorKeys = ["quantitative","categorical","text","sparse","continous","point","segment","identify","compare","summarize"]
const  globalData = require("./modelDataProcessing.js")
const stage1Model = globalData.model1
const getProductProperties  = require("./utils.js").productProperties
const computeSimilarity = require("./utils.js").computeSimilarity
const recommendedProducts = require("./utils.js").recommendedProducts
//Product vector only needs to be computed once
const productVector = getProductProperties(stage1Model,vectorKeys)



// Description: This function will convert the dataspec to an array of user input
// Description: As a side we will also store the input object vector
// Input: The feature spec and attribute
// Output: Vector array and object 
function createInputVector(feature,attribute){
  
  // Mapping attributes 
  var inputVectorObject = {}
  var inputArray = []

  //Vector array and object
    inputArray.push(inputVectorObject["quantitative"] = attribute.dataType == "quantitative" ? 1 : 0)
    inputArray.push(inputVectorObject["categorical"] = attribute.dataType == "categorical" ? 1 : 0)
    inputArray.push(inputVectorObject["text"] = attribute.dataType == "text" ? 1 : 0)
    inputArray.push(inputVectorObject["sparse"] = feature.featureDensity == "sparse" ? 1 : 0)
    inputArray.push(inputVectorObject["continous"] = feature.featureDensity == "continous" ? 1 : 0)
    inputArray.push(inputVectorObject["point"] = feature.featureGranularity == "point" ? 1:0)
    inputArray.push(inputVectorObject["segment"] = feature.featureGranularity == "segment" ? 1:0)
    inputArray.push(inputVectorObject["identify"] = attribute.intraAttrTask.indexOf("identify") != -1 ? 1 : 0 
    )
    inputArray.push(inputVectorObject["compare"] = attribute.intraAttrTask.indexOf("compare") != -1 ? 1 : 0 )
    inputArray.push(inputVectorObject["summarize"] = attribute.intraAttrTask.indexOf("summarize") != -1 ? 1 : 0 
    )

  //Additional elements to add to the object
  inputVectorObject["featureInterconnection"] = feature.featureInterconnection ? 1 : 0
  inputVectorObject["denseInterconnection"] = feature.denseInterconnection  ? 1 : 0
  
  return {inputVectorObject, inputArray}
  }


// Description: Get the type of within interconnection at a feature level
// Input: Feature Specification
// Output: {interconnection:boolean, denseinterconnection:boolean}
function getInterconnectionFeature(feature){
  return { featureInterconnection: feature.featureInterconnection ? 1 : 0, denseInterconnection: feature.denseInterconnection ? 1 : 0 }
}



function encodeAttribute(dataspec){

    var partialSpecification = {}

    for(var i = 0; i<dataspec.features.length;i++)
    {
      var currentFeature = dataspec.features[i];

      //Initiation of the partial specification
      partialSpecification[`feature_${i}`] = []

      //Get recommendation of the input feature vector
      for(j=0;j<currentFeature.attributes.length;j++){
        var currentAttribute = currentFeature.attributes[j]
        var inputVectorObject = createInputVector(currentFeature,currentAttribute)  
        var similarityScores = computeSimilarity(inputVectorObject,productVector)
        var recommendation = recommendedProducts(similarityScores)
        var featureConnection = getInterconnectionFeature(currentFeature)
        var tempAttributeStorage = {'featureId':`feature_${i}`,'attributeId':`attribute_${j}`, 'inputVectorObject':inputVectorObject, 'similarityScore': similarityScores, 'recommendation':recommendation, featureConnection}
        
        partialSpecification[`feature_${i}`].push(tempAttributeStorage)
      }
    }
    console.log("Stage1 Output:", partialSpecification)
    return partialSpecification
}

 module.exports = encodeAttribute
},{"../model/stage1.json":2,"./modelDataProcessing.js":14,"./utils.js":20}],16:[function(require,module,exports){

// Attributes that can be combined
var attrCombination = {
    "dotplot":["barsaturation","barhue"],
    "barsize":["barsaturation","barhue"],
    "barsaturation":["dotplot","barsize"],
    "barhue":["dotplot","barsize"],
    "areasize":["areasaturation","areahue"],
    "areasaturation":["areasize"],
    "areahue":["areasize"]
}

//Superimposable encodings
var superimposition = {
    "dotplot": ["dotplot","linechart","barsize","annotation"],
    "linechart": ["linechart","dotplot","barsize","annotation"],
    "barsize":["dotplot","linechart","annotation"],
    "barsaturation":["annotation"],
    "barhue":["annotation"],
    "areahue":["annotation"],
    "areasize":["annotation"],
    "annotation":["dotplot","barsize","barsaturation","areasize","areasaturation","areahue"]
}
// var superimposition = {
//     "dotplot": ["dotplot","linechart","barsize"],
//     "linechart": ["linechart","dotplot","barsize"],
//     "barsize":["dotplot","linechart"]
// }

//Description:This function is going to take input specifications and try to output a list of visualizable attributes per feature
//Input: Feature object
//Output: Returns the tracks 
function getPossibilities(feature)
{
    var allEncoding = []//First store all the possible encodings in the dataspec.

    //Step 1: Identify all the possible encodings for the attributes
    //Loop through all the options and store the encodings in the allEncoding var
    for (var i=0; i<feature.length;i++)
    {    
        var recommendation = feature[i]['recommendation']
        var similarityScore = recommendation.map((val)=>{return feature[i]['similarityScore'][val]})
        var encodingRecommendations = []
        for (var j=0; j<recommendation.length; j++){
            var encoding = {'featureId':feature[i]["featureId"],'attributeId':feature[i]['attributeId'], 'encoding':recommendation[j], 'similarityScore':similarityScore[j]}
            encodingRecommendations.push(encoding)
        }
        allEncoding.push(encodingRecommendations)
    } 

    var encodingOptions = cartesian(allEncoding)

    //Find the attributes that merge
    var finalEncodingCombination = [];
    for (var x = 0; x< encodingOptions.length; x++){
      var set = encodingOptions[x]  
      finalEncodingCombination.push(combineLogic(set))
    }
    
    console.log(finalEncodingCombination)

    //Superimpose Attributes
    var finalSuperimposed = []
    for (var x=0;x<finalEncodingCombination.length;x++)
    {
        var set  = finalEncodingCombination[x]
        finalSuperimposed.push(superimposeLogic(set))
    }

    console.log(finalSuperimposed)
    //var trackIdAdded = addTrackId(finalSuperimposed)

    return finalSuperimposed
}

// function addTrackId(tracks)
// {
//    var trackIdAdded = tracks.map(element => {
//         var trackIdArray = element.map((innerElement,trackId) => {
//             var innterTid =  innerElement.map(innerInner => {
//                     innerInner['trackId'] = trackId
//                     return innerInner
//             })
//             return innterTid
//         });
//         return trackIdArray
//     });
//     return trackIdAdded
// }

//Description: Checks if two variables can be combined, based on decision rules.
function canCombine(a,b){
    var listOfCombinedAttr = attrCombination[a]
    if(listOfCombinedAttr == undefined) {return false}
    return listOfCombinedAttr.indexOf(b) != -1 ? true : false
}

//Description: Check if two items groups/individual atttributes can be superimposed
//Input Both a and b are array and we will do a cartesian combination and check 
function canSuperimposed(a,b){
    var canSuperimposed = []
    var allcombinations = cartesian([a,b])

    for(var i=0;i<allcombinations.length;i++){
        var a = allcombinations[i][0]
        var b = allcombinations[i][1]
        if(superimposition[a] == undefined || superimposition[a] == undefined){
            canSuperimposed.push(false)
            continue
        }
        superimposition[a].indexOf(b) != -1 ? canSuperimposed.push(true) : canSuperimposed.push(false) // Incorrect
    }

    // console.log("boolean array", canSuperimposed) 
     return canSuperimposed.every(v => v === true)

}


//Description: Algorithm to superimpose
function superimposeLogic(arr)
{
    var finalSuperImposed = []
    var visited = arr.map(val =>
        {
            return 0
        })
    
    for(var i=0;i<arr.length;i++)
    {
        if(visited[i]==0)
        {
            var superImpositionNotFound = true
            var a = arr[i]
            var addSuperImposed = []
            var aEncoding = arr[i].map(val => {return val['encoding']})

            for(var j=0;j<arr.length;j++)
            {
                if(visited[j]==0)
                {
                    if(i==j){continue} // Skip the same 
                    var b = arr[j]
                    var bEncoding = arr[j].map(val => {return val['encoding']})
                    if(canSuperimposed(aEncoding,bEncoding))
                    {
                        visited[j] = 1
                        b.map(arr => {
                            arr["superimposed"] = true
                        })
                        addSuperImposed.push(...b)
                        superImpositionNotFound = false
                        continue
                    }
                }

            }
                a.map(arr => {
                    arr["superimposed"] = !superImpositionNotFound
                })
                addSuperImposed.push(...a)
            
                finalSuperImposed.push(addSuperImposed)
            
        }
    }  
    
    return finalSuperImposed

}


//Description: This method returns a combined list of attributes
//Input: Array of object containing the attribtue id and encoding recoomendation
//Output: Array of combined and non-combined attributes. E.g [[a1_dotplot,a2_barchart],[a3_annotation]]
function combineLogic(arr)
{
    var finalEncodingCombination = []   
    var visited = arr.map(val =>
        {
            return 0
        })
    
    for(var i = 0;i<arr.length;i++)
        {
            if(visited[i]==0)
            {
                var combinationNotFound = true // This variable will keep track incase the combination was found 
                var a = Object.assign({},arr[i])
                for (var j = 0;j<arr.length;j++)
                {
                    if(visited[j]==0)
                    {
                        var b = Object.assign({},arr[j])
                        if(a['attributeId'] == b['attributeId'])
                        {
                            continue
                        }
                        else
                        {
                            var combine = canCombine(a['encoding'],b['encoding'])                            
                            if (combine)
                            {
                                visited[i] = 1
                                visited[j] = 1
                                // finalEncodingCombination.push(`${a['attributeId']}_${a['encoding']}_${b['encoding']}`)
                                a['combined'] = true
                                b['combined'] = true
                                finalEncodingCombination.push([a,b])
                                combinationNotFound = false
                                break;
                            }
                        }
                    }
                }
                if(combinationNotFound)
                {
                    a['combined'] = false
                    finalEncodingCombination.push([a])
                }
            }
        }

return finalEncodingCombination
    
}


//Description: Test function to evaluate combinations of attributes
//Input: Array of arrays that have to be combined
//Output: All possible combinations of the arrays
function cartesian(args) {
    var r = [], max = args.length-1;
    function helper(arr, i) {
        for (var j=0, l=args[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(args[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}

function getTracks(encodingSpecification){
    
    var featureKeys= Object.keys(encodingSpecification)
    var trackList =[]

    for(i=0;i<featureKeys.length;i++){
        var trackPossibilities = getPossibilities(encodingSpecification[featureKeys[i]])
        var featureId = `feature_${i}`
        var returnTrackSpec = {[featureId]:{trackPossibilities}}
        // console.log(`Stage 2 Output`, returnTrackSpec)
        trackList.push(returnTrackSpec)
    }

    console.log(`Stage 2 Output`, trackList)
    
    return trackList

}

module.exports = getTracks
},{}],17:[function(require,module,exports){
const globalData = require("./modelDataProcessing.js")
const stage1Model = globalData.model1
const stage3Model = globalData.model3
const vectorKeys = ["featureinterconnection","denseinterconnection", "identify", "compare","summarize","size","hue","saturation","text"]
const getProductProperties  = require("./utils.js").productProperties
const computeSimilarity = require("./utils.js").computeSimilarity
const recommendedProducts = require("./utils.js").recommendedProducts
const getVisOptions = require("./utils.js").getVisOptions
const productVector = getProductProperties(stage3Model,vectorKeys)


//Todo: Need to figure out how to take into consideration user preferences

//Description: Use the input from stage 2 and dataspec to create an input vector.
//Input: 
//Output: 
function createInputVector(channels,tasks,interconnection){
  // Mapping attributes 
  var inputVectorObject = {}
  var inputArray = []

  inputArray.push(inputVectorObject["featureinterconnection"] = interconnection['featureInterconnection'] == 1 ? 1 : 0)
  inputArray.push(inputVectorObject["denseinterconnection"] = interconnection['denseInterconnection'] == 1 ? 1 : 0)
  inputArray.push(inputVectorObject["identify"] = tasks.has("identify") ? 1 : 0)
  inputArray.push(inputVectorObject["compare"] = tasks.has("compare") ? 1 : 0)
  inputArray.push(inputVectorObject["summarize"] = tasks.has("summarize")  ? 1 : 0)
  inputArray.push(inputVectorObject["size"] = (channels.indexOf("size") !=-1 || channels.indexOf("position") !=-1 )  ? 1 : 0)
  inputArray.push(inputVectorObject["hue"] = channels.indexOf("hue") !=-1  ? 1 : 0)
  inputArray.push(inputVectorObject["saturation"] = channels.indexOf("saturation") !=-1  ? 1 : 0)
  inputArray.push(inputVectorObject["text"] = channels.indexOf("text") !=-1  ? 1 : 0)

  return {inputVectorObject,inputArray}
}




//Description: Track combinations are designed to nest though all the combinations and find trackCombinations for all possible individual trackCombinations
//Input: Previous stage outputs
//Output: Inputvector and Inputarray for each track and all the possible combinations.
function createTrackInputVector(stage2Output,tasks,stage1Output){

    var trackPossibilities = stage2Output.trackPossibilities

    var interconnection = stage1Output[0]['featureConnection']

    var allTrackInput = []
    //This loop identifies the possible combination of trackCombinations within a feature
    for(var j =0; j<trackPossibilities.length; j++){
      var trackCombinationInputVector = []
      var trackCombinations = trackPossibilities[j]
      //In this loop we check for each individual track and find its input vector.
      for(var k=0; k<trackCombinations.length;k++)
        {     
          var channels = trackCombinations[k].map(val => {
          return stage1Model[val['encoding']]['channel']
        })
        // allTrackInput.push(createInputVector(channels,tasks,interconnection))
        var inputVector = createInputVector(channels,tasks,interconnection)
        trackCombinationInputVector.push({inputVector,encodings:trackCombinations[k]})
      }
      allTrackInput.push(trackCombinationInputVector)
    }
    // console.log(allTrackInput)
    return allTrackInput
}

function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

//Description: This function will list all the tasks a user may have requested for in the dataspec at a feature level.
//Input: An entire Feature input
//Output: List of tasks users wants to perform
function getTasks(feature){
  let tasks = new Set()

  for(var i=0;i<feature.length;i++){
      var currentFeature = feature[i];

      if(currentFeature['inputVectorObject']['inputVectorObject']['compare'] == 1)
      {
          tasks.add("compare")
      }
      if(currentFeature['inputVectorObject']['inputVectorObject']['identify'] == 1)
      {
          tasks.add("identify")
      }
      if(currentFeature['inputVectorObject']['inputVectorObject']['summarize'] == 1)
      {
          tasks.add("summarize")
      }
      
  }

  return tasks
}


// Description: For each input feature, identify the types of trackCombinations
//We need information about the 
function getLayout (stage2Output,stage1Output) {

  //Layout recommendation for each possible track  indexed by feature id
  var trackLayout = {}
  // This loop divides the features, and for individual feature set identifies the types of trackCombinations.
  for (var i = 0; i< stage2Output.length;i++)
  {
    // We want to extract the key of the feature that we are analyzing
    var key = Object.keys(stage2Output[i])[0]

    //We want to extract all the tasks for each possible group of attributes
    var tasks = getTasks(stage1Output[key])
    
    //Track possibilities store all the tracks that our recommendatio system predicted per feature
    var trackPossibilities = createTrackInputVector(stage2Output[i][`feature_${i}`], tasks ,stage1Output[key])
    
    //Initialize the features
    trackLayout[key] = {"trackPossibilities":[]}
    

    // A track consists of one or more
    for(var j =0; j< trackPossibilities.length;j++)
    {
      var tracks = trackPossibilities[j]
      var trackLayoutRecommendation = []
      for (var k = 0; k< tracks.length; k++){
        var inputVectorObject = tracks[k]['inputVector']
        var similarityScores = computeSimilarity(inputVectorObject,productVector)
        trackLayoutRecommendation.push(recommendedProducts(similarityScores))
      }
      //find the most common layout in the tracklayoutrecommendation array
      var layoutRecommendation = mode(trackLayoutRecommendation)
      trackLayout[key]["trackPossibilities"].push({tracks, layoutRecommendation:layoutRecommendation[0]})
    }
  } 

console.log("Stage 3 Output:")
console.log(trackLayout)
  

//For each feature  we have an array
//Array: A possible combination of attributes for a feature representation
//Goal: Seperate unique methods to visualize the sequence. This seperation will be helpful in the feature alignment.
return getVisOptions(trackLayout)
}


module.exports = getLayout
},{"./modelDataProcessing.js":14,"./utils.js":20}],18:[function(require,module,exports){
const cartesian = require("./utils.js").cartesian

//Superimposable encodings
var superimposition = {
    "dotplot": ["dotplot","linechart","barsize","annotation"],
    "linechart": ["linechart","dotplot","barsize","annotation"],
    "barsize":["dotplot","linechart","annotation"],
    "barsaturation":["annotation"],
    "barhue":["annotation"],
    "areahue":["annotation"],
    "areasize":["annotation"],
    "annotation":["dotplot","barsize","barsaturation","areasize","areasaturation","areahue"]
}



//Description: Get the alignment of the encoding
//Input: Two or more elements in the array
//Output: stacked or superimposed
function returnAlignmentChoice(input)
{
    //Base case only one encoding
    if(input.length<2){
        return "stacked"
    }

    //First check if all the input elements have samelayout have the same layout
    const allEqual = arr => arr.every( v => v === arr[0] )
    if(!allEqual)
    {
        return "stacked"
    }

}


//Description: Check if two items groups/individual atttributes can be superimposed
//Input Both a and b are array and we will do a cartesian combination and check 
function canSuperimposed(a,b){
    var canSuperimposed = []
    var allcombinations = cartesian([a,b])

    for(var i=0;i<allcombinations.length;i++){
        var a = allcombinations[i][0]
        var b = allcombinations[i][1]
        if(superimposition[a] == undefined || superimposition[a] == undefined){
            canSuperimposed.push(false)
            continue
        }
        superimposition[a].indexOf(b) != -1 ? canSuperimposed.push(true) : canSuperimposed.push(false) // Incorrect
    }

    // console.log("boolean array", canSuperimposed) 
     return canSuperimposed.every(v => v === true)

}


//Description: Algorithm to superimpose
function checkForSuperImposition(features)
{
    var featureArray= Object.values(features);
    var cartesianFeatureArray = cartesian(featureArray)
    var cartesianEncodings =  cartesianFeatureArray.map(element=>{
        var encodingArray= element.map(innerElement=>{
            var encodingArrayTemp = innerElement.map(innerInnerElement=>{
                return innerInnerElement['encoding']
            })
          return encodingArrayTemp
        })
        return encodingArray
    })
    var superImposedIndex = encodingSuperImposable(cartesianEncodings)
    return cartesianFeatureArray[superImposedIndex]
}

// //Input: An array of encoding arrays
// //Description: For each subarray crete 
function encodingSuperImposable(cartesianEncodings)
{
    var returnIndex=[];
    var superImpose = false
    for(var k=0;k<cartesianEncodings.length;k++){
        var val = cartesianEncodings[k]
        for(var i=0;i<val.length-1;i++)
        {
            for(var j= i+1;j<val.length;j++)
            {
                if(canSuperimposed(val[i],val[j]))
                {
                    returnIndex.push(k)
                }
       
            }
        }
    }

    if(returnIndex.length>0){
        return returnIndex[0]
    }
    else{
        return returnIndex
    }
}



function getAlignment (layouts,tasks,sequenceName)
{
    // Get the tracks from each feature
    var visOptions = Object.values(layouts)

    visOptions.forEach((vis,i) =>{
        var featureUsed ={}
        var stacked= []
        var superImpose =[]
        Object.keys(vis).map((val) =>{
            featureUsed[val] = false            
        })

        if(tasks.compare.length>0){
            //do something
            var featureList = Object.values(tasks.compare)
            var featureObjectForSuperImposition = {}
            // create an array of tracks in each feature
            featureList.forEach((element)=>{
                if(!featureUsed[element])
                {
                    var valuesToPush = vis[element]["tracks"].map((elemtnVal,trackId) => { 
                        // elemtnVal["encodings"]["trackId"] = trackId
                        return elemtnVal["encodings"]})
            
                    featureObjectForSuperImposition[element]= valuesToPush
                }
            })
            var superImposedFeatures = (checkForSuperImposition(featureObjectForSuperImposition))            
            
            if(superImposedFeatures!=undefined){
            var superImposedFlat = superImposedFeatures.flat()
            superImposedFlat.forEach(element=>{
                var tempString = element["featureId"]+"track_"+element["trackId"]
                if(superImpose.indexOf(tempString)==-1){
                    superImpose.push(tempString)
                    featureUsed[element["featureId"]] = true
                }
            })
         }
        }
        if(tasks.browse.length>0){
            //do something
            var featureList = Object.values(tasks.browse)
            featureList.forEach(element => {
                if(featureUsed[element] == false){
                    featureUsed[element] = true
                    stacked.push(element)
                }
            });
        }
        if(tasks.summarize.length>0){
            //do something
            var featureList = Object.values(tasks.browse)
            featureList.forEach(element => {
                if(featureUsed[element] == false){
                    featureUsed[element] = true
                    stacked.push(element)
                }
            });
        }

        //If no tasks then check for features that can be superimposed
        {
            var featuresForSuperImposition = {}
            Object.keys(vis).map((val)=>{
                if(!featureUsed[val])
                {
                    var valuesToPush = vis[val]["tracks"].map((element,trackId) => { 
                        // elemtnVal["encodings"]["trackId"] = trackId
                        return element["encodings"]})
                        
                    featuresForSuperImposition[val]= valuesToPush
                }
            })   
            if(Object.entries(featuresForSuperImposition).length!=0){
            var superImposedFeatures = (checkForSuperImposition(featuresForSuperImposition))      
            }

            if(superImposedFeatures!=undefined)
            {
            var superImposedFlat = superImposedFeatures.flat()
            superImposedFlat.forEach(element=>{
                var tempString = element["featureId"]+"track_"+element["trackId"]
                if(superImpose.indexOf(tempString)==-1){
                    superImpose.push(tempString)
                    featureUsed[element["featureId"]] = true
                    }
                })
            }
     }

         //Deafult stacking
         {
             
            Object.keys(featureUsed).map(val=>{
                if(!featureUsed[val]){
                    stacked.push(val)
                }
            })
         }


        layouts['vis_'+i]["stacked"] = stacked
        layouts['vis_'+i]["superImposed"] = superImpose
        layouts['vis_'+i]["sequenceName"] =sequenceName
    })
    console.log("stage 4 output")
    console.log(layouts)
    return layouts
}

module.exports = getAlignment
},{"./utils.js":20}],19:[function(require,module,exports){
const cartesian = require("./utils.js").cartesian

function checkOrthogonal(seq1,seq2){
    //console.log(seq1,seq2)
}

function getArrangement(input,task){
    var sequenceNames = Object.keys(input)
    var sequenceArray = []

    //Add sequence name as an index to the object
    for(var i = 0;i< sequenceNames.length;i++){
        var visArray = Object.values(input[sequenceNames[i]])
        sequenceArray.push(visArray)
    }

    // Array that represents the number of unique options
    var visOptions = cartesian(sequenceArray)
    //For each option, we have to identify if the sequences can be orthogonally combined
    visOptions.forEach((array,index)=>{
        for(var i =0;i<array.length-1;i++)
        {
            var sequence1 = array[i]
            for (var j=i+1;j<array.length;j++){
                var sequence2 = array[j]
                if(task['correlate'].indexOf(sequence1['sequenceName']) != -1 && task['correlate'].indexOf(sequence2['sequenceName']) !=-1 ){
                    checkOrthogonal(sequence1,sequence2)
                }
            }
        }
    })

}

module.exports = getArrangement
},{"./utils.js":20}],20:[function(require,module,exports){
//https://github.com/mljs/distance#ml-distance

var dsMetric = require("ml-distance")
var metric="tanimoto"

function getProductProperties(model,vectorKeys){
  var getProductProperties = []

  var productKeys = Object.keys(model)

  for (var i=0;i<productKeys.length;i++)
  {
    var currentProduct = productKeys[i]
    var tempgetProductProperties = {}

    tempgetProductProperties[currentProduct]=[]
    vectorKeys.map(val => {
      tempgetProductProperties[currentProduct].push(parseInt(model[currentProduct][val]))
    })
    getProductProperties.push(tempgetProductProperties)
  }
  return getProductProperties
}

// Description: Calculate the recommendation
// Input: product and input vector
// Output: similarity score corresponding to each output
function computeSimilarity(inputVectorObject,productVector){
  var inpVec = inputVectorObject["inputArray"]
  var resultSimilarity = {}
  for (var i =0;i<productVector.length;i++){
    var obj = productVector[i];
    var key = Object.keys(obj)[0]
    var proVec = obj[key]
    var similarity = dsMetric.similarity[metric](inpVec,proVec)
    resultSimilarity[key] = similarity
  }
  return resultSimilarity
}

//Input: An object with vis techniques as keys and similarity scores. Additionally, key for the similarity metric to use.
//Output: Array of recommendation. The array allows for mutiple output in the cases where the scores are exactly similar.
function recommendedProducts (similarityScores)
{
  
  let arr = Object.values(similarityScores);
  let newarr = arr.map(val =>{
    return val[metric]
  })

  let max = Math.max(...arr);
  var recommendedProducts = []

  Object.keys(similarityScores).map((val) => {
    if(similarityScores[val] == max) {recommendedProducts.push(val) }
  })

  return recommendedProducts
}

//Description: Test function to evaluate combinations of attributes
//Input: Array of arrays that have to be combined
//Output: All possible combinations of the arrays
function cartesian(args) {
  var r = [], max = args.length-1;
  function helper(arr, i) {
      for (var j=0, l=args[i].length; j<l; j++) {
          var a = arr.slice(0); // clone arr
          a.push(args[i][j]);
          if (i==max)
              r.push(a);
          else
              helper(a, i+1);
      }
  }
  helper([], 0);
  return r;
}

//Input: Object of features. Each feature consists of an array of elements. 
//Output: Merge by performing a cartesian product. 
//Output Schema: {'visid':[a:{information},b,c], 'visid2':[a,b]} 
//Information: {featureid:[] ,encoding/s:[], layoutrecommendation} 
function getVisOptions(tracks)
{
  var features = Object.keys(tracks)
  var trackPossibilitiesArray = features.map((val,i) =>{
    var index = i
    var localTrackPossilities = tracks[val]['trackPossibilities']
    localTrackPossilities.every((val1) => {
      return val1["featureId"] = "feature_"+index
    })
    return localTrackPossilities
  })

  var visOptions = cartesian(trackPossibilitiesArray)
  
  var returnVisOptions = {}

  for (var j=0;j<visOptions.length;j++){
    returnVisOptions['vis_'+j] = arrayToObject(visOptions[j],"featureId")    
  }
  
  return returnVisOptions
}

//Description -> Converts an arra [id:val, key: val] to id:{id,val} 
const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})




module.exports =
{
  productProperties: getProductProperties,
  computeSimilarity: computeSimilarity,
  recommendedProducts:  recommendedProducts ,
  cartesian: cartesian,
  getVisOptions: getVisOptions
}
},{"ml-distance":9}]},{},[13]);
