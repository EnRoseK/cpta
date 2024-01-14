import MenuLogo from "./extensions/logo-dashboard.png";
import Favicon from "./extensions/favicon.ico";

export default {
  config: {
    auth: {
      logo: MenuLogo,
    },
    menu: {
      logo: MenuLogo,
    },
    head: {
      favicon: Favicon,
    },
    tutorials: false,
    notifications: {
      releases: false,
    },
    locales: ["en"],
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome!",
        "Auth.form.welcome.subtitle": "Please, log in!",
        "app.components.LeftMenu.navbrand.title": "CPTA",
        "app.components.LeftMenu.navbrand.workplace": "Dashboard",
      },
    },
  },
  bootstrap() {
    document.title = "CPTA Dashboard";
  },
};
