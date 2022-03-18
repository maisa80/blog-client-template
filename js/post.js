window.onload = function () {
    
    fetchPost();
}
let id = ''

async function fetchPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");
    console.log(postId);
    try {
        const response = await fetch(`http://localhost:5000/posts/${postId}`)
        const post = await response.json();

        let html = ''

        if (post.title !== null && post.author !== null && post.content !== null && post.tags !== null) {
            html += `
                <div class="list-group-item list-group-item-dark">
                    <h2>${post.title} <br> </h2>
                    <p><span class="author">By: </span><b>${post.author}</b> | <span class="date">Posted on: </span> <b>${post.date.slice(0, 16).replace("T", " ")}</b> </p>
                    <p><span class="tags">Tags:</span> ${post.tags.join(", ")}</p>
                    <p>${post.content}<br></p>
                   
                   
                </div>
            `
            let arr = post.tags;
            console.log(arr.join(", ")),
                console.log(arr.length);
            let tagString = ''
            for (let i = 0; i < arr.length; i++) {
                tagString += arr;
                console.log(tagString)
            }
            id = post._id;

            // for(let a of arr){
            //     console.log(a)

            // }
        }







        document.getElementById('post-list').innerHTML = html;
    } catch (error) {
        console.log(error)
    }
    

}