  import wepy from 'wepy';

  export default class Component extends wepy.component {
      props = {
          emitEventName: {
              type: String,
              default: 'retry'
          },
          title: String,
          height: {
              type: [Number,String],
              default: 130
          }
      }

      data = {
          windowHeight : wepy.getSystemInfoSync().windowHeight
      }

      methods = {
          tap() {
              this.$emit(this.emitEventName, 'emptyView')
          }
      }

  }
