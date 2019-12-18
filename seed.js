'use strict';

const db = require('./server/db');
const {
  Project
} = require('./server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const projects = await Promise.all([
    Project.create({ name: 'Morocco'}),
    Project.create({ name: 'Mexico'}),
    Project.create({ name: 'Ecuador'}),
    Project.create({ name: 'Brazil'}),
    Project.create({ name: 'Bangladesh'}),
    Project.create({ name: 'Colombia'})
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
  