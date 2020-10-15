/*!
 * colored-grid v1.0.0
 * Grid Plug-in
 * (c) 2020 Cenk Özkan
 * ISC License
 * http://github.com/testrepo
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], (function () {
      return factory(root);
    }));
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.getContents = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function (window) {
  'use strict';

  var defaults = {
    selector: '.base-grid',
    effect: 'basic-zoom',
    speed: '0.6s',
    card: false,
    overlay: false,
    callback: function () {},
  };

  var createItem = function (items, settings) {
    for (var i = 0; i < items.length; i++) {
      var childCount = items[i].children.length;

      if (childCount >= 2) {
        items[i].children[1].style.transition = settings.speed;
      } else {
        items[i].children[0].style.transition = settings.speed;
      }

      function getCard(elem, event) {
        if (settings.card) {
          if (event === 'mouseover') {
            elem.children[0].classList.add('active');
          } else {
            elem.children[0].classList.remove('active');
          }
        }
      }
      function getOverlay(elem, event) {
        if (settings.overlay) {
          if (event === 'mouseover') {
            elem.children[2].classList.add('active');
          } else {
            elem.children[2].classList.remove('active');
          }
        }
      }

      items[i].addEventListener('mouseover', (function () {
        this.classList.add(settings.effect);
        getCard(this, 'mouseover');
        getOverlay(this, 'mouseover');
      }));
      items[i].addEventListener('mouseout', (function () {
        getCard(this, 'mouseout');
        getOverlay(this, 'mouseout');
      }));
    }
    settings.callback(items);
  };

  //Constructor - ("selector", {settings})
  return function (selector, options) {
    var publicAPIs = {};
    var items, settings;

    publicAPIs.destroy = function () {
      if (!settings) {
        return;
      }
      settings = null;
    };

    publicAPIs.init = function (options) {
      publicAPIs.destroy();
      settings = Object.assign({}, defaults, options);
      items = document.querySelectorAll(selector);
      createItem(items, settings);
    };

    publicAPIs.init(options);
    return publicAPIs;
  };
}));
