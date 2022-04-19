export class ShowCity {
    constructor(){
        this.cityMainTitle = document.querySelector(".main-title");
        this.cityBannerPhoto = document.querySelector(".banner-container");
        this.cityName = document.querySelector(".city-name");
        this.citySummary = document.querySelector(".city-summary");
        this.cityChart = document.querySelector(".city-scores-chart");
        this.cityMayor = document.querySelector(".city-mayor");
        this.cityTotalScore = document.querySelector(".city-total-score")
    }

    setMainTitle (data){
        this.cityMainTitle.textContent = data
    }

    setCityBanner (href){
        this.cityBannerPhoto.style.backgroundImage = `url('${href.web}')`
    }

    setCityName (name, nation, continent){
        const HTMLstring = `<h1>${name}</h1><h3>${nation}, ${continent}</h3>`;        
        this.cityName.innerHTML = HTMLstring;
    }

    setCitySummary (summary){
        this.citySummary.innerHTML = summary;
    }

    setCityMayor (mayor){
        this.cityMayor.innerHTML = `<p> The name of the city mayor is <strong>${mayor}</strong></p>`;
    }
    
    setCityTotalScore (score){
        this.cityTotalScore.innerHTML = `<p><em>BCTL Life Quality Score: <strong>${score}/100</strong></em><p>`;
    }

}