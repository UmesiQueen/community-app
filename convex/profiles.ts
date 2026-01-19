import { queryGeneric as query } from "convex/server";
import { v } from "convex/values";

// Query to list users with optional filters
export const listProfile = query({
  args: {
    titleId: v.optional(v.id("titles")),
    searchTerm: v.optional(v.string()),
  },
  async handler(ctx, args) {
    let usersQuery = ctx.db.query("profile");

    if (args.titleId) {
      usersQuery = usersQuery.filter((q) =>
        q.eq(q.field("title"), args.titleId),
      );
    }

    const users = await usersQuery.collect();

    // Filter by search term if provided
    let filteredUsers = users;
    if (args.searchTerm) {
      const searchLower = args.searchTerm.toLowerCase();
      filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }

    // Enrich with role information
    const enrichedUsers = await Promise.all(
      filteredUsers.map(async (user) => {
        const title = await ctx.db.get(user.title);
        return {
          ...user,
          title: title,
        };
      }),
    );

    return enrichedUsers;
  },
});
