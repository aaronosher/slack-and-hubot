// Description:
//   Example of a deployment script using Hubot and slack buttons
// 
// Dependencies:
//   "@slack/interactive-messages": "1.1.1"
// 
// Configuration
//   SLACK_SIGNING_SECRET
// 
// Commands:
//   hubot deploy - Asks user what environment to deploy to
//
// Notes:
//   Hubot handles the chat interaction
//   @slack/interactive-messages handles responding to the form created
// 
// Author:
//   aaronosher



const { createMessageAdapter } = require('@slack/interactive-messages');

const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);
const port = process.env.PORT || 3000;

slackInteractions.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});

slackInteractions.action('deploy', (payload, respond) => {
  console.log(payload.actions);
  
  const environment = payload.actions.filter(action => action.name === 'environment')[0].value;
  
  setTimeout(() => {
    // When there are no errors, after this function returns, send an acknowledgement to the user
    respond({
      text: `Thanks <@${payload.user.id}>. I've kicked off your deployment to ${environment}. I'll let you know once everything is sorted!`
    });
  });
});

module.exports = (robot) => {
  robot.hear(/deploy/i, res => {
		res.send({
			"text": "Where would you like to deploy?",
			"attachments": [
				{
					"text": "Chose a environment to deploy to",
					"fallback": "Something went wrong. Hmm...",
					"callback_id": "deploy",
					"color": "#3AA3E3",
					"attachment_type": "default",
					"actions": [
						{
							"name": "enivronment",
							"text": "Testing",
							"type": "button",
							"value": "testing"
						},
						{
							"name": "environment",
							"text": "Development 1",
							"type": "button",
							"value": "development1"
						},
						{
							"name": "environment",
							"text": "Staging",
							"type": "button",
							"value": "staging"
						},
						{
							"name": "environment",
							"text": "Production",
							"type": "button",
							"value": "production"
						},
					]
				}
			]
		})
	});
};