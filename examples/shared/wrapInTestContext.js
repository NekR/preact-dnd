import { Component } from 'preact';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';

export default function wrapInTestContext(DecoratedComponent, callback) {
  class TestStub extends Component {
    render() {
      return <DecoratedComponent {...this.props} ref={this.setRef} />;
    }

    setRef = (decoratedComponent) => {
      this.decoratedComponent = decoratedComponent;
    }

    componentDidMount() {
      callback && callback(this.decoratedComponent);
    }
  }

  return DragDropContext(TestBackend)(TestStub);
}