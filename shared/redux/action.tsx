export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';

export const ThemeChanger = (value: any) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
        type: "ThemeChanger",
        payload: value
    });
};

export const setSelectedItem = (item: any) => ({
    type: "SET_SELECTED_ITEM",
    payload: item
});

export const addToWishlist: any = (item: any, id: any) => ({
    type: "ADD_TO_WISHLIST",
    payload: { ...item, id }
});

export const removeFromWishlist = (id: any) => ({
    type: "REMOVE_FROM_WISHLIST",
    payload: id
});

export const addToCart = (item: any) => ({
    type: ADD_TO_CART,
    payload: item
});

export const addToCheckout = (items: any) => ({
    type: 'ADD_TO_CHECKOUT',
    payload: items,
    actionType: 'shoppingCartCheckOut'
});

export const buynow = (item: any) => ({
    type: 'Buynow_checkout',
    payload: item,
    actionType: 'shopDetailsBuyNow'
});

export const removeFromCart = (id: any) => ({
    type: REMOVE_FROM_CART,
    payload: id
});

export const updateCartQuantity = (id: any, quantity: any) => ({
    type: UPDATE_CART_QUANTITY,
    payload: { id, quantity }
});



