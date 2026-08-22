/**
 * cPanel Passenger / Node.js Selector startup file.
 * Boots the Nitro node-server production build.
 *
 * cPanel injects PORT automatically; dist/server/index.mjs reads process.env.PORT.
 */
import "./dist/server/index.mjs";
