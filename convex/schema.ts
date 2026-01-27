import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  titles: defineTable({
    name: v.string(),
    description: v.nullable(v.string()),
    color: v.optional(v.string()),
  }),
  profile: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    profileImage: v.nullable(v.string()),
    phoneNumbers: v.array(v.string()),
    username: v.string(),
    title: v.id("titles"),
  }).index("by_username", ["username"]),
});

export default schema;
