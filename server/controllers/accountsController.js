const queries = require('../lib/queries');

function ensureAuthenticated(req, res) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        res.redirect('/login');
        return false;
    }
    return true;
}

function isAdmin (req, res) {
    if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.is_admin) {
        res.status(403).send('Access denied. You dont have the authorized access.');
        return false;
    }
    return true;
}

function isUser (req, res) {
    if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.is_user) {
        res.status(403).send('Access denied. You dont have the authorized access.');
        return false;
    }
    return true;
}


module.exports = {
    ensureAuthenticated,
    isAdmin,
    isUser
}