# HlsAudioDownstream

**HLS streaming from node** : HLS 프로토콜을 이용하여 Audio Downstream 기능을 구현한 node.js서버

## Getting Started

왠만히 찾아본 hls 코드가 실행되지 않았다. 겨우겨우 찾은 되는 코드를 이용하여 Audio downstream 기능을 보완하였다.

### Prerequisites

**크롬 브라우저**의 경우 hls프로토콜이 적용되지 않는다. 따라서 hls 확장 프로그램을 설치 해줘야한다.

[Native HLS Playback](<https://chrome.google.com/webstore/detail/native-hls-playback/emnphkkblegpebimobpbekeedfgemhof?hl=ko>)에서 설치하자!!!

### Installing

윈도우 10, chrome 환경에서 실행하였다.

모듈들을 설치해준다.

* http
* fs
* url
* path
* zlib

```shell
$npm install
```

## Running

`http://localhost:8000/manifest.m3u8`에서 확인

```shell
$npm start
```



## Reference

* <https://gist.github.com/mharsch/5188206>

* <https://github.com/Einstrasse/hls-service/tree/394c7f3d33d687c91367c58f464e6f799292e40d>