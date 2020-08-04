/* Global Variables */
baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
apiKey = ",us&appid=aed012664aaa477a8a4bb8013206d222 ";

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZipCode = document.getElementById('zip').value;
    getWeather(baseURL, newZipCode, apiKey)
        .then(function(data) {
            let userResponse = document.getElementById('feelings').value;
            postData('/add', { temperature: temperature, date: newDate, userResponse: userResponse });
        })
        .then(updateUI());
};

const getWeather = async(baseURL, newZipCode, apiKey) => {
    link = baseURL + newZipCode + apiKey;
    console.log(link);
    const res = await fetch(link)

    try {

        const data = await res.json();
        temprature = data.main.temp
        console.log(temprature)
        return temprature;

    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const postData = async(url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async() => {

    const req = await fetch('all');
    try {
        const projectData = await req.json();
        console.log(projectData);
        document.getElementById('temp').innerHTML = projectData.temp;
        document.getElementById('date').innerHTML = projectData.date;
        document.getElementById('content').innerHTML = projectData.userResponse;
        console.log('updateUI')
    } catch (error) {
        console.log('error', error);
    }
}


// postData('/add', { temprature: 42, date: newDate, userResponse: "Fine" });