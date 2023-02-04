function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

async function makeRequest(url, method = 'GET', headers, body) {
    let fetch_init = {method};
    if (method !== "GET") {
        fetch_init = {method, headers, body};
    }
    let response = await fetch(url, fetch_init);

    if (response.ok) {
        return await response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

async function buttonClickGet(event) {
    let a = document.getElementById('A');
    let b = document.getElementById('B');

    let url = `${event.target.dataset['url']}?A=${a.value}&B=${b.value}`;
    try {
        let response = await makeRequest(url);
        console.log(response);
    } catch (e) {
        console.log(await e.response.json());
    }
}

async function buttonClickPost(event) {
    let a = document.getElementById('A');
    let b = document.getElementById('B');

    let url = `${event.target.dataset['url']}?test=qweqweqwe`;
    let headers = {'Content-Type': 'application/json', 'X-CSRFToken': csrftoken};
    let body = JSON.stringify({"A": a.value, "B": b.value});
    try {
        let response = await makeRequest(url, "POST", headers, body);
        console.log(response);
    } catch (e) {
        console.log(await e.response.json());
    }
}

function load() {
    let buttonAddGet = document.getElementById('add-get');
    buttonAddGet.onclick = buttonClickGet;


    let buttonAddPost = document.getElementById('add-post');
    buttonAddPost.onclick = buttonClickPost;
}


window.addEventListener('load', load);