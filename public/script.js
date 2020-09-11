var socket = io('http://localhost:3000/');

$('#chat').submit((event) => {
    event.preventDefault();

    var author = $('input[name="user_name"]').val();
    var message = $('input[name="message"]').val();

    if (author.length && message.length) {
        messageObject = {
            author: author,
            message: message
        };

        renderMessage(messageObject);

        socket.emit('sendMessage', messageObject);
    }
});

socket.on('receveidMessage', (messageObject) => {
    renderMessage(messageObject);
});

function renderMessage(object) {
    $('.messages').append(`
        <div class="col-md-12">
            <b>${object.author}:</b>  ${object.message}     
        </div>
    `);
}