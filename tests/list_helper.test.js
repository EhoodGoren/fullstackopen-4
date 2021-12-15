const { dummy, totalLikes, favoriteBlog } = require('../utils/list_helper');

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
    test('of one post list is the item', () => {
        expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
    })
    test('among several posts is the one with the highest likes', () => {
        expect(favoriteBlog(threeBlogList)).toEqual(threeBlogList[2]);
    })
})