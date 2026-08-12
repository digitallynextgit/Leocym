/**
 * The transition between pages.
 *
 * React's <ViewTransition> hands the browser's View Transitions API a named
 * pair - the outgoing page and the incoming one - and the CSS in globals.css
 * (section 8, ROUTE TRANSITIONS) decides what that pair does: a short crossfade
 * with a small lift, while the header stays pinned as the reader's fixed
 * reference point.
 *
 * WHY IT SITS IN EVERY page.tsx AND NOT IN THE LAYOUT. Layouts persist across a
 * navigation, so a <ViewTransition> in the root layout would never unmount and
 * never mount, and `enter` and `exit` would never fire. The wrapper has to be
 * inside the thing that is actually being replaced.
 *
 * `default="none"` keeps this out of every unrelated transition on the page -
 * without it, any transition anywhere would animate the whole page body.
 *
 * Progressive enhancement throughout: a browser without the View Transitions
 * API navigates exactly as it did before, and prefers-reduced-motion zeroes the
 * durations so the swap is instant, which is the browser's own default.
 */

// <ViewTransition> is declared in the React canary types, switched on
// project-wide by src/react-canary.d.ts. See the note in that file for why it
// is a triple-slash reference and not an import here.
import { ViewTransition } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
