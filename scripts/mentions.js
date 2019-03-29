// Description:
//   Example of a deployment script using Hubot and slack buttons
// 
// Dependencies:
//   "@slack/client": "5.0.0"
// 
// Commands:
//   hubot mentions <users> - Replies to a list of mentions in a thread
//
// Notes:
//   
// 
// Author:
//   aaronosher



const {WebClient} = require("@slack/client");

module.exports = (robot) => {
  const web = new WebClient(robot.adapter.options.token);
  
  robot.respond(/mentions/i, res => {
    const user_mentions = res.message.mentions
                            .filter(mention => mention.type === "user");
    
    res.send("Hey there!");
    
    if (!!!res.message.thread_ts) {
      res.message.thread_ts = res.message.rawMessage.ts;
    }
      
    for (const mention of user_mentions) {
        res.send(`Hey <@${mention.id}>`)
    }
    
    console.log(user_mentions);
  });
}
