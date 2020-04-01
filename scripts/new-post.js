const fs = require('fs-extra');
const path = require('path');

const src = path.join(__dirname, './untitled.mdx');
const dest = path.join(__dirname, '../pages/posts/untitled.mdx');

fs.copy(src, dest, err => {
    if (err) {
        return console.error(err);
    }
    console.log('success!');
});
