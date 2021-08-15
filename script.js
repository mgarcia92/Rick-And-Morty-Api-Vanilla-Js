



const baseURL = 'https://rickandmortyapi.com/api';


class RickAndMorty {


    constructor(){
        this.renderEpisodes();
    }
     async getRequest(url){
       return await (await fetch(`${baseURL}/${url}`)).json()   
    }

     handleClickEpisode = async (e) => {
        const element =  e.currentTarget
        const appBody = document.querySelector('.characters__body')
        const title = document.getElementById('episode-title')
        title.innerHTML = ''
        appBody.innerHTML = '';
        const episodes = await this.getRequest(`/episode/${element.dataset.id}`);
        title.innerHTML = `${episodes.name} ${new Date(episodes.air_date).toLocaleDateString()}`
        episodes.characters.forEach(async character => {
           await  this.renderCharacter(character)
        })
    }

    async renderEpisodes(){
        const episodes = await this.getRequest('/episode');
        const appBody = document.querySelector('.sidebar')
        episodes.results.forEach((result) => {
            const cardEpisode =            `
             <div class="card episode" data-id="${result.id}" >
                <h4>${result.name}</h4>
                <time>${new Date(result.air_date).toLocaleDateString()}</time>
              </div>
             `
            appBody.innerHTML += cardEpisode
        })

        const divEpisode =  document.querySelectorAll('.episode')
        divEpisode.forEach((div) => {
            div.addEventListener('click', this.handleClickEpisode)
        });
    }

    async renderCharacter(url, episode){
        const character =  await (await fetch(`${url}`)).json()
        const appBody = document.querySelector('.characters__body')
        character
            const card = `
            <div class="card card-character">
                <img src="${character.image}" alt="img">
                <h4>${character.name}</h4>
             </div>
            `
            appBody.innerHTML += card   
    }
}



const instance = new RickAndMorty()
instance.getRequest('/episode').then((data) => {
console.log(data)
})
