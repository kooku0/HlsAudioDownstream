# HlsAudioDownstream

**HLS streaming from node** : HLS 프로토콜을 이용하여 Audio Downstream 기능을 구현한 node.js서버

## Getting Started

왠만히 찾아본 hls 코드가 실행되지 않았다. 겨우겨우 찾은 되는 코드를 이용하여 Audio downstream 기능을 보완하였다.

### Prerequisites

HLS 프로토콜을 지원하지 않는 브라우저의 경우 hls 확장 프로그램을 설치 해줘야한다.

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

`http://localhost:8000/`에서 확인

```shell
$npm start
```

### Screenshot

<img src='./resource/demo.jpg' />

## Reference

* <https://gist.github.com/mharsch/5188206>

* <https://github.com/Einstrasse/hls-service/tree/394c7f3d33d687c91367c58f464e6f799292e40d>
