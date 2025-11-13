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
            iduser: req.user.id,
            email: req.user.email,
            author,
            title,
            content,
        });

        return res.redirect('/');
    } catch (err) {
        return next(err);
    }
}

async function updatePostPage(req, res, next) {
    if (!ensureAuthenticated(req, res)) return;

    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const { rows } = await queries.getSinglePost(postId);

        const post = rows[0];

        if (!post) {
            return res.status(404).send("Post not found.");
        }

        if (post.iduser !== userId) {
            return res.status(403).send("Not allowed to edit.");
        }

        res.render("update-post-page", {
            user: req.user,
            post,
            formError: null
        });

    } catch (err) {
        next(err);
    }
}


//Function used when submitting the update post form
async function updatePost(req, res, next) {
    if (!ensureAuthenticated(req, res)) {
        return;
    }
    const idpost = req.params.id;
    const iduser = req.user.id; 
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
        await queries.updatePost({
            idpost,
            iduser,
            title,
            content,
        });

        return res.redirect('/');
    } catch (err) {
        return next(err);
    }
}

async function deleteSinglePost(idpost, iduser) {
    if (!ensureAuthenticated(req, res)) {
        return;
    }

    const postId = req.params.id;
    const userId = req.user.id;

    try {
        await queries.deleteSinglePost(postId, userId);
        return res.redirect('/');
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    postPage,
    createPost,
    updatePostPage,
    updatePost
};
