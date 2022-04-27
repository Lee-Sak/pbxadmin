redux-thunk: 함수를 디스패치 할 수 있게 해주는 미들웨어
redux-saga의 경우엔, 액션을 모니터링하고 있다가, 특정 액션이 발생하면 이에 따라 특정 작업을 하는 방식으로 사용합니다. 여기서 특정 작업이란, 특장 자바스크립트를 실행하는 것 일수도 있고, 다른 액션을 디스패치 하는 것 일수도 있고, 현재 상태를 불러오는 것 일수도 있습니다.

async/await이든 Redux-Saga 사용상의 이점은 크게 없다.
하지만 좀 더 자세한 동작에 대한 handling을 가능하게 하는 것이 Redux-Saga이다(takeLatest(), next()등)
코드 량은 현저히 async/awiat가 적다.
질문

왜 Rudx를 사용하고 saga, thunks를 사용할까?

Redux became the de facto standard as a data management technology for ReactJS applications. It is a convenient and easy method of structuring data in an application and displaying it on the client. Yet we hit a certain problem here. There is no place for side effects in the Redux scheme of work. As in the context of this article, only network requests are seen as side effects. Middleware can solve this problem.

결국 Redux는 side Effect 가 없지만 API 비동기 처리에서 발생하는 Side Effect를 관리하고 처리 하기 위해서 Saga, Thunks가 생긴것이다.

그러면 Async/Await와 무슨 차이인것인가?

- 엄청 큰 이점이 있는것은 아니지만

- takeLatest() 의 장점이 있다.

- saga 함수인 delay,put, takeEvery, takeLatest, call, all

Delay

설정된 시간이 이후에 resolve

delay(1000) : 1초 기다린다.

put

특정 액션을 dispatch하도록 한다.

takeEvery

들어오는 모든 액션에 대해 특정 작업을 처리해 준다.

takeLatest

기존에 진행중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다.

call

함수의 첫번째 파라미터는 함수, 나머지는 파라미터는 해당 함수에 넣을 인수

주어진 함수를 실행
