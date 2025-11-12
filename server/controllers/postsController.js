const queries = require('../lib/queries');
const accountsController = require('./accountsController');

const ensureAuthenticated = accountsController.ensureAuthenticated;
const isAdmin = accountsController.isAdmin;
const isUser = accountsController.isUser;


function postPage(req, res) {
    if (!ensureAuthenticated(req, res)) {
        return;
    }
    res.render('post-page', {
        user: req.user,
        formError: null,
        formData: { title: '', content: '' },
    });
}


async function createPost(req, res, next) {
    if (!ensureAuthenticated(req, res)) {
        return;
    }
    const title = req.body.title?.trim();
    const content = req.body.content?.trim();

    if (!title || !content) {
        return res.status(400).render('post-page', {
            user: req.user,
            formError: 'Title and message are mandatory.',
            formData: { title: title || '', content: content || '' },
        });
    }

    try {
        const author =
            [req.user.first_name, req.user.last_name].filter(Boolean).join(' ') ||
            req.user.email ||
            'Anonymous';

        await queries.createPost({
            author,
            title,
            content,
        });

        return res.redirect('/');
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    postPage,
    createPost,
};
