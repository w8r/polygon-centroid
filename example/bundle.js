(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ = require("../");

var _2 = _interopRequireDefault(_);

window.centroid = _2["default"];

var geojson = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Polygon",
      "coordinates": [[[114.12185668945312, 22.16260652987034], [114.0926742553711, 22.200120453710106], [114.08409118652344, 22.260185429990354], [114.1091537475586, 22.326258904214864], [114.15447235107422, 22.338009084246355], [114.33265686035156, 22.328481987166487], [114.38072204589844, 22.303073214469702], [114.3947982788086, 22.23095066682715], [114.39136505126952, 22.17405251724245], [114.3683624267578, 22.1447998093326], [114.34741973876953, 22.1447998093326], [114.37660217285156, 22.190583964901077], [114.38037872314453, 22.221416273101312], [114.37625885009764, 22.246522115329117], [114.37007904052734, 22.285919679279534], [114.32647705078125, 22.31927184148404], [114.20494079589842, 22.321177438742005], [114.1373062133789, 22.321812632045795], [114.11155700683594, 22.285919679279534], [114.10160064697266, 22.246204347963577], [114.11911010742186, 22.19185553415808], [114.13627624511719, 22.179139323652443], [114.14108276367188, 22.156565216533245], [114.06246185302734, 22.145117806241657], [113.9725112915039, 22.25605480105108], [114.00615692138672, 22.30180265445003], [114.04254913330078, 22.30148501263934], [113.9834976196289, 22.260185429990354], [114.06486511230469, 22.161334695990796], [114.12185668945312, 22.16260652987034]]]
    }
  }]
};

