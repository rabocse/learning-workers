/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx) {
// 		return new Response('Hello Worker!');
// 	},
// };


export default {
	async fetch(request) {
	  let html_content = "";
	  let html_style = "body{padding:6em; font-family: sans-serif;} h1{color:#f6821f;}";
  

	  let country = request.cf.country;
	  let timestamp = request.cf.userAuthenticationTimestamp;
	  let email = request.headers.get('X-User-Email');



	 	
		let link = `<a href="https://flagsapi.com/${country}/flat/64.png">${country}</a>`;
		html_content += `<p>${email} authenticated at ${timestamp} from ${link}</p>`;


		let flag_url = `https://flagsapi.com/${country}/flat/64.png`;
		let flag_image = `<img src="${flag_url}" alt="${country} " width="64" height="64">`;

		// Sentence with flag picture from static link
		html_content += `<p>${email} authenticated at ${timestamp} from ${flag_image}</p>`;



  
	  let html = `<!DOCTYPE html>
		<head>
		  <title> Top Secret </title>
		  <style> ${html_style} </style>
		</head>
		<body>
		  <h1>Top Secret Resource Results</h1>
		  <p> ================================================================================================================ </p>
		  ${html_content}
		</body>`;
  
	  return new Response(html, {
		headers: {
		  "content-type": "text/html;charset=UTF-8",
		},
	  });
	},
  };




