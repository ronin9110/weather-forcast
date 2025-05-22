
export const fetchCity = async (City,Results) => {
    var err ="";
    var result ={};

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );

      if (!res.ok) {
        await res.json().then((data) => err=data.message);
      }else{
      await res.json().then((data) => {
        const temp = {
          id: data.id,
          city: data.name,
          temperature: `${data.main.temp}°C`,
          description: data.weather[0].description,
          minTemp: `${data.main.temp_min}°C`,
          maxTemp: `${data.main.temp_max}°C`,
          humidity: `${data.main.humidity}%`,
          windSpeed: `${data.wind.speed} m/s`,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        };
        var exits = false;


        Results.filter((val) => {
          if (val.id === temp.id) {
            exits = true;
          }
        });


        if (!exits) {
          result=temp;
        } else {
            err="Location Result Exists.";
        }
      });}
    } catch (error) {
      err=error;
    } finally {
      return {err,result}
    }
  };

  