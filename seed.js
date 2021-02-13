'use strict';

const db = require('./server/db');
const {
  Project,
  Topic,
  User
} = require('./server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const admin = await User.create({
    id: 1,
    name: 'Petra Laohakul',
    googleId: '112925598889214653227',
    role: 'admin'
  })

  const project = await Promise.all([
    Project.create({
      id: 1,
      userId: 1,
      name: 'Black History Month Project',
      shortName: 'BHM',
      description: 'Choose one person to research in honor of Black History Month.',
      instruction: 'First come first serve.\n' +
          '\n Try to choose someone you know, since you will be researching, creating, and presenting a project on this person.\n' +
          '\n If you aren\'t here, Ms. L will choose for you.'
    })
  ])

  const topics = await Promise.all([
    Topic.create({ name: 'Kobe Bryant', projectId: 1}),
    Topic.create({ name: 'Oprah Winfrey', projectId: 1}),
    Topic.create({ name: 'Chadwick Boseman', projectId: 1}),
    Topic.create({ name: 'John Lewis', projectId: 1}),
    Topic.create({ name: 'Muhammed Ali', projectId: 1}),
    Topic.create({ name: 'Will Smith', projectId: 1}),
    Topic.create({ name: 'Michael Jordan', projectId: 1}),
    Topic.create({ name: 'Serena Williams', projectId: 1}),
    Topic.create({ name: 'Michelle Obama', projectId: 1}),
    Topic.create({ name: 'Barack Obama', projectId: 1}),
    Topic.create({ name: 'Martin Luther King, Jr.', projectId: 1}),
    Topic.create({ name: 'Harriet Tubman', projectId: 1}),
    Topic.create({ name: 'Michael Jackson', projectId: 1}),
    Topic.create({ name: 'Meghan Markle', projectId: 1}),
    Topic.create({ name: 'Kamala Harris', projectId: 1}),
    Topic.create({ name: 'Simone Biles', projectId: 1}),
    Topic.create({ name: 'Beyoncé', projectId: 1}),
    Topic.create({ name: 'Malcolm X', projectId: 1}),
    Topic.create({ name: 'Nelson Mandela', projectId: 1}),
    Topic.create({ name: 'Rosa Parks', projectId: 1})
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
  