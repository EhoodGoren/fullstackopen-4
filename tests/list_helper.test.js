const { dummy, totalLikes, favoriteBlog, mostBlogsAuthor, mostLikesAuthor } = require('../utils/list_helper');

test('dummy returns one', () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
})

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
]
const threeBlogList = [
    listWithOneBlog[0],
    {
        title: 'title',
        author: 'author',
        url: 'something',
        likes: 2
    },
    {
        title: 'Title',
        author: 'author',
        url: 'something else',
        likes: 7
    }
];
describe('total likes', () => {
    
    test('of empty list is zero', () => {
        const emptyList = [];
        expect(totalLikes(emptyList)).toBe(0);
    })
    test('when list has only one blog equals the likes of that', () => {
        expect(totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes);
    })
    test('of a bigger list is calculated right', () => {
        expect(totalLikes(threeBlogList)).toBe(14);
    })
})

describe('favorite blog post', () => {
    test('of empty list is undefined', () => {
        expect(favoriteBlog([])).toBe(undefined);
    })
    test('of one blog list is the post', () => {
        expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
    })
    test('among several posts is the one with the highest likes', () => {
        expect(favoriteBlog(threeBlogList)).toEqual(threeBlogList[2]);
    })
})

describe('most blogs author', () => {
    test('of an empty list is undefined', () => {
        expect(mostBlogsAuthor([])).toBe(undefined);
    })
    test("of a list with one blog is the blog's author", () => {
        const expectedResult = {
            author: listWithOneBlog[0].author,
            blogs: 1
        };
        expect(mostBlogsAuthor(listWithOneBlog)).toEqual(expectedResult);
    })
    test('among other blog authors is the one with the most blogs', () => {
        const expectedResult = {
            author: threeBlogList[1].author,
            blogs: 2
        }
        expect(mostBlogsAuthor(threeBlogList)).toEqual(expectedResult);
    })
})

describe('most likes author', () => {
    test('of an empty list is undefined', () => {
        expect(mostLikesAuthor([])).toBe(undefined);
    })
    test("of a list with one blog is the blog's author", () => {
        const { author, likes } = listWithOneBlog[0];
        const expectedResult = {
            author,
            likes
        }
        expect(mostLikesAuthor(listWithOneBlog)).toEqual(expectedResult);
    })
    test("among other blog authors is the one who has the most likes its posts", () => {
        const anotherBlog = {
            title: 'title',
            author: 'someone else',
            url: 'bla bla',
            likes: 10
        };
        const testList = [...threeBlogList, anotherBlog];
        const expectedResult = {
            author: anotherBlog.author,
            likes: anotherBlog.likes
        }
        expect(mostLikesAuthor(testList)).toEqual(expectedResult);
    })
})