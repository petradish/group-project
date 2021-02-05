'use strict';

const db = require('./server/db');
const {
  Project
} = require('./server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const projects = await Promise.all([
    Project.create({ name: 'Kobe Bryant'}),
    Project.create({ name: 'Oprah Winfrey'}),
    Project.create({ name: 'Chadwick Boseman'}),
    Project.create({ name: 'John Lewis'}),
    Project.create({ name: 'Muhammed Ali'}),
    Project.create({ name: 'Will Smith'}),
    Project.create({ name: 'Michael Jordan'}),
    Project.create({ name: 'Serena Williams'}),
    Project.create({ name: 'Michelle Obama'}),
    Project.create({ name: 'Barack Obama'}),
    Project.create({ name: 'Martin Luther King, Jr.'}),
    Project.create({ name: 'Harriet Tubman'}),
    Project.create({ name: 'Michael Jackson'}),
    Project.create({ name: 'Meghan Markle'}),
    Project.create({ name: 'Kamala Harris'}),
    Project.create({ name: 'Simone Biles'}),
    Project.create({ name: 'Beyoncé'}),
    Project.create({ name: 'Malcolm X'}),
    Project.create({ name: 'Nelson Mandela'}),
    Project.create({ name: 'Rosa Parks'})
  ])
}

async function runSeed() {
    console.log('seeding...');
    try {
      await seed();
    } catch (err) {
      console.error(err);
      process.exitCode = 1;
    } finally {
      console.log('closing db connection');
      await db.close();
      console.log('db connection closed');
    }
  }
  
  // Execute the `seed` function, IF we ran this module directly (`node seed`).
  // `Async` functions always return a promise, so we can use `catch` to handle
  // any errors that might occur inside of `seed`.
  if (module === require.main) {
    runSeed();
  }
  
  // we export the seed function for testing purposes (see `./seed.spec.js`)
  module.exports = seed;
  