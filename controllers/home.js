/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  const hbsObject = {
    user: req.user
  }

  res.render('index', {
    title: 'Home',
    hbsObject: hbsObject
  });
};
