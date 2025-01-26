function checkIPAddress(ipAddress) {
  const results = {
    isValid: false,
    type: "unknown",
    isPrivate: false,
    isLoopback: false,
    isMulticast: false,
    hostname: "Not Available",
    error: null,
    city: 'Not Available',
    region: 'Not Available',
    country: 'Not Available',
    org: 'Not Available',
  };

  // IPv4 Validation and Analysis
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(ipAddress)) {
    const parts = ipAddress.split(".").map(Number);
    if (parts.every((part) => part >= 0 && part <= 255)) {
      results.isValid = true;

      // IP Type Detection (IPv4)
      if (parts[0] === 127) {
        results.isLoopback = true;
        results.type = "loopback";
      } else if (
        parts[0] === 10 ||
        (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
        (parts[0] === 192 && parts[1] === 168)
      ) {
        results.isPrivate = true;
        results.type = "private";
      } else if (parts[0] >= 224 && parts[0] <= 239) {
        results.isMulticast = true;
        results.type = "multicast";
      } else {
        results.type = "public";
      }
       // Fetch data from ip-api.com
        return fetch(`http://ip-api.com/json/${ipAddress}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.status === 'success') {
               results.hostname = data.query;
               results.city = data.city;
               results.region = data.regionName;
               results.country = data.country;
               results.org = data.org;
            }
            return results;

          })
          .catch(error => {
            results.error = error.message;
            return results;
          });


    } else {
        results.error = "Invalid IPv4 number range";
        return Promise.resolve(results);
    }
  }

  // (Optional) IPv6 Validation
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (ipv6Regex.test(ipAddress)) {
      results.isValid = true;
      results.type = "ipv6";
      return Promise.resolve(results);
  }

  results.error = "Invalid IP address format";
  return Promise.resolve(results);
}


// Example Usage (assuming you have an HTML input element with ID "ipInput"
//                 and a div element with ID "resultsDiv" to display the results)
const ipInput = document.getElementById("ipInput");
const resultsDiv = document.getElementById("resultsDiv");

if(ipInput && resultsDiv){
    document.getElementById("checkButton").addEventListener("click", () => {
    const ip = ipInput.value.trim();

        checkIPAddress(ip).then(results => {
        if (results.isValid) {
            let message = `IP: ${ip}<br>`;
                message += `Type: ${results.type}<br>`;
            if(results.isPrivate){
                 message += "Private Address<br>"
            }
            if(results.isLoopback){
                message += "Loopback Address<br>"
            }
            if (results.isMulticast){
                message += "Multicast Address <br>"
            }
            message += `Hostname: ${results.hostname}<br>`;
            message += `City: ${results.city}<br>`;
            message += `Region: ${results.region}<br>`;
            message += `Country: ${results.country}<br>`;
            message += `Organization: ${results.org}<br>`;

            resultsDiv.innerHTML = message;
        } else {
            resultsDiv.innerHTML = `<p style="color:red;">Error: ${results.error}</p>`;
        }
    });

});
}