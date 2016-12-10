#!/usr/bin/env bash

# The directory where this file is located (not cwd)
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to /examples directory
cd $DIR

# *** Various ways to lookup the company 'Uber' ***

# Matches 'Uber' and 'UberMedia'
./lookup-company-name.sh name="Uber"

# Matches 'Uber' and 'UberMedia'
./lookup-company-name.sh name="uber"

# No Matches
./lookup-company-name.sh name="uber" ignoreCase="false"

# Matches 'UberMedia'
./lookup-company-name.sh name="UberMedia"

# Matches 'UberMedia'
./lookup-company-name.sh name="UberM"

# Match Words Only
./lookup-company-name.sh name="Inc"

# Matches 'CBOE': matches 'Options' in corporate_names
./lookup-company-name.sh name="Options"

# Matches 'CBOE': Same as defaults above
./lookup-company-name.sh name="Options" match="name,corporate_names"

# No Matches:  CBOE only has 'Options' in the corporate_names field
./lookup-company-name.sh name="Options" match="name"

# Matches 'CBOE': only checks corporate_names
./lookup-company-name.sh name="CBOE" match="corporate_names"

