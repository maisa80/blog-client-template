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
                <li class="list-group-item">
                    <p>${post.title} <br> </p>
                    <p><span class="date"> ${post.date.slice(0,10)}</span> <br></p>
                    <p>${post.content}<br></p>
                    <p><span class="autor">Author: ${post.author}</span></p>
                   
                </li>
            `
        }

        document.getElementById('post-list').innerHTML = html;
    } catch(error) {
        console.log(error)
    }
}
