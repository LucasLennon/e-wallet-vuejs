import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.indigo,
        secondary: colors.lightBlue,
        accent: colors.purple,
        error: colors.red,
        warning: colors.orange,
        info: colors.blueGrey,
        success: colors.green
      }
    },
    options: {
      customProperties: true
    }
  },
  icons: {
    iconfont: "fa"
    // iconfont: "mdi"
  }
});
