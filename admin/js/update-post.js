window.onload = function () {
  fetchAllPosts();
};

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

async function submitUpdates(postId) {
  const updateForm = document.getElementById("form-update-post");
  updateForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    console.log(formData.get("content"));
    const formObject = {
      title: formData.get("title"),
      author: formData.get("author"),
      content: formData.get("content"),
    };
  });
}
