let show = true;

document.getElementById('toggleHideShow').addEventListener('click', function(event) {
    if(show) {
        document.getElementsByTagName('table')[0].style.display = 'none';
        show = false;
    } else {
        document.getElementsByTagName('table')[0].style.display = 'block';
        show = true;
    }
});


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(function(response) { console.log('SW was registered');})
    .catch(function(err) { console.log('SW wasn"t registered');})
}