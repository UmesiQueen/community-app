import { queryGeneric as query } from "convex/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";
import { authComponent } from "./auth";
import { project_schema } from "./schema";

export const listProject = query({
  handler: async (ctx) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) throw new Error("Not authenticated");

    return await ctx.db
      .query("project")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .collect();
  },
});

export const listProjectByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("project")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const updateProject = mutation({
  args: {
    projects: v.array(
      v.object({
        ...project_schema,
        _id: v.optional(v.id("project")),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) throw new Error("Not authenticated");
    for (const project of args.projects) {
      if (project.userId && project.userId !== authUser._id)
        throw new Error("Unauthorized action");
    }

    const projectIds: Id<"project">[] = [];

    for (const project of args.projects) {
      const { _id, ...projectData } = project;
      const existingProject = _id ? await ctx.db.get("project", _id) : null;

      if (existingProject) {
        await ctx.db.patch(existingProject._id, projectData);
        projectIds.push(existingProject._id);
      } else {
        const newProjectId = await ctx.db.insert("project", {
          ...projectData,
          userId: authUser._id,
        });
        projectIds.push(newProjectId);
      }
    }

    // Delete projects that were removed from the form
    const existingProjects = await ctx.db
      .query("project")
      .withIndex("by_userId", (q) => q.eq("userId", authUser._id))
      .collect();

    for (const existing of existingProjects) {
      if (!projectIds.includes(existing._id)) {
        await ctx.db.delete(existing._id);
      }
    }
  },
});
