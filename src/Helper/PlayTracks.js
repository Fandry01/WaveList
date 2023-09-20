export default function PlayTracks(musicData) {

    if (musicData) {

        const randomSong = musicData.sort(() => Math.random() - Math.random())
            .find(() => true);
        console.log(randomSong);
        return randomSong;
    }
}
