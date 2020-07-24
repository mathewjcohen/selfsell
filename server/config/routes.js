module.exports = app => {
  app.get("/", (req, res) => res.render("index"));
  app.get("/tools", (req, res) => res.render("tools"));
};
