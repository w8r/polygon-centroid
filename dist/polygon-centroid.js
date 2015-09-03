(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @preserve Exercise 12, p.47
 * Computational Geometry in C.
 * http://cs.smith.edu/~orourke/
 */

/**
 * Is polygon ccw
 * @param {Array.<Array.<Number>>} p
 * @return {Boolean}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = centroid;
function ccw(p) {
  var sum = 0;
  var len = p.length;
  var open = p[0][0] !== p[len - 1][0] || p[0][1] !== p[len - 1][1];

  if (open) p.push(p[0]);
  for (var i = 1; i < len; i++) {
    sum += (p[i][0] - p[i - 1][0]) * (p[i][1] + p[i - 1][1]);
  }
  if (open) p.pop();

  return sum <= 0;
}

/**
 * Returns twice the signed area of the triangle determined by a,b,c,
 * positive if a, b, c are oriented ccw, and negative if cw.
 *
 * @param {Array.<Number>} a
 * @param {Array.<Number>} b
 * @param {Array.<Number>} c
 * @return {Number}
 */
function area2(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

/**
 * Returns three times the centroid.  The factor of 3 is
 * left in to permit division to be avoided until later.
 * @param {Array.<Number>} p1
 * @param {Array.<Number>} p2
 * @param {Array.<Number>} p3
 * @return {Array.<Number>}
 */
function centroid3(p1, p2, p3) {
  return [p1[0] + p2[0] + p3[0], p1[1] + p2[1] + p3[1]];
}

/**
 * Returns the cg in CG.  Computes the weighted sum of
 * each triangle's area times its centroid.  Twice area
 * and three times centroid is used to avoid division
 * until the last moment.
 *
 * @param {Array.<Array.<Number>>}
 */

function centroid(P) {
  if (!ccw(P)) P = P.slice().reverse();
  var A2 = undefined,
      areasum2 = 0; /* Partial area sum */
  var CG = [0, 0];

  for (var i = 1, len = P.length; i < len - 1; i++) {
    var cent3 = centroid3(P[0], P[i], P[i + 1]);
    A2 = area2(P[0], P[i], P[i + 1]);
    CG[0] += A2 * cent3[0];
    CG[1] += A2 * cent3[1];
    areasum2 += A2;
  }

  CG[0] /= 3 * areasum2;
  CG[1] /= 3 * areasum2;

  return CG;
}

module.exports = exports["default"];

},{}]},{},[1]);
