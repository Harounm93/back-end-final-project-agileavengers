const { query } = require('../index');

const {
  initialUser,
  initialPosts,
  initialMoods,
  initialTrophy,
  initialQuote,
  initialNotification,
} = require('./seedData');

async function populateUsersTable() {
  await query(
    `INSERT INTO users(
        name,
        email,
        password,
        personality,
        start_date,
        points
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [
      initialUser.name,
      initialUser.email,
      initialUser.password,
      initialUser.personality,
      initialUser.start_date,
      initialUser.points,
    ]
  );
}

async function populatePostsTable() {
  for (const post of initialPosts) {
    await query(
      `INSERT INTO posts(
          user_id,
          text,
          image,
          video,
          audio,
          date,
          favorite
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [
        post.userId,
        post.text,
        post.image,
        post.video,
        post.audio,
        new Date().toDateString(),
        post.favorite,
      ]
    );
  }
}

async function populateMoodsTable() {
  for (const mood of initialMoods) {
    await query(
      `INSERT INTO moods(
          user_id,
          mood,
          date
        ) VALUES ($1, $2, $3) RETURNING *;`,
      [mood.userId, mood.mood, mood.date]
    );
  }
}

async function populateTrophiesTable() {
  await query(
    `INSERT INTO trophies(
          user_id,
          trophy_name,
          trophy_img,
          awarded
        ) VALUES ($1, $2, $3, $4) RETURNING *;`,
    [
      initialTrophy.userId,
      initialTrophy.trophyName,
      initialTrophy.trophyImg,
      initialTrophy.awarded,
    ]
  );
}

async function populateQuotesTable() {
  await query(
    `INSERT INTO quotes (
          user_id,
          quote
        ) VALUES ($1, $2) RETURNING *;`,
    [initialQuote.userId, initialQuote.quote]
  );
}

async function populateNotificationsTable() {
  await query(
    `INSERT INTO notifications(
          user_id,
          notification
        ) VALUES ($1, $2) RETURNING *;`,
    [initialNotification.userId, initialNotification.notification]
  );
}

async function populateAllTables() {
  await populateUsersTable();
  await populatePostsTable();
  await populateMoodsTable();
  await populateTrophiesTable();
  await populateQuotesTable();
  await populateNotificationsTable();
  console.log('Tables should be populated now.');
}

module.exports = { populateAllTables };

if (require.main === module) {
  populateAllTables();
}
