window.onload = function () {
  fetchAllPosts();
};

const tableBody = document.querySelector("#table tbody");
var today = '';
async function fetchAllPosts() {
  try {
    const response = await fetch("http://localhost:5000/posts");
    const posts = await response.json();
    console.log(posts);

    let html = "";
    for (let post of posts) {
      if (
        post.title !== null &&
        post.author !== null &&
        post.content !== null &&
        post.tags !== null
      ) {

        html += `
            <tr>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td><i>Tags: ${post.tags.join(", ")}</i></td>
                <td>${post.date.slice(0, 16).replace("T", " ")}</td>
                <td><a href="./update-post.html?id=${post._id}">
                        <button type="button" class="update-post-btn submitBtn"> Update <i class="fas fa-pencil-alt"></i> </button>
                    </a> 

                <a href="#" class="delete-post-link" data-post-id="${post._id}">
                      <button class="update-post-btn submitBtn">Delete <i class="fas fa-trash-alt"></i></button>
                    </a>
                </td>
            </tr>
        `;


      }

    }


    tableBody.innerHTML = html;
  } catch (error) {
    console.log(error);
  }

  // Delete post
  const deletePostLinks = document.getElementsByClassName("delete-post-link");

  for (let link of deletePostLinks) {
    link.addEventListener("click", async function (e) {
      e.preventDefault();

      const postId = e.target.dataset.postId;

      try {
        await fetch(`http://localhost:5000/posts/${postId}`, {
          method: "DELETE",
        });

        e.target.parentNode.parentNode.parentNode.remove(); // remove from the DOM, without reloading the page
      } catch (error) {
        console.log(error);
      }
    });
  }
  function getDate(date) {


    // d.parse(dateString)
    // console.log(d.hours()); // Hours
    // console.log(d.getUTCMinutes());
    // console.log(d.getUTCSeconds());
    // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // return date;

  }
}


