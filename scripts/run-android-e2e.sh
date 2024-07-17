

# 1. Build server
bun run build
# 2. run server
bunx dotenv-cli -p .env.test.local && node ./server.js &
# 3. remove previous buiild
rm build-*.apk
# 4. build app
eas build --platform android --local --profile development

APK_DIR="$HOME/dev/uni-app"
APK_PATTERN="*.apk"

# Find the newest APK based on the naming convention
NEWEST_APK=$(ls -t $APK_DIR/$APK_PATTERN | head -n1)

if [ -z "$NEWEST_APK" ]; then
  echo "No APK found matching the pattern $APK_PATTERN in $APK_DIR."
  exit 1
fi

echo "Newest APK to be installed: $NEWEST_APK"

# Optional: Define the name of your emulator if you want to target a specific one
EMULATOR_NAME="Maestro_Pixel_6_API_30"

# Check if the emulator is already running
EMULATOR_COUNT=$(adb devices | grep emulator | wc -l)

if [ $EMULATOR_COUNT -eq 0 ]; then
    echo "Starting the emulator."
    emulator -avd $EMULATOR_NAME > /dev/null 2>&1 &
    # Wait for the Android device/emulator to finish booting
  BOOT_COMPLETED="0"
  while [ "$BOOT_COMPLETED" != "1" ]; do
  echo "Waiting for device to finish booting..."
  BOOT_COMPLETED=$(adb shell getprop sys.boot_completed | tr -d '\r')
  sleep 1
done
echo "Device is ready."
else
    echo "Emulator is already running."
fi

# Uninstall the previous version of the app
adb shell pm uninstall com.ludwigw.uniapp

# Install the new APK
echo "Installing $NEWEST_APK"
adb install "$NEWEST_APK"

if [ $? -eq 0 ]; then
  echo "Installation successful."
else
  echo "Installation failed."
  exit 1
fi

# Execute e2e tests (.env.test.local is used to override .env)
echo "Starting e2e tests..."
# if metro server is not running, start it
if ! lsof -i:8081; then
    echo "Starting Metro server..."
    bunx dotenv-cli -p .env.test.local && bun start > /dev/null & 
else
    echo "Metro server is already running."
fi
bunx dotenv-cli -p .env.test.local && maestro test e2e/native-flow.yaml

# kill server & metro server processes
kill $(lsof -t -i:8081)
kill $(lsof -t -i:3000)

echo "Script execution completed."
