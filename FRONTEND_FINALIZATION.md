# Frontend Finalization Checklist

This checklist tracks completed frontend work and the sign-offs still needed
before production. Keep the existing botanical green, warm neutral, and
editorial-serif visual identity consistent when making future changes.

## Completed in this pass

- [x] Keep the routed page mounted beneath the branded loading overlay to avoid
  rendering a blank page after the overlay fades.
- [x] Respect the visitor's reduced-motion preference for Framer Motion and
  CSS-based animation.
- [x] Add a consistent visible keyboard-focus indicator.
- [x] Give the contact and booking fields programmatic labels and announce
  submission errors/statuses to assistive technology.
- [x] Keep contact, booking, and newsletter forms in a visible error state if
  their backend request fails unexpectedly.
- [x] Identify the booking dialog and its title for screen readers.
- [x] Connect FAQ buttons to their answer panels with expanded-state semantics.
- [x] Make disabled shared buttons visibly and behaviorally disabled.
- [x] Replace the browser-visible admin passcode with Supabase Auth email and
  password sign-in; gate the dashboard on the server-managed
  `app_metadata.role = "admin"` claim.
- [x] Add migration 007 to re-enable row-level security, limit private record
  reads and booking updates to admins, and grant anonymous users insert-only
  access to the three public forms.
- [x] Remove return-row reads from public form inserts so form submissions do
  not require anonymous `SELECT` access.
- [x] Show retryable admin data-fetch errors and visible booking-update and
  sign-out errors.
- [x] Add dialog focus trapping, Escape handling, focus restoration, and
  accessible labels to the gallery and booking dialogs.
- [x] Keep hero/about/testimonial slideshows automatically advancing.
- [x] Convert large plant and about photos to WebP, add a local WebP social
  preview, and provide an image-load fallback.
- [x] Add Playwright checks for visitor navigation, gallery filters, responsive
  overflow at mobile/tablet/desktop widths, dialog focus, and mocked form
  success/error states.

## Recommended before production sign-off

### Critical production sign-off

- [ ] Apply migration 007 to the Supabase project and verify its policies and
  grants there. Configure the admin's `app_metadata.role` using the Supabase
  Dashboard or a trusted server; never set it from the browser.
- [ ] Submit booking, contact, and newsletter forms against the production
  backend; verify success, duplicate submission, offline, and server-error
  states with an approved test plan. Local browser tests use mocked responses
  and do not submit real visitor data.

### High priority

- [ ] Confirm all public-facing facts with the business: opening hours, prices,
  available plants, booking expectations, location/contact details, and
  experience availability. Structured data for unverified facts has been
  removed until those details are confirmed.
- [ ] Complete manual keyboard and screen-reader checks, including descriptive
  image alternatives and color-contrast verification. Dialog focus behavior is
  covered by an automated browser test.
- [ ] Test the home page and gallery in current Chrome, Safari, and Firefox;
  Playwright currently verifies overflow at mobile, tablet, and desktop widths
  in Chromium only.
- [ ] Generate responsive image variants with `srcset`/`sizes`, reserve
  intrinsic dimensions where needed, and confirm loading priority for hero
  assets. Current plant/about images use optimized WebP, a 1400px maximum
  dimension for plant photos, and a fallback.
- [x] Provide a locally hosted social preview image and route-specific titles,
  descriptions, and canonical URLs for the home and gallery.
- [x] Add automated browser checks for route navigation, gallery filtering,
  booking dialog focus, and mocked contact/newsletter submission states.

### Nice to have

- [x] Add swipe guidance for the mobile experiences carousel.
- [ ] Add a lightweight frontend error-reporting and performance monitoring
  plan before launch.
