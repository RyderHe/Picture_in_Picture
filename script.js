const video = document.getElementById('video');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');

// Prompt to select media stream, pass to video element, then play
// async keyword: return a promise rather than directly returning a value
// await keyword: causes the JavaScript runtime to pause the code on this line, allowing other code to execute in the meantime, until the async function call has returned its result.
async function selectMediaStream() {
    try {
        // waiting to assign mediaStream variable until the user has actually selected which screen/window they want to share 
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        // pass to video Element
        video.srcObject = mediaStream;
        // when video has loaded its meta data, it's going to call a function that is going to play the video
        video.onloadedmetadata = () => {
            video.play();
        }
    } catch (error) {
        // catch error here
        console.log('whoops, error here: ', error);
    }
}

button2.addEventListener('click', async () => {
    // disable button
    button2.disabled = true;
    // start picture in picture
    await video.requestPictureInPicture();
    // On Load
// selectMediaStream();
    // reset button
    button2.disabled = false;
});

// On Load
button1.addEventListener('click', () => {
    button2.disabled = true;
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    }
    selectMediaStream();
    button2.disabled = false;
});