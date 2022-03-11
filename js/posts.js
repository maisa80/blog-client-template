window.onload = function() {
    fetchAllPosts();
}

async function fetchAllPosts() {
    try {
        const response = await fetch('http://localhost:5000/posts')
        const posts = await response.json();
        console.log(posts);

        let html = ''
        for (let post of posts) {
            html += `
                <li class="list-group-item list-group-item-dark">
                    <h2>${post.title} <br> </h2>
                    <p>By: <span class="author">${post.author}</span> | Posted on: <span class="date"> ${post.date.slice(0,10)}</span> <br></p>
                    <p>${post.content}<br></p>
                    <p></p>
                   
                </li>
            `
        }

        document.getElementById('post-list').innerHTML = html;
    } catch(error) {
        console.log(error)
    }
}
