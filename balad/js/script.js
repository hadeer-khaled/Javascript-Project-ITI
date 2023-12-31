var countriesNameSelectElem = document.getElementById("countries-name-select");
var countriesNameOptions = document.getElementById("countries-name-options");

fetch(`https://restcountries.com/v3.1/all`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);

    // ----------------------- set countries name options ----------------------- //
    const countryNames = data.map((country) => country.name.common).sort();

    countryNames.forEach((countryName) => {
      countriesNameOptions.innerHTML += ` <option value="${countryName}">${countryName}</option> `;
    });
    // console.log(countryNames);
  });

var selectedCountry;
countriesNameSelectElem.addEventListener("change", function () {
  selectedCountry = countriesNameSelectElem.value;
  // console.log(selectedCountry);

  var bodySections = document.getElementsByClassName("body-section");
  console.log(bodySections);

  for (var i = 0; i < bodySections.length; i++) {
    console.log(bodySections[i].classList.remove("hidden"));
  }

  fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // get and set  the flag image
      const flagURL = data[0].flags.png;
      document.getElementById("flag-img").src = `${flagURL}`;

      // get and set  the coatOfArms image
      const coatOfArmsURL = data[0].coatOfArms.png;
      document.getElementById("coat-of-arms-img").src = `${coatOfArmsURL}`;

      // checl if the country if united
      const isUNMember = data[0].unMember;
      if (isUNMember) {
        document.getElementById(
          "united-status"
        ).innerHTML = ` United Nations <i class="fas fa-check"></i>`;
      } else {
        document.getElementById(
          "united-status"
        ).innerHTML = `United Nations <i class="fas fa-times"></i>`;
      }

      // checl if the country is independent.
      const isIndependent = data[0].independent;
      if (isIndependent) {
        document.getElementById(
          "independent-status"
        ).innerHTML = ` Independent <i class="fas fa-check"></i>`;
      } else {
        document.getElementById(
          "independent-status"
        ).innerHTML = `Independent <i class="fas fa-times"></i>`;
      }

      // get and set population
      const populationNum = data[0].population;
      document.getElementById(
        "population"
      ).innerHTML = `${populationNum.toLocaleString("en-AU")}`;

      // get and set region
      const region = data[0].region;
      document.getElementById("region").innerHTML = `${region}`;

      // get and set region
      const startOfWeek = data[0].startOfWeek;
      const startOfWeekCapitalized =
        startOfWeek.charAt(0).toUpperCase() + startOfWeek.slice(1);
      document.getElementById(
        "start-of-week"
      ).innerHTML = `${startOfWeekCapitalized}`;

      // get and set timezones
      const timezones = data[0].timezones;
      document.getElementById("time-zone").innerHTML = `${timezones}`;

      // get and set timezones
      const capital = data[0].capital;
      document.getElementById("capital").innerHTML = `${capital}`;

      //=============== News  =================================//
      const cca2 = data[0].cca2;
      console.log(cca2);
      fetch(
        `https://api.worldnewsapi.com/search-news?api-key=6928b527c2c4443eaee5d00794032019&text=${cca2}`
      )
        .then((res) => {
          return res.json();
        })
        .then((newsData) => {
          var newsList = newsData.news;
          console.log(newsList);
          document.getElementById("news-container").innerHTML = "";
          for (var i = 0; i < 4; i++) {
            var date = new Date(newsList[i].publish_date);

            document.getElementById(
              "news-container"
            ).innerHTML += ` <!--News Box Start-->
            <div class="col-md-3 col-sm-6">
              <div class="news-box">
                <div class="new-thumb">
                  <span class="cat c1">News</span>
                  <img src="${newsList[i].image}" alt="" />
                </div>
                <div class="new-txt">
                  <ul class="news-meta">
                    <li id="publish-data">${date.getDate()} ${date.toLocaleString(
              "default",
              { month: "short" }
            )}, ${date.getFullYear()} </li>   
                  </ul>
                  <h6>
                    <a id="title" href="index.html#"
                      >${newsList[i].title}</a
                    >
                  </h6>
                  <p id="news-text">
                  ${newsList[i].text.slice(0, 101)}
                  </p>
                </div>
                <div class="news-box-f">
                  <img
                    id="author"
                    src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                    alt="" />
                    ${newsList[i].author}
                  <a href="index.html#"><i class="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <!--News Box End-->`;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //-----------------------------------Maps --------------------------------------//

      var variableName = document.getElementById("map-frame");
      // const apiKey = "AIzaSyBeFwbxwlie8EhSrN2Npe8rBhbNf5cXSnI";
      countryName = data[0].name.common;
      const Url = `https://www.google.com/maps?q=${countryName}&hl=en&z=6&output=embed`;
      variableName.src = Url;
    });
});

//=============== Gey in touch =================================//
var submitElm = document.getElementById("submit");
function sendMail() {
  (function () {
    emailjs.init("nR2NW5Zn2awN3i0-0");
  })();
  var mailData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("msg").value,
  };
  const serviceID = "service_2tp9zeb";
  const templateID = "template_agm5yg9";

  emailjs
    .send(serviceID, templateID, mailData)
    .then((res) => {
      // console.log(res);
      document.getElementById("name").value = " ";
      document.getElementById("email").value = " ";
      document.getElementById("msg").value = " ";
    })
    .catch((err) => {
      console.log(err);
    });
}
submitElm.addEventListener("click", sendMail);
