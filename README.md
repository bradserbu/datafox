# datafox
DataFox Sample Application

## Dependencies

The project using the following opensource libraries that I created at Geofeedia
- `dataprocess`: Stream-based Data Processing Library.
- `nodus-framework`: Common library used by nodus application framework
- `nodus-run`: Utilty library to assist developers when building NodeJS applications.

## Installation
_The `nodus-run` and `nodus-framework` projects are no longer published on NPM._

In order to use the scripts below, you will have to download the source code manually from GitHub, and link the module locally.

Install `nodus-framework` dependency:
```
# Install nodus-framework
git clone http://github.com/bradserbu/nodus-framework.git
&& cd nodus-framework 
&& npm link;
```

Install `nodus-run` dependency:
```
# Install nodus-run 
git clone http://github.com/bradserbu/nodus-run.git
&& cd nodus-run
&& npm link;
```

Install datafox application
```
git clone http://github.com/bradserbu/datafox.git
&& cd datafox
&& npm link nodus-framework
&& npm link nodus-run
&& npm install
```

## Usage
Use the `./lookup-companies.sh` script to lookup all companies in the CRM
```
./lookup-companies.sh
```
### Arguments
- `input`: (default="./crm.csv") Specify the name of the CSV input file.
- `output`: (default="./output.txt") Specify the name of the OUTPUT file.
```
./lookup-companies.sh input=crm.csv output=output.csv
```

## Debugging
To see additional debug information, set the `DEBUG` environment variable to true.
```
export DEBUG="*"
```

or using the inline syntax:
```
DEBUG="*" ./lookup-companies.sh input=crm.csv output=output.csv
```

### Logging
All logging information is written to `STDERR`.

To capture the output log in a file, using the following syntax:
```
DEBUG="*" ./lookup-companies.sh 2> output.log
```

### Tests and Examples
Unit Tests were not created in favor of addition additional functionality to the application.

However, some commands that were used during the development process to test the various activites in the application are contained in an `examples.sh` file.
