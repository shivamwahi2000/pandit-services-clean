#!/bin/bash
# Install PyJHora from GitHub repository

echo "Checking Python development headers..."
if ! python3-config --includes &> /dev/null; then
  echo "WARNING: Python development headers not found."
  echo "On Oracle Linux/RHEL, install with: sudo yum install python3-devel gcc"
  echo "Attempting to continue with installation..."
fi

echo "Installing PyJHora dependencies..."
# Try installing pyswisseph, but don't fail the build if it fails
pip3 install --user pyswisseph==2.10.3.2 python-dateutil numpy pytz || {
  echo "WARNING: Failed to install some dependencies (possibly pyswisseph)"
  echo "Installing remaining dependencies..."
  pip3 install --user python-dateutil numpy pytz
}

echo "Installing PyJHora from GitHub..."
# Try installing from the latest commit on main branch
pip3 install --user git+https://github.com/naturalstupid/PyJHora.git || {
  echo "WARNING: Failed to install PyJHora from GitHub"
  echo "PyJHora features may not be available"
}

echo "PyJHora installation complete!"
