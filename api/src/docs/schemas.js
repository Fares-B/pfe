const DateSchema = {
  type: "string",
  format: "date-time"
};

const SubBannedSchema = {
  type: "object",
  required: [
    "reason",
    "date"
  ],
  properties: {
    reason: {
      type: "string",
      description: "The reason of a user banned, reason available spam, arrassment, other, ..."
    },
    date: DateSchema,
    unbanDate: DateSchema,
  }
};
const userSchema = {
  type: "object",
  required: [
    "username",
    "phone",
    "password"
  ],
  properties: {
    _id: {
      type: "string",
      description: "The Auto-generated id of a user"
    },
    username: {
      type: "string",
      description: "The username of a user"
    },
    phone: {
      type: "string",
      description: "The phone of a user"
    },
    email: {
      type: "string",
      description: "The email of a user"
    },
    password: {
      type: "string",
      description: "The password of a user"
    },
    role: {
      type: "string",
      description: "The role of a user"
    },
    image: {
      type: "string",
      description: "The url of a user image"
    },
    verified: {
      type: "boolean",
      description: "If user verified the account with email or phone"
    },
    createdAt: DateSchema,
    updatedAt: DateSchema,
    lastLogin: DateSchema,
    banned: {
      type: "object",
      description: "The banned of a user if null user is not banned",
      $ref: "#/components/schemas/SubBanned"
    },
    allBans: {
      type: "array",
      description: "The allBans of a user",
      items: {
        $ref: "#/components/schemas/SubBanned"
      }
    }
  }
};


const rateSchema = {
  type: "object",
  required: [
    "_id",
    "rate",
    "user",
  ],
  properties: {
    _id: {
      type: "string",
      description: "The Auto-generated id of a rate"
    },
    //  enum: [-1, 1, 2, 3, 4, 5] rate
    rate: {
      type: "number",
      enum: [-1, 1, 2, 3, 4, 5],
      description: "The rate of product or comment"
    },
    user: {
      type: "object",
      description: "The user of a rate",
      $ref: "#/components/schemas/SubUser"
    },
    productId: {
      type: "string",
      description: "The reference id of a product"
    },
    commentId: {
      type: "string",
      description: "The reference id of a comment"
    },
    createdAt: DateSchema,
    updatedAt: DateSchema,
  },
};

const reportSchema = {
  type: "object",
  required: [
    "_id",
    "who",
    "reason",
    "resolved",
    "documentType",
    "documentId",
  ],
  properties: {
    _id: {
      type: "string",
      description: "The Auto-generated id of a report"
    },
    who: {
      type: "object",
      description: "Who reported the product or comment or user",
      $ref: "#/components/schemas/SubUser"
    },
    reason: {
      type: "string",
      enum: ["spam", "arrassment", "other"],
      description: "The reason of a report"
    },
    resolved: {
      type: "boolean",
      description: "If report resolved"
    },
    documentType: {
      type: "string",
      enum: ["product", "comment", "user"],
      description: "The type the document"
    },
    documentId: {
      type: "string",
      description: "The reference id of a document"
    },
    commentId: {
      type: "string",
      description: "The reference id of a comment"
    },
    productId: {
      type: "string",
      description: "The reference id of a product"
    },
    userId: {
      type: "string",
      description: "The reference id of a user"
    },
    createdAt: DateSchema,
    updatedAt: DateSchema,
  },
};

const subUserSchema = {
  type: "object",
  required: [
    "id",
    "username",
  ],
  properties: {
    id: {
      type: "string",
      description: "The reference id of a user"
    },
    username: {
      type: "string",
      description: "The username of a user"
    },
    image: {
      type: "string",
      description: "The url of a user image"
    },
  }
};

const commentSchema = {
  type: "object",
  required: [
    "_id",
    "content",
    "user",
    "productId",
    "rate",
    "userRated",
    "deleted",
  ],
  properties: {
    _id: {
      type: "string",
      description: "The Auto-generated id of a comment"
    },
    content: {
      type: "string",
      description: "The content of a comment"
    },
    user: {
      type: "object",
      description: "The user of a comment",
      $ref: "#/components/schemas/SubUser"
    },
    productId: {
      type: "string",
      description: "The reference id of a product"
    },
    rate: {
      type: "number",
      description: "The rate of a comment"
    },
    userRated: {
      type: "number",
      description: "The userRated of a comment"
    },
    deleted: {
      type: "boolean",
      description: "If comment deleted"
    },
    banned: {
      type: "object",
      description: "The banned of a comment if null comment is not banned",
      $ref: "#/components/schemas/SubBanned"
    },
    createdAt: DateSchema,
    updatedAt: DateSchema,
  },
};
const productSchema = {
  type: "object",
  required: [
    "name",
    "barcode",
    "rate",
    "userRated",
    "deleted",
    "visible",
    "_id",
  ],
  properties: {
    _id: {
      type: "string",
      description: "The Auto-generated id of a product"
    },
    name: {
      type: "string",
      description: "The name of a product"
    },
    barcode: {
      type: "string",
      description: "The barcode of a product"
    },
    image: {
      type: "string",
      description: "The url of a product image"
    },
    thumb: {
      type: "string",
      description: "The url of a product thumb"
    },
    rate: {
      type: "number",
      description: "The rate of a product"
    },
    userRated: {
      type: "number",
      description: "The userRated of a product"
    },
    comments: {
      type: "array",
      description: "The comments of a product",
      items: {
        $ref: "#/components/schemas/Comment"
      }
    },
    deleted: {
      type: "boolean",
      description: "If product deleted"
    },
    visible: {
      type: "boolean",
      description: "If product visible"
    },
    banned: {
      type: "object",
      description: "The banned of a product if null product is not banned",
      $ref: "#/components/schemas/SubBanned"
    },
    createdAt: DateSchema,
    updatedAt: DateSchema,
  },
};

module.exports = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "Bearer"
    }
  },
  schemas: {
    Date: {
      type: "string",
      format: "date-time"
    },
    SubBanned: SubBannedSchema,
    SubUser: subUserSchema,
    User: userSchema,
    Comment: commentSchema,
    Product: productSchema,
    Rate: rateSchema,
    Report: reportSchema,
  }
};
