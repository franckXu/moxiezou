  import wepy from 'wepy';

  export default class Component extends wepy.component {
      props = {
          emitEventName: {
              type: String,
              default: 'retry'
          },
          height: {
              type: [Number,String],
              default: 130
          },
          txt : String
      }

      data = {
          windowHeight : wepy.getSystemInfoSync().windowHeight
      }

      methods = {
          tap() {
              this.$emit(this.emitEventName, 'failView')
          }
      }

  }
