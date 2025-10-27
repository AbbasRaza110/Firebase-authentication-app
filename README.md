# Firebase Phone Authentication App

A React Native app built with Expo that implements Firebase phone number authentication. Users can sign in using their phone number and receive SMS verification codes.

## Features

- 📱 Phone number authentication with SMS verification
- 🔥 Firebase Authentication integration
- 📱 Cross-platform support (iOS & Android)
- 🎨 Modern UI with clean design
- ⚡ Fast and responsive user experience
- 🔒 Secure authentication flow

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **Yarn** or **npm** package manager
- **Expo CLI** (`npm install -g @expo/cli`)
- **Firebase project** with Authentication enabled
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

## Firebase Setup

1. **Create a Firebase Project**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Authentication and select "Phone" as a sign-in method

2. **Configure Android**

   - Download `google-services.json` from Firebase Console
   - Place it in the `android/app/` directory (already included)

3. **Configure iOS**

   - Download `GoogleService-Info.plist` from Firebase Console
   - Place it in the `ios/firebasephoneauth/` directory (already included)

4. **Enable Phone Authentication**
   - In Firebase Console, go to Authentication > Sign-in method
   - Enable "Phone" provider
   - Add your app's SHA-1 fingerprint for Android (optional for development)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Firebase-authentication-app
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Development Mode

1. **Start the Expo development server**

   ```bash
   yarn start
   # or
   npm start
   ```

2. **Run on specific platforms**

   ```bash
   # Android
   yarn android
   # or
   npm run android

   # iOS (macOS only)
   yarn ios
   # or
   npm run ios

   # Web
   yarn web
   # or
   npm run web
   ```

### Production Build

1. **Build for Android**

   ```bash
   expo build:android
   ```

2. **Build for iOS**
   ```bash
   expo build:ios
   ```

## Project Structure

```
Firebase-authentication-app/
├── app/                    # App screens and navigation
│   ├── (app)/             # Authenticated user screens
│   │   └── home.tsx       # Home screen after login
│   ├── (auth)/            # Authentication screens
│   │   └── index.tsx      # Login/verification screen
│   └── _layout.tsx        # Root layout with auth routing
├── context/               # React Context for state management
│   ├── AuthContext.tsx    # Authentication context
│   └── AuthServices.ts    # Firebase auth service functions
├── assets/                # App assets (icons, images)
├── android/               # Android-specific files
├── ios/                   # iOS-specific files
└── google-services.json   # Firebase Android config
```

## Key Components

### Authentication Flow

1. User enters phone number with country code
2. Firebase sends SMS verification code
3. User enters the 6-digit verification code
4. App verifies the code and signs in the user
5. User is redirected to the home screen

### Phone Number Format

- Must include country code (e.g., +1234567890)
- Supports international phone numbers
- Validates E.164 format

## Configuration

### App Configuration

The app is configured in `app.json` with:

- Bundle ID: `com.usd.firebase`
- Expo SDK: ~52.0.46
- React Native: 0.81.5

### Firebase Configuration

- Android: `android/app/google-services.json`
- iOS: `ios/firebasephoneauth/GoogleService-Info.plist`

## Troubleshooting

### Common Issues

1. **"App not authorized" error**

   - Ensure your app is properly configured in Firebase Console
   - Check that the SHA-1 fingerprint is added for Android
   - Verify the bundle ID matches in Firebase and app.json

2. **SMS not received**

   - Check phone number format (must include country code)
   - Ensure phone authentication is enabled in Firebase Console
   - Check Firebase quotas and billing

3. **Build errors**

   - Clear cache: `expo start -c`
   - Delete node_modules and reinstall: `rm -rf node_modules && yarn install`
   - For iOS: `cd ios && pod install && cd ..`

4. **Metro bundler issues**
   - Reset Metro cache: `npx react-native start --reset-cache`
   - Clear Expo cache: `expo start -c`

### Debug Mode

- Enable debug logging in Firebase Console
- Check device logs for detailed error messages
- Use React Native Debugger for advanced debugging

## Dependencies

### Core Dependencies

- `expo`: ~52.0.46
- `react`: 18.3.1
- `react-native`: 0.81.5
- `expo-router`: ~6.0.13

### Firebase Dependencies

- `@react-native-firebase/app`: ^21.14.0
- `@react-native-firebase/auth`: ^21.14.0
- `@react-native-firebase/firestore`: ^21.14.0

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For issues and questions:

1. Check the troubleshooting section above
2. Review Firebase documentation
3. Check Expo documentation
4. Create an issue in the repository

---

**Note**: This app requires a valid Firebase project with phone authentication enabled. Make sure to configure your Firebase project properly before running the app.
