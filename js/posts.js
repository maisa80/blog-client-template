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
            if (post.title !== null && post.author !== null && post.content !== null && post.tags !== null) {
                html += `
                <li class="list-group-item list-group-item-dark">
                    <h2>${post.title} <br> </h2>
                    <p><span class="author">By: </span><b>${post.author}</b> | <span class="date">Posted on: </span> <b>${post.date.slice(0, 10)}</b> <br></p>
                    <p>${showhundredChar(post.content, post._id)}<br></p>
                    <p class="left-indent"><span class="tags">Tags:</span> ${post.tags.join(", ")}</p>
                   
                </li>
            `
           
           
                // let arr = post.tags;
                // console.log(arr.join(", ")),
                //     console.log(arr.length);
                // let tagString = ''
                // for (let i = 0; i < arr.length; i++) {
                //     tagString += arr;
                //     console.log(tagString)
                // }
               
                
            }

           



        }

        document.getElementById('post-list').innerHTML = html;
    } catch (error) {
        console.log(error)
    }
    function showhundredChar(post, id) {
        if (post.length > 100)
            return `${post.substring(0, 100)}...<a href="post.html?id=${id}">Read more</a>`;
        else return post;

    }

}
