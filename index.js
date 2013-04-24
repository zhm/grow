
module.exports = Grow;

function Grow(selector, className) {
  if (!(this instanceof Grow)) return new Grow(selector, className);
  this.className = className || 'grow';
  this.element = typeof(selector) === 'string' ? document.querySelector(selector) : selector;
  this.setup();
  this.adjust();
}

Grow.prototype.setup = function() {
  this.createMirror();
  this.element.style.overflow  = 'hidden';
  this.element.style.overflowY = 'hidden';
  this.element.style.wordWrap  = 'break-word';
  this.element.style.resize    = 'none';

  var self = this;
  var wrapped = function() {
    self.adjust();
  };

  if ('onpropertychange' in this.element) {
    if (oninput in ta) {
      this.element.oninput = this.element.onkeyup = wrapped;
    } else {
      this.element.onpropertychange = wrapped;
    }
  } else {
    this.element.oninput = wrapped;
  }
};

Grow.prototype.adjustMirror = function() {
  this.mirror.style.width = typeof($) !== 'undefined' ? $(this.element).width() + 'px' : this.element.offsetWidth + 'px';
};

Grow.prototype.adjust = function() {
  var height, original;

  if (!this.active) {
    this.active = true;
    this.mirror.value = this.element.value;

    original = parseInt(this.element.style.height, 10);
    height = this.mirror.scrollHeight;

    if (original !== height) {
      this.element.style.height = height + 'px';
    }

    var self = this;
    setTimeout(function () {
      self.active = false;
    }, 1);
  }
};

Grow.prototype.createMirror = function() {
  var ta, mirror;

  mirror = document.querySelector('.' + this.className + '-mirror');
  if (mirror) {
    this.mirror = mirror;
    return;
  }

  ta = this.mirror = document.createElement('textarea');

  ta.style.position        = 'absolute';
  ta.style.top             = '-9999px';
  ta.style.left            = '0';
  ta.style.right           = 'auto';
  ta.style.bottom          = 'auto';
  ta.style.border          = '0px';
  ta.style.mozBoxSizing    = 'content-box';
  ta.style.webkitBoxSizing = 'content-box';
  ta.style.boxSizing       = 'content-box';
  ta.style.wordWrap        = 'break-word';
  ta.style.height          = '0';
  ta.style.minHeight       = '0';
  ta.style.overflow        = 'hidden';
  ta.style.overflowY       = 'hidden';
  ta.className             = this.className + ' ' + this.className + '-mirror';
  ta.style.width           = typeof($) !== 'undefined' ? $(this.element).width() + 'px' : this.element.offsetWidth + 'px';

  document.body.appendChild(ta);
};
