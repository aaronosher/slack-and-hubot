### Create a Thread

```JavaScript
if (!!!res.message.thread_ts) {
  res.message.thread_ts = res.message.rawMessage.ts;
}
```