window.onload = function() {
    const form = document.getElementById('create-post-form');
    form.addEventListener('submit', createPost)
}

async function createPost(e) {
    e.preventDefault();
    const formData = new FormData(e.target) 
    console.log(formData);
    const JSONString = {
        title: formData.get('title'),
        author: formData.get('author'),
        content: formData.get('content'),
         tags: formData.getAll("tags", "value")
    };

    console.log(JSON.stringify(JSONString));

    try {
        const response = await fetch('http://localhost:5000/posts', {
            method: 'POST', 
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
}



let serializeForm = function (form) {
    var obj = {};
    var formData = new FormData(form);

    for (var key of formData.keys()) {
        let inputData = formData.getAll(key);

        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];    
        }
    }
    
    return obj;
};
