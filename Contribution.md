## Team Members and Responsibilities

### Meghna Rajubhai Ramsnehi and Hamed Tara

Meghna Rajubhai Ramsnehi and Hamed Tara have collaboratively worked on both microservices development and frontend integration:

- *Microservices Development*: Developed six microservices: Admin, Image, Order, and Products. Each microservice is responsible for handling its specific business logic and database interactions.

- *Service Discovery and API Gateway Integration*: Integrated all microservices with the Eureka server for service discovery and managed request routing through an API Gateway. This setup enhances the scalability and maintainability of the application.

- *Frontend Development*: Created the entire front end using React JS. This involved setting up the React application, building components, and ensuring seamless communication with the backend through the API Gateway. The front end is designed to be responsive and user-friendly, facilitating a smooth interaction for managing products, orders, and images.

### Dharshan Madhavan and Sudarsh Venkat Jeyaraman Rajesh
- *Docker Integration*: Responsible for containerizing the microservices using Docker. This includes writing Dockerfiles for each service, managing images, and configuring Docker Compose to orchestrate the containers. Containerization ensures that the application runs consistently across different computing environments.
- *Kafka Integration*: Set up Apache Kafka for asynchronous message handling between microservices. This is crucial for events such as order processing and product updates, where non-blocking communication is essential for the responsiveness and scalability of the application.