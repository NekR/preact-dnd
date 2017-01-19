import preact from 'preact';

export default {
  renderIntoDocument(component) {
    let instance;

    const elem = document.createElement('div');
    const clone = preact.cloneElement(component, {
      ref: function(a) {
        instance = a;
      }
    });

    // console.log(clone);

    const out = preact.render(clone, elem);

    console.log(out);
    console.log(instance);

    return instance;
  },
  findRenderedDOMComponentWithTag(root, tag) {

  },
  findRenderedComponentWithType() {},
};