var buttonElement = document.querySelector('.btn');
var containerElement = document.querySelector('.repositorys');

buttonElement.onclick = function renderRepository() {
    function repository() {
        return new Promise((resolve, reject) => {
            var valueInput = document.querySelector('input[name=user]');
            var xhr = new XMLHttpRequest();
            xhr.open('GET','https://api.github.com/users/' + valueInput.value + '/repos');
            xhr.send(null);
    
            xhr.onreadystatechange = function() {
               if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else {
                        reject('Error 404');
                    }
                } 
            }
        });
    }
    
    repository()
        .then(function(response) {
            for(repos of response) {
                var liElement = document.createElement('li');
                var linkElement = document.createElement('a');
                var textLink = document.createTextNode(`${repos.name}`);

                linkElement.setAttribute('href',`${repos.html_url}`);
                linkElement.appendChild(textLink);
                liElement.appendChild(linkElement);
                containerElement.appendChild(liElement);
            }
        })
        .catch(function(error) {
            console.log(error);
        })
};