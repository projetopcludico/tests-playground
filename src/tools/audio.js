function playAudio(path) {
    const audio = new Audio(path);
    audio.play();
}

function playSequenceAudio(audios) {
    let index = 0;

    function tocarPróximo() {
        if(index >= audios.length) return;

        const audio = new Audio(audios[index]);
        audio.play();

        audio.addEventListener("ended", () => {
            index++;
            tocarPróximo();
        });
    }

    tocarPróximo();
}

return{
    playAudio,
    playSequenceAudio
}

