window.onload = function () {
  console.log(window.location.search);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get("id"));

  fetchAllPosts(urlParams);
};
