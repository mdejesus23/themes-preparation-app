# Application Pages

The **Themes Preparation App** is a React (Vite) single-page application for preparing Catholic liturgical celebrations. It lets users manage Bible themes, add and categorize readings, vote on readings within groups, and save final preparation results. It also offers supporting resources: a psalm/song book, the Liturgy of the Hours, and the Catechism of the Catholic Church.

Routing is defined in [src/App.jsx](src/App.jsx) using `react-router-dom`. Routes fall into two groups:

- **Protected routes** — wrapped in `ProtectedRoute` + `AppLayout`; require an authenticated user.
- **Public routes** — wrapped in `PublicAppLayout`; accessible without logging in (authentication pages and public copies of the resource pages).

---

## Protected Pages (require login)

These render inside [AppLayout](src/ui/AppLayout.jsx) with the main navigation ([MainNav](src/ui/MainNav.jsx)) and header. The index route `/` redirects to `/themes`.

### All Preparation Themes — `/themes`
[src/pages/AllThemes.jsx](src/pages/AllThemes.jsx) → [ThemesList](src/features/preparation/ThemesList.jsx)

Landing page after login. Lists all available preparation themes for the user's group. Each theme links to its detail/preparation view. Access to an individual theme may be gated by a passcode ([PasscodeForm](src/features/preparation/PasscodeForm.jsx), [useAccessTheme](src/features/preparation/useAccessTheme.js)).

### Preparation Theme (Theme Details) — `/themes/:themeId`
[src/pages/PreparationTheme.jsx](src/pages/PreparationTheme.jsx) → [ThemeDetails](src/features/preparation/ThemeDetails.jsx)

Core preparation workspace for a single theme. Users can:
- Browse the theme's Bible readings, filtered by category (Historical, Prophetical, Epistle, Gospel) via [CategoryMenu](src/ui/CategoryMenu.jsx).
- Search for a Bible verse and view its text ([useBibleReadings](src/features/preparation/useBibleReadings.js)).
- Mark readings as done and export readings to CSV (via PapaParse).
- Proceed to the reading-votes stage once readings are complete.

### Reading Votes — `/themes/:themeId/reading-votes`
[src/pages/ReadingVotes.jsx](src/pages/ReadingVotes.jsx) → [ReadingVotesList](src/features/preparation/ReadingVotesList.jsx)

Group voting stage. Displays each reading with vote tallies, grouped by category. Users cast votes ([useVoteReading](src/features/preparation/useVoteReading.js)) and select the final four readings (first reading, second reading, third reading, gospel). From here they can compose and save a **Result**, including entrance/final songs and psalms ([ResultForm](src/features/admin/ResultForm.jsx), [SongsModal](src/features/song/SongsModal.jsx)).

### My Themes (Admin) — `/admin-themes`
[src/pages/MyThemes.jsx](src/pages/MyThemes.jsx) → [AdminThemes](src/features/admin/AdminThemes.jsx)

Management view of themes the user owns. Supports creating a new theme ([AddThemeForm](src/features/admin/AddThemeForm.jsx)), editing, and deleting themes, with pagination (6 per page).

### Admin Theme with Readings — `/admin-themes/:themeId`
[AdminThemeWithReadings](src/features/admin/AdminThemeWithReadings.jsx) (rendered directly)

Detail view for managing a single owned theme's readings. Add readings ([AddReadingForm](src/features/admin/AddReadingForm.jsx)), categorize them by liturgical category ([AdminCategorizeReading](src/features/admin/AdminCategorizeReading.jsx)), and delete readings. Filterable by category.

### My Results (Admin) — `/admin-results`
[src/pages/MyResults.jsx](src/pages/MyResults.jsx) → [Results](src/features/admin/Results.jsx)

Lists the user's saved preparation results (the finalized set of readings, psalms, and songs for each celebration). Supports editing and deleting results, with pagination (6 per page).

### Account Settings — `/admin-user`
[src/pages/User.jsx](src/pages/User.jsx) → [UserSettings](src/features/user/UserSettings.jsx) + [UpdateUserDataForm](src/features/user/UpdateUserDataForm.jsx)

User profile and settings. Upload a profile image ([useUploadProfileImage](src/features/user/useUploadProfileImage.js)), reset the user's votes ([useUserResetVotes](src/features/user/useUserResetVotes.js)), and update password/user data ([useUpdateMyPassword](src/features/user/useUpdateMyPassword..js)).

### Psalms / Song Book — `/songs`
[src/pages/Songs.jsx](src/pages/Songs.jsx) → [Songs (SongBook)](src/features/song/Songs.jsx)

Browsable collection of psalms/songs (titled "Psalms"). Each entry links to its detail page.

### Song Detail — `/songs/:songId`
[src/pages/Song.jsx](src/pages/Song.jsx) → [SongItem](src/features/song/SongItem.jsx)

Shows a single song's title and image ([useSong](src/features/song/useSong.js)).

### Liturgy of the Hours — `/liturgy-of-the-hours`
[src/pages/Liturgy.jsx](src/pages/Liturgy.jsx) → [LiturgyOfTheDay](src/features/liturgy/LiturgyOfTheDay.jsx) + [LiturgyOfTheHours](src/features/liturgy/LiturgyOfTheHours.jsx)

