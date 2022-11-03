const USER_ROLE = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
};

const BANNED_REASON = {
  SPAM: "spam",
  HARASSMENT: "harassment",
  OTHER: "other",
};

enum userRolesEnum {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
}

enum bannedReasonEnum {
  SPAM = "spam",
  HARASSMENT = "harassment",
  OTHER = "other",
}

export { userRolesEnum, bannedReasonEnum, USER_ROLE, BANNED_REASON };
