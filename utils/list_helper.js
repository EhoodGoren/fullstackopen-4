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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};