Shows today's liturgical calendar info (date, season, week, weekday, celebrations) via [useLiturgyOfTheDay](src/features/liturgy/useLiturgyOfTheDay.js), plus the Liturgy of the Hours prayers/readings for the current season and week.

### Liturgy Item — `/liturgy-of-the-hours/:liturgyId`
[src/pages/LiturgyItemPage.jsx](src/pages/LiturgyItemPage.jsx) → [LiturgyItem](src/features/liturgy/LiturgyItem.jsx)

Full text of a single Liturgy of the Hours reading/prayer, with season, week, and day context ([useLiturgyItem](src/features/liturgy/useLiturgyItem.js)).

### Catechism of the Catholic Church — `/catechism-of-the-catholic-church/:bookId`
[src/pages/CatechismOfTheCatholicChurch.jsx](src/pages/CatechismOfTheCatholicChurch.jsx) → [Catechism](src/features/catechism/Catechism.jsx)

EPUB-based reader for the Catechism (uses `epubjs` / `react-reader`), loaded by book ID ([useCatechism](src/features/catechism/useCatechism.js)).

### Terms of Service — `/terms-of-service`
[src/pages/TermsOfService.jsx](src/pages/TermsOfService.jsx) — Static legal text.

### Privacy Policy — `/privacy-policy`
[src/pages/PrivacyPolicy.jsx](src/pages/PrivacyPolicy.jsx) — Static legal text.

### Contact — `/contact`
[src/pages/Contact.jsx](src/pages/Contact.jsx) — Static page with a contact email link.

---

## Public Pages (no login required)

These render inside [PublicAppLayout](src/ui/PublicAppLayout.jsx).

### Login — `/login`
[src/pages/Login.jsx](src/pages/Login.jsx) → [LoginForm](src/features/authentication/LoginForm.jsx)

Sign-in page. Shows the app logo and a random Bible verse (refreshable) above the login form ([useLoginUser](src/features/authentication/useLoginUser.js)).

### Signup — `/signup`
[src/pages/Signup.jsx](src/pages/Signup.jsx) → [SignupForm](src/features/authentication/SignupForm.jsx)

Account creation page, with the same logo + random-verse presentation ([useCreateUser](src/features/authentication/useCreateUser.js)).

### Forgot Password — `/forgot-password`
[src/pages/ForgotPassword.jsx](src/pages/ForgotPassword.jsx) → [ForgotPasswordForm](src/features/authentication/ForgotPasswordForm.jsx)

Requests a password-reset email ([useForgotPassword](src/features/authentication/useForgotPassword.js)).

### Reset Password — `/reset-password/:token`
[src/pages/ResetPassword.jsx](src/pages/ResetPassword.jsx) → [ResetPasswordForm](src/features/authentication/ResetPasswordForm.jsx)

Sets a new password using the token from the reset link ([useResetPassword](src/features/authentication/useResetPassword.js)).

### Public Song Book — `/song-book` and `/song-book/:songId`
Public copies of the Psalms list and song detail pages (same components as `/songs`).

### Public Liturgy of the Hours — `/public/liturgy-of-the-hours` and `/public/liturgy-of-the-hours/:liturgyId`
Public copies of the Liturgy of the Hours list and item pages.

### Public Catechism — `/public/catechism-of-the-catholic-church/:bookId`
Public copy of the Catechism reader.

---

## Fallback

### 404 — Page Not Found — `*`
[src/pages/PageNotFound.jsx](src/pages/PageNotFound.jsx)

Catch-all route for unknown URLs; offers a link back to the homepage.

---

## Route Summary

| Path | Page | Access |
|------|------|--------|
| `/` | Redirect → `/themes` | Protected |
| `/themes` | All Preparation Themes | Protected |
| `/themes/:themeId` | Preparation Theme (details) | Protected |
| `/themes/:themeId/reading-votes` | Reading Votes | Protected |
| `/admin-themes` | My Themes | Protected |
| `/admin-themes/:themeId` | Admin Theme with Readings | Protected |
| `/admin-results` | My Results | Protected |
| `/admin-user` | Account Settings | Protected |
| `/songs`, `/songs/:songId` | Psalms / Song detail | Protected |
| `/liturgy-of-the-hours`, `/liturgy-of-the-hours/:liturgyId` | Liturgy of the Hours | Protected |
| `/catechism-of-the-catholic-church/:bookId` | Catechism reader | Protected |
| `/terms-of-service` | Terms of Service | Protected |
| `/privacy-policy` | Privacy Policy | Protected |
| `/contact` | Contact | Protected |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/forgot-password` | Forgot Password | Public |
| `/reset-password/:token` | Reset Password | Public |
| `/song-book`, `/song-book/:songId` | Public Psalms / Song detail | Public |
| `/public/liturgy-of-the-hours`, `/public/liturgy-of-the-hours/:liturgyId` | Public Liturgy of the Hours | Public |
| `/public/catechism-of-the-catholic-church/:bookId` | Public Catechism | Public |
| `*` | 404 Page Not Found | Any |
