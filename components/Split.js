'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SPLIT;
var BREAK_WIDTH = 720; //adds the breakpoint of single/multiple split

var Split = function (_Component) {
  _inherits(Split, _Component);

  function Split() {
    _classCallCheck(this, Split);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Split).call(this));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);

    _this.state = { responsive: null };
    return _this;
  }

  _createClass(Split, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      this._layout();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // If we change the number of visible children, trigger a resize event
      // so things like Table header can adjust. This will go away once
      // CSS supports per element media queries.
      // The 500ms delay is loosely tied to the CSS animation duration.
      // We want any animations to finish before triggering the resize.
      // TODO: consider using an animation end event instead of a timer.
      if (this._nonNullChildCount(nextProps) !== this._nonNullChildCount(this.props)) {
        clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(function () {
          var event = document.createEvent('HTMLEvents');
          event.initEvent('resize', true, false);
          window.dispatchEvent(event);
        }, 500);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._onResize);
    }

    // Support function for componentWillReceiveProps()

  }, {
    key: '_nonNullChildCount',
    value: function _nonNullChildCount(props) {
      var result = 0;
      _react2.default.Children.forEach(props.children, function (child) {
        if (child !== null) result += 1;
      });
      return result;
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_setResponsive',
    value: function _setResponsive(responsive) {
      if (this.state.responsive !== responsive) {
        this.setState({ responsive: responsive });
        if (this.props.onResponsive) {
          this.props.onResponsive(responsive);
        }
      }
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var splitElement = this.refs.split;
      if (splitElement) {
        if (splitElement.offsetWidth < BREAK_WIDTH && this.props.showOnResponsive === 'priority') {
          this._setResponsive('single');
        } else {
          this._setResponsive('multiple');
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = [CLASS_ROOT];
      if (this.props.flex) {
        classes.push(CLASS_ROOT + "--flex-" + this.props.flex);
      }
      if (this.props.fixed) {
        classes.push(CLASS_ROOT + "--fixed");
      }
      if (this.props.separator) {
        classes.push(CLASS_ROOT + "--separator");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var children = _react2.default.Children.toArray(this.props.children);
      return _react2.default.createElement(
        'div',
        { ref: 'split', className: classes.join(' ') },
        children.map(function (Component, idx) {
          var hidden = false;
          if ('single' === _this2.state.responsive) {
            if ('left' === _this2.props.priority) {
              // If priority = left and we're not
              // the first child, then hide
              if (idx !== 0) {
                hidden = true;
              }
            } else {
              // If priority = right and we're not
              // the last child, then hide
              if (idx !== children.length - 1) {
                hidden = true;
              }
            }
          }

          if (hidden) {
            return _react2.default.createElement(
              'div',
              { key: idx, style: { display: 'none' } },
              Component
            );
          }
          return _react2.default.createElement(
            'div',
            { key: idx },
            Component
          );
        })
      );
    }
  }]);

  return Split;
}(_react.Component);

Split.displayName = 'Split';
exports.default = Split;


Split.propTypes = {
  fixed: _react.PropTypes.bool,
  flex: _react.PropTypes.oneOf(['left', 'right', 'both']),
  priority: _react.PropTypes.oneOf(['left', 'right']),
  separator: _react.PropTypes.bool,
  showOnResponsive: _react.PropTypes.oneOf(['priority', 'both'])
};

Split.defaultProps = {
  fixed: true,
  flex: 'both',
  priority: 'right',
  showOnResponsive: 'priority'
};
module.exports = exports['default'];