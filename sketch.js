// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

let table_f;
let table_i;
let table_s;
let table_h;
let table_n;
let table_e;
let table_t;


// To save, un-comment next line then click 'run'
// saveTable(table, 'new.csv');

var font;
var vehicles = [];

function preload() {
  font = loadFont('HelveticaNeueLTStd-MdEx.otf');
}

function setup() {
  createCanvas(600, 300);
  background(51);
  table_f = new p5.Table();
  table_f.addColumn('x');
  table_f.addColumn('y');

  table_i = new p5.Table();
  table_i.addColumn('x');
  table_i.addColumn('y');

  table_s = new p5.Table();
  table_s.addColumn('x');
  table_s.addColumn('y');

  table_h = new p5.Table();
  table_h.addColumn('x');
  table_h.addColumn('y');

  table_n = new p5.Table();
  table_n.addColumn('x');
  table_n.addColumn('y');

  table_e = new p5.Table();
  table_e.addColumn('x');
  table_e.addColumn('y');

  table_t = new p5.Table();
  table_t.addColumn('x');
  table_t.addColumn('y');
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);

  var points_f = font.textToPoints('F', 0, 0, 200, {
    sampleFactor: 0.4
  });
  var points_i = font.textToPoints('i', 0, 0, 200, {
    sampleFactor: 0.4
  });
  var points_s = font.textToPoints('s', 0, 0, 200, {
    sampleFactor: 0.4
  });
  var points_h = font.textToPoints('h', 0, 0, 200, {
    sampleFactor: 0.4
  });
  var points_n = font.textToPoints('n', 0, 0, 200, {
    sampleFactor: 0.4
  });
  var points_e = font.textToPoints('e', 0, 0, 200, {
    sampleFactor: 0.4
  });
  var points_t = font.textToPoints('t', 0, 0, 200, {
    sampleFactor: 0.4
  });

  for (var i = 0; i < points_f.length; i++) {
    var pt = points_f[i];
    let newRow = table_f.addRow();
    newRow.setString('x', str(pt.x));
    newRow.setString('y', str(pt.y));
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  saveTable(table_f, 'f.csv')

    for (var i = 0; i < points_i.length; i++) {
    var pt = points_i[i];
    let newRow = table_i.addRow();
    newRow.setString('x', str(pt.x));
    newRow.setString('y', str(pt.y));
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  saveTable(table_i, 'i.csv')

    for (var i = 0; i < points_s.length; i++) {
    var pt = points_s[i];
    let newRow = table_s.addRow();
    newRow.setString('x', str(pt.x));
    newRow.setString('y', str(pt.y));
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  saveTable(table_s, 's.csv')

    for (var i = 0; i < points_h.length; i++) {
    var pt = points_h[i];
    let newRow = table_h.addRow();
    newRow.setString('x', str(pt.x));
    newRow.setString('y', str(pt.y));
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  saveTable(table_h, 'h.csv')

    for (var i = 0; i < points_n.length; i++) {
    var pt = points_n[i];
    let newRow = table_n.addRow();
    newRow.setString('x', str(pt.x));
    newRow.setString('y', str(pt.y));
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  saveTable(table_n, 'n.csv')

      for (var i = 0; i < points_e.length; i++) {
    var pt = points_e[i];
    let newRow = table_e.addRow();
    newRow.setString('x', str(pt.x));
    newRow.setString('y', str(pt.y));
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  saveTable(table_e, 'e.csv')

      for (var i = 0; i < points_t.length; i++) {
    var pt = points_t[i];
    let newRow = table_t.addRow();
    newRow.setString('x', str(pt.x));
    newRow.setString('y', str(pt.y));
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  saveTable(table_t, 't.csv')
}

function draw() {
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
