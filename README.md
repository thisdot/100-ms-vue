# 100-ms-vue

This is a starter pack of [100ms](https://www.100ms.live/) based on [svelte-100ms](https://github.com/thisdot/svelte-100ms/tree/features).

## Project setup

```bash
#usng npm
npm install

#using yarn
yarn install
```

### Compiles and hot-reloads for development

```bash

#using npm
npm run serve

#using yarn
yarn serve
```

### Compiles and minifies for production

```bash

#using npm
npm run build

#using yarn
yarn build
```

### Lints and fixes files
```bash
#using npm
npm run lint

#using yarn
yarn lint
```

### Components

- **AutoPlayError**: _Notifies the user of permission to access the audio_
- **ConnectionQuality**: _Shows the strength of the network_
- **DeviceSettings**: _Allows selection of audio, video and speaker option available on your system_
- **GalleryView**: _Displays all connected users_
- **JoinForm**: _This is where users initiate a connection to join_
- **ScreenShare**: _Show the screen the user is sharing_
- **ShareLink**: _Allows the user to copy a shareable link_
- **UChat**: _This is where sending and receiving messages happens_
- **UConference**: _This is the container for both GalleryView and ShareScreen_
- **UFooter**: _This contains the buttons to toggle audio, and video, and buttons to share screen and change settings_
- **UHeader**: _Here you have the leave room button, ShareLink and also the GitHub Icon used as a link to the repo_
- **UNotification**: _Handle notifications from hsmNotification which could be an error, offline users, incoming messages e.t.c_
- **UPeer**: _Handles the connected user, shows a placeholder if the user video is off, shows the name of the user_
- **UserAvartar**: _Used as a placeholder when the user video is off_
- **UToast**: _A custom component for toast should the message of the toast has an HTML tag_
- **UVideo**: _Show a video of the connected user and also the alphabet based on the hand sign overlays the video_

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
