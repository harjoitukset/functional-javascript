const assert = require('assert').strict;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const expectedLines = `Leanne Graham
sunt aut facere repellat provident occaecati excepturi optio reprehenderit
qui est esse
ea molestias quasi exercitationem repellat qui ipsa sit aut
eum et est occaecati
nesciunt quas odio
dolorem eum magni eos aperiam quia
magnam facilis autem
dolorem dolore est ipsam
nesciunt iure omnis dolorem tempora et accusantium
optio molestias id quia eum
Ervin Howell
et ea vero quia laudantium autem
in quibusdam tempore odit est dolorem
dolorum ut in voluptas mollitia et saepe quo animi
voluptatem eligendi optio
eveniet quod temporibus
sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio
fugit voluptas sed molestias voluptatem provident
voluptate et itaque vero tempora molestiae
adipisci placeat illum aut reiciendis qui
doloribus ad provident suscipit at`.split('\n');

test('users-and-posts.js prints users and posts in correct order', async () => {
    let { stdout, stderr } = await exec('node ../users-and-posts.js');

    assert.strictEqual(stderr, '', `the program produced an error: "${stderr}"`);

    expectedLines.reduce((previousIndex, line, i) => {
        let index = stdout.indexOf(line);

        assert.ok(index > -1, `the output should contain text "${line}"`);
        assert.ok(index > previousIndex, `line "${line}" should be after "${expectedLines[i - 1]}"`)

        return index;
    }, -1);
});