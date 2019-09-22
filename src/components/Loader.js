import {Component} from 'react';
import Loading from 'react-native-loader-overlay';
import Toast from 'react-native-root-toast';
import {ThemeColors} from '../utils/constants';

class Loader extends Component {
  show() {
    return Loading.show({
      color: ThemeColors.PRIMARY,
      size: 15,
      overlayColor: 'rgba(0,0,0,0.5)',
      closeOnTouch: true,
      loadingType: 'Bubbles', // 'Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'
    });
  }

  hide(loader) {
    Loading.hide(loader);
  }

  toast(message) {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      backgroundColor: 'red',
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
  }

  success(message) {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      backgroundColor: 'green',
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
  }
}

export default new Loader();
