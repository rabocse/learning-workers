

// One more time, although not fully working, I believe the step to complete it is to 
// get the CF_Authorization cookie and then send it to
//  https://alexrabocse.cloudflareaccess.com/cdn-cgi/access/get-identity. 
// This request will return a JSON data structure where the missing email and authentication timestamp can be parsed.



export default {
	async fetch(request) {

		// Defining an Empty HTML content and some styling
	  let html_content = "";
	  let html_style = "body{padding:6em; font-family: sans-serif;} h1{color:#f6821f;}";
  
		// Gather the data needed. 
	  let country = request.cf.country; // Working 
	  let timestamp = request.cf.userAuthenticationTimestamp; // Not working. It seems I need to get this from CF_Authorization cookie.
	  let email = request.headers.get('X-User-Email');  // Not working. It seems I need to get this from CF_Authorization cookie.

		// Experimenting with a static link. I suspect it will be useful for next tasks.
		let link = `<a href="https://flagsapi.com/${country}/flat/64.png">${country}</a>`;
		html_content += `<p>${email} authenticated at ${timestamp} from ${link}</p>`;

		// To be used in the sentence with the flag image.
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