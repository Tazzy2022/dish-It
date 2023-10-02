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
    const [bangkok, brooklyn, la, sf] = await Promise.all([
      List.create({
        listName: "Bangkok veggie options",
        isPersonal: true,
        isPrivate: false,
        restaurantIdArray: ["1", "2"],
      }),
      List.create({
        listName: "Brooklyn brunch",
        isPersonal: true,
        isPrivate: false,
        restaurantIdArray: ["4", "6"],
      }),
      List.create({
        listName: "La taquerias",
        isPersonal: true,
        isPrivate: false,
        restaurantIdArray: ["1"],
      }),
      List.create({
        listName: "San Francisco date night",
        isPersonal: true,
        isPrivate: false,
        restaurantIdArray: ["71", "2", "44"],
      }),
    ]);
    const [yum, green, pork, love] = await Promise.all([
      RestaurantNotes.create({
        restaurantId: "2",
        personalNotes: "yum, everything tasted amazing here",
      }),
      RestaurantNotes.create({
        restaurantId: "6",
        personalNotes: "great ambiance and big portion, coffee was just okay",
      }),
      RestaurantNotes.create({
        restaurantId: "1",
        personalNotes: "the pork is best meat option here",
      }),
      RestaurantNotes.create({
        restaurantId: "71",
        personalNotes: "great spot for a proposal",
      }),
    ]);
    db.close();
  } catch (error) {
    console.log(error);
    db.close();
  }
};

syncAndSeed();
