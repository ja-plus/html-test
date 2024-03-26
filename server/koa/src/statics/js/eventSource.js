const eventSource = new EventSource('/sse');

eventSource.onmessage = function (e) {
    console.log(e.data)
}

// eventSource.addEventListener('test',function(e){
//     // infoShow.textContent += e.data+'\n';
//     console.log(e.data);
// });
eventSource.addEventListener('error', function (e) {
    console.log(e);
})
eventSource.addEventListener('open', function (e) {
    console.log('open', e)
})
eventSource.addEventListener('close', function (e) {
    console.log('close', e)
})