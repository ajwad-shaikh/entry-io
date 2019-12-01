# entry-io

### Chowkidaar at TheCoolCompany | A React-based Web Entry Management App for Smart Offices

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and deployed to [entry-io.web.app](https://entry-io.web.app) with **Firebase Hosting**.

## Tech Stack

![React Firebase](https://miro.medium.com/max/3000/1*ytMIcp6uu6UIZpApG1LFYg.png)

## Project Description and Workflow

_entry-io is an entry management app for smart offices where hosts and guests can keep a track of their visits_

- When a guest arrives at the office, he chooses to **Check-in** through entry-io with some details.
  - Name
  - Email
  - Phone Number
  - Host
- As soon as the guest checks-in, the intended host receives an email with the details of his guest in the below format.
  - ```
        From: Chowkidaar from TheCoolCompany <chowkidaar_tcc@entry-io.org>
        Subject : A guest just checked in to visit you at TheCoolCompany
        Body:
        Hey Steve,
        John Doe just checked in to visit you at TheCoolCompany.
        He can be reached at +919123456780 or at johndoe@example.org.
        Thanks,
        Chowkidaar at TheCoolCompany.
    ```
- Futher the details of the _checkin-transaction_ are stored in a backend database hosted on **Firebase** as a **Realtime Database** in the below schema.
  - ```
        check-ins
            - {guest_phone_number as key}
                - name (Guest Name)
                - email (Guest Email)
                - phone (Guest Phone Number)
                - checkin_ts (Check-in Timestamp)
                - host (Host Name)
                - hostEmail (Host Email)
    ```
- Later in the day, when the guest decides to leave, he chooses to **Check-out** through entry-io. _This time, he only needs to enter his phone number._
- As soon as the guest checks-out, the app fetches the details of the guest from the `check-ins` collection. The guest then receives an email to that acknowledges his visit in the below format.
  - ```
        From: Chowkidaar from TheCoolCompany <chowkidaar_tcc@entry-io.org>
        Subject : Thank you for visiting Steve at TheCoolCompany
        Body:
        Hey John Doe,
        Steve is glad to have hosted you at TheCoolCompany.
        He can be reached at steve@thecoolcompany.com for future correspondence.
        Thanks,
        Chowkidaar at TheCoolCompany.
    ```
- Futher, the app stores the entire visit information in the `check-outs` collection that contains a history of all visits to the company in the following schema.
  - ```
        check-outs
        - { (guest_phone_number + checkout_time) as key) }
            - name (Guest Name)
            - email (Guest Email)
            - phone (Guest Phone Number)
            - checkin_ts (Check-in Timestamp)
            - checkout_ts (Check-out Timestamp)
            - host (Host Name)
            - hostEmail (Host Email)
    ```
- The app also deletes the guest reference from the `check-ins` collection that serves as a temporary collection to store details of guests who have checked-in but are left to check-out

- The backend of the app, hosted as a **Firebase Cloud Function**, uses [SendGrid API](https://sendgrid.com/docs/API_Reference/index.html) to send emails to the host and the guest as mentioned in the workflow.

## Dependencies

- `@material-ui/core: ^4.7.0`
- `@material-ui/icons: ^4.5.1`
- `@material-ui/lab: 4.0.0-alpha.33`
- `axios: ^0.19.0`
- `fg-loadcss: ^2.1.0`
- `firebase: ^7.5.0`
- `notistack: ^0.9.6`
- `react: ^16.12.0`
- `react-dom: ^16.12.0`
- `react-scripts: 3.2.0`

## Available Scripts

In the project directory, you can run:

### `yarn start` | `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn deploy` | `npm deploy`

Deploys the app to the Firebase Hosting. <br /> The app can then be viewed at [https://entry-io/web.app](https://entry-io.web.app)

### `yarn test` | `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` | `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject` | `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
