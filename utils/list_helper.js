function dummy(blogs) {
    return 1;
}

function totalLikes(blogs) {
    let likesSum = 0;
    blogs.map(blog => likesSum+= blog.likes);
    return likesSum;
}

function favoriteBlog(blogs) {
    let highestLikesBlog;
    blogs.map(blog => {
        if(!highestLikesBlog || blog.likes > highestLikesBlog.likes){
            highestLikesBlog = blog;
        }
    })
    return highestLikesBlog;
}

function mostBlogsAuthor(blogs) {
    const authors = {}
    blogs.map(blog => {
        authors[blog.author] = authors[blog.author] ?
            ++authors[blog.author] : 
            1;
    })
    const mostBlogs = Math.max(...Object.values(authors));
    for(let author in authors){
        if(authors[author] === mostBlogs){
            console.log({
                author,
                blogs: mostBlogs
            })
            return {
                author,
                blogs: mostBlogs
            }
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogsAuthor
};
