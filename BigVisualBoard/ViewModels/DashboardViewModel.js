$(function () {
    var viewModel;

    $.connection.hub.logging = true;
    var bugsHub = $.connection.bugs;

    bugsHub.client.moved = function (item) {
        viewModel.moveBug(item);
    };

    $.connection.hub.start().done(function () {
        console.log('hub connection open');
    });
})