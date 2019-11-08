import { sum } from "@/src/sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

describe("test sum()", () => {
  it("sum(1, 2) == 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
  it("sum(2, 2) == 4", () => {
    expect(sum(2, 2)).toBe(4);
  });
});
