import supertest from "supertest";
import app from "../app";
import { createToken } from "../lib/jwt";
import { UserModel } from "../models";

async function login(params = {}) {
	const user = await UserModel.findOne({ ...params });
	const token = createToken(user);
	return {
		user,
		token: "Bearer " + token,
	};
}

describe("authenfication", () => {
	describe("invalid token", () => {
		it("should return 401", async () => {
			await supertest(app)
				.get("/users/1")
				.auth("Bearer", "invalid_token")
				.expect(401);
		});
	});

	describe("valid token", () => {
		it("should return 200", async () => {
			const { token, user } = await login();
			await supertest(app)
				.get("/users/" + user._id)
				.set("Authorization", token)
				.expect(200);
		});
	});
});

describe("login", () => {
	// describe("correct fields", () => {
	//     it("should return 200", async () => {
	//         await supertest(app)
	//             .post("/login")
	//             .send({ phone: "0610203041", password: "admin" })
	//             .expect(200);
	//     });
	// });

	describe("wrong password", () => {
		it("should return 400", async () => {
			await supertest(app)
				.post("/login")
				.send({ phone: "0610203041", password: "wrong password" })
				.expect(401);
		});
	});

	describe("wrong phone", () => {
		it("should return 400", async () => {
			await supertest(app)
				.post("/login")
				.send({ phone: "wrong phone", password: "admin" })
				.expect(401);
		});
	});
});

// describe("register", () => {
//     describe("given 200", () => {
//         it("should return 200", async () => {
//             await supertest(app)
//                 .post("/register")
//                 .send({ phone: "0610203040", password: "admin" })
//                 .expect(200);
//         });
//     });
// });
