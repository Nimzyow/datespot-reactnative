import authReducer from "./authReducer";
import * as types from "../actions/types";
describe("authReducer", () => {
  it("returns state on unrelated action", () => {
    const nonsenseState = { something: "something" };
    const nonsenseAction = { type: "nonsense", payload: "laughable" };
    expect(authReducer(nonsenseState, nonsenseAction)).toBe(nonsenseState);
  });
  it("calls REGISTER_SUCCESS action", () => {
    const expectedState = {
      token: "token",
      isAuthenticated: true,
      error: null,
    };
    const action = {
      type: types.REGISTER_SUCCESS,
      payload: expectedState.token,
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
  it("calls REGISTER_FAIL action", () => {
    const initialState = {
      token: "greatestTokenEver",
      isAuthenticated: true,
      error: null,
    };
    const action = {
      type: types.REGISTER_FAIL,
      payload: "this is an error",
    };
    const expectedState = {
      token: null,
      isAuthenticated: false,
      error: action.payload,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
  it("calls LOGIN_SUCCESS action", () => {
    const expectedState = {
      token: "token",
      isAuthenticated: true,
      error: null,
    };
    const action = {
      type: types.LOGIN_SUCCESS,
      payload: expectedState.token,
    };
    expect(authReducer(undefined, action)).toEqual(expectedState);
  });
});
