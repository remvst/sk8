say = (message) => {
    if (!message || !speechSynthesis) return;

    const voices = speechSynthesis.getVoices();

    const idealVoice = (
        voices.filter(x => x.lang == 'en-US')
            .concat(voices.filter((x) => x.lang.split('-')[0] == 'en'))
    )[0];

    const x = new SpeechSynthesisUtterance(message);
    x.rate = 1.1;
    x.pitch = 1.3;
    if (idealVoice) x.voice = idealVoice;

    speechSynthesis.cancel();
    speechSynthesis.speak(x);
}
