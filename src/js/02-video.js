import vplayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const videoplayerCurrentTime = JSON.parse(
  localStorage.getItem('videoplayer-current-time')
);

// Зберегти поточний час плеєра
saveCurrentTime();

// Відновити поточний час плеєра
setPlayerCurrentTime();

// Записувати поточний час в локар стор с частотою раз в 2 сек
function saveCurrentTime() {
  player.on('timeupdate', throttle(putTimeToLocalStorage, 2000));
}

// Додати в локал стор поточний час
function putTimeToLocalStorage(event) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(event));
}

// Встановити час плеєра з локал стора
function setPlayerCurrentTime() {
  if (videoplayerCurrentTime) {
    player
      .setCurrentTime(videoplayerCurrentTime.seconds)
      .then(function (seconds) {
        // seconds = the actual time that the player seeked to
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            console.log(
              'Error: the time was less than 0 or greater than the video’s duration'
            );
            break;

          default:
            console.log('Unknown error');
            break;
        }
      });
  }
}
