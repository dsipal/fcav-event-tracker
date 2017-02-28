function gaEvents() {
    $("#track").gaTrackEvent({
        useEvent:true,
        useLabel:true,
        category: 'Navigation',
        action: 'home',
        labelAttribute: 'Logo',
        event: 'click'
    });
}
