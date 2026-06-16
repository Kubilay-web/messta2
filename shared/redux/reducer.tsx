import { Ecommerceproducts } from "../data/apps/ecommers/customer/reduxdata";
const ThemeChanger = "ThemeChanger";
const SET_SELECTED_ITEM = "SET_SELECTED_ITEM";
const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
const Buynow_checkout = "Buynow_checkout";
const ADD_TO_CHECKOUT = "ADD_TO_CHECKOUT";
const ADD_TO_CART = "ADD_TO_CART"; // Define ADD_TO_CART as a constant
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";

let initialState:any = {
    lang: "en",
    dir: "ltr",
    class: "light",
    dataMenuStyles: "light",
    dataNavLayout: "vertical",
    dataHeaderStyles: "transparent",
    dataVerticalStyle: "overlay",
    toggled: "",
    dataNavStyle: "",
    dataPageStyle: "regular",
    dataWidth: "default",
    dataMenuPosition: "fixed",
    dataHeaderPosition: "fixed",
    loader: "disable",
    iconOverlay: "",
    colorPrimaryRgb: "",
    colorPrimary: "",
    bodyBg: "",
    darkBg: "",
    gray: "",
    inputBorder: "",
    Light: "",
    bgImg: "",
    iconText: "",
    body: "",
    selectedItem: null,
    wishlist: [],
    cart: [],
    count: 0,
    checkoutItems: [],
    products:Ecommerceproducts
    
};

export default function reducer(state = initialState, action:any) {

    const { type, payload } = action;

    switch (type) {
        case ThemeChanger:
            return {
                ...state,
                ...payload
            };

        case SET_SELECTED_ITEM:
            return {
                ...state,
                selectedItem: payload
            };

        case ADD_TO_WISHLIST:
            return {
                ...state,
                wishlist: [...state.wishlist, payload]
            };

        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.filter((item: any) => item.id !== payload)
            };

        case Buynow_checkout:
            return {
                ...state,
                cart: [payload],
                actionType: action.actionType
            };

        case ADD_TO_CHECKOUT:
            return {
                ...state,
                checkoutItems: action.payload,
                actionType: action.actionType
            };

        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, payload]
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item: any) => item.id !== payload)
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((item: any) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: Math.max(0, action.payload.quantity) }
                        : item
                )
            };

        default:
            return state;
    }
}

