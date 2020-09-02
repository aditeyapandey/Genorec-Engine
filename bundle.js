(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "metric": "tanimoto"
}
},{}],2:[function(require,module,exports){
module.exports=[
{"chart":"dotplot","quantitative":"1","categorical":"0","text":"0","sparse":"1","continous":"0","point":"1","segment":"0","identify":"1","compare":"1","summarize":"1"},
{"chart":"lineChart","quantitative":"1","categorical":"0","text":"0","sparse":"0","continous":"1","point":"1","segment":"0","identify":"1","compare":"1","summarize":"1"},
{"chart":"barSize","quantitative":"1","categorical":"0","text":"0","sparse":"1","continous":"1","point":"1","segment":"0","identify":"1","compare":"1","summarize":"1"},
{"chart":"barSaturation","quantitative":"1","categorical":"0","text":"0","sparse":"1","continous":"1","point":"1","segment":"0","identify":"1","compare":"0","summarize":"1"},
{"chart":"barHue","quantitative":"0","categorical":"1","text":"0","sparse":"1","continous":"1","point":"1","segment":"0","identify":"1","compare":"1","summarize":"1"},
{"chart":"areaSize","quantitative":"1","categorical":"0","text":"0","sparse":"1","continous":"1","point":"0","segment":"1","identify":"1","compare":"1","summarize":"1"},
{"chart":"areaSaturation","quantitative":"1","categorical":"0","text":"0","sparse":"1","continous":"1","point":"0","segment":"1","identify":"1","compare":"0","summarize":"1"},
{"chart":"areaHue","quantitative":"0","categorical":"1","text":"0","sparse":"1","continous":"1","point":"1","segment":"1","identify":"1","compare":"1","summarize":"1"},
{"chart":"annotation","quantitative":"0","categorical":"0","text":"1","sparse":"1","continous":"1","point":"1","segment":"1","identify":"1","compare":"0","summarize":"0"}
]

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

const toString = Object.prototype.toString;

function isAnyArray(object) {
  return toString.call(object).endsWith('Array]');
}

module.exports = isAnyArray;

},{}],5:[function(require,module,exports){
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

},{"ml-array-sum":6}],6:[function(require,module,exports){
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

},{"is-any-array":4}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"ml-array-mean":5,"ml-distance-euclidean":7,"ml-tree-similarity":9}],9:[function(require,module,exports){
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

},{"binary-search":3,"num-sort":10}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
 class Dataspec {
    sequences = [];
    constructor(obj){
        for(let i=0;i<obj.sequences.length;i++)
        {
            this.sequences.push(new Sequence(obj.sequences[i]))
        }
    }
    printConfig()
    {
        return this
    }
}

// //Definition of the Sequence Specification 
 class Sequence {
    sequenceName;
    features = [];
    sequenceInterconnection;
    constructor(obj){
    //We can implement a type of checker before assignment of the value    
    this.sequenceName = (typeof obj.sequenceName =="string") ?  obj.sequenceName : (function(){throw "Sequence name should be a string"}());
    this.sequenceInterconnection = (typeof obj.sequenceInterconnection =="object") ? obj.sequenceName : (function(){throw "Interconnection should be an object"}());
    //Features has to be an array
    for(let i=0;i<obj.features.length;i++){
        this.features.push(new Features(obj.features[i]));
    }
    }
}

// //Definition of the Feature Specification 
 class Features{
    featureGranularity
    featureDensity
    attributes = []
    interFeatureTasks = []
    featureLabel 
    featureInterconnection
    constructor(obj){
        this.featureGranularity =  (["point","interval"].indexOf(obj.featureGranularity != -1)) ?  obj.featureGranularity : (function(){throw "Feature Granularity must be either Point or Interval"}());
        this.featureDensity =  (["sparse","continous"].indexOf(obj.featureDensity) != -1) ?  obj.featureDensity : (function(){throw "Feature Density must be either Sparse or Continous"}());
        this.featureLabel = obj.featureLabel
        this.interFeatureTasks = obj.interFeatureTasks
        this.featureInterconnection = (typeof obj.featureInterconnection == "boolean") ?  obj.featureInterconnection : (function(){throw "Feature Interconnection must be Boolean type"}());
        for(let i=0;i<obj.attr.length;i++){
        this.attributes.push(new Attributes(obj.attr[i]))
        }    
    }
}

//Definition of the Attribute Specification 
 class Attributes{
    dataDescriptor
    dataType
    intraAttrTask = []
    interAttrTask = []

    constructor(obj)
    {
        this.dataDescriptor =  obj.dataDescriptor; // Allow assignment without typecheck for partial dataspec
        this.dataType = (typeof obj.dataType == "string" && ["quantitative","categorical","text"].indexOf(obj.dataType) != -1) ?  obj.dataType : (function(){throw "Data Descriptor should be a string and should be either: Quant, Categorical or Text "}());
        this.intraAttrTask = (Array.isArray(obj.intraAttrTask)) ? obj.intraAttrTask: (function(){throw "Intra attribute tasks should be an array with one or more entries consisting indentify, compare or summarize"}());
        this.interAttrTask = (Array.isArray(obj.interAttrTask)) ? obj.interAttrTask : [] // Allow assignment of [] without typecheck for partial dataspec
    }
  
}

module.exports = Dataspec
},{}],12:[function(require,module,exports){
var Dataspec = require('./dataspec.js')
var encodeattribute  = require("./s1_en.js")
var combineattributes  = require("./s2_ca.js")

//Validate the input dataspecification to ensure correctness of input data
const dataspec = new Dataspec(
{
sequences: [
    {   
    sequenceName:"XYZ", 
    sequenceInterconnection:{list:[]},
        features:
        [
            { 
                featureGranularity:"point",
                featureDensity:"sparse",
                featureLabel: "Epigenetic Signal",
                featureInterconnection: false,
                attr:
                [
                    {
                        dataType:"quantitative",
                        intraAttrTask:["identify","compare"]
                    },
                    {
                        dataType:"quantitative",
                        intraAttrTask:["identify"]
                    },
                    {
                        dataType:"text",
                        intraAttrTask:["identify"]
                    }
                ]
            },
            { 
                featureGranularity:"segment",
                featureDensity:"sparse",
                featureLabel: "Gene Annotation",
                featureInterconnection: false,
                attr:
                [{
                    dataType:"categorical",
                    intraAttrTask:["identify","summarize"]
                },
                {
                    dataType:"text",
                    intraAttrTask:["identify"]
                }]
            }
        ]
}]})

var result = dataspec.printConfig()

//First determine sequence level encoding
for (var i=0;i<dataspec.sequences.length;i++){
    //Stage 1: Encoding Selection
    var encodingSpecification = encodeattribute(dataspec.sequences[i]);
    //Stage 2: Combining Attributes
    var combinedEncoding = combineattributes(encodingSpecification)
}
// module.exports ={
// test:result
// }
},{"./dataspec.js":11,"./s1_en.js":13,"./s2_ca.js":14}],13:[function(require,module,exports){
const model = require('../model/stage1.json');
const recommendationSetting = require('../model/recommendationsetting.json');
var dsMetric = require("ml-distance")
var partialSpecification = {}
var vectorKeys = ["quantitative","categorical","text","sparse","continous","point","segment","identify","compare","summarize"]

//   This function will convert the dataspec to an array of user input
function convertDataspectoInput(feature,attribute){
  
  // Mapping attributes 
  var inputVectorObject = {}
  var inputArray = []

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
  
  return {inputVectorObject, inputArray}
  }

  // Function breaks down the model information into format for recommendation

  function productProperties(){
      var productProperties = []
      for(var i=0;i<model.length;i++){
        var currentProduct = model[i]["chart"];
        var tempProductProperties = {}
        tempProductProperties[currentProduct]=[]
  
        vectorKeys.map(val => {
          tempProductProperties[currentProduct].push(parseInt(model[i][val]))
        })
        productProperties.push(tempProductProperties)
      }

      return productProperties

    }

    // Calculate the recommendation
    // Input: product and input vector
    // Output: similarity score corresponding to each output
    function computeSimilarity(inputVectorObject,productVector){
      var inpVec = inputVectorObject["inputArray"]
      var resultSimilarity = {}
    
      for (var i =0;i<productVector.length;i++){
        var obj = productVector[i];
        var key = Object.keys(obj)[0]
        var proVec = obj[key]
        var similarity = dsMetric.similarity.tanimoto(inpVec,proVec)
        var similarityEC = 1/ (1+ dsMetric.distance.euclidean(inpVec,proVec))
        resultSimilarity[key] = {'tanimoto':similarity,'euclideansimilarity':similarityEC}
      }
      //console.log(result_similarity)
     return resultSimilarity
    }


    //Input: An object with vis techniques as keys and similarity scores. Additionally, key for the similarity metric to use.
    //Output: Array of recommendation. The array allows for mutiple output in the cases where the scores are exactly similar.
    function recommendProducts (similarityScores, metric)
    {
      let arr = Object.values(similarityScores);
      let newarr = arr.map(val =>{
        return val[metric]
      })

      let max = Math.max(...newarr);
      var recommendedProducts = []

      Object.keys(similarityScores).map((val) => {
        if(similarityScores[val][metric] == max) {recommendedProducts.push(val) }
      })

      return recommendedProducts
    }

//Pseudo main function to control the execution of stage 1 of encoding
function encodeAttribute(dataspec){

    // Hierarchy of the encoding specification
    // -> Feature 1
    //       -> Attr1: I/P Vector, Prediction Scores {linechart:0.9(Score),.......}
    //       -> Attr2: I/P Vector, Prediction Scores  
    
    //Step 1: Create a template for the for the partial specification from the input dataspec

    for(var i = 0; i<dataspec.features.length;i++)
    {
      var currentFeature = dataspec.features[i];

      //Initiation of the partial specification
      partialSpecification[`feature_${i}`] = []

      //Get recommendation of the input feature vector
      for(j=0;j<currentFeature.attributes.length;j++){
        var currentAttribute = currentFeature.attributes[j]
        var inputVectorObject = convertDataspectoInput(currentFeature,currentAttribute)  
        var productVector = productProperties(inputVectorObject)
        var similarityScores = computeSimilarity(inputVectorObject,productVector)
        var recommendation = recommendProducts(similarityScores,recommendationSetting['metric'])
        
        var tempAttributeStorage = {'attributeId':`attribute_${j}`, 'inputVectorObject':inputVectorObject, 'similarityScore': similarityScores, 'recommendation':recommendation}
        
        partialSpecification[`feature_${i}`].push(tempAttributeStorage)
      }
    }
    console.log("Stage1 Output:", partialSpecification)
    return partialSpecification
}

 module.exports = encodeAttribute
},{"../model/recommendationsetting.json":1,"../model/stage1.json":2,"ml-distance":8}],14:[function(require,module,exports){

// Attributes that can be combined
var attrCombination = {
    "dotplot":["barSaturation","barHue"],
    "barSize":["barSaturation","barHue"],
    "barSaturation":["dotplot","barSize"],
    "barHue":["dotplot","barSize"],
    "areaSize":["areSaturation","areaHue"],
    "areSaturation":["areaSize"],
    "areaHue":["areaSize"]
}

//Superimposable encodings
var superimposition = {
    "dotplot": ["dotplot","lineChart","barSize"],
    "lineChart": ["lineChart","dotplot","barSize"],
    "barSize":["dotplot","lineChart"],
    "barSaturation":["dotplot","lineChart"],
    "barHue":["dotplot","lineChart"]
}

//Description:This function is going to take input specifications and try to output a list of visualizable 
//attributes per feature
//Input: Feature object
//Output: ? 
function getCombinations(feature)
{
    var allEncoding = []//First store all the possible encodings in the dataspec.

    //Loop through all the options and store the encodings in the allEncoding var
    for (var i=0; i<feature.length;i++)
    {    
        var recommendation = feature[i]['recommendation']
        var encodingRecommendations = []
        for (var j=0; j<recommendation.length; j++){
            var encoding = {'attributeId':feature[i]['attributeId'], 'encoding':recommendation[j]}
            encodingRecommendations.push(encoding)
        }
        allEncoding.push(encodingRecommendations)
    } 

    var encodingOptions = cartesian(allEncoding)

    

    //Find the attributes that merge
    var finalEncodingCombination = []
    for (var x = 0; x< encodingOptions.length; x++){
      var set = encodingOptions[x]  
     finalEncodingCombination.push(combineLogic(set))
    }
   //  console.log(finalEncodingCombination)
    
}

//Description: Checks if two variables can be combined, based on decision rules.
function canCombine(a,b){
    var listOfCombinedAttr = attrCombination[a]

    if(listOfCombinedAttr == undefined) {return false}

    return listOfCombinedAttr.indexOf(b) != -1 ? true : false
}

//Description: This method returns a combined list of attributes
//Input: Array of object containing the attribtue id and encoding recoomendation
//Output: Array of combined and non-combined attributes. E.g [[a1_dotplot,a2_barchart],[a3_annotation]]
function combineLogic(arr)
{
    console.log(arr)
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
                var a = arr[i]
                for (var j = 0;j<arr.length;j++)
                {
                    var b = arr[j]
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
                            finalEncodingCombination.push(`${a['attributeId']}_${a['encoding']}_${b['encoding']}`)
                            combinationNotFound = false
                            break;
                        }
                    }
                }
                if(combinationNotFound)
                {
                    finalEncodingCombination.push(`${a['encoding']}`)
                }
            }
        }

console.log(finalEncodingCombination)
    
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

function combineAttributes(encodingSpecification){
    
    var featureKeys= Object.keys(encodingSpecification)

    // Step 1: For each feature
    for(i=0;i<featureKeys.length;i++){
        var mergedAttributeList = getCombinations(encodingSpecification[featureKeys[i]])
    }
    

}

module.exports = combineAttributes
},{}]},{},[12]);