var map = L.map('map').setView([22.32258, 114.1952], 10);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var gj = L.geoJson(geojson).addTo(map);
L.marker((0, _2["default"])(geojson.features[0].geometry.coordinates[0]).reverse()).addTo(map);

},{"../":2}],2:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdzhyL1Byb2plY3RzL3BvbHlnb24tY2VudHJvaWQvZXhhbXBsZS9pbmRleC5qcyIsIi9Vc2Vycy93OHIvUHJvamVjdHMvcG9seWdvbi1jZW50cm9pZC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Z0JDQXFCLEtBQUs7Ozs7QUFFMUIsTUFBTSxDQUFDLFFBQVEsZ0JBQVcsQ0FBQzs7QUFFM0IsSUFBTSxPQUFPLEdBQUc7QUFDZCxRQUFNLEVBQUUsbUJBQW1CO0FBQzNCLFlBQVUsRUFBRSxDQUFDO0FBQ1gsVUFBTSxFQUFFLFNBQVM7QUFDakIsZ0JBQVksRUFBRSxFQUFFO0FBQ2hCLGNBQVUsRUFBRTtBQUNWLFlBQU0sRUFBRSxTQUFTO0FBQ2pCLG1CQUFhLEVBQUUsQ0FDYixDQUNFLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsRUFDdkMsQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQyxFQUN2QyxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLEVBQ3hDLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUMsRUFDdkMsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxFQUN4QyxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLEVBQ3hDLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsRUFDeEMsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxFQUN0QyxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLEVBQ3ZDLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsRUFDckMsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxFQUN0QyxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLEVBQ3hDLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsRUFDeEMsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxFQUN4QyxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLEVBQ3hDLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsRUFDdkMsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxFQUN4QyxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDLEVBQ3ZDLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsRUFDeEMsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxFQUN4QyxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLEVBQ3ZDLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsRUFDeEMsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxFQUN4QyxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLEVBQ3hDLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsRUFDdEMsQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsQ0FBQyxFQUN2QyxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLEVBQ3ZDLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUMsRUFDdkMsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxFQUN4QyxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLENBQ3hDLENBQ0Y7S0FDRjtHQUNGLENBQUM7Q0FDSCxDQUFDOztBQUVGLElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzNELENBQUMsQ0FBQyxTQUFTLENBQUMseUNBQXlDLEVBQUU7QUFDckQsYUFBVyxFQUFFLDBFQUEwRTtDQUN4RixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVkLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQVMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDTTdELFFBQVE7QUFqRGhDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNkLE1BQUksR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNaLE1BQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDbkIsTUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWxFLE1BQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM1QixPQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQztHQUMxRDtBQUNELE1BQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7QUFFbEIsU0FBUSxHQUFHLElBQUksQ0FBQyxDQUFFO0NBQ25COzs7Ozs7Ozs7OztBQVlELFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RCLFNBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEdBQ2xDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDO0NBQ2pDOzs7Ozs7Ozs7O0FBVUQsU0FBUyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDN0IsU0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDdkQ7Ozs7Ozs7Ozs7O0FBVWMsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ2xDLE1BQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNyQyxNQUFJLEVBQUUsWUFBQTtNQUFFLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDckIsTUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRWhCLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2hELFFBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QyxNQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLE1BQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLE1BQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLFlBQVEsSUFBSSxFQUFFLENBQUM7R0FDaEI7O0FBRUQsSUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7QUFDdEIsSUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7O0FBRXRCLFNBQU8sRUFBRSxDQUFDO0NBQ1giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGNlbnRyb2lkIGZyb20gXCIuLi9cIjtcblxud2luZG93LmNlbnRyb2lkID0gY2VudHJvaWQ7XG5cbmNvbnN0IGdlb2pzb24gPSB7XG4gIFwidHlwZVwiOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gIFwiZmVhdHVyZXNcIjogW3tcbiAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gICAgXCJwcm9wZXJ0aWVzXCI6IHt9LFxuICAgIFwiZ2VvbWV0cnlcIjoge1xuICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gICAgICAgIFtcbiAgICAgICAgICBbMTE0LjEyMTg1NjY4OTQ1MzEyLCAyMi4xNjI2MDY1Mjk4NzAzNF0sXG4gICAgICAgICAgWzExNC4wOTI2NzQyNTUzNzExLCAyMi4yMDAxMjA0NTM3MTAxMDZdLFxuICAgICAgICAgIFsxMTQuMDg0MDkxMTg2NTIzNDQsIDIyLjI2MDE4NTQyOTk5MDM1NF0sXG4gICAgICAgICAgWzExNC4xMDkxNTM3NDc1NTg2LCAyMi4zMjYyNTg5MDQyMTQ4NjRdLFxuICAgICAgICAgIFsxMTQuMTU0NDcyMzUxMDc0MjIsIDIyLjMzODAwOTA4NDI0NjM1NV0sXG4gICAgICAgICAgWzExNC4zMzI2NTY4NjAzNTE1NiwgMjIuMzI4NDgxOTg3MTY2NDg3XSxcbiAgICAgICAgICBbMTE0LjM4MDcyMjA0NTg5ODQ0LCAyMi4zMDMwNzMyMTQ0Njk3MDJdLFxuICAgICAgICAgIFsxMTQuMzk0Nzk4Mjc4ODA4NiwgMjIuMjMwOTUwNjY2ODI3MTVdLFxuICAgICAgICAgIFsxMTQuMzkxMzY1MDUxMjY5NTIsIDIyLjE3NDA1MjUxNzI0MjQ1XSxcbiAgICAgICAgICBbMTE0LjM2ODM2MjQyNjc1NzgsIDIyLjE0NDc5OTgwOTMzMjZdLFxuICAgICAgICAgIFsxMTQuMzQ3NDE5NzM4NzY5NTMsIDIyLjE0NDc5OTgwOTMzMjZdLFxuICAgICAgICAgIFsxMTQuMzc2NjAyMTcyODUxNTYsIDIyLjE5MDU4Mzk2NDkwMTA3N10sXG4gICAgICAgICAgWzExNC4zODAzNzg3MjMxNDQ1MywgMjIuMjIxNDE2MjczMTAxMzEyXSxcbiAgICAgICAgICBbMTE0LjM3NjI1ODg1MDA5NzY0LCAyMi4yNDY1MjIxMTUzMjkxMTddLFxuICAgICAgICAgIFsxMTQuMzcwMDc5MDQwNTI3MzQsIDIyLjI4NTkxOTY3OTI3OTUzNF0sXG4gICAgICAgICAgWzExNC4zMjY0NzcwNTA3ODEyNSwgMjIuMzE5MjcxODQxNDg0MDRdLFxuICAgICAgICAgIFsxMTQuMjA0OTQwNzk1ODk4NDIsIDIyLjMyMTE3NzQzODc0MjAwNV0sXG4gICAgICAgICAgWzExNC4xMzczMDYyMTMzNzg5LCAyMi4zMjE4MTI2MzIwNDU3OTVdLFxuICAgICAgICAgIFsxMTQuMTExNTU3MDA2ODM1OTQsIDIyLjI4NTkxOTY3OTI3OTUzNF0sXG4gICAgICAgICAgWzExNC4xMDE2MDA2NDY5NzI2NiwgMjIuMjQ2MjA0MzQ3OTYzNTc3XSxcbiAgICAgICAgICBbMTE0LjExOTExMDEwNzQyMTg2LCAyMi4xOTE4NTU1MzQxNTgwOF0sXG4gICAgICAgICAgWzExNC4xMzYyNzYyNDUxMTcxOSwgMjIuMTc5MTM5MzIzNjUyNDQzXSxcbiAgICAgICAgICBbMTE0LjE0MTA4Mjc2MzY3MTg4LCAyMi4xNTY1NjUyMTY1MzMyNDVdLFxuICAgICAgICAgIFsxMTQuMDYyNDYxODUzMDI3MzQsIDIyLjE0NTExNzgwNjI0MTY1N10sXG4gICAgICAgICAgWzExMy45NzI1MTEyOTE1MDM5LCAyMi4yNTYwNTQ4MDEwNTEwOF0sXG4gICAgICAgICAgWzExNC4wMDYxNTY5MjEzODY3MiwgMjIuMzAxODAyNjU0NDUwMDNdLFxuICAgICAgICAgIFsxMTQuMDQyNTQ5MTMzMzAwNzgsIDIyLjMwMTQ4NTAxMjYzOTM0XSxcbiAgICAgICAgICBbMTEzLjk4MzQ5NzYxOTYyODksIDIyLjI2MDE4NTQyOTk5MDM1NF0sXG4gICAgICAgICAgWzExNC4wNjQ4NjUxMTIzMDQ2OSwgMjIuMTYxMzM0Njk1OTkwNzk2XSxcbiAgICAgICAgICBbMTE0LjEyMTg1NjY4OTQ1MzEyLCAyMi4xNjI2MDY1Mjk4NzAzNF1cbiAgICAgICAgXVxuICAgICAgXVxuICAgIH1cbiAgfV1cbn07XG5cbmNvbnN0IG1hcCA9IEwubWFwKCdtYXAnKS5zZXRWaWV3KFsyMi4zMjI1OCwgMTE0LjE5NTJdLCAxMCk7XG5MLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICBhdHRyaWJ1dGlvbjogJyZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xufSkuYWRkVG8obWFwKTtcblxubGV0IGdqID0gTC5nZW9Kc29uKGdlb2pzb24pLmFkZFRvKG1hcCk7XG5MLm1hcmtlcihjZW50cm9pZChnZW9qc29uLmZlYXR1cmVzWzBdLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdKS5yZXZlcnNlKCkpLmFkZFRvKG1hcCk7XG4iLCIvKipcbiAqIEBwcmVzZXJ2ZSBFeGVyY2lzZSAxMiwgcC40N1xuICogQ29tcHV0YXRpb25hbCBHZW9tZXRyeSBpbiBDLlxuICogaHR0cDovL2NzLnNtaXRoLmVkdS9+b3JvdXJrZS9cbiAqL1xuXG5cbi8qKlxuICogSXMgcG9seWdvbiBjY3dcbiAqIEBwYXJhbSB7QXJyYXkuPEFycmF5LjxOdW1iZXI+Pn0gcFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY2N3KHApIHtcbiAgbGV0IHN1bSA9IDA7XG4gIGxldCBsZW4gPSBwLmxlbmd0aDtcbiAgbGV0IG9wZW4gPSBwWzBdWzBdICE9PSBwW2xlbiAtIDFdWzBdIHx8IHBbMF1bMV0gIT09IHBbbGVuIC0gMV1bMV07XG5cbiAgaWYgKG9wZW4pIHAucHVzaChwWzBdKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgIHN1bSArPSAocFtpXVswXSAtIHBbaSAtIDFdWzBdKSAqIChwW2ldWzFdICsgcFtpIC0gMV1bMV0pO1xuICB9XG4gIGlmIChvcGVuKSBwLnBvcCgpO1xuXG4gIHJldHVybiAoc3VtIDw9IDApO1xufVxuXG5cbi8qKlxuICogUmV0dXJucyB0d2ljZSB0aGUgc2lnbmVkIGFyZWEgb2YgdGhlIHRyaWFuZ2xlIGRldGVybWluZWQgYnkgYSxiLGMsXG4gKiBwb3NpdGl2ZSBpZiBhLCBiLCBjIGFyZSBvcmllbnRlZCBjY3csIGFuZCBuZWdhdGl2ZSBpZiBjdy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBhXG4gKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBiXG4gKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBjXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGFyZWEyKGEsIGIsIGMpIHtcbiAgcmV0dXJuIChiWzBdIC0gYVswXSkgKiAoY1sxXSAtIGFbMV0pIC1cbiAgICAoY1swXSAtIGFbMF0pICogKGJbMV0gLSBhWzFdKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRocmVlIHRpbWVzIHRoZSBjZW50cm9pZC4gIFRoZSBmYWN0b3Igb2YgMyBpc1xuICogbGVmdCBpbiB0byBwZXJtaXQgZGl2aXNpb24gdG8gYmUgYXZvaWRlZCB1bnRpbCBsYXRlci5cbiAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IHAxXG4gKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBwMlxuICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gcDNcbiAqIEByZXR1cm4ge0FycmF5LjxOdW1iZXI+fVxuICovXG5mdW5jdGlvbiBjZW50cm9pZDMocDEsIHAyLCBwMykge1xuICByZXR1cm4gW3AxWzBdICsgcDJbMF0gKyBwM1swXSwgcDFbMV0gKyBwMlsxXSArIHAzWzFdXTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjZyBpbiBDRy4gIENvbXB1dGVzIHRoZSB3ZWlnaHRlZCBzdW0gb2ZcbiAqIGVhY2ggdHJpYW5nbGUncyBhcmVhIHRpbWVzIGl0cyBjZW50cm9pZC4gIFR3aWNlIGFyZWFcbiAqIGFuZCB0aHJlZSB0aW1lcyBjZW50cm9pZCBpcyB1c2VkIHRvIGF2b2lkIGRpdmlzaW9uXG4gKiB1bnRpbCB0aGUgbGFzdCBtb21lbnQuXG4gKlxuICogQHBhcmFtIHtBcnJheS48QXJyYXkuPE51bWJlcj4+fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjZW50cm9pZChQKSB7XG4gIGlmICghY2N3KFApKSBQID0gUC5zbGljZSgpLnJldmVyc2UoKTtcbiAgbGV0IEEyLCBhcmVhc3VtMiA9IDA7IC8qIFBhcnRpYWwgYXJlYSBzdW0gKi9cbiAgbGV0IENHID0gWzAsIDBdO1xuXG4gIGZvciAobGV0IGkgPSAxLCBsZW4gPSBQLmxlbmd0aDsgaSA8IGxlbiAtIDE7IGkrKykge1xuICAgIGxldCBjZW50MyA9IGNlbnRyb2lkMyhQWzBdLCBQW2ldLCBQW2kgKyAxXSk7XG4gICAgQTIgPSBhcmVhMihQWzBdLCBQW2ldLCBQW2kgKyAxXSk7XG4gICAgQ0dbMF0gKz0gQTIgKiBjZW50M1swXTtcbiAgICBDR1sxXSArPSBBMiAqIGNlbnQzWzFdO1xuICAgIGFyZWFzdW0yICs9IEEyO1xuICB9XG5cbiAgQ0dbMF0gLz0gMyAqIGFyZWFzdW0yO1xuICBDR1sxXSAvPSAzICogYXJlYXN1bTI7XG5cbiAgcmV0dXJuIENHO1xufVxuIl19
