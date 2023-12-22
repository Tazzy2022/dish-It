const { db, User, RestaurantNotes, List, Follow, Friend } = require("../index");

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    const [michele, kim, jen, amanda] = await Promise.all([
      User.create({
        username: "michele",
        email: "michele@aol.com",
        password: "123",
        city: "San Mateo",
        state: "California",
        // image:
        //   "https://m.media-amazon.com/images/M/MV5BNWNmY2U1MjMtMDhhZS00MjcyLWJmYWUtMjI1MjZlNDBmYTVlXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
      }),
      User.create({
        username: "kim",
        email: "kim@aol.com",
        password: "123",
        city: "Dublin",
        state: "California",
        // image:
        //   "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Kim_Kardashian_West_2014.jpg/1200px-Kim_Kardashian_West_2014.jpg",
      }),
      User.create({
        username: "jen",
        email: "jen@aol.com",
        password: "123",
        city: "El Grenada",
        state: "California",
        // image:
        //   "https://media.vanityfair.com/photos/629e60058c7e24b0c393f562/master/pass/jennifer-lopez-mtv-movie-and-tv-awards-2022.jpg",
      }),
      User.create({
        username: "amanda",
        email: "amanda@aol.com",
        password: "123",
        city: "Seattle",
        state: "Washington",
      }),
    ]);
    const [brooklyn, la, sf] = await Promise.all([
      List.create({
        listName: "Brooklyn brunch",
        isPersonal: true,
        isPrivate: false,
        restaurantIdArray: ["CfOBb6NU2awo8xclJpKU3g", "jAaVnUKLITkuhzwXIe0vLQ"],
        userId: michele.id,
      }),
      List.create({
        listName: "La taquerias",
        isPersonal: true,
        isPrivate: false,
        restaurantIdArray: ["cz_0AmDhRH7T_iRvvx0THg"],
        userId: jen.id,
      }),
      List.create({
        listName: "San Francisco date night",
        isPersonal: true,
        isPrivate: false,
        restaurantIdArray: [
          "WavvLdfdP6g8aZTtbBQHTw",
          "8dUaybEPHsZMgr1iKgqgMQ",
          "4KfQnlcSu4bbTqnvGdGptw",
        ],
        userId: michele.id,
      }),
    ]);
    const [green, pork, love] = await Promise.all([
      RestaurantNotes.create({
        restaurantId: "CfOBb6NU2awo8xclJpKU3g",
        personalNotes: "great ambiance and big portions, coffee was just okay",
        listId: brooklyn.id,
      }),
      RestaurantNotes.create({
        restaurantId: "cz_0AmDhRH7T_iRvvx0THg",
        personalNotes: "the pork is best meat option here",
        listId: la.id,
      }),
      RestaurantNotes.create({
        restaurantId: "WavvLdfdP6g8aZTtbBQHTw",
        personalNotes: "great spot for a proposal",
        listId: sf.id,
      }),
    ]);
    await Promise.all([
      Friend.create({
        userId: michele.id,
        friendId: jen.id,
        pending: false,
      }),
      Friend.create({
        userId: michele.id,
        friendId: kim.id,
        pending: true,
      }),
      Friend.create({
        userId: jen.id,
        friendId: michele.id,
        pending: false,
      }),
    ]);
    db.close();
  } catch (error) {
    console.log(error);
    db.close();
  }
};

module.exports = syncAndSeed
