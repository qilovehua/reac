import React, {PropTypes, Component} from 'react';
import Swipe from './swipe';

import './style.css';

class ScrollLoop extends Component {

  constructor(props) {
    super(props);
    this.reset = false;
  }

  componentDidMount() {
    const {speed, minSpeed = 10, auto = 1, transitionEnd} = this.props;
    var swipeOptions = {speed, minSpeed, transitionEnd, auto};

    this.swipe = Swipe(this.refs.container, swipeOptions);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children.length != this.props.children.length) {
      this.reset = true;
    }
  }

  componentDidUpdate() {
    if (this.reset) {
      this.reset = false;
      if (this.swipe) {
        this.swipe.stop();
        this.swipe.setup();
        this.swipe.begin(this.props.auto);
      }
    }
  }

  componentWillUnmount() {
    this.swipe.kill();
    this.swipe = void 0;
  }

  render() {
    const {height = 200, id, className, children, style} = this.props;

    return (
        <div ref="container" id={id} className={`react-swipe-container ${className}`} style={{height: height + 'px', ...style}}>
            <div className="swipe-wrap">
                {React.Children.map(children, (child) => {
                  if (!child) {
                    return null;
                  }

                  const childStyle = child.props.style ? child.props.style : {};

                  return React.cloneElement(child, {style: childStyle});
                })}
                {
                  children && children.length === 2 && React.Children.map(children, (child) => {
                    if (!child) {
                      return null;
                    }

                    const childStyle = child.props.style ? child.props.style : {};

                    return React.cloneElement(child, {style: childStyle});
                  })
                }
            </div>
        </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  ScrollLoop.PropTypes = {
    speed: PropTypes.number,
    auto: PropTypes.number,
    height: PropTypes.number.isRequired,
    transitionEnd: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string
  }
}

export default ScrollLoop;
