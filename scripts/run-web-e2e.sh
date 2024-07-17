#!/bin/bash

# Check if Metro server is running
if ! lsof -i:8081; then
    echo "Starting Metro server..."
    yarn web > /dev/null & 
else
    echo "Metro server is already running."
fi

# Execute e2e tests
echo "Starting e2e tests..."
maestro test e2e/web-flow.yaml

kill $(lsof -t -i:8081)

echo "Script execution completed."
