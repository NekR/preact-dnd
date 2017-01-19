import preact from 'preact';

export default {
  renderIntoDocument(component, callback) {
    const elem = document.createElement('div');

    class Wrap extends preact.Component {
      render() {
        const clone = preact.cloneElement(component, {
          ref: (a) => {
            this.instance = a;
          }
        });

        return clone;
      }

      componentDidMount() {
        callback(this.instance);
      }
    }

    preact.render(<Wrap />, elem);
  }
};