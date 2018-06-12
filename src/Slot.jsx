import React from 'react';
import PropTypes from 'prop-types';
import TWEEN from '@tweenjs/tween.js';

import { findDOMNode } from 'react-dom';

class Slot extends React.Component {
  constructor() {
    super();
    this.targetRefs = [];
  }

  componentDidMount() {
    const $frame = this.FrameRef;
    const frameHeight = 1800 * 8;

    $frame.scrollTop = frameHeight + 100;
  }

  componentDidUpdate(prevProps) {
    if (this.props.target === prevProps.target) return;
    const $target = findDOMNode(this.targetRefs[this.props.target]);

    if ($target == null) return;

    const totalScroll = ($target.offsetTop);

    function animate(time) {
        TWEEN.update(time);

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    let coords = { x: 0, y: 1800 * 8 + 100 };
    const duration = this.props.duration;

    new TWEEN.Tween(coords)
        .to({ x: 0, y: totalScroll }, duration)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .onUpdate(() => {
            const scrollPosition = parseInt(coords.y - 100, 0);

            this.FrameRef.scrollTop = scrollPosition;
        })
        .start();
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={{ overflow: 'hidden', position: 'relative' }}
        ref={ FrameRef => (this.FrameRef = FrameRef) }
      >
        {this.props.children.map((child, index) =>
          React.cloneElement(child, { ref: ref => (this.targetRefs[index] = ref) }))}
      </div>
    );
  }
}

Slot.defaultProps = {
  duration: 3000,
  easing: function easeOutQuad(elapsed, initialValue, amountOfChange, duration) {
    return -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue;
  },
  times: 1,
  onEnd: () => {},
};

Slot.propTypes = {
  duration: PropTypes.number,
  target: PropTypes.number.isRequired,
  easing: PropTypes.func,
  times: PropTypes.number,
  onEnd: PropTypes.func,
};

export default Slot;
