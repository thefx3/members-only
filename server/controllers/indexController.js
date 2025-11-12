const db = require("../lib/queries");

// Render homepage with all posts
async function renderHomePage(req, res) {
    try {
        const posts = await db.getAllPosts();
        res.render("homepage", {
            posts,
            user: req.user,
            loginError: req.query?.loginError || null,
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    renderHomePage
};
