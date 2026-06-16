const ROUTES = {
  HOME: "/home/forum",
  SIGN_IN: "/",
  SIGN_UP: "/authentication/sign-up/cover",
  ASK_QUESTION: "/home/forum/ask-question",
  PROFILE: (id: string) => `/home/forum/profile/${id}`,
  QUESTION: (id: string) => `/home/forum/questions/${id}`,
  COMMUNITY: "/home/forum/community",
  COLLECTION: "/home/forum/collection",
  TAG: (id: string) => `/home/forum/tags/${id}`,
  TAGS: "/home/forum/tags",
};
export default ROUTES;
