const { dummy, totalLikes } = require('../utils/list_helper');

test('dummy returns one', () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
})

describe('total likes', () => {
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
    test('of empty list is zero', () => {
        const emptyList = [];
        expect(totalLikes(emptyList)).toBe(0);
    })
    test('when list has only one blog equals the likes of that', () => {
        expect(totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes);
    })
    test('of a bigger list is calculated right', () => {
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
        expect(totalLikes(threeBlogList)).toBe(14);
    })
})