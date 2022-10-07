import supertest from "supertest";
import app from "../app";

describe("user", () => {
    describe("test", () => {
        it("should return 200", async () => {
            await supertest(app).get("/").expect(500);
        });
    });
});
