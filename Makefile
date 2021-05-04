# init project
install:
	@ docker-compose build

run: 
	@ docker-compose up

test: 
	@ npm run test
