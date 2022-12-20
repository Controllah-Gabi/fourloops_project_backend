import { faker } from '@faker-js/faker';

const randomName = faker.name.fullName();
const randomEmail = faker.internet.email();


console.log(randomName, randomEmail);