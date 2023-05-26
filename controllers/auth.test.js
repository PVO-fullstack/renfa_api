// відповідь повина мати статус-код 200
// у відповіді повинен повертатися токен
// у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

const ctrl = require("./auth");

describe("Login", () => {
  test("status = 200", () => {
    // const req = await ;
ctrl.login(
      {
        body: { email: "Cras@mail.com", password: "123456" },
      },
      (status = 200)
    );
    expect(status).toBe(200);
  });

  test("res include token", () => {
   ctrl.login(
      {
        body: { email: "Cras@mail.com", password: "123456" },
      },
      (token = user.token)
    );
    expect(user.token).toBe(token);
  });
  // test("res include token", () => {
  //   ctrl.login(
  //     {
  //       body: { email: "Cras@mail.com", password: "123456" },
  //     },
  //     ({token});
  //   expect({token}).toBe(token);
  // });
});
