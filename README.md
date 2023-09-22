# Tamagui's Takeout Starter

A good tutorial showing building a real app using Tamagui Takeout can be seen on the [notjust.dev YouTube stream](https://www.youtube.com/watch?v=d32F7crxXsY).

Please remember that Takeout is closed source and you should not make this code available in any public form!

## Getting Started

If you want to clone this starter, you can run `yarn create tamagui --template takeout-starter`. Otherwise, ignore this section. If you're getting authentication issues with `yarn create tamagui`, clone the template (using `gh` or just `git`), cd into the project and run `yarn install`, and then `yarn setup`.

To rename the project you can search the workspace for the word `myapp` and replace with your name.
If you prefer, you may also run [react-native-rename](https://github.com/junedomingo/react-native-rename) from `/apps/expo` to rename the react-native references.

If you're getting issues with the /android or /ios directories when setting up the starter, you can safely remove them and re-generate them using `yarn ios` and `yarn android`.

## Included packages

- [Tamagui](https://tamagui.dev)
- [solito](https://solito.dev)
- [Expo SDK](https://expo.dev)
- [Next.js](https://nextjs.org)
- [Expo Router](https://expo.github.io/router/docs)
- [Supabase](https://supabase.com)

## First-time Configuration

Note that you don't need to do this if you've already cloned this using `create tamagui`.

To configure the project, `cd` into the root of the project and run `yarn setup`.

## Development

Development scripts:

- Web: `yarn web`
- iOS: `yarn ios`
- Android: `yarn android`

NOTE: When using tRPC, even if you just want to develop on native, you need to have the web server running to be able to make tRPC requests.

Storybook scripts:

- Storybook Web: `yarn storybook:web`
- Storybook iOS: `yarn storybook:ios`
- Storybook Android: `yarn storybook:android`
- Publish to Chromatic: `yarn chromatic` (Need to set your token first in `apps/storybook/package.json -> scripts -> chromatic`)

Code generation script:

- Component: `yarn gen component`
- Screen: `yarn gen screen`
- tRPC Router: `yarn gen router`

### Signup Flow

Supabase PKCE flow requires email confirmation on sign up. You accept an email locally:

- `http://localhost:54324`
- Find the email account you signed up with
- Click the confirm link

## Folder layout

The main apps are:

- `apps`
  - `expo` (Native)
  - `next` (Web)
  - `storybook` (Web Storybook)
  - `storybook-rn` (Native Storybook)
- `packages` Shared packages across apps
  - `ui` Includes your custom UI kit that will be optimized by Tamagui
  - `app` You'll be importing most files from `app/`
    - `features` (Don't use a `screens` folder. organize by feature.)
    - `provider` (All the providers that wrap the app, and some no-ops for native or web.)
- `supabase` Supabase files, migrations, types, etc. + [scripts](/supabase/README.md)

## Layouts

### Web

We've decided not to move to app dir just yet, but since layouts are crucial to most apps, we use [per-page layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#per-page-layouts).

You can define these layouts anywhere but we've been keeping them in `layout.web.tsx` files in the `features` directory as needed. You can then use them like so:

```tsx
import { CreateScreen } from 'app/features/myfeat/screen'
import { MyLayout } from 'app/features/myfeat/layout.web'
import Head from 'next/head'
import { NextPageWithLayout } from './_app'

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>My Page</title>
      </Head>
      <MyPageScreen />
    </>
  )
}

// add the layout
Page.getLayout = (page) => <MyLayout>{page}</MyLayout>

export default Page
```

### Native

## Expo Go

The easiest way to get a project running on native devices is to use [Expo Go](https://expo.dev/client). You can download it from the App Store or Google Play.

To run an expo app on your machine locally, create an expo account and create an expo project.

- add your project id to `apps/expo/app.json` where it says `your-project-id`

![expo project id](https://github.com/tamagui/unistack/assets/2502947/8a4d3663-9eb2-4cb1-926f-0476a00ab078)

- `yarn native` from the root of the project

## Native Builds

Native builds are needed if you're using custom native code in your project. More documentation can be found here in Expo's docs: [Building Standalone Apps](https://docs.expo.dev/workflow/customizing/#adding-custom-native-code-with-development-builds)

To run a [native build](https://docs.expo.dev/develop/development-builds/introduction):

- `npx expo install expo-dev-client`
- in `apps/expo/package.json` update script `"start": "TAMAGUI_ENV=dev expo start --dev-client"`
- `yarn ios` or `yarn android`

## Expo EAS Update

[EAS update](https://docs.expo.dev/eas-update/getting-started) makes updating and publishing your app's runtime js easy.

We use `expo-router` for the native side, so simply create `_layout.tsx` files inside `apps/expo` like you would normally do with an `expo-router` project.

## How Authentication is Handled

Authentication is handled by Supabase Auth. Email and password auth is included in the starter but you can get OAuth to work too. Getting OAuth to work on web is as easy as it gets but on native, you will need to manually get the OAuth credentials, and then feed them to the Supabase session. See [this article](https://dev.to/fedorish/google-sign-in-using-supabase-and-react-native-expo-14jf) for more info on how to handle native OAuth with Supabase.

### Guarding Pages on Web

You can use standard Next.js server side functions. So far we've used getServerSideProps to protect routes (see `apps/next/utils/userProtected.ts` and `apps/next/utils/guestOnly.ts`) but you can also use middleware if you see fit.

### Guarding Screens on Native

We use a hook to check for auth and then redirect the user to auth pages, and also not let the authenticated users see auth pages. See `apps/expo/utils/useProtectedRoute.ts`.

## How Authorization is Handled

You can use Supabase's [Row-Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security) to handle authorization of users.

## Environment Convention

Follows [how Next.js handles env variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables) - In general only a `.env.local` file is needed.

- `.env.local` is where secrets can be safely stored since this file isn't committed to git
- Do NOT put your sensitive environment variables inside `.env` as it will get committed to git

[Next Environment Defaults](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#default-environment-variables)

> Good to know: .env, .env.development, and .env.production files should be included in your repository as they define defaults. .env\*.local should be added to .gitignore, as those files are intended to be ignored. .env.local is where secrets can be stored.

## Installing icons and fonts

If you have access to font and icon packages, simply run:

```sh
yarn tamagui add font
yarn tamagui add icon
```

and choose the package you want.

The package will be cloned into `packages/package-name`. After that's done, run `yarn install` and `yarn build` and follow the instructions in the package's `README.md`

## Sync With The Starter

We actively maintain the starter and add new features and updates to it.

### Takeout's Update Bot

We have created a bot to push updates to your repo if you have an active subscription for the starter. To install the bot, head over to [Subscriptions Page](https://tamagui.dev/account/subscriptions), find the starter subscription item and press the "Install GitHub App" button. Then simply give access to your repository and done. You can customize the bot's options from the `takeout.config.json` file.

Note that you will stop receiving updates if you remove the `takeout.config.json` file.

### Rolling Your Syncing Workflow

While Tamagui's bot is the easiest way you can receive updates, you may also use the `actions-template-sync` GitHub action if you prefer. It will run on a custom interval and check for changes from the template so you don't miss out on the new updates.

To set up this action, read the [Private template repository](https://github.com/marketplace/actions/actions-template-sync#private-template-repository) section.

## UI Kit

Note we're following the [design systems guide](https://tamagui.dev/docs/guides/design-systems) and creating our own package for components.

See `packages/ui` named `@my/ui` for how this works.

## Adding new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `expo`:

```sh
cd apps/expo
yarn add react-native-reanimated
cd ..
yarn
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

You may potentially want to have the native module transpiled for the next app. If you get error messages with `Cannot use import statement outside a module`, you may need to use `transpilePackages` in your `next.config.js` and add the module to the array there.

## Deploying to Vercel

- Root: `apps/next`
- Install command to be `yarn set version berry && yarn install`
- Build command: leave default setting
- Output dir: leave default setting

## Using With Expo Application Services (EAS)

EAS has already been configured for you, but you still need to do the following:

- `npm install --global eas-cli`
- `cd apps/expo`
- `eas build` - This will also add your EAS project ID to app.json

## Expo EAS Update

[EAS update](https://docs.expo.dev/eas-update/getting-started) makes updating and publishing your app's runtime js easy.
