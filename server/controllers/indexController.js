const db = require("../lib/queries");

async function renderHomePage(req, res) {
  try {
    const rawPosts = await db.getAllPosts();
    const isLoggedIn = Boolean(req.user);

    // Depends on whether the user is logged in
    const posts = rawPosts.map((p) => {
      if (isLoggedIn) {
        return {
          title: p.title || "Untitled",
          content: p.content || "No content available.",
          author: p.author || "Anonymous",
          date: p.created_at
            ? new Date(p.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Unknown date",
        };
      } else {
        return {
          title: "Unavailable Title",
          content: p.content,
          author: "Member of the community",
          date: "Unavailable date",
        };
      }
    });

    res.render("homepage", {
      posts,
      user: req.user || null,
      isLoggedIn,
      loginError: req.query?.loginError || null,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  renderHomePage,
};
