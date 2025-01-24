import "@testing-library/jest-dom";

// Create a mock storage object
const mockStorage = {
  store: {},
  getItem: function (key) {
    return this.store[key] || null;
  },
  setItem: function (key, value) {
    this.store[key] = value.toString();
  },
  clear: function () {
    this.store = {};
  },
  removeItem: function (key) {
    delete this.store[key];
  },
};

// Set up localStorage mock using Object.defineProperty
Object.defineProperty(window, "localStorage", {
  value: mockStorage,
  writable: true,
});

// Set up jest spies on localStorage methods
jest.spyOn(window.localStorage, "getItem");
jest.spyOn(window.localStorage, "setItem");
jest.spyOn(window.localStorage, "removeItem");
jest.spyOn(window.localStorage, "clear");

// Set default mock implementation for token
window.localStorage.getItem.mockImplementation((key) => {
  if (key === "token") {
    return "mock-token";
  }
  return null;
});

// Clean up mock implementations before each test
beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
});
