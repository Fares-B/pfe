import { SubUserClass } from "./subdoc/SubUser";

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

interface ReportType {
  user: SubUserClass;
  why: bannedReasonEnum;
  resolved: boolean;
}

export { userRolesEnum, bannedReasonEnum, ReportType, USER_ROLE, BANNED_REASON };
