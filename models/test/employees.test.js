const Employee = require("../employees.model");
const expect = require("chai").expect;
const mongoose = require("mongoose");

const employeeModelProps = ["firstName", "lastName", "department"];

describe("Employee", () => {
  it("should throw an error if any arg is missing", () => {
    const cases = [
      {},
      { firstName: "John" },
      { firstName: "John", lastName: "Doe" },
      {
        firstName: "John",
        department: "Marketing",
      },
    ];
    for (let args of cases) {
      const employee = new Employee(args);

      employee.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });
  it("should throw an error if any arg is not a string", () => {
    const cases = [
      { firstName: [], lastName: "Doe", department: "Marketing" },
      { firstName: "John", lastName: {}, department: "Marketing" },
      { firstName: "John", lastName: "Doe", department: "" },
      { firstName: "John", lastName: null, department: "Marketing" },
      { firstName: undefined, lastName: "Doe", department: "Marketing" },
    ];
    for (let args of cases) {
      const employee = new Employee(args);

      employee.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });
  it("should not throw an error if all args are correct", () => {
    const cases = [
      { firstName: "John", lastName: "Doe", department: "Marketing" },
      { firstName: "Amanda", lastName: "Smith", department: "IT" },
    ];
    for (let args of cases) {
      const employee = new Employee(args);

      employee.validate((err) => {
        expect(err).to.be.null;
      });
    }
  });
  after(() => {
    mongoose.models = {};
  });
});
