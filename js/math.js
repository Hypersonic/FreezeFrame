GAME.Math = (function() {

  // Too lazy to do proper matrix mult, m1 is 1x2 coords, m2 is 2x2 transform
  function multiplyMatrix(m1, m2) {
    var x = m1[0];
    var y = m1[1];
    var resultant = [];
    resultant.push(x * m2[0][0] + y * m2[0][1]); // x val
    resultant.push(x * m2[1][0] + y * m2[1][1]); // y val;
    return resultant;
  }

  //Rotates a list of coordinates by theta given in radians
  function rotatePoints(points, angle) {
    var rot = [[Math.cos(angle), -Math.sin(angle)],
               [Math.sin(angle), Math.cos(angle)]
              ];
    var resultant = [];
    for (var i = 0; i < points.length; i++) {
      resultant.push(multiplyMatrix(points[i], rot));
    }
    return resultant;
  }

  // Convert degress to radians
  function toRad(deg) {
    return deg * Math.PI / 180;
  }

  // Convert radians to degrees
  function toDeg(rad) {
    return rad * 180 / Math.PI;
  }

  return {
    rotatePoints : rotatePoints,
    toRad : toRad,
    toDeg : toDeg,
  }
})();
