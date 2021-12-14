function dummy(blogs) {
    return 1;
}

function totalLikes(blogs) {
    let likesSum = 0;
    blogs.map(blog => likesSum+= blog.likes);
    return likesSum;
}

module.exports = {
    dummy,
    totalLikes
};
