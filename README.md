# CS Queue Calendar

A modern, user-friendly React application for the **CS Internship** program, built to help applicants and members easily track and manage queue group meeting dates, announcements, and important events, with full Persian (Jalali) and Gregorian calendar support.

## Why Use CS Queue Calendar?

Managing weekly queue meetings and announcements can be messy, especially for a large and active program like **CS Internship**.  
CS Queue Calendar solves this by providing:

-   A **centralized, interactive calendar** for queue group meetings.
-   Built-in **automated announcements** for queue admins.
-   **Seamless Persian/Gregorian date switching** for better accessibility.
-   One-click **Google Calendar integration** for desktop users.
-   Quick links to all important **program resources** in one place.

## Features

-   **Interactive Calendar** – Navigate events by week with clean UI.
-   **Persian Calendar Support** – Full Jalali date support alongside Gregorian.
-   **Event Management** – Add, edit, and view queue events easily.
-   **Automated Weekly Announcements** – Generate and share pre-formatted meeting announcements.
-   **Google Calendar Integration** _(desktop only)_ – Add events to Google Calendar with all details filled in.
-   **Quick Access to External Resources** – Floating buttons to Telegram, LinkedIn, X (Twitter), Virgool, GitHub, and more.
-   **Responsive Design** – Optimized for desktop and mobile.
-   **Light/Dark Mode** – Custom theming with theme toggle.

## Screenshots

| Calendar View (Light)                                     | Calendar View (Dark)                                    |
| --------------------------------------------------------- | ------------------------------------------------------- |
| <img width="2559" height="1340" alt="image" src="https://github.com/user-attachments/assets/6991b757-fad9-4ddd-9467-096319ab8ee7" /> | <img width="2559" height="1343" alt="image" src="https://github.com/user-attachments/assets/ec421968-f927-4c44-9aae-14b6675f62aa" /> |

## Technologies Used

-   **React** – Frontend framework
-   **Ant Design (antd)** – UI components
-   **Sass** – Styling
-   **Day.js** & **Jalali-Moment** – Date handling
-   **React Toastify** – Notifications

### Steps

1. **Clone the repository**
    ```sh
    git clone https://github.com/cs-internship/CS-Queue-Calendar.git
    ```
2. **Install dependencies**
    ```sh
    npm install
    ```
3. **Start the development server**
    ```sh
    npm start
    ```
4. **Build for production**
    ```sh
    npm run build
    ```

## Main Commands

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `npm start`      | Start the development server |
| `npm run build`  | Build the app for production |
| `npm run deploy` | Deploy to GitHub Pages       |

## Folder Structure

```plaintext
cs-queue-calendar/
│
├── public/                         # Static assets and HTML template
├── src/                            # Application source code
│   ├── App.jsx                     # Main app component
│   ├── index.jsx                   # Entry point
│   ├── assets/
│   │   ├── fonts/                  # Persian fonts (Vazirmatn)
│   │   └── scss/                   # SCSS stylesheets
│   ├── components/
│   │   ├── AnnouncementModule.jsx      # Generate weekly meeting announcements
│   │   ├── CalendarEventCreator.jsx    # Add events to Google Calendar
│   │   ├── CSCalendar.jsx              # Main calendar UI & logic
│   │   ├── FloatButtonSection.jsx      # Theme toggle, announcements, quick links
│   │   ├── Footer.jsx                  # Footer
│   │   ├── Header.jsx                  # Header
│   │   ├── Toastify.jsx                # Toast notifications
│   │   └── useIsMobile.jsx             # Mobile detection hook
│   ├── constants/                      # Static values
│   │   ├── events.js
│   │   ├── persianWeekDays.js
│   │   └── startCalendarDate.js
│   ├── store/
│   │   └── ThemeContext.jsx            # Theme context
│   └── utils/                          # Helper functions
│       ├── convertToPersianNumbers.js
│       ├── createTds.js
│       └── formatPersianDate.js
├── package.json
└── README.md
```

## Expanded Feature Details

### Automated Weekly Announcements

Admins can select a week and instantly generate a formatted announcement message, ready to post in the queue group. Works for past, current, or future weeks.

### Google Calendar Integration _(desktop only)_

Easily add any event to Google Calendar with the exact time, title, notes, and description pre-filled.

### External Resource Links

Quick floating buttons to:

-   [Queue group on Telegram](https://t.me/+5PuhQ2hDIy1lNWRi)
-   [Telegram feed channel on Telegram](https://t.me/cs_internship)
-   [GitHub organization](https://github.com/cs-internship)
-   [LinkedIn page](https://www.linkedin.com/company/cs-internship/)
-   [X (Twitter) hashtags](https://x.com/hashtag/cs_internship)
-   [Virgool blog page](https://virgool.io/cs-internship/cs-internship-k3j2hx4wgvga)

## Contribution Guidelines

1. **Fork** the repository on GitHub.
2. **Create a new branch** for your feature or fix.
3. **Follow code style** (React, JS, SCSS) and test both **light/dark** and **mobile/desktop** views.
4. **Write clear commit messages**.
5. **Test** locally before pushing.
6. **Open a pull request** with a clear description.

## License

This project is licensed under the [MIT License](../LICENSE).

## Contact / Author Info

**Author:** [**Ali Sadeghi**](https://github.com/ali-sdg90)

**Organization:** Developed for the [**CS Internship program**](https://github.com/cs-internship)
