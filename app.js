const api_key = '0NwJdF9xDJWMSSevjw6nFCmqRWY1ZsSB';

$(document).ready(function() {
    const searchInput = $('#search');
    const allGifs = $('#gifs');
    const removeButton = $('#remove');

    $('form').submit(async function(e) {
        e.preventDefault();
        const searchTerm = searchInput.val();
        searchInput.val('');
        try {
            const gifData = await searchGif(searchTerm);
            if(gifData) {
                displayGifs(gifData);
            } else {
                alert('No gifs found for this input');
            }
        } catch (error) {
            alert('Error fetching Gif: ' + error.message);
        }
    });

    removeButton.click(function() {
        allGifs.empty();
    });

    async function searchGif(query) {
        const url = 'http://api.giphy.com/v1/gifs/search';
        try {
            const response = await axios.get(url, {
                params: {
                    api_key: '0NwJdF9xDJWMSSevjw6nFCmqRWY1ZsSB',
                    q: query,
                }
            });
            if(response.data.data.length > 0) {
                return response.data.data[1];
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        };
    };
    function displayGifs(gif) {
        const gifUrl = gif.images.original.url;
        const img = document.createElement('img');
        img.src = gifUrl;
        allGifs.append(img);
    }
});