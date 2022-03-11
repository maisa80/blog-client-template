window.onload = function () {
  fetchAllPosts();
}

async function fetchAllPosts() {

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  try {

    const response = await fetch(`http://localhost:5000/posts/${postId}`);
    const data = await response.json();

    document.getElementById("title").value = data.title;
    document.getElementById("author").value = data.author;
    document.getElementById("content").value = data.content;

  } catch (error) {
    throw new Error(error);
  }
}
