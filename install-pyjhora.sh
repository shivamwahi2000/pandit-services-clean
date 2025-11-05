#!/bin/bash
# Install PyJHora from GitHub repository

echo "Installing PyJHora dependencies..."
pip3 install --user pyswisseph==2.10.3.2 python-dateutil==2.8.2 numpy==1.19.5 pytz==2021.3

echo "Installing PyJHora from GitHub..."
pip3 install --user git+https://github.com/naturalstupid/PyJHora.git@v4.5.5

echo "PyJHora installation complete!"
