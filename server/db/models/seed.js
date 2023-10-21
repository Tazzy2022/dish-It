const { db, User, RestaurantNotes, List, Follow } = require("../index");

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
      }),
      User.create({
        username: "kim",
        email: "kim@aol.com",
        password: "123",
        city: "Dublin",
        state: "California",
      }),
      User.create({
        username: "jen",
        email: "jen@aol.com",
        password: "123",
        city: "El Grenada",
        state: "California",
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
      Follow.create({
        userId: michele.id,
        follower_id: jen.id,
      }),
      Follow.create({
        userId: michele.id,
        follower_id: kim.id,
      }),
      Follow.create({
        userId: amanda.id,
        follower_id: michele.id,
      }),
      Follow.create({
        userId: jen.id,
        follower_id: michele.id,
      }),
    ]);
    db.close();
  } catch (error) {
    console.log(error);
    db.close();
  }
};

syncAndSeed();
