$(function () {
    var viewModel;

    $.connection.hub.logging = true;
    var workItemsHub = $.connection.workItems;

    bugsHub.client.moved = function (item) {
        viewModel.moveWorkItem(item);
    };

    $.connection.hub.start().done(function () {
        console.log('hub connection open');
    });
})