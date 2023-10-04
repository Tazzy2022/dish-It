const {
  db,
  User,
  RestaurantNotes,
  List,
  Follow
} = require("../index");

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
        userId: michele.id,
      }),
      List.create({
        listName: "Brooklyn brunch",
        isPersonal: true,
        isPrivate: false,
        restaurantIdArray: ["4", "6"],
        userId: michele.id,
      }),
      List.create({
        listName: "La taquerias",
        isPersonal: true,
        isPrivate: false,
        restaurantIdArray: ["8"],
        userId: jen.id,
      }),
      List.create({
        listName: "San Francisco date night",
        isPersonal: true,
        isPrivate: false,
        restaurantIdArray: ["71", "2", "44"],
        userId: michele.id,
      }),
    ]);
    const [yum, green, pork, love] = await Promise.all([
      RestaurantNotes.create({
        restaurantId: "2",
        personalNotes: "yum, everything tasted amazing here",
        listId: bangkok.id,
      }),
      RestaurantNotes.create({
        restaurantId: "6",
        personalNotes: "great ambiance and big portions, coffee was just okay",
        listId: brooklyn.id,
      }),
      RestaurantNotes.create({
        restaurantId: "1",
        personalNotes: "the pork is best meat option here",
        listId: la.id,
      }),
      RestaurantNotes.create({
        restaurantId: "71",
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
