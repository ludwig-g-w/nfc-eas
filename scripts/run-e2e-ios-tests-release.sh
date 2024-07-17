#!/bin/bash

# 1. Build server
bun run build
# 2. run server
node ./server.js
# 3. remove previous builds 
rm -rf uniapp.app && rm build-*.tar.gz
# 4. build new build
eas build --platform ios  --local --profile development
# 5. open tar
tar -xzvf build-*.tar.gz
# 6. start ios
xcrun simctl start boot 5F15AC21-4947-40EE-8FD6-D488688A3720 && open -a Simulator
# 7. remove prev app
xcrun simctl uninstall 5F15AC21-4947-40EE-8FD6-D488688A3720 com.ludwigw.uniapp
# 7. install build on ios
xcrun simctl install 5F15AC21-4947-40EE-8FD6-D488688A3720 ./uniapp.app
# 8. run maestro


# Exit script on any error
# set -e

# # Define project directory
# PROJECT_DIR=$(pwd)

# # Navigate to the iOS directory
# cd ios

# is_simulator_booted() {
#   xcrun simctl list | grep -E 'Booted' > /dev/null
# }

# get_booted_simulator_id() {
#   xcrun simctl list | grep -E 'Booted' | awk '{print $NF}' | tr -d '()'
# }


# # Clean the previous build
# echo "Cleaning previous build..."
# xcodebuild clean -project uniapp.xcodeproj -configuration Release -alltargets

# # Build the release version
# echo "Building release version..."
# xcodebuild -workspace uniapp.xcworkspace \
#   -scheme uniapp \
#   -configuration Release \
#   -sdk iphonesimulator \
#   -derivedDataPath build

# # Check if a simulator is already booted
# if is_simulator_booted; then
#   SIMULATOR_ID=$(get_booted_simulator_id)
#   echo "Simulator is already booted with ID: $SIMULATOR_ID"
# else
#   # Boot the simulator
#   echo "Starting the simulator..."
#   xcrun simctl boot SIMULATOR_ID=$(get_booted_simulator_id)
# fi

# # Install the app on the simulator
# echo "Installing the app on the simulator..."
# APP_PATH=$(find build/Build/Products/Release-iphonesimulator -name uniapp.app)
# xcrun simctl install booted $APP_PATH

# # Launch the app
# echo "Launching the app..."
# xcrun simctl launch booted com.ludwigw.uniapp

# echo "App installed and launched successfully!"

# echo "testing!"
# maestro test e2e/android-flow.yaml
