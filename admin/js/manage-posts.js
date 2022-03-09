window.onload = function() {
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
            
            tableBody.innerHTML += `
            <tr>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${post.date}</td>
                <td>
                    <ul>
                        ${post.content}
                    </ul>
                </td>
                <td><button class="btn btn-dark"><a href="update-post.html?id=${post._id}">Update</a></button>
                <button class="btn btn-dark"><a href="#" class="delete-post-link" data-post-id="${post._id}">Delete</a></button></td>
            </tr>
        `;
        }

        document.getElementById('post-list').innerHTML = html;
    } catch(error) {
        console.log(error)
    }
}
// html += `
//                 <td class="list-group-item">
//                     <p>${post.title} <br> </p>
//                     <p><span class="date">- ${post.date}</span> <br></p>
//                     <p>${post.content}<br></p>
//                     <p><span class="autor">Author: ${post.author}</span></p>
//                     <div>
//                         <a href="update-post.html?id=${post._id}">Update</a> |
//                         <a href="#" class="delete-post-link" data-post-id="${post._id}">Delete</a> 
//                     </div>
//                 </td>
//             `