window.onload = function () {
  fetchAllPosts();
};

async function fetchAllPosts() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  try {
    const response = await fetch(`http://localhost:5000/posts/${postId}`);
    if (!response.ok) {
      throw new Error("Some problems with connecting to API");
    }

    const data = await response.json();

    document.getElementById("title").value = data.title;
    document.getElementById("author").value = data.author;
    document.getElementById("content").value = data.content;

    for (let tag of data.tags) {
      let option = document.getElementById(tag);
      option.setAttribute("selected", true);
      console.log(option);
      console.log(tag);
    }
  } catch (error) {
    throw new Error(error);
  }
  submitUpdates(postId);
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
    try {
      await fetch(`http://localhost:5000/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
      window.location.replace("./index.html");
    } catch (error) {
      throw new Error(error);
    }
  });
}

function preselectTags() {
  let options = document.querySelectorAll("option");
  let selectedTagsArray = [];

  for (let option of options) {
    if (option.selected) {
      selectedTagsArray.push(option.value);
    }
  }
  return selectedTagsArray;
}