
const characterCounter = (setCharacter) => {
    let character = document.getElementById("inputTweet").value;
    console.log(character);
    console.log(character.length);
    character  && character.length >= 0 && 
        setCharacter(character.length);
        progressBar(character.length);
}

const progressBar = (character) => {
    let progressBar = document.getElementById("progress");
    console.log(progressBar)
    console.log(`Esto es character desde progressbar ${character}`)
    const maximumCharacter = 200;
    let progress = Math.round((character * 100) /maximumCharacter);
    let width = progress;
    console.log(`width ${width}`)
    return progressBar.style.width = `${width}%`;
}

export default characterCounter;