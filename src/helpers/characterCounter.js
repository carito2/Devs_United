
const characterCounter = (setCharacter) => {

    let character = document.getElementById("inputTweet").value;

    character.length >= 0 && 
        setCharacter(character.length);
        progressBar(character.length);
}

export const progressBar = (character) => {
    let progressBar = document.getElementById("progress");

    const maximumCharacter = 200;

    let progress = Math.round((character * 100) /maximumCharacter);

    let width = progress;

    return progressBar.style.width = `${width}%`;
}

export default characterCounter;