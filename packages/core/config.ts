/**
 * @file Centralized application branding and configuration.
 *
 * Import these constants throughout the monorepo to maintain
 * consistent branding. Environment-specific values (like
 * APP_ORIGIN) should still come from environment variables.
 *
 * @example
 * ```ts
 * import { APP_NAME, APP_SLUG } from "@repo/core/config";
 * ```
 */

/**
 * Full display name for the application.
 * Used in headers, email templates, and marketing copy.
 */
export const APP_NAME = "Codename Delorean";

/**
 * Short display name for constrained UI contexts.
 * Used in sidebars, mobile headers, and compact layouts.
 */
export const APP_NAME_SHORT = "Delorean";

/**
 * URL-safe slug for the application.
 * Used in worker names, package prefixes, and identifiers.
 */
export const APP_SLUG = "delorean";

/**
 * Default meta description for the application.
 * Used in HTML meta tags and social sharing.
 */
export const APP_DESCRIPTION =
  "Modern full-stack SaaS platform built with React, " +
  "TypeScript, and edge-first architecture.";

/**
 * Development server URL.
 * Used as fallback when APP_ORIGIN is not set.
 */
export const APP_DEV_ORIGIN = "http://localhost:5173";

/**
 * Placeholder domain for examples and documentation.
 * Should be replaced with actual domain in production configs.
 */
export const APP_EXAMPLE_DOMAIN = "example.com";

/**
 * All branding constants as a single object.
 * Useful for passing to components or templates.
 */
export const appConfig = {
  name: APP_NAME,
  nameShort: APP_NAME_SHORT,
  slug: APP_SLUG,
  description: APP_DESCRIPTION,
  devOrigin: APP_DEV_ORIGIN,
  exampleDomain: APP_EXAMPLE_DOMAIN,
} as const;

export type AppConfig = typeof appConfig;
