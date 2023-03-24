function connectAB(A, B) {
  
  // Define the control points of the Bezier curve
  const cx1 = (1 / 2) * (B.x + A.x);
  const cy1 = A.y;
  const cx2 = cx1;
  const cy2 = B.y;

  // Construct the path string for the Bezier curve
  return `M ${A.x},${A.y} C ${cx1},${cy1} ${cx2},${cy2} ${B.x},${B.y}`;
}

/*
  test code:
  
  const pA = {x: 0, y: 0};
  const pB = {x: 100, y: 50};
  
  document
    .getElementById('myPath')
    .setAttributeNS(null, 'd' connect(pA,pB));

*/
