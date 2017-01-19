import TestUtils from 'react-dom/lib/ReactTestUtils';
import wrapInTestContext from '../../../shared/wrapInTestContext';
import expect from 'expect';
import Box from '../Box';

describe('Box', () => {
  describe('can be tested independently', () => {
    it('it is not dragging', (done) => {
      // Obtain the reference to the component before React DnD wrapping
      const OriginalBox = Box.DecoratedComponent;

      // Stub the React DnD connector functions with an identity function
      const identity = x => x;

      // Render with one set of props and test
      TestUtils.renderIntoDocument(
        <OriginalBox name='test'
                     connectDragSource={identity}
                     isDragging={false}
        />, (instance) => {
          const div = findSelector(instance.base, 'div');
          expect(div.style.opacity).toEqual('1');
          done();
        }
      );
    });

    it('it is dragging', (done) => {
      // Obtain the reference to the component before React DnD wrapping
      const OriginalBox = Box.DecoratedComponent;

      // Stub the React DnD connector functions with an identity function
      const identity = x => x;

      // Render with one set of props and test
      TestUtils.renderIntoDocument(
        <OriginalBox name='test'
                     connectDragSource={identity}
                     isDragging
        />, (instance) => {
          const div = findSelector(instance.base, 'div');
          // WTF it's '0,4' instead of `0.4`?
          expect(div.style.opacity).toEqual('0,4');
          done();
        }
      );
    });
  })

  it('can be tested with the testing backend', (done) => {
    // Render with the testing backend

    let box;
    const BoxContext = wrapInTestContext(Box, (a) => {
      box = a;
    });

    TestUtils.renderIntoDocument(
      <BoxContext name='test' />, (instance) => {
        let div;

        // Obtain a reference to the backend
        const backend = instance.getManager().getBackend();
        div = findSelector(instance.base, 'div');
        expect(div.style.opacity).toEqual('1');

        // Simulate the dragging state
        backend.simulateBeginDrag([box.getHandlerId()]);

        setTimeout(() => {
          // Verify that the div changed its opacity
          div = findSelector(instance.base, 'div');
          // WTF it's '0,4' instead of `0.4`?
          expect(div.style.opacity).toEqual('0,4');

          done();
        }, 1);
      }
    );
  });
});

function findSelector(elem, selector) {
  if (elem.matches(selector)) {
    return elem;
  }

  return elem.querySelector(selector);
}