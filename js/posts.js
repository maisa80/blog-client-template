window.onload = function () {
    fetchAllPosts();
}

async function fetchAllPosts() {
    try {
        const response = await fetch('http://localhost:5000/posts')
        const posts = await response.json();
        console.log(posts);

        let html = ''

        for (let post of posts) {
            if (post.title !== null &&
                post.author !== null &&
                post.content !== null &&
                post.tags !== null) {
                html += `
                <li class="list-group-item table-striped">
                    <h2>${post.title} <br> </h2>
                    <p><span class="author">By: </span><b>${post.author}</b> | <span class="date">Posted on: </span> <b>${post.date.slice(0, 16).replace("T", " ")}</b> <br></p>
                    <p>${showhundredChar(post.content, post._id)}<br></p>
                    <p><span class="tags">Tags:</span> ${post.tags.join(", ")}</p>
                   
                </li>
            `

            }

        }

        document.getElementById('post-list').innerHTML = html;
    } catch (error) {
        console.log(error)
    }

    /* varje inlägg visar endast 100 första karaktärerna av inläggsinnehållet
    följt av en  “read more”-länk som navigerar till post sidan */

    function showhundredChar(post, id) {
        if (post.length > 100)
            return `${post.substring(0, 100)}...<a href="post.html?id=${id}" class="read-more">Read more <i class='fas fa-angle-double-right'></i></a>`;
        else return post;

    }

}
