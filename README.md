# datafox
DataFox Sample Application

## Dependencies

## Installation

## Usage
Use the `./lookup-companies.sh` script to lookup all companies in the CRM
```
./lookup-companies.sh
```

## Arguments
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