import SubUserClass from "./subdoc/SubUser";

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

const MESSAGE_ERROR = {
  FIELDS_REQUIRED_OR_INVALID: "Fields required or invalid",
}

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

enum docTypeEnum {
  PRODUCT = "product",
  COMMENT = "comment",
  USER = "user",
}

interface ReportType {
  user: SubUserClass;
  why: bannedReasonEnum;
  resolved: boolean;
}

export {
  userRolesEnum,
  bannedReasonEnum,
  docTypeEnum,
  ReportType,
  USER_ROLE,
  BANNED_REASON,
  MESSAGE_ERROR,
};
