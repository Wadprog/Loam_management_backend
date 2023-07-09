dev: 
	docker-compose -f docker-compose.yml up 
rm-volumes:
	docker volume rm $(docker volume ls | grep prestamo)
clean-start: rm-volumes dev	