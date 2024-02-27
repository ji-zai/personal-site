import mixpanel from 'mixpanel-browser';
 
mixpanel.init('0fa087f9034a89945c881bf27602cc7a', {
    debug: false, 
    track_pageview: true, 
    persistence: 'localStorage'
});
 
export const logEvent = (key: string, value: any) => {
    // Track an event. It can be anything, but in this example, we're tracking a Sign Up event.
    if (!value) {
        mixpanel.track(key)
    } else {
        mixpanel.track(key, value)
    }
}