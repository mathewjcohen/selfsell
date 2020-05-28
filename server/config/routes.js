module.exports = app => {
  app.get("/", (req, res) => res.render("index"));
  app.get("/mc2-plus-1", (req, res) => res.render("baby"));
};
