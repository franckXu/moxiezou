  import wepy from 'wepy';

  export default class Component extends wepy.component {
      props = {
          requestIng: {
              type: [Number],
              default: 0
          }
      }

  }
