var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');



});

socket.on('disconnect', function () {
    console.log('User Disconnected from the server');
});

//custom events

socket.on('newMessage', function (message) {

    console.log('newMessage', message) // prints on console of browser

    //appends messages on browser

    var li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);

});

//Geolocation URL on browser

socket.on('newLocationMessage', function (message) {

    var li = jQuery('<li></li>');
    var a = jQuery('<a target = "_blank" >My Current Location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
});

//gets the message from browser form and sends it to server when submitted

jQuery('#message-form').on('submit', function (e) {

    e.preventDefault(); //prevents default behavior of reloading page by submit

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val() //gets value of DOM object with property name as message
    }, function (data) {

    });

});

//gets user's location using Geolocation API available by default in browser

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by yout browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    },
        function () {
            alert('Unable to fetch location');
        });

});

