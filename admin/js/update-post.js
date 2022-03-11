window.onload = function () {
  console.log(window.location.search);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get("id"));

  fetchAllPosts(urlParams);
};

async function fetchAllPosts(urlParams) {
  let postId = urlParams.get("id");
  try {
    const response = await fetch(`http://localhost:5000/posts/${postId}`);
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}
