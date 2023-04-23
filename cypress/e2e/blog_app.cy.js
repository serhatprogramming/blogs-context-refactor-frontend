/* eslint-disable no-undef */
describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Helsinki Finn",
      username: "helsinki",
      password: "helsinki",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    const user2 = {
      name: "FullStack Helsinki",
      username: "fullstack",
      password: "fullstack",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user2);
    cy.visit("http://localhost:3000");
  });

  it("login form shown", function () {
    cy.contains("login to application");
  });
  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("helsinki");
      cy.get("#password").type("helsinki");
      cy.get("#login-button").click();
      cy.contains("helsinki is logged in");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("XXXX");
      cy.get("#password").type("XXXX");
      cy.get("#login-button").click();
      cy.contains("Wrong Credentials");
    });

    describe("when logged in", function () {
      beforeEach(function () {
        cy.login({ username: "helsinki", password: "helsinki" });
      });
      it("A blog can be created", function () {
        cy.createBlog({
          title: "cypress title",
          author: "cypress author",
          url: "cypress.url.com",
        });
        cy.contains("cypress title");
      });
      it("Users can like a blog", function () {
        cy.createBlog({
          title: "cypress title",
          author: "cypress author",
          url: "cypress.url.com",
        });
        cy.contains("cypress title");
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("likes 1");
      });
      it("user can delete a blog", function () {
        cy.createBlog({
          title: "cypress title",
          author: "cypress author",
          url: "cypress.url.com",
        });
        cy.contains("view").click();
        cy.contains("remove");
      });
      describe("when logged out and logged in with a different user", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "cypress title",
            author: "cypress author",
            url: "cypress.url.com",
          });
          cy.contains("cypress title");
          cy.contains("logout").click();
          cy.login({ username: "fullstack", password: "fullstack" });
        });
        it("another user can login", function () {
          cy.contains("fullstack is logged in");
        });
        it("another user can create another blog", function () {
          cy.createBlog({
            title: "fullstack title",
            author: "fullstack author",
            url: "fullstack.url.com",
          });
          cy.contains("fullstack title");
        });
        it("only creator can delete", function () {
          cy.createBlog({
            title: "fullstack title",
            author: "fullstack author",
            url: "fullstack.url.com",
          });
          cy.contains("fullstack title");
          cy.contains("view").click();
          cy.contains("remove").should("not.exist");
        });
      });
    });
  });
});
