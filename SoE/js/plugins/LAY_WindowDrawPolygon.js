//=============================================================================
// Window_Base
//=============================================================================


Window_Base.prototype.drawConcentricCircles = function(x,y,radius,ncircle,color,lwd){
  var deltaRadius = radius/ncircle;
  while (radius >= deltaRadius) {
    this.drawEmptyCircle(x,y,radius,color,lwd);
    radius -= deltaRadius;
  };
};

Window_Base.prototype.drawGrid = function(x, y, width, height, nrow, ncol, color, lwd){
  nrow += 1;
  ncol += 1;
  for (var i=0; i<=nrow; i++) {
    var x1 = x;
    var y1 = y + (height/nrow) * i;
    var x2 = x + width;
    var y2 = y1
    this.contents.line(x1, y1, x2, y2, color, lwd);
  };
  for (var i=0; i<=ncol; i++) {
    var x1 = x + (width/ncol)*i;
    var y1 = y;
    var x2 = x1;
    var y2 = y1 + height;
    this.contents.line(x1, y1, x2, y2, color, lwd);
  };
};

Window_Base.prototype.drawDarkRect = function(dx, dy, dw, dh) {
  var color = this.gaugeBackColor();
  this.changePaintOpacity(false);
  this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
  this.changePaintOpacity(true);
};


Window_Base.prototype.drawEmptyCircle = function( centerX, centerY, radius, color, lineWidth ){
  this.contents.emptyCircle( centerX, centerY, radius, color, lineWidth );
};

Window_Base.prototype.drawRegularPolygonIntersect = function(pointsNumber, centerX, centerY, radius, phase, color, lineWidth){
  var deltaAngle = 2 * Math.PI / pointsNumber;

  for (i=0; i<pointsNumber; i++){
    var pX = centerX + ( Math.cos( deltaAngle * i + phase) * radius );
    var pY = centerY + ( Math.sin( deltaAngle * i + phase) * radius );
    this.contents.line(centerX,centerY,pX,pY,color,lineWidth);
  };
};


Window_Base.prototype.drawFillRegularPolygon = function(  pointsNumber, centerX, centerY, radius, phase, colorBd, colorFill, lineWidth, opacity ){

  var deltaAngle = 2 * Math.PI / pointsNumber;
  var pointsX = [];
  var pointsY = [];

  for (i=0; i<pointsNumber; i++){
    var pX = centerX + ( Math.cos( deltaAngle * i + phase) * radius );
    var pY = centerY + ( Math.sin( deltaAngle * i + phase) * radius );
    pointsX.push(pX);
    pointsY.push(pY);
  };
  this.contents.fillPolygon( pointsX, pointsY, colorBd, colorFill, lineWidth, opacity );
};

Window_Base.prototype.drawEmptyRegularPolygon = function(  pointsNumber, centerX, centerY, radius, phase, color, lineWidth ){

  var deltaAngle = 2 * Math.PI / pointsNumber;
  var pointsX = [];
  var pointsY = [];

  for (i=0; i<pointsNumber; i++){
    var pX = centerX + ( Math.cos( deltaAngle * i + phase) * radius );
    var pY = centerY + ( Math.sin( deltaAngle * i + phase) * radius );
    pointsX.push(pX);
    pointsY.push(pY);
  };
  this.contents.emptyPolygon( pointsX, pointsY, color, lineWidth );
};

Window_Base.prototype.drawFillPolygon = function( pointListX, pointListY, colorBd, colorFill, lineWidth, opacity){
  this.contents.fillPolygon(pointListX,pointListY,colorBd,colorFill,lineWidth,opacity);
};

Window_Base.prototype.drawEmptyPolygon = function(  pointListX,
                                                    pointListY,
                                                    colorBd,
                                                    lineWidth){

  this.contents.emptyPolygon(pointListX,pointListY,colorBd,lineWidth);
};


//=============================================================================
// BitMap
//=============================================================================

Bitmap.prototype.gradientFillRectOpac = function(x, y, width, height, color1, color2, vertical, opacity){
  var context = this._context;
  var grad;
  if (vertical) {
      grad = context.createLinearGradient(x, y, x, y + height);
  } else {
      grad = context.createLinearGradient(x, y, x + width, y);
  }
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);
  context.save();
  context.globalAlpha = opacity;
  context.fillStyle = grad;
  context.fillRect(x, y, width, height);
  context.globalAlpha = 1;
  context.restore();
  this._setDirty();
};

Bitmap.prototype.fillPie = function( x, y, radius, startAngle, endAngle, colorFill, colorBd, opacity, lineWidth){
  var context = this._context;
  context.save();
  context.beginPath();
  context.moveTo(x,y);

  var x_start = x + radius * Math.cos(startAngle);
  var y_start = y + radius * Math.sin(startAngle);

  context.lineTo(x_start,y_start);
  context.arc( x, y, radius, startAngle, endAngle, false );
  context.lineTo(x,y);

  context.globalAlpha = opacity;
  context.fillStyle = colorFill;
  context.fill();
  context.globalAlpha = 1;
  context.strokeStyle = colorBd;
  context.lineWidth = lineWidth;
  context.stroke();

  context.restore();
  this._setDirty();
};

Bitmap.prototype.emptyCircle = function( x, y, radius, color, lineWidth ){
  var context = this._context;
  context.save();
  context.beginPath();
  context.arc( x, y, radius, 0, Math.PI * 2, false );
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();
  context.restore();
  this._setDirty();
};


Bitmap.prototype.line = function(x1,y1,x2,y2,color,lineWidth){
  var context = this._context;
  context.save();
  context.beginPath();
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();
  context.restore();
  this._setDirty();
};

Bitmap.prototype.fillPolygon = function(pointListX,pointListY,colorBd,colorFill,lineWidth,opacity){

  Bitmap.prototype.polygon.call(this,pointListX,pointListY,colorBd,lineWidth);

  var context = this._context;
  context.globalAlpha = opacity;
  context.fillStyle = colorFill;
  context.fill();
  context.globalAlpha = 1;

  context.restore();
  this._setDirty();

};

Bitmap.prototype.emptyPolygon = function(pointListX,pointListY,color,lineWidth){
  Bitmap.prototype.polygon.call(this,pointListX,pointListY,color,lineWidth);
  var context = this._context;
  context.restore();
  this._setDirty();
}

Bitmap.prototype.polygon = function(pointListX,pointListY,color,lineWidth) {
  if (pointListX.length != pointListY.length) return false;
  var len = pointListX.length;
  if (len < 3) return false;
  var context = this._context;
  context.save();
  context.beginPath();

  var pIX = pointListX[0];
  var pIY = pointListY[0];
  context.moveTo(pIX,pIY);

  for (var i=1; i<len; i++){
    pIX = pointListX[i];
    pIY = pointListY[i];
    context.lineTo(pIX,pIY);
  };
  var pIX = pointListX[0];
  var pIY = pointListY[0];
  context.lineTo(pIX,pIY);

  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();
};
