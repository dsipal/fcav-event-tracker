function gaEvents() {
    $('.logo').click(function(event) {
        $.ga.trackEvent({
            category: 'logo',
            action: 'Click',
            label: $('.logo').val()
        });
    });

    $('.event-share-url').click(function(event) {
        $.ga.trackEvent({
            category: 'Share Map URL',
            action: 'Click',
            label: $('.event-share-url').val()
        });
    });
    $('.post-share-url').click(function(event) {
        $.ga.trackEvent({
            category: 'Share Map URL',
            action: 'Click',
            label: $('.event-share-url').val()
        });
    });

    $('.read-more').click(function(event) {
        $.ga.trackEvent({
            category: 'Read More',
            action: 'Click',
            label: $('.read-more').val()
        });
    });

    $('.event-title').click(function(event) {
        $.ga.trackEvent({
            category: 'Event Title',
            action: 'Click',
            label: $('.event-title').val()
        });
    });

}
