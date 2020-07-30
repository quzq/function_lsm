// 回帰直線を求める（最小二乗法）
const lsm = coordinates => {
  const n = coordinates.length
  const sigX = coordinates.reduce((acc, c) => acc += c.x, 0)
  const sigY = coordinates.reduce((acc, c) => acc += c.y, 0)
  const sigXX = coordinates.reduce((acc, c) => acc += c.x * c.x, 0)
  const sigXY = coordinates.reduce((acc, c) => acc += c.x * c.y, 0)
  // a(傾き)を求める
  const a = (n * sigXY - sigX * sigY) / (n * sigXX - Math.pow(sigX, 2));
  // b(切片)を求める
  const b = (sigXX * sigY - sigXY * sigX) / (n * sigXX - Math.pow(sigX, 2));
  return { a, b }
}




const canvas = document.getElementById('graph');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');

  //context.fillRect(0,0,300,300);
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.lineTo(100, 500);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 400);
  ctx.lineTo(500, 400);
  ctx.stroke();

  const coordinates = [
    { x: 200, y: 100 },
    { x: 250, y: 150 },
    { x: 300, y: 150 },
    { x: 312, y: 200 },
    { x: 330, y: 210 },
    { x: 100, y: 80 },
    { x: 110, y: 40 },
  ]
  ctx.fillStyle = "rgb(0, 0, 255)"
  coordinates.forEach(c => {
    ctx.fillRect(c.x + 100, -c.y + 400, 3, 3)
  })


  const { a, b } = lsm(coordinates)
  console.log(a, b)
  ctx.strokeStyle = "rgb(255, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(-100 + 100, -(-100 * a + b) + 400);
  ctx.lineTo(400 + 100, -(400 * a + b) + 400);
  ctx.stroke();
}