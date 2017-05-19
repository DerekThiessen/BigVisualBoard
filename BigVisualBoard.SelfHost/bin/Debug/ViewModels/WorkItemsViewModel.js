$(function () {
    var viewModel;

    $.connection.hub.logging = true;
    var workItemsHub = $.connection.workItems;

    workItemsHub.client.moved = function (item) {
        viewModel.moveWorkItem(item);
    };

    $.connection.hub.start().done(function () {
        console.log('hub connection open');
    });

	$.getJSON('/api/workitems', function(data) {
		var model = data;

		viewModel = {
			backlog: ko.observableArray(model.filter(function(element) { return element.state === 'backlog'; })),
			working: ko.observableArray(model.filter(function(element) { return element.state === 'working'; })),
			done: ko.observableArray(model.filter(function(element) { return element.state === 'done'; })),
			changeState: function(workItem, newState) {
				$.post('/api/workitems/' + newState, { '': workItem.id });
			},
			moveWorkItem: function(workItem) {

				[this.backlog, this.working, this.done].forEach(function(list) {
					list().forEach(function(item) {
						if (item.id === workItem.id) {
							console.log('removing item ' + item.id);
							list.remove(item);
						}
					});
				});

                this[workItem.state].push(workItem);
			}
        };
		ko.applyBindings(viewModel);
	});
})