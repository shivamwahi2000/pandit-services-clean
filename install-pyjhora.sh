#!/bin/bash
# Install PyJHora from PyPI

# Check if PyJHora is already installed
if python3 -c "import jhora" &> /dev/null; then
  echo "PyJHora is already installed, skipping installation."
  exit 0
fi

echo "Checking Python development headers..."
if ! python3-config --includes &> /dev/null; then
  echo "WARNING: Python development headers not found."
  echo "On Oracle Linux/RHEL, install with: sudo yum install python3-devel gcc"
  echo "Attempting to continue with installation..."
fi

echo "Installing PyJHora and dependencies from PyPI..."
# Install PyJHora which will automatically install its dependencies
pip3 install --user PyJHora==4.5.5 || {
  echo "WARNING: Failed to install PyJHora from PyPI"
  echo "Trying to install dependencies manually..."
  pip3 install --user pyswisseph==2.10.3.2 python-dateutil numpy pytz || {
    echo "WARNING: Some dependencies failed to install"
    echo "Installing remaining dependencies..."
    pip3 install --user python-dateutil numpy pytz
  }
  echo "Retrying PyJHora installation..."
  pip3 install --user PyJHora==4.5.5 --no-deps || {
    echo "ERROR: PyJHora installation failed"
    echo "PyJHora features may not be available"
  }
}

echo "PyJHora installation complete!"
