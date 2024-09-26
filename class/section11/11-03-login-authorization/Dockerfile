FROM node:18

# 캐싱처리로 모듈 패키지가 바뀌지 않으면 바로 가져옴 (패키지 외 파일만 수정했을 시 반복적인 모듈 설치 하지 않음)
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
RUN yarn install

COPY . /myfolder/

CMD yarn start:dev 

# docker 삭제 명령어
# container 삭제 -> docker rm
# image 삭제 -> docker rmi
# 컨테이너 또는 이미지 id 값만 추출 -> -q
# 정지된 컨테이너 모두 삭제 -> docker rm `docker ps -a -q`
# 이미지 모두 삭제(현재 사용하지 않는) -> docker rmi `docker images -q`
# 정지된 것들 모두 삭제(실행중인 것들 제외) -> docker system prune -a