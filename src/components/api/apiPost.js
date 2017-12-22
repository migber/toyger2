

var api = {
    postData(token, name, data){
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`)
        var myInit = { method: 'POST',
                       headers: myHeaders,
                       mode: 'no-cors',
                       cache: 'default',
        }
        // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqVXpRakE0UkRneU4wSkJNMEV4UkRBMk1qWTNOamd6UVVJNE9FUTFSVFZDTlRVMk9UTkNRdyJ9.eyJpc3MiOiJodHRwczovL3RveWdlci5ldS5hdXRoMC5jb20vIiwic3ViIjoiakgwWTJaYWhvMkpHVmJ1ZW1EQmlZTTB3TGQ0Z2JDbllAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vdG95Z2VyLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTEzNTQzMTQ2LCJleHAiOjE1MTM2Mjk1NDYsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.WSM55LfT-abAGYo3b-OgVMO4yttfoYS9puRxciRSBuiQthm4cbMQqWVoFuPn4J99d5Rqa7Tya12Ym9KkV1RscgvQWwjvVkZVonoH-zA7HbetwwRTrjWinj_iZGJpX8Bl__EatHxSfdVSyB4V83VN_klOZ1c7nH2WUWW9XsKPTiiGfNbhqvJqY6UZNS7XBkvDtAEwDSBD_tCK48XOaL935zYzCPKLCuklV_18-ISZNgjezqxFQaAeZfJQ34T8zVnMjo5Su70jBn0T1nPhvGyHwKPgjvkIVZGKlpIhT3CcWB2uFhrYxh7KkQhr7NQN-pUPOY0Wtv10JTvstZC0qu5agg")
        var url = `http://localhost:8025/api/${name}`
        var myRequest = new Request(url, myInit) 
        console.log("TOKKEEN  "+ token)
       
        return fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    }
};

module.exports = api