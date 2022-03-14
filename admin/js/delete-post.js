window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    

    fetchPost(urlParams);
    deletePostEvent(urlParams);
}



async function fetchPost(urlParams) {
    try {
        const response = await fetch(`http://localhost:5000/posts/${urlParams.get('id')}`)
        const post = await response.json();
        
        document.getElementById('title').value = post.title;
        document.getElementById('author').value = post.author;
        document.getElementById('content-textarea').innerText = post.content;
        
    } catch(error) {
        console.log(error)
    }
}

function deletePostEvent(urlParams) {
    const form = document.getElementById('delete-post-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(e.target)
        console.log(formData);
        const JSONString = {
            title: formData.get('title'),
            author: formData.get('author'),
            content: formData.get('content'),
            tags: formData.get('tags')

        };
        console.log(JSON.stringify(JSONString));

        try {
            const response = await fetch(`http://localhost:5000/posts/${urlParams.get('id')}`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JSONString),
            })

            if (!response.ok) {
                throw new Error('Something went wrong with the API')
            }

            window.location.replace('index.html') 
        } catch(error) {
            console.log(error);
        }
    })
}


