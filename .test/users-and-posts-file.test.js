const assert = require('assert').strict;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

test('output.json has correct structure', async () => {
    let { stdout, stderr } = await exec('node ../users-and-posts-file.js');
    assert.strictEqual(stderr, '', `the program produced an error: "${stderr}"`);

    let users = require('./output.json');

    assert.strictEqual(users.length, 10, `Json should have 10 users, but it has ${users.length}.`);

    users.forEach(user => {
        assert.ok(Array.isArray(user.posts), `user ${user.id} should have a 'posts' array.`);
        assert.strictEqual(user.posts.length, 10, `user ${user.id} should have 10 posts, not ${user.posts.length}.`);

        user.posts.forEach(post => {
            assert.strictEqual(post.userId, user.id, `user ${user.id} has a post that belongs to user ${post.userId}.`);
        });
    });
});