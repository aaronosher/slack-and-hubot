### Actions must be handled

```JavaScript
slackInteractions.action('deploy', (payload, respond) => {
	// do something
});
```

note:

When a user does an action a webhook is called