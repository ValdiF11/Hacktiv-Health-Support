class Controller {
  static async showHome(req, res) {
    try {
      res.render("home");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
