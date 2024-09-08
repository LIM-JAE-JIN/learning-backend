# 1. 운영체제 및 프로그램 설치
# FROM ubuntu:22.04

# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치 (이미 리눅스, node, npm, yarn 모두 깔려있는 컴퓨터 다운로드하는 방식)
FROM node:18

# 2. 내컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
COPY ./index.js /index.js

# 3. 도커안에서 index.js 실행시키기
# RUN - 이미지로 저장될 때 같이 저장됨(실행 명령어)
# CMD - 이미지에 저장되지 않음 -> 저장된 이미지를 열때 실행됨 (이미지에 저장한 프로그램을 실행시킬 때 쓰고, 한 파일에 한번만 사용가능)
CMD node index.js

