window.onload = function () {
    fetchAllPosts();
}

const tableBody = document.querySelector('#table tbody');
async function fetchAllPosts() {
    try {
        const response = await fetch('http://localhost:5000/posts')
        const posts = await response.json();
        console.log(posts);

        let html = ''
        for (let post of posts) {
            if (post.title !== null && post.author !== null && post.content !== null && post.tags !== null) {
                html += `
            <tr>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${post.date.slice(0, 10)}</td>
                <td>${showhundredChar(post.content, post._id)}</td>
                <td>${post.tags.join(", ")}</td>
                <td><button class="btn manageBtn"><a href="update-post.html?id=${post._id}">Update</a></button>
                <button class="btn manageBtn"><a href="#" class="delete-post-link" data-post-id="${post._id}">Delete</a></button></td>
            </tr>
        `;
            }

        }

        tableBody.innerHTML = html;

    } catch (error) {
        console.log(error)
    }


    const deletePostLinks = document.getElementsByClassName('delete-post-link');

    for (let link of deletePostLinks) {
        link.addEventListener('click', async function (e) {
            e.preventDefault();

            const postId = e.target.dataset.postId;

            try {
                await fetch(`http://localhost:5000/posts/${postId}`, {
                    method: 'DELETE',
                })

                e.target.parentNode.parentNode.parentNode.remove(); // remove from the DOM, without reloading the page
            } catch (error) {
                console.log(error)
            }
        })
    }
}
function showhundredChar(post, id) {
    if (post.length > 100)
        return `${post.substring(0, 100)}...<a href="../post.html?id=${id}" class="read-more"> Read more</a>`;
    else return post;

}
